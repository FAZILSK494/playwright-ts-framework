import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

// Define the types of your pages
type MyFixtures = {
  loginPage: LoginPage;
};

// Extend the core test runner to include your page objects
export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    // This runs automatically before every test that calls 'loginPage'
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
});

export { expect } from '@playwright/test';
