import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class DynamicListPage extends BasePage {
    readonly sectionContainer: Locator;
    readonly heading: Locator;
    readonly description: Locator;

    readonly listInput: Locator;
    readonly listAddBtn: Locator;
    readonly dynamicList: Locator;
    readonly listItems: Locator;

    constructor(page: Page) {
        super(page);

        this.sectionContainer = page.locator('#section-23');
        this.heading = page.locator('#section-26 h2');
        this.description = page.locator('#section-23 > p.text-muted').first();

        this.listInput = page.locator('#list-input, [data-testid="list-input"]');
        this.listAddBtn = page.locator('#list-add-btn, [data-testid="list-add-btn"]');
        this.dynamicList = page.locator('[data-testid="dynamic-list"]');
        this.listItems = page.locator('[data-testid="dynamic-list"] li');
    }

    async navigate(): Promise<void> {
        await this.goto('/practice');
        await this.scrollIntoView(this.sectionContainer);
    }

    async addItem(text: string): Promise<void> {
        await this.scrollIntoView(this.listInput);
        await this.listInput.fill(text);
        await this.listAddBtn.click();
    }
}
