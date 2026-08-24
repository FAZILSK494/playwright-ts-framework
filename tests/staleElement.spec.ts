import { test, expect } from '../src/fixtures/baseTest';

test.describe('Section 22: Stale Element Simulation Test Suite', () => {

    test.beforeEach(async ({ staleElementPage }) => {
        await staleElementPage.navigate();
    });

    test.describe('Positive Scenarios', () => {

        test('TC-STL-POS-01: Replace element dynamically and verify updated node instance', async ({ staleElementPage }) => {
            await test.step('Verify initial instance #0', async () => {
                await expect(staleElementPage.staleTarget).toContainText('Stale target instance #0');
            });

            await test.step('Click Replace Element button', async () => {
                await staleElementPage.staleRefreshBtn.click();
            });

            await test.step('Verify new instance is attached and counter incremented', async () => {
                await expect(staleElementPage.staleTarget).toContainText('Stale target instance #1');
            });
        });
    });

    test.describe('Negative & Edge Case Scenarios', () => {

        test('TC-STL-NEG-01: Accessibility and button attributes', async ({ staleElementPage }) => {
            await test.step('Assert aria-label and testids', async () => {
                await expect(staleElementPage.staleRefreshBtn).toHaveAttribute('aria-label', 'Refresh stale element');
                await expect(staleElementPage.staleTarget).toHaveAttribute('data-testid', 'stale-target');
            });
        });
    });
});
