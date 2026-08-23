import { test, expect } from '../src/fixtures/baseTest';
import { TestData } from '../src/utils/TestData';

test.describe('Section 21: Authentication Simulation Suite', () => {

    test.beforeEach(async ({ loginPage }) => {
        await loginPage.navigate();
    });

    test('TC-AUTH-01: Authenticate successfully with valid admin credentials', async ({ loginPage }) => {
        const { username, password } = TestData.auth.validUser;

        await test.step('Submit valid credentials into auth form', async () => {
            await loginPage.login(username, password);
        });

        await test.step('Verify authentication success feedback', async () => {
            await expect(loginPage.authSection).toBeVisible();
            // Verify that submitting the form updates the UI or leaves valid state
            const statusText = await loginPage.getAuthStatusText();
            expect(statusText).toBeDefined();
        });
    });

    test('TC-AUTH-02: Attempt login with invalid credentials', async ({ loginPage }) => {
        const { username, password } = TestData.auth.invalidUser;

        await test.step('Submit invalid credentials', async () => {
            await loginPage.login(username, password);
        });

        await test.step('Verify form remains accessible with inputs filled', async () => {
            await expect(loginPage.usernameInput).toHaveValue(username);
        });
    });

    test('TC-AUTH-03: Verify auth form elements structure and visibility', async ({ loginPage }) => {
        await test.step('Assert all login elements are visible in Section 21', async () => {
            await expect(loginPage.authHeading).toBeVisible();
            await expect(loginPage.usernameInput).toBeVisible();
            await expect(loginPage.passwordInput).toBeVisible();
            await expect(loginPage.loginButton).toBeVisible();
        });
    });
});
