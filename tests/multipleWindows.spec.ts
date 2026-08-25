import { test, expect } from '../src/fixtures/baseTest';
import { Page } from '@playwright/test';

test.describe('Section 20: Multiple Windows Test Suite', () => {

    test.beforeEach(async ({ multipleWindowsPage }) => {
        await multipleWindowsPage.navigate();
    });

    test.describe('Positive Scenarios', () => {

        test('TC-WIN-POS-01: Open new tab window and verify context switching', async ({ multipleWindowsPage }) => {
            let newPageInstance: Page;

            await test.step('Click Open New Tab and capture new page event', async () => {
                newPageInstance = await multipleWindowsPage.openNewWindow();
            });

            await test.step('Verify main page result text updates', async () => {
                await expect(multipleWindowsPage.windowResult).toHaveText('New window/tab opened');
            });

            await test.step('Close new tab and return to main context', async () => {
                await newPageInstance.close();
                await expect(multipleWindowsPage.openWindowBtn).toBeVisible();
            });
        });
    });

    test.describe('Negative & Edge Case Scenarios', () => {

        test('TC-WIN-NEG-01: Default status is "No window opened"', async ({ multipleWindowsPage }) => {
            await test.step('Assert default status', async () => {
                await expect(multipleWindowsPage.windowResult).toHaveText('No window opened');
                await expect(multipleWindowsPage.openWindowBtn).toHaveAttribute('aria-label', 'Open new window');
            });
        });
    });
});
