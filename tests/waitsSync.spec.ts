import { test, expect } from '../src/fixtures/baseTest';

test.describe('Section 7: Waits & Synchronisation Test Suite', () => {

    test.beforeEach(async ({ waitsSyncPage }) => {
        await waitsSyncPage.navigate();
    });

    test.describe('Positive Scenarios', () => {

        test('TC-WTS-POS-01: Wait for spinner transition and delayed text resolution', async ({ waitsSyncPage }) => {
            await test.step('Wait for spinner to disappear or transition', async () => {
                await expect(waitsSyncPage.spinner).not.toHaveText('Loading spinner...', { timeout: 10000 });
            });

            await test.step('Assert delayed text arrives', async () => {
                await expect(waitsSyncPage.delayedText).not.toHaveText('Waiting...', { timeout: 10000 });
            });
        });

        test('TC-WTS-POS-02: Trigger AJAX call and wait for response resolution', async ({ waitsSyncPage }) => {
            await test.step('Click Send AJAX button', async () => {
                await waitsSyncPage.ajaxBtn.click();
            });

            await test.step('Wait for AJAX result to update from "No request sent"', async () => {
                await expect(waitsSyncPage.ajaxResult).not.toHaveText('No request sent', { timeout: 10000 });
            });
        });
    });

    test.describe('Negative & Edge Case Scenarios', () => {

        test('TC-WTS-NEG-01: Verify progress bar element accessibility attributes', async ({ waitsSyncPage }) => {
            await test.step('Assert progress bar role/aria-label', async () => {
                await expect(waitsSyncPage.progressBar).toHaveAttribute('aria-label', 'Progress bar');
            });
        });
    });
});
