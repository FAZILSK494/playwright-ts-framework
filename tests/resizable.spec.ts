import { test, expect } from '../src/fixtures/baseTest';

test.describe('Section 29: Resizable Element Test Suite', () => {

    test.beforeEach(async ({ resizablePage }) => {
        await resizablePage.navigate();
    });

    test.describe('Positive Scenarios', () => {

        test('TC-RSZ-POS-01: Verify resizable box dimensions and initial inline styles', async ({ resizablePage }) => {
            await test.step('Verify initial box bounding box and style properties', async () => {
                await expect(resizablePage.resizableBox).toBeVisible();
                const style = await resizablePage.resizableBox.getAttribute('style');
                expect(style).toContain('resize:both');
            });
        });
    });

    test.describe('Negative & Edge Case Scenarios', () => {

        test('TC-RSZ-NEG-01: Accessibility and attributes integrity', async ({ resizablePage }) => {
            await test.step('Assert aria-label and data-testid', async () => {
                await expect(resizablePage.resizableBox).toHaveAttribute('aria-label', 'Resizable box');
                await expect(resizablePage.resizableBox).toHaveAttribute('data-testid', 'resizable-box');
            });
        });
    });
});
