import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class FileUploadPage extends BasePage {
    readonly sectionContainer: Locator;
    readonly heading: Locator;
    readonly description: Locator;

    readonly fileInput: Locator;
    readonly fileResult: Locator;

    constructor(page: Page) {
        super(page);

        this.sectionContainer = page.locator('#section-16');
        this.heading = page.locator('#section-16 h2');
        this.description = page.locator('#section-16 > p.text-muted').first();

        this.fileInput = page.locator('#file-upload, [data-testid="file-upload"]');
        this.fileResult = page.locator('[data-testid="file-upload-result"]');
    }

    async navigate(): Promise<void> {
        await this.goto('/practice');
        await this.scrollIntoView(this.sectionContainer);
    }

    async uploadFile(filePath: string): Promise<void> {
        await this.scrollIntoView(this.fileInput);
        await this.fileInput.setInputFiles(filePath);
    }
}
