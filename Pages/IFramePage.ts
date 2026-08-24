import { Page, Locator, FrameLocator } from '@playwright/test';
import { BasePage } from './BasePage';

export class IFramePage extends BasePage {
    readonly sectionContainer: Locator;
    readonly heading: Locator;
    readonly description: Locator;

    readonly iframeElement: Locator;
    readonly frame: FrameLocator;
    readonly iframeInput: Locator;
    readonly iframeSubmitBtn: Locator;
    readonly iframeResult: Locator;

    constructor(page: Page) {
        super(page);

        this.sectionContainer = page.locator('#section-11');
        this.heading = page.locator('#section-11 h2');
        this.description = page.locator('#section-11 > p.text-muted').first();

        this.iframeElement = page.locator('iframe[data-testid="practice-iframe"]');
        this.frame = page.frameLocator('iframe[data-testid="practice-iframe"]');
        this.iframeInput = this.frame.locator('#iframe-input');
        this.iframeSubmitBtn = this.frame.locator('#iframe-btn');
        this.iframeResult = this.frame.locator('#iframe-result');
    }

    async navigate(): Promise<void> {
        await this.goto('/practice');
        await this.scrollIntoView(this.sectionContainer);
    }

    async submitInsideIframe(text: string): Promise<void> {
        await this.iframeInput.fill(text);
        await this.iframeSubmitBtn.click();
    }
}
