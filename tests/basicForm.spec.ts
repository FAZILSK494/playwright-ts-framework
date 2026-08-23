import { test, expect } from '../src/fixtures/baseTest';
import { TestData } from '../src/utils/TestData';

test.describe('Section 1: Basic Form Elements Test Suite', () => {

    test.beforeEach(async ({ basicFormPage }) => {
        await basicFormPage.navigate();
    });

    // ==========================================
    // POSITIVE SCENARIOS
    // ==========================================
    test.describe('Positive Scenarios', () => {

        test('TC-BF-POS-01: Submit form with full valid inputs', async ({ basicFormPage }) => {
            const data = TestData.basicForm.validSubmission;

            await test.step('Fill all form inputs with valid data', async () => {
                await basicFormPage.fillForm(data);
                const values = await basicFormPage.getAllFieldValues();
                expect(values.name).toBe(data.name);
                expect(values.email).toBe(data.email);
                expect(values.phone).toBe(data.phone);
                expect(values.bio).toBe(data.bio);
            });

            await test.step('Submit the form', async () => {
                await basicFormPage.submit();
            });

            await test.step('Assert form result message updates with submitted confirmation', async () => {
                await expect(basicFormPage.resultText).not.toHaveText('Not submitted');
            });
        });

        test('TC-BF-POS-02: Verify Reset button clears all populated form fields', async ({ basicFormPage }) => {
            const data = TestData.basicForm.validSubmission;

            await test.step('Populate all form inputs', async () => {
                await basicFormPage.fillForm(data);
                await expect(basicFormPage.nameInput).toHaveValue(data.name);
                await expect(basicFormPage.emailInput).toHaveValue(data.email);
            });

            await test.step('Click Reset button', async () => {
                await basicFormPage.reset();
            });

            await test.step('Verify all input fields are reset to empty values', async () => {
                const values = await basicFormPage.getAllFieldValues();
                expect(values.name).toBe('');
                expect(values.password).toBe('');
                expect(values.email).toBe('');
                expect(values.phone).toBe('');
                expect(values.bio).toBe('');
            });
        });

        test('TC-BF-POS-03: Submit form with special characters and Unicode text', async ({ basicFormPage }) => {
            const data = TestData.basicForm.specialCharactersAndUnicode;

            await test.step('Fill form with special characters, symbols, and Unicode strings', async () => {
                await basicFormPage.fillForm(data);
            });

            await test.step('Submit the form', async () => {
                await basicFormPage.submit();
            });

            await test.step('Verify form fields retain entered values accurately', async () => {
                await expect(basicFormPage.nameInput).toHaveValue(data.name);
                await expect(basicFormPage.bioTextarea).toHaveValue(data.bio);
                await expect(basicFormPage.resultText).not.toHaveText('Not submitted');
            });
        });

        test('TC-BF-POS-04: Submit form with boundary length strings', async ({ basicFormPage }) => {
            const data = TestData.basicForm.boundaryLargeData;

            await test.step('Fill form with boundary large inputs', async () => {
                await basicFormPage.fillForm(data);
            });

            await test.step('Submit the form', async () => {
                await basicFormPage.submit();
            });

            await test.step('Assert inputs accept and retain boundary large values', async () => {
                const values = await basicFormPage.getAllFieldValues();
                expect(values.name.length).toBe(100);
                expect(values.password.length).toBe(128);
                await expect(basicFormPage.resultText).not.toHaveText('Not submitted');
            });
        });

        test('TC-BF-POS-05: Submit form using Keyboard Enter key', async ({ basicFormPage }) => {
            const data = TestData.basicForm.validSubmission;

            await test.step('Fill form inputs', async () => {
                await basicFormPage.fillForm(data);
            });

            await test.step('Press Enter on the phone input field', async () => {
                await basicFormPage.submitViaEnterKey(basicFormPage.phoneInput);
            });

            await test.step('Verify form submits successfully', async () => {
                await expect(basicFormPage.resultText).not.toHaveText('Not submitted');
            });
        });
    });

    // ==========================================
    // NEGATIVE & VALIDATION SCENARIOS
    // ==========================================
    test.describe('Negative & Edge Case Scenarios', () => {

        test('TC-BF-NEG-01: HTML5 validation flags invalid email format', async ({ basicFormPage }) => {
            const invalidEmail = TestData.basicForm.invalidEmailFormats[0];

            await test.step('Fill email with invalid format', async () => {
                await basicFormPage.fillInput(basicFormPage.nameInput, 'Tester');
                await basicFormPage.fillInput(basicFormPage.emailInput, invalidEmail);
            });

            await test.step('Verify HTML5 validity evaluates to false', async () => {
                const isEmailValid = await basicFormPage.isEmailValid();
                expect(isEmailValid).toBe(false);

                const validationMsg = await basicFormPage.getEmailValidationMessage();
                expect(validationMsg.length).toBeGreaterThan(0);
            });
        });

        test('TC-BF-NEG-02: Empty form submission boundary check', async ({ basicFormPage }) => {
            await test.step('Submit form without entering any data', async () => {
                await basicFormPage.submit();
            });

            await test.step('Verify all form fields remain empty and accessible', async () => {
                const values = await basicFormPage.getAllFieldValues();
                expect(values.name).toBe('');
                expect(values.email).toBe('');
            });
        });

        test('TC-BF-NEG-03: Form handling with whitespace only inputs', async ({ basicFormPage }) => {
            const whitespaceData = TestData.basicForm.whitespaceOnly;

            await test.step('Fill all fields with whitespace characters only', async () => {
                await basicFormPage.fillForm(whitespaceData);
            });

            await test.step('Submit the form', async () => {
                await basicFormPage.submit();
            });

            await test.step('Assert form submission finishes without UI crash', async () => {
                await expect(basicFormPage.form).toBeVisible();
            });
        });

        test('TC-BF-NEG-04: Security check - Verify password masking and input type', async ({ basicFormPage }) => {
            await test.step('Check that password field has type="password"', async () => {
                const isMasked = await basicFormPage.isPasswordMasked();
                expect(isMasked).toBe(true);
            });

            await test.step('Enter sensitive password and verify attribute is not exposed as plain text', async () => {
                await basicFormPage.fillInput(basicFormPage.passwordInput, 'MyTopSecret123!');
                const typeAttr = await basicFormPage.passwordInput.getAttribute('type');
                expect(typeAttr).toBe('password');
            });
        });

        test('TC-BF-NEG-05: Element structure, placeholders, and attribute integrity', async ({ basicFormPage }) => {
            await test.step('Assert placeholders on all input fields match design spec', async () => {
                await expect(basicFormPage.nameInput).toHaveAttribute('placeholder', 'Enter your name');
                await expect(basicFormPage.passwordInput).toHaveAttribute('placeholder', 'Enter password');
                await expect(basicFormPage.emailInput).toHaveAttribute('placeholder', 'Enter email');
                await expect(basicFormPage.phoneInput).toHaveAttribute('placeholder', 'Enter phone');
                await expect(basicFormPage.bioTextarea).toHaveAttribute('placeholder', 'Tell us about yourself');
            });

            await test.step('Assert input names and data-testid attributes', async () => {
                await expect(basicFormPage.nameInput).toHaveAttribute('name', 'username');
                await expect(basicFormPage.passwordInput).toHaveAttribute('name', 'password');
                await expect(basicFormPage.emailInput).toHaveAttribute('name', 'email');
                await expect(basicFormPage.phoneInput).toHaveAttribute('name', 'phone');
                await expect(basicFormPage.bioTextarea).toHaveAttribute('name', 'bio');
            });
        });
    });
});
