import { test, expect } from '../../src/fixtures/baseTest';
import { DatabaseUtil } from '../../src/utils/DatabaseUtil';

test('Should display an error with invalid credentials', async ({ loginPage }) => {
    await loginPage.navigateToApp();
    await loginPage.login('wrong_user', 'BadPassword');

    const errorText = await loginPage.getErrorMessageText();
    expect(errorText).toContain('Invalid username or password');
});

test.describe('Database Conditioned Authentication', () => {

    test('Authenticate using active user fetched dynamically from DB', async ({ loginPage, page }) => {
        // 1. Database Query: Safely retrieve an active user for the environment
        const query = 'SELECT username FROM users WHERE status = $1 LIMIT 1;';
        const dbUsers = await DatabaseUtil.executeQuery(query, ['ACTIVE']);

        // Ensure the database returned valid data before proceeding
        expect(dbUsers.length).toBeGreaterThan(0);
        const dynamicUsername = dbUsers[0].username;

        // 2. UI Execution: Log in with the dynamically fetched user
        await loginPage.navigateToApp();
        await loginPage.login(dynamicUsername, 'SecurePassword123');

        // 3. Assertion
        await expect(page).toHaveURL(`${process.env.BASE_URL}/dashboard`);
    });