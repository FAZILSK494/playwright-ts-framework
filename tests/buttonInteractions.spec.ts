import { test, expect } from '../src/fixtures/baseTest';

test.describe('Section 2: Button Interactions Test Suite', () => {

    test.beforeEach(async ({ buttonInteractionsPage }) => {
        await buttonInteractionsPage.navigate();
    });

    // ==========================================
    // POSITIVE SCENARIOS
    // ==========================================
    test.describe('Positive Scenarios', () => {

        test('TC-BTN-POS-01: Verify single click button registers interaction', async ({ buttonInteractionsPage }) => {
            await test.step('Verify initial default status text', async () => {
                await expect(buttonInteractionsPage.singleClickResult).toHaveText('No click yet');
            });

            await test.step('Perform left click on Single Click button', async () => {
                await buttonInteractionsPage.performSingleClick();
            });

            await test.step('Assert result text updates to confirmed clicked state', async () => {
                await expect(buttonInteractionsPage.singleClickResult).not.toHaveText('No click yet');
            });
        });

        test('TC-BTN-POS-02: Verify double click button registers double-click event', async ({ buttonInteractionsPage }) => {
            await test.step('Verify initial double click status', async () => {
                await expect(buttonInteractionsPage.doubleClickResult).toHaveText('Not double-clicked');
            });

            await test.step('Perform double click action', async () => {
                await buttonInteractionsPage.performDoubleClick();
            });

            await test.step('Assert double-click result updates', async () => {
                await expect(buttonInteractionsPage.doubleClickResult).not.toHaveText('Not double-clicked');
            });
        });

        test('TC-BTN-POS-03: Verify right click (context menu) button interaction', async ({ buttonInteractionsPage }) => {
            await test.step('Verify initial right click status', async () => {
                await expect(buttonInteractionsPage.rightClickResult).toHaveText('Not right-clicked');
            });

            await test.step('Perform right click action', async () => {
                await buttonInteractionsPage.performRightClick();
            });

            await test.step('Assert right-click result updates', async () => {
                await expect(buttonInteractionsPage.rightClickResult).not.toHaveText('Not right-clicked');
            });
        });

        test('TC-BTN-POS-04: Verify delayed enable button synchronisation (3s timer)', async ({ buttonInteractionsPage }) => {
            await test.step('Verify delayed button is initially disabled', async () => {
                await expect(buttonInteractionsPage.delayedEnableBtn).toBeDisabled();
            });

            await test.step('Click Start 3s Timer button', async () => {
                await buttonInteractionsPage.startDelayTimer();
            });

            await test.step('Wait for delayed button to transition to enabled', async () => {
                await expect(buttonInteractionsPage.delayedEnableBtn).toBeEnabled({ timeout: 6000 });
            });

            await test.step('Click enabled delayed button', async () => {
                await buttonInteractionsPage.delayedEnableBtn.click();
            });
        });

        test('TC-BTN-POS-05: Verify self-relabelling button changes text label on click', async ({ buttonInteractionsPage }) => {
            await test.step('Assert initial button label is "Original Label"', async () => {
                await expect(buttonInteractionsPage.relabelBtn).toHaveText('Original Label');
            });

            await test.step('Click the relabel button', async () => {
                await buttonInteractionsPage.clickRelabelButton();
            });

            await test.step('Assert button text has changed', async () => {
                await expect(buttonInteractionsPage.relabelBtn).not.toHaveText('Original Label');
            });
        });

        test('TC-BTN-POS-06: Verify button activation via Keyboard Space/Enter key', async ({ buttonInteractionsPage }) => {
            await test.step('Focus on Single Click button and press Space', async () => {
                await buttonInteractionsPage.singleClickBtn.focus();
                await buttonInteractionsPage.page.keyboard.press('Space');
            });

            await test.step('Assert click action is triggered', async () => {
                await expect(buttonInteractionsPage.singleClickResult).not.toHaveText('No click yet');
            });
        });

        test('TC-BTN-POS-07: Verify independent status updates for multiple click types', async ({ buttonInteractionsPage }) => {
            await test.step('Perform single click, double click, and right click in sequence', async () => {
                await buttonInteractionsPage.performSingleClick();
                await buttonInteractionsPage.performDoubleClick();
                await buttonInteractionsPage.performRightClick();
            });

            await test.step('Assert all three result elements reflect their respective triggered states simultaneously', async () => {
                await expect(buttonInteractionsPage.singleClickResult).not.toHaveText('No click yet');
                await expect(buttonInteractionsPage.doubleClickResult).not.toHaveText('Not double-clicked');
                await expect(buttonInteractionsPage.rightClickResult).not.toHaveText('Not right-clicked');
            });
        });
    });

    // ==========================================
    // NEGATIVE & STATE SCENARIOS
    // ==========================================
    test.describe('Negative & State Scenarios', () => {

        test('TC-BTN-NEG-01: Verify Always Disabled button is non-interactive', async ({ buttonInteractionsPage }) => {
            await test.step('Assert disabled button has disabled attribute and class opacity', async () => {
                await expect(buttonInteractionsPage.disabledBtn).toBeDisabled();
                await expect(buttonInteractionsPage.disabledBtn).toHaveAttribute('disabled', '');
            });
        });

        test('TC-BTN-NEG-02: Verify delayed button cannot be clicked before timer trigger', async ({ buttonInteractionsPage }) => {
            await test.step('Assert delayed button remains disabled prior to timer start', async () => {
                await expect(buttonInteractionsPage.delayedEnableBtn).toBeDisabled();
            });
        });

        test('TC-BTN-NEG-03: Verify accessibility and ARIA labels on all section buttons', async ({ buttonInteractionsPage }) => {
            await test.step('Assert aria-label on all button elements', async () => {
                await expect(buttonInteractionsPage.singleClickBtn).toHaveAttribute('aria-label', 'Single click button');
                await expect(buttonInteractionsPage.doubleClickBtn).toHaveAttribute('aria-label', 'Double click button');
                await expect(buttonInteractionsPage.rightClickBtn).toHaveAttribute('aria-label', 'Right click button');
                await expect(buttonInteractionsPage.disabledBtn).toHaveAttribute('aria-label', 'Disabled button');
                await expect(buttonInteractionsPage.startDelayBtn).toHaveAttribute('aria-label', 'Start delay');
                await expect(buttonInteractionsPage.delayedEnableBtn).toHaveAttribute('aria-label', 'Delayed enable button');
                await expect(buttonInteractionsPage.relabelBtn).toHaveAttribute('aria-label', 'Relabel button');
            });

            await test.step('Assert data-testid attributes for automation robustness', async () => {
                await expect(buttonInteractionsPage.singleClickBtn).toHaveAttribute('data-testid', 'single-click-btn');
                await expect(buttonInteractionsPage.doubleClickBtn).toHaveAttribute('data-testid', 'double-click-btn');
                await expect(buttonInteractionsPage.rightClickBtn).toHaveAttribute('data-testid', 'right-click-btn');
                await expect(buttonInteractionsPage.disabledBtn).toHaveAttribute('data-testid', 'disabled-btn');
            });
        });
    });
});
