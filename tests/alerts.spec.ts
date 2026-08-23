import { test, expect } from '../src/fixtures/baseTest';
import { TestData } from '../src/utils/TestData';

test.describe('Section 9: Alerts Test Suite', () => {

    test.beforeEach(async ({ alertsPage }) => {
        await alertsPage.navigate();
    });

    // ==========================================
    // POSITIVE SCENARIOS
    // ==========================================
    test.describe('Positive Scenarios', () => {

        test('TC-ALT-POS-01: Verify Alert dialog display, message validation, and dismissal', async ({ alertsPage }) => {
            let capturedType = '';
            let capturedMessage = '';

            await test.step('Click Show Alert button and capture dialog details', async () => {
                await alertsPage.handleDialog(
                    async () => {
                        await alertsPage.alertBtn.click();
                    },
                    async (dialog) => {
                        capturedType = dialog.type();
                        capturedMessage = dialog.message();
                        await dialog.accept();
                    }
                );
            });

            await test.step('Assert dialog properties and result status update', async () => {
                expect(capturedType).toBe('alert');
                expect(capturedMessage).toBe(TestData.alerts.alertExpectedMessage);
                await expect(alertsPage.alertResult).toHaveText(TestData.alerts.alertResultText);
            });
        });

        test('TC-ALT-POS-02: Verify Confirm dialog acceptance (OK button)', async ({ alertsPage }) => {
            let capturedType = '';
            let capturedMessage = '';

            await test.step('Click Show Confirm button and accept dialog (OK)', async () => {
                await alertsPage.handleDialog(
                    async () => {
                        await alertsPage.confirmBtn.click();
                    },
                    async (dialog) => {
                        capturedType = dialog.type();
                        capturedMessage = dialog.message();
                        await dialog.accept();
                    }
                );
            });

            await test.step('Assert dialog properties and result reflects "Confirm result: OK"', async () => {
                expect(capturedType).toBe('confirm');
                expect(capturedMessage).toBe(TestData.alerts.confirmExpectedMessage);
                await expect(alertsPage.alertResult).toHaveText(TestData.alerts.confirmAcceptedResultText);
            });
        });

        test('TC-ALT-POS-03: Verify Confirm dialog dismissal (Cancel button)', async ({ alertsPage }) => {
            let capturedType = '';

            await test.step('Click Show Confirm button and dismiss dialog (Cancel)', async () => {
                await alertsPage.handleDialog(
                    async () => {
                        await alertsPage.confirmBtn.click();
                    },
                    async (dialog) => {
                        capturedType = dialog.type();
                        await dialog.dismiss();
                    }
                );
            });

            await test.step('Assert result reflects "Confirm result: Cancel"', async () => {
                expect(capturedType).toBe('confirm');
                await expect(alertsPage.alertResult).toHaveText(TestData.alerts.confirmDismissedResultText);
            });
        });

        test('TC-ALT-POS-04: Verify Prompt dialog input submission and result display', async ({ alertsPage }) => {
            const promptInput = TestData.alerts.promptValidInput;
            let capturedType = '';
            let capturedMessage = '';

            await test.step('Click Show Prompt button, enter valid text, and accept', async () => {
                await alertsPage.handleDialog(
                    async () => {
                        await alertsPage.promptBtn.click();
                    },
                    async (dialog) => {
                        capturedType = dialog.type();
                        capturedMessage = dialog.message();
                        await dialog.accept(promptInput);
                    }
                );
            });

            await test.step('Assert dialog properties and prompt result reflects entered value', async () => {
                expect(capturedType).toBe('prompt');
                expect(capturedMessage).toBe(TestData.alerts.promptExpectedMessage);
                await expect(alertsPage.alertResult).toHaveText(`Prompt value: ${promptInput}`);
            });
        });

        test('TC-ALT-POS-05: Verify Prompt dialog with special characters, symbols, and emojis', async ({ alertsPage }) => {
            const specialText = TestData.alerts.promptSpecialInput;

            await test.step('Click Show Prompt button, enter special characters, and accept', async () => {
                await alertsPage.handleDialog(
                    async () => {
                        await alertsPage.promptBtn.click();
                    },
                    async (dialog) => {
                        await dialog.accept(specialText);
                    }
                );
            });

            await test.step('Assert prompt result accurately retains special characters and emojis', async () => {
                await expect(alertsPage.alertResult).toHaveText(`Prompt value: ${specialText}`);
            });
        });

        test('TC-ALT-POS-06: Verify sequential dialog transitions in a single continuous session', async ({ alertsPage }) => {
            await test.step('Step 1: Trigger Alert and accept', async () => {
                await alertsPage.triggerAlertAndAccept();
                await expect(alertsPage.alertResult).toHaveText(TestData.alerts.alertResultText);
            });

            await test.step('Step 2: Trigger Confirm and accept (OK)', async () => {
                await alertsPage.triggerConfirmAndAccept();
                await expect(alertsPage.alertResult).toHaveText(TestData.alerts.confirmAcceptedResultText);
            });

            await test.step('Step 3: Trigger Confirm and dismiss (Cancel)', async () => {
                await alertsPage.triggerConfirmAndDismiss();
                await expect(alertsPage.alertResult).toHaveText(TestData.alerts.confirmDismissedResultText);
            });

            await test.step('Step 4: Trigger Prompt, submit value, and verify final status', async () => {
                await alertsPage.triggerPromptAndAccept('Sequential Flow Step Complete');
                await expect(alertsPage.alertResult).toHaveText('Prompt value: Sequential Flow Step Complete');
            });
        });

        test('TC-ALT-POS-07: Verify keyboard accessibility to trigger dialogs using Space and Enter keys', async ({ alertsPage }) => {
            await test.step('Focus on Alert button and press Space key', async () => {
                await alertsPage.handleDialog(
                    async () => {
                        await alertsPage.alertBtn.focus();
                        await alertsPage.page.keyboard.press('Space');
                    },
                    async (dialog) => {
                        await dialog.accept();
                    }
                );
            });

            await test.step('Assert Alert was triggered and handled via keyboard Space key', async () => {
                await expect(alertsPage.alertResult).toHaveText(TestData.alerts.alertResultText);
            });

            await test.step('Focus on Confirm button and press Enter key', async () => {
                await alertsPage.handleDialog(
                    async () => {
                        await alertsPage.confirmBtn.focus();
                        await alertsPage.page.keyboard.press('Enter');
                    },
                    async (dialog) => {
                        await dialog.accept();
                    }
                );
            });

            await test.step('Assert Confirm was triggered and handled via keyboard Enter key', async () => {
                await expect(alertsPage.alertResult).toHaveText(TestData.alerts.confirmAcceptedResultText);
            });
        });
    });

    // ==========================================
    // NEGATIVE & EDGE CASE SCENARIOS
    // ==========================================
    test.describe('Negative & Edge Case Scenarios', () => {

        test('TC-ALT-NEG-01: Verify default initial un-interacted state on page load', async ({ alertsPage }) => {
            await test.step('Assert result text displays default "No interaction yet"', async () => {
                await expect(alertsPage.alertResult).toBeVisible();
                await expect(alertsPage.alertResult).toHaveText(TestData.alerts.initialResult);
            });

            await test.step('Assert all dialog action buttons are visible and enabled', async () => {
                await expect(alertsPage.alertBtn).toBeVisible();
                await expect(alertsPage.alertBtn).toBeEnabled();
                await expect(alertsPage.confirmBtn).toBeVisible();
                await expect(alertsPage.confirmBtn).toBeEnabled();
                await expect(alertsPage.promptBtn).toBeVisible();
                await expect(alertsPage.promptBtn).toBeEnabled();
            });
        });

        test('TC-ALT-NEG-02: Verify Prompt dialog cancellation (Dismiss / Cancel button)', async ({ alertsPage }) => {
            await test.step('Click Show Prompt and dismiss without entering text', async () => {
                await alertsPage.triggerPromptAndDismiss();
            });

            await test.step('Assert result message shows "Prompt value: (cancelled)"', async () => {
                await expect(alertsPage.alertResult).toHaveText(TestData.alerts.promptCancelledResultText);
            });
        });

        test('TC-ALT-NEG-03: Verify Prompt dialog submission with empty string input', async ({ alertsPage }) => {
            await test.step('Click Show Prompt, pass empty string, and accept', async () => {
                await alertsPage.triggerPromptAndAccept('');
            });

            await test.step('Assert result message displays "Prompt value: " gracefully without crash', async () => {
                await expect(alertsPage.alertResult).toHaveText('Prompt value: ');
            });
        });

        test('TC-ALT-NEG-04: Verify Prompt dialog submission with whitespace-only input', async ({ alertsPage }) => {
            const whitespaceInput = '     ';

            await test.step('Click Show Prompt, pass whitespace characters, and accept', async () => {
                await alertsPage.triggerPromptAndAccept(whitespaceInput);
            });

            await test.step('Assert result message retains whitespace input string', async () => {
                await expect(alertsPage.alertResult).toHaveText(`Prompt value: ${whitespaceInput}`);
            });
        });

        test('TC-ALT-NEG-05: Verify button attributes, accessibility ARIA labels, and test IDs', async ({ alertsPage }) => {
            await test.step('Assert aria-label accessibility attributes on all dialog buttons', async () => {
                await expect(alertsPage.alertBtn).toHaveAttribute('aria-label', 'Show alert');
                await expect(alertsPage.confirmBtn).toHaveAttribute('aria-label', 'Show confirm');
                await expect(alertsPage.promptBtn).toHaveAttribute('aria-label', 'Show prompt');
            });

            await test.step('Assert data-testid attributes for stable test automation', async () => {
                await expect(alertsPage.alertBtn).toHaveAttribute('data-testid', 'alert-btn');
                await expect(alertsPage.confirmBtn).toHaveAttribute('data-testid', 'confirm-btn');
                await expect(alertsPage.promptBtn).toHaveAttribute('data-testid', 'prompt-btn');
                await expect(alertsPage.alertResult).toHaveAttribute('data-testid', 'alert-result');
            });

            await test.step('Assert section container and heading visibility', async () => {
                await expect(alertsPage.heading).toHaveText('Section 9: Alerts');
                await expect(alertsPage.description).toContainText('native JS dialogs');
            });
        });
    });
});
