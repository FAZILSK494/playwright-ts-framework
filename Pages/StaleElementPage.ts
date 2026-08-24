import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class StaleElementPage extends BasePage {
    readonly sectionContainer: Locator;
    readonly heading: Locator;
    readonly description: Locator;

    readonly staleTarget: Locator;
    readonly staleRefreshBtn: Locator;

    constructor(page: Page) {
        super(page);

        this.sectionContainer = page.locator('#section-22');
        this.heading = page.locator('#section-22 h2');
        this.description = page.locator('#section-22 > p.text-muted').first();

        this.staleTarget = page.locator('#stale-target, [data-testid="stale-target"]');
        this.staleRefreshBtn = page.locator('#stale-refresh-btn, [data-testid="stale-refresh-btn"]');
    }

    async navigate(): Promise<void> {
        await this.goto('/practice');
        await this.scrollIntoView(this.sectionContainer);
    }
}
