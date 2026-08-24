import { test, expect } from '../src/fixtures/baseTest';

test.describe('Section 15: Tooltip Test Suite', () => {

    test.beforeEach(async ({ tooltipPage }) => {
        await tooltipPage.navigate();
    });

    test.describe('Positive Scenarios', () => {

        test('TC-TLP-POS-01: Hover over trigger displays tooltip bubble text', async ({ tooltipPage }) => {
            await test.step('Hover over tooltip trigger element', async () => {
                await tooltipPage.hoverOverTooltip();
            });

            await test.step('Verify tooltip bubble text is visible', async () => {
                await expect(tooltipPage.tooltipBubble).toBeVisible();
                await expect(tooltipPage.tooltipBubble).toHaveText('This is the tooltip text');
            });
        });
    });

    test.describe('Negative & Edge Case Scenarios', () => {

        test('TC-TLP-NEG-01: Verify tooltip bubble has role="tooltip" and is hidden by default', async ({ tooltipPage }) => {
            await test.step('Assert role and hidden class', async () => {
                await expect(tooltipPage.tooltipBubble).toHaveAttribute('role', 'tooltip');
                await expect(tooltipPage.tooltipBubble).toHaveClass(/hidden/);
            });
        });
    });
});
