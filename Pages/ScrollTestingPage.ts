import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ScrollTestingPage extends BasePage {
    readonly sectionContainer: Locator;
    readonly heading: Locator;
    readonly description: Locator;

    readonly scrollSpacer: Locator;
    readonly scrollTarget: Locator;

    constructor(page: Page) {
        super(page);

        this.sectionContainer = page.locator('#section-19');
        this.heading = page.locator('#section-19 h2');
        this.description = page.locator('#section-19 > p.text-muted').first();

        this.scrollSpacer = page.locator('[data-testid="scroll-spacer"]');
        this.scrollTarget = page.locator('#scroll-target, [data-testid="scroll-target"]');
    }

    async navigate(): Promise<void> {
        await this.goto('/practice');
        await this.scrollIntoView(this.sectionContainer);
    }

    async scrollToTarget(): Promise<void> {
        await this.scrollTarget.scrollIntoViewIfNeeded();
    }
}
