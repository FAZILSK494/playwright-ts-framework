import { Page, Locator } from '@playwright/test';

export class WaitUtils {
    /**
     * Waits for page network connections to settle
     */
    static async waitForNetworkSettled(page: Page, timeout: number = 5000): Promise<void> {
        try {
            await page.waitForLoadState('networkidle', { timeout });
        } catch {
            // Ignore networkidle timeout on heavy dynamic tracking scripts
        }
    }

    /**
     * Polls until an element's text changes from its initial baseline value
     */
    static async waitForTextToChange(locator: Locator, originalText: string, timeout: number = 5000): Promise<string> {
        const startTime = Date.now();
        while (Date.now() - startTime < timeout) {
            const currentText = (await locator.innerText()).trim();
            if (currentText !== originalText.trim()) {
                return currentText;
            }
            await new Promise((r) => setTimeout(r, 200));
        }
        return (await locator.innerText()).trim();
    }
}
