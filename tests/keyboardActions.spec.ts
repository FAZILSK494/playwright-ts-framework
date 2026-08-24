import { test, expect } from '../src/fixtures/baseTest';

test.describe('Section 26: Keyboard Actions Test Suite', () => {

    test.beforeEach(async ({ keyboardActionsPage }) => {
        await keyboardActionsPage.navigate();
    });

    test.describe('Positive Scenarios', () => {

        test('TC-KB-POS-01: Verify typed character is echoed in last key display', async ({ keyboardActionsPage }) => {
            await test.step('Type letter "A"', async () => {
                await keyboardActionsPage.typeKey('A');
            });

            await test.step('Verify last key updates', async () => {
                await expect(keyboardActionsPage.keyboardResult).toHaveText('Last key: A');
            });
        });

        test('TC-KB-POS-02: Verify ArrowUp increments counter', async ({ keyboardActionsPage }) => {
            await test.step('Press ArrowUp twice', async () => {
                await keyboardActionsPage.typeKey('ArrowUp');
                await keyboardActionsPage.typeKey('ArrowUp');
            });

            await test.step('Verify arrow counter displays 2', async () => {
                await expect(keyboardActionsPage.arrowCounter).toHaveText('Arrow counter: 2');
            });
        });

        test('TC-KB-POS-03: Verify ArrowDown decrements counter', async ({ keyboardActionsPage }) => {
            await test.step('Press ArrowDown', async () => {
                await keyboardActionsPage.typeKey('ArrowDown');
            });

            await test.step('Verify arrow counter displays -1', async () => {
                await expect(keyboardActionsPage.arrowCounter).toHaveText('Arrow counter: -1');
            });
        });
    });

    test.describe('Negative & Edge Case Scenarios', () => {

        test('TC-KB-NEG-01: Default initial state before keyboard input', async ({ keyboardActionsPage }) => {
            await test.step('Verify initial text', async () => {
                await expect(keyboardActionsPage.keyboardResult).toHaveText('Last key: None');
                await expect(keyboardActionsPage.arrowCounter).toHaveText('Arrow counter: 0');
            });
        });

        test('TC-KB-NEG-02: Accessibility and attributes integrity', async ({ keyboardActionsPage }) => {
            await test.step('Verify placeholder and aria-label', async () => {
                await expect(keyboardActionsPage.keyboardInput).toHaveAttribute('placeholder', 'Press any key');
                await expect(keyboardActionsPage.keyboardInput).toHaveAttribute('aria-label', 'Keyboard input');
            });
        });
    });
});
