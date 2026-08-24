import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ShadowDomPage extends BasePage {
    readonly sectionContainer: Locator;
    readonly heading: Locator;
    readonly description: Locator;

    readonly shadowHost: Locator;
    readonly shadowInput: Locator;
    readonly shadowSubmitBtn: Locator;
    readonly shadowResult: Locator;

    constructor(page: Page) {
        super(page);

        this.sectionContainer = page.locator('#section-12');
        this.heading = page.locator('#section-12 h2');
        this.description = page.locator('#section-12 > p.text-muted').first();

        this.shadowHost = page.locator('practice-shadow-box');
        this.shadowInput = page.locator('practice-shadow-box #shadow-input');
        this.shadowSubmitBtn = page.locator('practice-shadow-box #shadow-btn');
        this.shadowResult = page.locator('practice-shadow-box #shadow-result');
    }

    async navigate(): Promise<void> {
        await this.goto('/practice');
        await this.scrollIntoView(this.sectionContainer);
    }

    async submitInsideShadow(text: string): Promise<void> {
        await this.shadowInput.fill(text);
        await this.shadowSubmitBtn.click();
    }
}
