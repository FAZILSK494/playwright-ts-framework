import { Page, Locator } from '@playwright/test';

export class DashboardPage {
    // 1. Properties
    readonly page: Page;
    readonly welcomeHeader: Locator;
    readonly profileDropdown: Locator;
    readonly logoutButton: Locator;
    readonly globalSpinner: Locator;
    readonly metricsCards: Locator;

    // 2. Locate elements in Constructor
    constructor(page: Page) {
        this.page = page;

        // Define robust enterprise selectors
        this.welcomeHeader = page.locator('h1.dashboard-title, #welcome-msg');
        this.profileDropdown = page.locator('[data-testid="user-profile-menu"]');
        this.logoutButton = page.locator('text=Log Out, #logout-btn');
        this.globalSpinner = page.locator('.loading-spinner, [aria-busy="true"]');
        this.metricsCards = page.locator('.card-metric-value');
    }

    /**
     * Waits for data loads, skeletons, and spinners to clear out from the UI.
     * Essential for stable execution in heavy single-page apps (React/Angular).
     */
    async waitForDashboardToLoad(): Promise<void> {
        // Wait for URL to confirm dashboard context
        await this.page.waitForURL(/.*dashboard/);

        // Wait for background loading spinners to disappear from the page layout
        if (await this.globalSpinner.isVisible()) {
            await this.globalSpinner.waitFor({ state: 'hidden', timeout: 15000 });
        }

        // Ensure critical landing elements are fully visible and settled
        await this.welcomeHeader.waitFor({ state: 'visible', timeout: 10000 });
    }

    /**
     * Safely triggers the system logout cascade sequence
     */
    async logout(): Promise<void> {
        await this.profileDropdown.click();
        await this.logoutButton.click();
        // Wait until redirected back to login context
        await this.page.waitForURL(/.*login/);
    }

    /**
     * Multi-element array processing utility
     * Extracts values from visual components across the view grid
     * @returns Array of textual metrics strings
     */
    async getGridMetricsValues(): Promise<string[]> {
        // Wait for at least one card component to materialize in DOM
        await this.metricsCards.first().waitFor({ state: 'visible' });
        // Fetch all matching string elements simultaneously
        return await this.metricsCards.allInnerTexts();
    }
}
