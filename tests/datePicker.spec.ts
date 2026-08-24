import { test, expect } from '../src/fixtures/baseTest';

test.describe('Section 28: Date Picker Test Suite', () => {

    test.beforeEach(async ({ datePickerPage }) => {
        await datePickerPage.navigate();
    });

    test.describe('Positive Scenarios', () => {

        test('TC-DP-POS-01: Select valid date and verify ISO format echo', async ({ datePickerPage }) => {
            const targetDate = '2026-10-15';

            await test.step(`Select date ${targetDate}`, async () => {
                await datePickerPage.setDate(targetDate);
            });

            await test.step('Verify date result reflects selected date', async () => {
                await expect(datePickerPage.dateResult).toHaveText(`Chosen date: ${targetDate}`);
            });
        });

        test('TC-DP-POS-02: Leap year date selection (2028-02-29)', async ({ datePickerPage }) => {
            const leapDate = '2028-02-29';

            await test.step(`Select leap year date ${leapDate}`, async () => {
                await datePickerPage.setDate(leapDate);
            });

            await test.step('Verify leap date is accepted', async () => {
                await expect(datePickerPage.dateResult).toHaveText(`Chosen date: ${leapDate}`);
            });
        });
    });

    test.describe('Negative & Edge Case Scenarios', () => {

        test('TC-DP-NEG-01: Verify default initial state before date selection', async ({ datePickerPage }) => {
            await test.step('Assert default chosen date is "none"', async () => {
                await expect(datePickerPage.dateResult).toHaveText('Chosen date: none');
                await expect(datePickerPage.dateInput).toHaveAttribute('type', 'date');
                await expect(datePickerPage.dateInput).toHaveAttribute('aria-label', 'Date picker');
            });
        });
    });
});
