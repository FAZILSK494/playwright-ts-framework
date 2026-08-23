import { Page, Locator, Dialog } from '@playwright/test';
import { BasePage } from './BasePage';

export class AlertsPage extends BasePage {
    // Locators for Section 9: Alerts
    readonly sectionContainer: Locator;
    readonly heading: Locator;
    readonly description: Locator;

    // Action Buttons
    readonly alertBtn: Locator;
    readonly confirmBtn: Locator;
    readonly promptBtn: Locator;

    // Result Text
    readonly alertResult: Locator;

    constructor(page: Page) {
        super(page);

        this.sectionContainer = page.locator('#section-9');
        this.heading = page.locator('#section-9 h2');
        this.description = page.locator('#section-9 p.text-muted');

        this.alertBtn = page.locator('#alert-btn, [data-testid="alert-btn"]');
        this.confirmBtn = page.locator('#confirm-btn, [data-testid="confirm-btn"]');
        this.promptBtn = page.locator('#prompt-btn, [data-testid="prompt-btn"]');
        this.alertResult = page.locator('[data-testid="alert-result"]');
    }

    /**
     * Navigates to practice page and scrolls directly to Section 9
     */
    async navigate(): Promise<void> {
        await this.goto('/practice');
        await this.scrollIntoView(this.sectionContainer);
    }

    /**
     * Generic dialog handler that listens for a dialog, executes the trigger action, and applies the dialog handler callback
     * @param triggerAction Function that triggers the dialog (e.g. button click)
     * @param dialogHandler Callback that receives the Dialog object to assert and accept/dismiss
     */
    async handleDialog(
        triggerAction: () => Promise<void>,
        dialogHandler: (dialog: Dialog) => Promise<void>
    ): Promise<void> {
        let handlerError: unknown = null;
        const listener = async (dialog: Dialog) => {
            try {
                await dialogHandler(dialog);
            } catch (err) {
                handlerError = err;
            }
        };

        this.page.once('dialog', listener);
        await triggerAction();

        if (handlerError) {
            throw handlerError;
        }
    }

    /**
     * Triggers the Alert dialog and accepts it, returning dialog message
     */
    async triggerAlertAndAccept(): Promise<string> {
        let capturedMessage = '';
        await this.handleDialog(
            async () => {
                await this.scrollIntoView(this.alertBtn);
                await this.alertBtn.click();
            },
            async (dialog) => {
                capturedMessage = dialog.message();
                await dialog.accept();
            }
        );
        return capturedMessage;
    }

    /**
     * Triggers the Confirm dialog and accepts (OK)
     */
    async triggerConfirmAndAccept(): Promise<string> {
        let capturedMessage = '';
        await this.handleDialog(
            async () => {
                await this.scrollIntoView(this.confirmBtn);
                await this.confirmBtn.click();
            },
            async (dialog) => {
                capturedMessage = dialog.message();
                await dialog.accept();
            }
        );
        return capturedMessage;
    }

    /**
     * Triggers the Confirm dialog and dismisses (Cancel)
     */
    async triggerConfirmAndDismiss(): Promise<string> {
        let capturedMessage = '';
        await this.handleDialog(
            async () => {
                await this.scrollIntoView(this.confirmBtn);
                await this.confirmBtn.click();
            },
            async (dialog) => {
                capturedMessage = dialog.message();
                await dialog.dismiss();
            }
        );
        return capturedMessage;
    }

    /**
     * Triggers the Prompt dialog, fills text, and accepts
     */
    async triggerPromptAndAccept(inputText: string): Promise<string> {
        let capturedMessage = '';
        await this.handleDialog(
            async () => {
                await this.scrollIntoView(this.promptBtn);
                await this.promptBtn.click();
            },
            async (dialog) => {
                capturedMessage = dialog.message();
                await dialog.accept(inputText);
            }
        );
        return capturedMessage;
    }

    /**
     * Triggers the Prompt dialog and dismisses (Cancel)
     */
    async triggerPromptAndDismiss(): Promise<string> {
        let capturedMessage = '';
        await this.handleDialog(
            async () => {
                await this.scrollIntoView(this.promptBtn);
                await this.promptBtn.click();
            },
            async (dialog) => {
                capturedMessage = dialog.message();
                await dialog.dismiss();
            }
        );
        return capturedMessage;
    }

    /**
     * Retrieves current result text from Section 9
     */
    async getResultText(): Promise<string> {
        return await this.getElementText(this.alertResult);
    }
}
