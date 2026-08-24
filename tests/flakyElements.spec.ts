import { test, expect } from '../src/fixtures/baseTest';

test.describe('Section 25: Flaky Elements Test Suite', () => {

    test.beforeEach(async ({ flakyElementsPage }) => {
        await flakyElementsPage.navigate();
    });

    test.describe('Positive Scenarios', () => {

        test('TC-FLK-POS-01: Trigger flaky action and handle non-deterministic result gracefully', async ({ flakyElementsPage }) => {
            await test.step('Click flaky action button', async () => {
                await flakyElementsPage.flakyBtn.click();
            });

            await test.step('Assert result text updates from "Not run yet"', async () => {
                await expect(flakyElementsPage.flakyResult).not.toHaveText('Not run yet');
            });
        });
    });

    test.describe('Negative & Edge Case Scenarios', () => {

        test('TC-FLK-NEG-01: Default status is "Not run yet" before clicking', async ({ flakyElementsPage }) => {
            await test.step('Assert initial status', async () => {
                await expect(flakyElementsPage.flakyResult).toHaveText('Not run yet');
                await expect(flakyElementsPage.flakyBtn).toHaveAttribute('aria-label', 'Flaky button');
            });
        });
    });
});
