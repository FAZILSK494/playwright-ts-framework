import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class DynamicContentPage extends BasePage {
    readonly sectionContainer: Locator;
    readonly heading: Locator;
    readonly description: Locator;

    readonly disappearBtn: Locator;
    readonly changeTextBtn: Locator;
    readonly changingText: Locator;
    readonly incrementBtn: Locator;
    readonly counterResult: Locator;
    readonly loadContentBtn: Locator;
    readonly injectedList: Locator;

    constructor(page: Page) {
        super(page);

        this.sectionContainer = page.locator('#section-6');
        this.heading = page.locator('#section-6 h2');
        this.description = page.locator('#section-6 > p.text-muted').first();

        this.disappearBtn = page.locator('#disappear-btn, [data-testid="disappear-btn"]');
        this.changeTextBtn = page.locator('#change-text-btn, [data-testid="change-text-btn"]');
        this.changingText = page.locator('[data-testid="changing-text"]');
        this.incrementBtn = page.locator('#increment-btn, [data-testid="increment-btn"]');
        this.counterResult = page.locator('[data-testid="counter-result"]');
        this.loadContentBtn = page.locator('#load-content-btn, [data-testid="load-content-btn"]');
        this.injectedList = page.locator('[data-testid="injected-list"]');
    }

    async navigate(): Promise<void> {
        await this.goto('/practice');
        await this.scrollIntoView(this.sectionContainer);
    }
}
