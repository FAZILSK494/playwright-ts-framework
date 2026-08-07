import { Page, Locator } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly searchButton: Locator;
    readonly searchInput: Locator;

    constructor(page: Page) {
        this.page = page;
        // In TS, we define elements as reusable Locators
        this.searchButton = page.locator('button.DocSearch-Button');
        this.searchInput = page.locator('input#docsearch-input');
    }

    async navigateTo(url: string) {
        await this.page.goto(url);
    }

    async searchFor(query: string) {
        await this.searchButton.click();
        await this.searchInput.fill(query);
        await this.searchInput.press('Enter');
    }
}
