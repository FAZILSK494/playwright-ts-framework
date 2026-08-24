import { test, expect } from '../src/fixtures/baseTest';

test.describe('Section 11: iFrame Test Suite', () => {

    test.beforeEach(async ({ iframePage }) => {
        await iframePage.navigate();
    });

    test.describe('Positive Scenarios', () => {

        test('TC-IFR-POS-01: Interact with input and submit button inside iframe context', async ({ iframePage }) => {
            const inputVal = 'Automation inside frame';

            await test.step('Type inside iframe input and click submit', async () => {
                await iframePage.submitInsideIframe(inputVal);
            });

            await test.step('Assert iframe result text updates', async () => {
                await expect(iframePage.iframeResult).toHaveText(`Iframe button clicked: ${inputVal}`);
            });
        });
    });

    test.describe('Negative & Edge Case Scenarios', () => {

        test('TC-IFR-NEG-01: Verify iframe element presence and attributes', async ({ iframePage }) => {
            await test.step('Assert iframe aria-label and testid', async () => {
                await expect(iframePage.iframeElement).toBeVisible();
                await expect(iframePage.iframeElement).toHaveAttribute('aria-label', 'Practice iframe');
                await expect(iframePage.iframeElement).toHaveAttribute('data-testid', 'practice-iframe');
            });
        });
    });
});
