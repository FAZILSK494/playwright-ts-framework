import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class DatePickerPage extends BasePage {
    readonly sectionContainer: Locator;
    readonly heading: Locator;
    readonly description: Locator;

    readonly dateInput: Locator;
    readonly dateResult: Locator;

    constructor(page: Page) {
        super(page);

        this.sectionContainer = page.locator('#section-28');
        this.heading = page.locator('#section-28 h2');
        this.description = page.locator('#section-28 > p.text-muted').first();

        this.dateInput = page.locator('#date-input, [data-testid="date-input"]');
        this.dateResult = page.locator('[data-testid="date-result"]');
    }

    async navigate(): Promise<void> {
        await this.goto('/practice');
        await this.scrollIntoView(this.sectionContainer);
    }

    async setDate(dateStr: string): Promise<void> {
        await this.scrollIntoView(this.dateInput);
        await this.dateInput.fill(dateStr);
    }
}
