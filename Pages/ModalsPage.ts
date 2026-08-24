import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ModalsPage extends BasePage {
    // Locators for Section 10: Modals
    readonly sectionContainer: Locator;
    readonly heading: Locator;
    readonly description: Locator;

    // Action Trigger
    readonly openModalBtn: Locator;

    // Modal Elements
    readonly modalOverlay: Locator;
    readonly modalBox: Locator;
    readonly modalTitle: Locator;
    readonly modalText: Locator;
    readonly modalXBtn: Locator;
    readonly modalCloseBtn: Locator;

    constructor(page: Page) {
        super(page);

        this.sectionContainer = page.locator('#section-10');
        this.heading = page.locator('#section-10 h2');
        this.description = page.locator('#section-10 > p.text-muted').first();

        this.openModalBtn = page.locator('#open-modal-btn, [data-testid="open-modal-btn"]');

        this.modalOverlay = page.locator('#modal-overlay, [data-testid="modal-overlay"]');
        this.modalBox = page.locator('#modal-box, [data-testid="modal-box"]');
        this.modalTitle = page.locator('#modal-box h3');
        this.modalText = page.locator('#modal-box p');
        this.modalXBtn = page.locator('#modal-x, [data-testid="modal-x"]');
        this.modalCloseBtn = page.locator('#modal-close-btn, [data-testid="modal-close-btn"]');
    }

    /**
     * Navigates to practice page and scrolls directly to Section 10
     */
    async navigate(): Promise<void> {
        await this.goto('/practice');
        await this.scrollIntoView(this.sectionContainer);
    }

    /**
     * Opens the modal by clicking Open Modal button
     */
    async openModal(): Promise<void> {
        await this.scrollIntoView(this.openModalBtn);
        await this.openModalBtn.click();
        await this.modalBox.waitFor({ state: 'visible', timeout: 5000 });
    }

    /**
     * Closes the modal by clicking the bottom Close button
     */
    async closeModalViaCloseBtn(): Promise<void> {
        await this.modalCloseBtn.click();
        await this.modalBox.waitFor({ state: 'hidden', timeout: 5000 });
    }

    /**
     * Closes the modal by clicking the top-right X button
     */
    async closeModalViaXBtn(): Promise<void> {
        await this.modalXBtn.click();
        await this.modalBox.waitFor({ state: 'hidden', timeout: 5000 });
    }

    /**
     * Closes the modal by clicking the backdrop overlay outside the modal box
     */
    async closeModalViaOverlay(): Promise<void> {
        await this.modalOverlay.click({ position: { x: 10, y: 10 } });
        await this.modalBox.waitFor({ state: 'hidden', timeout: 5000 });
    }

    /**
     * Checks if the modal dialog is currently visible
     */
    async isModalVisible(): Promise<boolean> {
        return await this.isElementVisible(this.modalBox, 2000);
    }

    /**
     * Retrieves modal title text
     */
    async getModalTitle(): Promise<string> {
        return await this.getElementText(this.modalTitle);
    }

    /**
     * Retrieves modal body description text
     */
    async getModalText(): Promise<string> {
        return await this.getElementText(this.modalText);
    }
}
