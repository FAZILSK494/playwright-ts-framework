import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage'; // Import it here

// Update your custom fixture types mapping
type MyFixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage; // Add layout property mapping
};

export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  dashboardPage: async ({ page }, use) => {
    // Registers the Dashboard mapping framework-wide
    await use(new DashboardPage(page));
  },
});

export { expect } from '@playwright/test';
