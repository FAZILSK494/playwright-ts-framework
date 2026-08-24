import { test, expect } from '../src/fixtures/baseTest';

test.describe('Section 18: Hidden Elements Test Suite', () => {

    test.beforeEach(async ({ hiddenElementsPage }) => {
        await hiddenElementsPage.navigate();
    });

    test.describe('Positive Scenarios', () => {

        test('TC-HID-POS-01: Reveal hidden element on button click', async ({ hiddenElementsPage }) => {
            await test.step('Click Reveal Hidden Element button', async () => {
                await hiddenElementsPage.revealBtn.click();
            });

            await test.step('Verify previously hidden element becomes visible', async () => {
                await expect(hiddenElementsPage.cssHiddenBtn).toBeVisible();
            });
        });
    });

    test.describe('Negative & Edge Case Scenarios', () => {

        test('TC-HID-NEG-01: Hidden element exists in DOM with display:none initially', async ({ hiddenElementsPage }) => {
            await test.step('Assert hidden element is attached to DOM but not visible', async () => {
                await expect(hiddenElementsPage.cssHiddenBtn).toBeHidden();
                await expect(hiddenElementsPage.cssHiddenBtn).toHaveAttribute('style', /display:none/);
            });
        });
    });
});
