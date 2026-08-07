import { Page, Locator } from '@playwright/test';

export class LoginPage {
    // 1. Define types for the page and elements
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;

    // 2. Initialize elements inside the constructor
    constructor(page: Page) {
        this.page = page;

        // Using robust selectors (modify these to match your actual corporate application)
        this.usernameInput = page.locator('input[name="username"], input[type="email"]');
        this.passwordInput = page.locator('input[name="password"], input[type="password"]');
        this.loginButton = page.locator('button[type="submit"], #login-button');
        this.errorMessage = page.locator('.error-message, [role="alert"]');
    }

    /**
     * Navigates to the login screen using the base URL configured in playwright.config.ts
     */
    async navigateToApp(): Promise<void> {
        // Navigates to the base URL root or an extension like '/login'
        await this.page.goto('/login');
    }

    /**
     * Performs the full login sequence
     * @param username The corporate login handle/email
     * @param password The secret access credential
     */
    async login(username: string, password: string): Promise<void> {
        // clear inputs and fill them safely
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);

        // Wait for navigation and click simultaneously to prevent race conditions
        await Promise.all([
            this.page.waitForNavigation({ waitUntil: 'networkidle', timeout: 10000 }).catch(() => {
                // Catch timeout block gracefully if navigating to a single-page app dashboard
            }),
            this.loginButton.click()
        ]);
    }

    /**
     * Extracts text from any visible UI login validation errors
     * @returns The error message text string
     */
    async getErrorMessageText(): Promise<string> {
        // Wait for the element to appear on screen before reading text
        await this.errorMessage.waitFor({ state: 'visible', timeout: 5000 });
        return await this.errorMessage.innerText();
    }
}
