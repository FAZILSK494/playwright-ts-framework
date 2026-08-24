import { test, expect } from '../src/fixtures/baseTest';

test.describe('Section 24: Network Delay Simulation Test Suite', () => {

    test.beforeEach(async ({ networkDelayPage }) => {
        await networkDelayPage.navigate();
    });

    test.describe('Positive Scenarios', () => {

        test('TC-NET-POS-01: Trigger delayed network call and wait for data resolution', async ({ networkDelayPage }) => {
            await test.step('Click Fetch with Delay button', async () => {
                await networkDelayPage.networkBtn.click();
            });

            await test.step('Assert network result updates from Idle', async () => {
                await expect(networkDelayPage.networkResult).not.toHaveText('Idle', { timeout: 10000 });
            });
        });
    });

    test.describe('Negative & Edge Case Scenarios', () => {

        test('TC-NET-NEG-01: Default status is Idle before triggering request', async ({ networkDelayPage }) => {
            await test.step('Assert default text', async () => {
                await expect(networkDelayPage.networkResult).toHaveText('Idle');
                await expect(networkDelayPage.networkBtn).toHaveAttribute('aria-label', 'Trigger network call');
            });
        });
    });
});
