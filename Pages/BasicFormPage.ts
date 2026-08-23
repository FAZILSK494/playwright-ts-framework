import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { UserFormData } from '../src/utils/TestData';

export class BasicFormPage extends BasePage {
    // Locators for Section 1: Basic Form Elements
    readonly sectionContainer: Locator;
    readonly heading: Locator;
    readonly description: Locator;
    readonly form: Locator;
    readonly nameInput: Locator;
    readonly passwordInput: Locator;
    readonly emailInput: Locator;
    readonly phoneInput: Locator;
    readonly bioTextarea: Locator;
    readonly submitButton: Locator;
    readonly resetButton: Locator;
    readonly resultText: Locator;

    constructor(page: Page) {
        super(page);

        this.sectionContainer = page.locator('#section-1');
        this.heading = page.locator('#section-1 h2');
        this.description = page.locator('#section-1 p.text-muted');
        this.form = page.locator('#basic-form, [data-testid="basic-form"]');
        this.nameInput = page.locator('#text-input, [data-testid="text-input"]');
        this.passwordInput = page.locator('#password-input, [data-testid="password-input"]');
        this.emailInput = page.locator('#email-input, [data-testid="email-input"]');
        this.phoneInput = page.locator('#phone-input, [data-testid="phone-input"]');
        this.bioTextarea = page.locator('#textarea-input, [data-testid="textarea-input"]');
        this.submitButton = page.locator('#form-submit, [data-testid="form-submit"]');
        this.resetButton = page.locator('#form-reset, [data-testid="form-reset"]');
        this.resultText = page.locator('[data-testid="form-result"]');
    }

    /**
     * Navigates to practice page and scrolls directly to Section 1
     */
    async navigate(): Promise<void> {
        await this.goto('/practice');
        await this.scrollIntoView(this.sectionContainer);
    }

    /**
     * Fills out the form fields with provided partial or full dataset
     */
    async fillForm(data: Partial<UserFormData>): Promise<void> {
        await this.scrollIntoView(this.sectionContainer);
        if (data.name !== undefined) await this.fillInput(this.nameInput, data.name);
        if (data.password !== undefined) await this.fillInput(this.passwordInput, data.password);
        if (data.email !== undefined) await this.fillInput(this.emailInput, data.email);
        if (data.phone !== undefined) await this.fillInput(this.phoneInput, data.phone);
        if (data.bio !== undefined) await this.fillInput(this.bioTextarea, data.bio);
    }

    /**
     * Fills out the entire form and clicks Submit
     */
    async fillAndSubmit(data: UserFormData): Promise<void> {
        await this.fillForm(data);
        await this.submit();
    }

    /**
     * Clicks the Submit button
     */
    async submit(): Promise<void> {
        await this.clickElement(this.submitButton);
    }

    /**
     * Clicks the Reset button
     */
    async reset(): Promise<void> {
        await this.clickElement(this.resetButton);
    }

    /**
     * Submits the form by pressing 'Enter' key inside an input field
     */
    async submitViaEnterKey(targetLocator: Locator = this.nameInput): Promise<void> {
        await targetLocator.press('Enter');
    }

    /**
     * Reads all current field values
     */
    async getAllFieldValues(): Promise<UserFormData> {
        return {
            name: await this.nameInput.inputValue(),
            password: await this.passwordInput.inputValue(),
            email: await this.emailInput.inputValue(),
            phone: await this.phoneInput.inputValue(),
            bio: await this.bioTextarea.inputValue(),
        };
    }

    /**
     * Retrieves the submission result text
     */
    async getResultText(): Promise<string> {
        return await this.getElementText(this.resultText);
    }

    /**
     * Evaluates whether the email field passes HTML5 validation
     */
    async isEmailValid(): Promise<boolean> {
        return await this.emailInput.evaluate((el: HTMLInputElement) => el.checkValidity());
    }

    /**
     * Retrieves native HTML5 browser validation message from email input
     */
    async getEmailValidationMessage(): Promise<string> {
        return await this.emailInput.evaluate((el: HTMLInputElement) => el.validationMessage);
    }

    /**
     * Verifies if the password input is masked with type="password"
     */
    async isPasswordMasked(): Promise<boolean> {
        const type = await this.passwordInput.getAttribute('type');
        return type === 'password';
    }
}
