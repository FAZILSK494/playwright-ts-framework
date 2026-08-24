import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class DragDropPage extends BasePage {
    readonly sectionContainer: Locator;
    readonly heading: Locator;
    readonly description: Locator;

    readonly dragSource: Locator;
    readonly dropZone: Locator;
    readonly dropResult: Locator;

    constructor(page: Page) {
        super(page);

        this.sectionContainer = page.locator('#section-13');
        this.heading = page.locator('#section-13 h2');
        this.description = page.locator('#section-13 > p.text-muted').first();

        this.dragSource = page.locator('#drag-source, [data-testid="drag-source"]');
        this.dropZone = page.locator('#drop-zone, [data-testid="drop-zone"]');
        this.dropResult = page.locator('[data-testid="drop-result"]');
    }

    async navigate(): Promise<void> {
        await this.goto('/practice');
        await this.scrollIntoView(this.sectionContainer);
    }

    async dragAndDrop(): Promise<void> {
        await this.scrollIntoView(this.dragSource);
        await this.dragSource.dragTo(this.dropZone);
    }
}
