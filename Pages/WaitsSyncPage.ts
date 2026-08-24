import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class WaitsSyncPage extends BasePage {
    readonly sectionContainer: Locator;
    readonly heading: Locator;
    readonly description: Locator;

    readonly spinner: Locator;
    readonly delayedText: Locator;
    readonly progressBar: Locator;
    readonly progressResult: Locator;
    readonly ajaxBtn: Locator;
    readonly ajaxResult: Locator;

    constructor(page: Page) {
        super(page);

        this.sectionContainer = page.locator('#section-7');
        this.heading = page.locator('#section-7 h2');
        this.description = page.locator('#section-7 > p.text-muted').first();

        this.spinner = page.locator('[data-testid="spinner"]');
        this.delayedText = page.locator('[data-testid="delayed-text"]');
        this.progressBar = page.locator('[data-testid="progress-bar"]');
        this.progressResult = page.locator('[data-testid="progress-result"]');
        this.ajaxBtn = page.locator('#ajax-btn, [data-testid="ajax-btn"]');
        this.ajaxResult = page.locator('[data-testid="ajax-result"]');
    }

    async navigate(): Promise<void> {
        await this.goto('/practice');
        await this.scrollIntoView(this.sectionContainer);
    }
}
