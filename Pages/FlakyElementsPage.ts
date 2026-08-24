import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class FlakyElementsPage extends BasePage {
    readonly sectionContainer: Locator;
    readonly heading: Locator;
    readonly description: Locator;

    readonly flakyBtn: Locator;
    readonly flakyResult: Locator;

    constructor(page: Page) {
        super(page);

        this.sectionContainer = page.locator('#section-25');
        this.heading = page.locator('#section-25 h2');
        this.description = page.locator('#section-25 > p.text-muted').first();

        this.flakyBtn = page.locator('#flaky-btn, [data-testid="flaky-btn"]');
        this.flakyResult = page.locator('[data-testid="flaky-result"]');
    }

    async navigate(): Promise<void> {
        await this.goto('/practice');
        await this.scrollIntoView(this.sectionContainer);
    }
}
