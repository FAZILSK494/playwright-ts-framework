import { test, expect } from '../../src/fixtures/baseTest';

test('Verify Authenticated User Workspace Experience', async ({ loginPage, dashboardPage, page }) => {
    // 1. Arrange & Login
    await loginPage.navigateToApp();
    await loginPage.login('prod_analytics_manager', 'SecurePassword123');

    // 2. Act - Wait for core framework components to populate UI canvas
    await dashboardPage.waitForDashboardToLoad();

    // 3. Assert - Check elements match the specifications
    const mainTitle = await dashboardPage.welcomeHeader.innerText();
    expect(mainTitle).toContain('Welcome Back');

    // Fetch and check that analytics values are rendering calculations
    const metricValues = await dashboardPage.getGridMetricsValues();
    expect(metricValues.length).toBeGreaterThan(0);

    // 4. Teardown - Log out clean
    await dashboardPage.logout();
    await expect(page).toHaveURL(/.*login/);
});
