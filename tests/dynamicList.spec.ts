import { test, expect } from '../src/fixtures/baseTest';

test.describe('Section 23: Dynamic List Test Suite', () => {

    test.beforeEach(async ({ dynamicListPage }) => {
        await dynamicListPage.navigate();
    });

    test.describe('Positive Scenarios', () => {

        test('TC-DLS-POS-01: Add new item to dynamic list', async ({ dynamicListPage }) => {
            const newItem = 'Third Item SDET';

            await test.step('Type and add third item', async () => {
                await dynamicListPage.addItem(newItem);
            });

            await test.step('Verify item is added to the list', async () => {
                await expect(dynamicListPage.dynamicList).toContainText(newItem);
            });
        });

        test('TC-DLS-POS-02: Remove item from dynamic list', async ({ dynamicListPage }) => {
            await test.step('Click remove on first item', async () => {
                const removeBtn = dynamicListPage.dynamicList.locator('[data-testid^="list-remove-"]').first();
                await removeBtn.click();
            });

            await test.step('Verify list length decreases', async () => {
                await expect(dynamicListPage.listItems).toHaveCount(1);
            });
        });
    });

    test.describe('Negative & Edge Case Scenarios', () => {

        test('TC-DLS-NEG-01: Initial list contains 2 items by default', async ({ dynamicListPage }) => {
            await test.step('Assert default count is 2', async () => {
                await expect(dynamicListPage.listItems).toHaveCount(2);
            });
        });
    });
});
