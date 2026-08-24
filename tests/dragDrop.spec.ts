import { test, expect } from '../src/fixtures/baseTest';

test.describe('Section 13: Drag & Drop Test Suite', () => {

    test.beforeEach(async ({ dragDropPage }) => {
        await dragDropPage.navigate();
    });

    test.describe('Positive Scenarios', () => {

        test('TC-DND-POS-01: Drag source item and drop onto target drop zone', async ({ dragDropPage }) => {
            await test.step('Perform drag and drop action', async () => {
                await dragDropPage.dragAndDrop();
            });

            await test.step('Assert drop result confirms dropped state', async () => {
                await expect(dragDropPage.dropResult).not.toHaveText('Nothing dropped');
            });
        });
    });

    test.describe('Negative & Edge Case Scenarios', () => {

        test('TC-DND-NEG-01: Default state before drag interaction', async ({ dragDropPage }) => {
            await test.step('Verify initial result is "Nothing dropped"', async () => {
                await expect(dragDropPage.dropResult).toHaveText('Nothing dropped');
                await expect(dragDropPage.dragSource).toHaveAttribute('draggable', 'true');
            });
        });
    });
});
