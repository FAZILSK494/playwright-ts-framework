import { test, expect } from '../src/fixtures/baseTest';

test.describe('Section 19: Scroll Testing Test Suite', () => {

    test.beforeEach(async ({ scrollTestingPage }) => {
        await scrollTestingPage.navigate();
    });

    test.describe('Positive Scenarios', () => {

        test('TC-SCR-POS-01: Scroll down through spacer and verify target visibility', async ({ scrollTestingPage }) => {
            await test.step('Scroll to target paragraph', async () => {
                await scrollTestingPage.scrollToTarget();
            });

            await test.step('Verify scroll target text is visible', async () => {
                await expect(scrollTestingPage.scrollTarget).toBeVisible();
                await expect(scrollTestingPage.scrollTarget).toHaveText('You scrolled to me');
            });
        });
    });

    test.describe('Negative & Edge Case Scenarios', () => {

        test('TC-SCR-NEG-01: Verify spacer height is rendered properly', async ({ scrollTestingPage }) => {
            await test.step('Assert spacer container presence', async () => {
                await expect(scrollTestingPage.scrollSpacer).toBeVisible();
            });
        });
    });
});
