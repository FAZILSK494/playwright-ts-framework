import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class NetworkDelayPage extends BasePage {
    readonly sectionContainer: Locator;
    readonly heading: Locator;
    readonly description: Locator;

    readonly networkBtn: Locator;
    readonly networkResult: Locator;

    constructor(page: Page) {
        super(page);

        this.sectionContainer = page.locator('#section-24');
        this.heading = page.locator('#section-24 h2');
        this.description = page.locator('#section-24 > p.text-muted').first();

        this.networkBtn = page.locator('#network-btn, [data-testid="network-btn"]');
        this.networkResult = page.locator('[data-testid="network-result"]');
    }

    async navigate(): Promise<void> {
        await this.goto('/practice');
        await this.scrollIntoView(this.sectionContainer);
    }
}
