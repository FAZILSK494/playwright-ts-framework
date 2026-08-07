import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test('Verify Playwright Search Functionality', async ({ page }) => {
    const homePage = new HomePage(page);

    // Step 1: Navigate to page
    await homePage.navigateTo('https://playwright.dev');

    // Step 2: Use the page object action
    await homePage.searchFor('Locators');

    // Step 3: Assert the URL updated correctly
    await expect(page).toHaveURL(/.*locators/);
});
