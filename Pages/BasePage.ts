import { Page, Locator } from '@playwright/test';

export abstract class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Navigates to a specific URL or relative path
     * @param path Target URL or relative path (e.g. '/practice')
     */
    async goto(path: string = ''): Promise<void> {
        if (path.startsWith('http://') || path.startsWith('https://')) {
            await this.page.goto(path);
        } else {
            await this.page.goto(path || '/');
        }
    }

    /**
     * Waits for DOMContentLoaded and optionally network load
     */
    async waitForPageLoad(): Promise<void> {
        await this.page.waitForLoadState('domcontentloaded');
    }

    /**
     * Safely scrolls an element into view smoothly
     */
    async scrollIntoView(locator: Locator): Promise<void> {
        await locator.scrollIntoViewIfNeeded();
    }

    /**
     * Clears and fills an input field
     */
    async fillInput(locator: Locator, value: string): Promise<void> {
        await locator.waitFor({ state: 'visible', timeout: 5000 });
        await locator.fill(value);
    }

    /**
     * Clicks on an element after ensuring it is visible
     */
    async clickElement(locator: Locator): Promise<void> {
        await locator.waitFor({ state: 'visible', timeout: 5000 });
        await locator.click();
    }

    /**
     * Retrieves trimmed inner text from an element
     */
    async getElementText(locator: Locator): Promise<string> {
        await locator.waitFor({ state: 'visible', timeout: 5000 });
        return (await locator.innerText()).trim();
    }

    /**
     * Checks if an element is visible within a specified timeout
     */
    async isElementVisible(locator: Locator, timeout: number = 3000): Promise<boolean> {
        try {
            await locator.waitFor({ state: 'visible', timeout });
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Returns current page title
     */
    async getPageTitle(): Promise<string> {
        return await this.page.title();
    }

    /**
     * Returns current browser URL
     */
    getCurrentUrl(): string {
        return this.page.url();
    }
}
