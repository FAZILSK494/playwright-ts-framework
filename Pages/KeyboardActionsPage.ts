import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class KeyboardActionsPage extends BasePage {
    readonly sectionContainer: Locator;
    readonly heading: Locator;
    readonly description: Locator;

    readonly keyboardInput: Locator;
    readonly keyboardResult: Locator;
    readonly arrowCounter: Locator;

    constructor(page: Page) {
        super(page);

        this.sectionContainer = page.locator('#section-26');
        this.heading = page.locator('#section-26 h2');
        this.description = page.locator('#section-26 > p.text-muted').first();

        this.keyboardInput = page.locator('#keyboard-input, [data-testid="keyboard-input"]');
        this.keyboardResult = page.locator('[data-testid="keyboard-result"]');
        this.arrowCounter = page.locator('[data-testid="arrow-counter"]');
    }

    async navigate(): Promise<void> {
        await this.goto('/practice');
        await this.scrollIntoView(this.sectionContainer);
    }

    async typeKey(key: string): Promise<void> {
        await this.keyboardInput.focus();
        await this.page.keyboard.press(key);
    }
}
