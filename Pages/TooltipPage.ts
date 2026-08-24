import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class TooltipPage extends BasePage {
    readonly sectionContainer: Locator;
    readonly heading: Locator;
    readonly description: Locator;

    readonly tooltipTrigger: Locator;
    readonly tooltipBubble: Locator;

    constructor(page: Page) {
        super(page);

        this.sectionContainer = page.locator('#section-15');
        this.heading = page.locator('#section-15 h2');
        this.description = page.locator('#section-15 > p.text-muted').first();

        this.tooltipTrigger = page.locator('#tooltip-trigger, [data-testid="tooltip-trigger"]');
        this.tooltipBubble = page.locator('[data-testid="tooltip-bubble"]');
    }

    async navigate(): Promise<void> {
        await this.goto('/practice');
        await this.scrollIntoView(this.sectionContainer);
    }

    async hoverOverTooltip(): Promise<void> {
        await this.scrollIntoView(this.tooltipTrigger);
        await this.tooltipTrigger.hover();
    }
}
