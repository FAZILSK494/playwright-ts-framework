import { test, expect } from '../src/fixtures/baseTest';

test.describe('Section 6: Dynamic Content Test Suite', () => {

    test.beforeEach(async ({ dynamicContentPage }) => {
        await dynamicContentPage.navigate();
    });

    test.describe('Positive Scenarios', () => {

        test('TC-DYN-POS-01: Click button to make it disappear', async ({ dynamicContentPage }) => {
            await test.step('Click disappear button', async () => {
                await dynamicContentPage.disappearBtn.click();
            });

            await test.step('Verify element disappears from DOM or is hidden', async () => {
                await expect(dynamicContentPage.disappearBtn).toBeHidden();
            });
        });

        test('TC-DYN-POS-02: Change dynamic text on button click', async ({ dynamicContentPage }) => {
            await test.step('Click change text button', async () => {
                await dynamicContentPage.changeTextBtn.click();
            });

            await test.step('Verify text changes from Original text', async () => {
                await expect(dynamicContentPage.changingText).not.toHaveText('Original text');
            });
        });

        test('TC-DYN-POS-03: Increment dynamic counter', async ({ dynamicContentPage }) => {
            await test.step('Click increment button', async () => {
                await dynamicContentPage.incrementBtn.click();
            });

            await test.step('Verify counter reflects incremented value', async () => {
                await expect(dynamicContentPage.counterResult).toHaveText('Counter: 1');
            });
        });

        test('TC-DYN-POS-04: Load dynamic content items', async ({ dynamicContentPage }) => {
            await test.step('Click load content button', async () => {
                await dynamicContentPage.loadContentBtn.click();
            });

            await test.step('Verify dynamic items are injected', async () => {
                await expect(dynamicContentPage.injectedList.locator('li').first()).toBeVisible();
            });
        });
    });

    test.describe('Negative & Edge Case Scenarios', () => {

        test('TC-DYN-NEG-01: Verify initial default state before interactions', async ({ dynamicContentPage }) => {
            await test.step('Assert default texts and counters', async () => {
                await expect(dynamicContentPage.changingText).toHaveText('Original text');
                await expect(dynamicContentPage.counterResult).toHaveText('Counter: 0');
                await expect(dynamicContentPage.disappearBtn).toBeVisible();
            });
        });
    });
});
