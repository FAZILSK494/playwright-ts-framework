import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HiddenElementsPage extends BasePage {
    readonly sectionContainer: Locator;
    readonly heading: Locator;
    readonly description: Locator;

    readonly cssHiddenBtn: Locator;
    readonly revealBtn: Locator;

    constructor(page: Page) {
        super(page);

        this.sectionContainer = page.locator('#section-18');
        this.heading = page.locator('#section-18 h2');
        this.description = page.locator('#section-18 > p.text-muted').first();

        this.cssHiddenBtn = page.locator('#css-hidden-btn, [data-testid="css-hidden-btn"]');
        this.revealBtn = page.locator('#reveal-btn, [data-testid="reveal-btn"]');
    }

    async navigate(): Promise<void> {
        await this.goto('/practice');
        await this.scrollIntoView(this.sectionContainer);
    }
}
