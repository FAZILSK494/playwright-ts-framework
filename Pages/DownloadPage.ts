import { Page, Locator, Download } from '@playwright/test';
import { BasePage } from './BasePage';

export class DownloadPage extends BasePage {
    readonly sectionContainer: Locator;
    readonly heading: Locator;
    readonly description: Locator;

    readonly downloadBtn: Locator;
    readonly downloadResult: Locator;

    constructor(page: Page) {
        super(page);

        this.sectionContainer = page.locator('#section-17');
        this.heading = page.locator('#section-17 h2');
        this.description = page.locator('#section-17 > p.text-muted').first();

        this.downloadBtn = page.locator('#download-btn, [data-testid="download-btn"]');
        this.downloadResult = page.locator('[data-testid="download-result"]');
    }

    async navigate(): Promise<void> {
        await this.goto('/practice');
        await this.scrollIntoView(this.sectionContainer);
    }

    async triggerDownload(): Promise<Download> {
        await this.scrollIntoView(this.downloadBtn);
        const downloadPromise = this.page.waitForEvent('download');
        await this.downloadBtn.click();
        return await downloadPromise;
    }
}
