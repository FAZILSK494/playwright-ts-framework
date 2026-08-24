import { test, expect } from '../src/fixtures/baseTest';

test.describe('Section 12: Shadow DOM Test Suite', () => {

    test.beforeEach(async ({ shadowDomPage }) => {
        await shadowDomPage.navigate();
    });

    test.describe('Positive Scenarios', () => {

        test('TC-SDW-POS-01: Pierce shadow root, fill input, and submit form', async ({ shadowDomPage }) => {
            const shadowText = 'Shadow Playwright SDET';

            await test.step('Fill shadow input and click submit', async () => {
                await shadowDomPage.submitInsideShadow(shadowText);
            });

            await test.step('Assert shadow DOM result updates', async () => {
                await expect(shadowDomPage.shadowResult).toHaveText(`Shadow button clicked: ${shadowText}`);
            });
        });
    });

    test.describe('Negative & Edge Case Scenarios', () => {

        test('TC-SDW-NEG-01: Verify shadow host component is rendered in DOM', async ({ shadowDomPage }) => {
            await test.step('Assert shadow host element visibility', async () => {
                await expect(shadowDomPage.shadowHost).toBeVisible();
            });
        });
    });
});
