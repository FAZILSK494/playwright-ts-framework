import { test, expect } from '../src/fixtures/baseTest';

test.describe('Section 17: Download Test Suite', () => {

    test.beforeEach(async ({ downloadPage }) => {
        await downloadPage.navigate();
    });

    test.describe('Positive Scenarios', () => {

        test('TC-DWN-POS-01: Trigger and verify file download of practice.txt', async ({ downloadPage }) => {
            await test.step('Click download button and capture download event', async () => {
                const download = await downloadPage.triggerDownload();
                expect(download.suggestedFilename()).toBe('practice.txt');
            });

            await test.step('Verify download result confirms download state', async () => {
                await expect(downloadPage.downloadResult).not.toHaveText('Not downloaded');
            });
        });
    });

    test.describe('Negative & Edge Case Scenarios', () => {

        test('TC-DWN-NEG-01: Default status is "Not downloaded"', async ({ downloadPage }) => {
            await test.step('Assert default text', async () => {
                await expect(downloadPage.downloadResult).toHaveText('Not downloaded');
                await expect(downloadPage.downloadBtn).toHaveAttribute('aria-label', 'Download file');
            });
        });
    });
});
