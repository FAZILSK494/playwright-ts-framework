import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { TestData } from '../src/utils/TestData';

export class LoginPage extends BasePage {
    // 1. Locators for Section 21: Authentication Simulation
    readonly authSection: Locator;
    readonly authHeading: Locator;
    readonly authForm: Locator;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly logoutButton: Locator;
    readonly authResult: Locator;

    constructor(page: Page) {
        super(page);

        this.authSection = page.locator('#section-21');
        this.authHeading = page.locator('#section-21 h2');
        this.authForm = page.locator('#auth-form, [data-testid="auth-form"]');
        this.usernameInput = page.locator('#auth-username, [data-testid="auth-username"]');
        this.passwordInput = page.locator('#auth-password, [data-testid="auth-password"]');
        this.loginButton = page.locator('#auth-login-btn, [data-testid="auth-login-btn"]');
        this.logoutButton = page.locator('#auth-logout-btn, [data-testid="auth-logout-btn"], #section-21 button:has-text("Logout"), #section-21 button:has-text("Log out")');
        this.authResult = page.locator('#auth-result, [data-testid="auth-result"], #section-21 p.text-accent, #section-21 p:has-text("Logged in"), #section-21 p:has-text("Invalid")');
    }

    /**
     * Navigates to the practice hub and scrolls to Section 21
     */
    async navigate(): Promise<void> {
        await this.goto('/practice');
        await this.scrollIntoView(this.authSection);
    }

    /**
     * Executes the login form submission
     * @param username Account username
     * @param password Account password
     */
    async login(username: string, password: string): Promise<void> {
        await this.scrollIntoView(this.authSection);
        await this.fillInput(this.usernameInput, username);
        await this.fillInput(this.passwordInput, password);
        await this.clickElement(this.loginButton);
    }

    /**
     * Performs login using pre-configured default admin credentials
     */
    async loginWithDefaultAdmin(): Promise<void> {
        const { username, password } = TestData.auth.validUser;
        await this.login(username, password);
    }

    /**
     * Clicks the logout button if present after successful login
     */
    async logout(): Promise<void> {
        if (await this.isElementVisible(this.logoutButton, 2000)) {
            await this.clickElement(this.logoutButton);
        }
    }

    /**
     * Retrieves the authentication result / status feedback
     */
    async getAuthStatusText(): Promise<string> {
        if (await this.isElementVisible(this.authResult, 3000)) {
            return await this.getElementText(this.authResult);
        }
        return '';
    }
}
