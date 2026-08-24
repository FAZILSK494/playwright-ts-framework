import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class MultipleWindowsPage extends BasePage {
    readonly sectionContainer: Locator;
    readonly heading: Locator;
    readonly description: Locator;

    readonly openWindowBtn: Locator;
    readonly windowResult: Locator;

    constructor(page: Page) {
        super(page);

        this.sectionContainer = page.locator('#section-20');
        this.heading = page.locator('#section-20 h2');
        this.description = page.locator('#section-20 > p.text-muted').first();

        this.openWindowBtn = page.locator('#open-window-btn, [data-testid="open-window-btn"]');
        this.windowResult = page.locator('[data-testid="window-result"]');
    }

    async navigate(): Promise<void> {
        await this.goto('/practice');
        await this.scrollIntoView(this.sectionContainer);
    }

    async openNewWindow(): Promise<Page> {
        await this.scrollIntoView(this.openWindowBtn);
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent('page'),
            this.openWindowBtn.click()
        ]);
        await newPage.waitForLoadState();
        return newPage;
    }
}
