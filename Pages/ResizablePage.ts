import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ResizablePage extends BasePage {
    readonly sectionContainer: Locator;
    readonly heading: Locator;
    readonly description: Locator;

    readonly resizableBox: Locator;

    constructor(page: Page) {
        super(page);

        this.sectionContainer = page.locator('#section-29');
        this.heading = page.locator('#section-29 h2');
        this.description = page.locator('#section-29 > p.text-muted').first();

        this.resizableBox = page.locator('#resizable-box, [data-testid="resizable-box"]');
    }

    async navigate(): Promise<void> {
        await this.goto('/practice');
        await this.scrollIntoView(this.sectionContainer);
    }
}
