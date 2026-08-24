import { test, expect } from '../src/fixtures/baseTest';
import { TestData } from '../src/utils/TestData';

test.describe('Section 10: Modals Test Suite', () => {

    test.beforeEach(async ({ modalsPage }) => {
        await modalsPage.navigate();
    });

    // ==========================================
    // POSITIVE SCENARIOS
    // ==========================================
    test.describe('Positive Scenarios', () => {

        test('TC-MOD-POS-01: Verify opening modal dialog displays modal box, overlay, title, and content', async ({ modalsPage }) => {
            await test.step('Click Open Modal button', async () => {
                await modalsPage.openModal();
            });

            await test.step('Assert modal box and overlay are visible', async () => {
                await expect(modalsPage.modalOverlay).toBeVisible();
                await expect(modalsPage.modalBox).toBeVisible();
            });

            await test.step('Assert modal title and body text match specifications', async () => {
                await expect(modalsPage.modalTitle).toHaveText(TestData.modals.expectedTitle);
                await expect(modalsPage.modalText).toHaveText(TestData.modals.expectedDescription);
                await expect(modalsPage.modalCloseBtn).toBeVisible();
                await expect(modalsPage.modalXBtn).toBeVisible();
            });
        });

        test('TC-MOD-POS-02: Verify closing modal via bottom "Close" button', async ({ modalsPage }) => {
            await test.step('Open modal dialog', async () => {
                await modalsPage.openModal();
                await expect(modalsPage.modalBox).toBeVisible();
            });

            await test.step('Click Close button inside modal', async () => {
                await modalsPage.closeModalViaCloseBtn();
            });

            await test.step('Assert modal dialog and backdrop are completely dismissed', async () => {
                await expect(modalsPage.modalBox).toBeHidden();
                await expect(modalsPage.modalOverlay).toBeHidden();
            });
        });

        test('TC-MOD-POS-03: Verify closing modal via top-right "X" button', async ({ modalsPage }) => {
            await test.step('Open modal dialog', async () => {
                await modalsPage.openModal();
                await expect(modalsPage.modalBox).toBeVisible();
            });

            await test.step('Click X button in top right of modal box', async () => {
                await modalsPage.closeModalViaXBtn();
            });

            await test.step('Assert modal dialog and backdrop are dismissed', async () => {
                await expect(modalsPage.modalBox).toBeHidden();
                await expect(modalsPage.modalOverlay).toBeHidden();
            });
        });

        test('TC-MOD-POS-04: Verify closing modal by clicking outside on the background overlay', async ({ modalsPage }) => {
            await test.step('Open modal dialog', async () => {
                await modalsPage.openModal();
                await expect(modalsPage.modalBox).toBeVisible();
            });

            await test.step('Click on the backdrop overlay area outside the modal card', async () => {
                await modalsPage.closeModalViaOverlay();
            });

            await test.step('Assert modal dialog closes on backdrop click', async () => {
                await expect(modalsPage.modalBox).toBeHidden();
                await expect(modalsPage.modalOverlay).toBeHidden();
            });
        });

        test('TC-MOD-POS-05: Verify multi-cycle re-opening and closing modal across different dismissal methods', async ({ modalsPage }) => {
            await test.step('Cycle 1: Open and close via Close button', async () => {
                await modalsPage.openModal();
                await expect(modalsPage.modalBox).toBeVisible();
                await modalsPage.closeModalViaCloseBtn();
                await expect(modalsPage.modalBox).toBeHidden();
            });

            await test.step('Cycle 2: Open and close via X button', async () => {
                await modalsPage.openModal();
                await expect(modalsPage.modalBox).toBeVisible();
                await modalsPage.closeModalViaXBtn();
                await expect(modalsPage.modalBox).toBeHidden();
            });

            await test.step('Cycle 3: Open and close via Overlay backdrop', async () => {
                await modalsPage.openModal();
                await expect(modalsPage.modalBox).toBeVisible();
                await modalsPage.closeModalViaOverlay();
                await expect(modalsPage.modalBox).toBeHidden();
            });
        });

        test('TC-MOD-POS-06: Verify keyboard navigation to open modal and close via Space/Enter keys', async ({ modalsPage }) => {
            await test.step('Focus Open Modal button and press Space key', async () => {
                await modalsPage.openModalBtn.focus();
                await modalsPage.page.keyboard.press('Space');
            });

            await test.step('Assert modal opens via keyboard trigger', async () => {
                await expect(modalsPage.modalBox).toBeVisible();
            });

            await test.step('Focus Close button and press Enter key', async () => {
                await modalsPage.modalCloseBtn.focus();
                await modalsPage.page.keyboard.press('Enter');
            });

            await test.step('Assert modal closes via keyboard Enter key', async () => {
                await expect(modalsPage.modalBox).toBeHidden();
            });
        });
    });

    // ==========================================
    // NEGATIVE & EDGE CASE SCENARIOS
    // ==========================================
    test.describe('Negative & Edge Case Scenarios', () => {

        test('TC-MOD-NEG-01: Verify default initial hidden state of modal dialog on page load', async ({ modalsPage }) => {
            await test.step('Assert modal box and overlay are not visible on initial page load', async () => {
                await expect(modalsPage.modalBox).toBeHidden();
                await expect(modalsPage.modalOverlay).toBeHidden();
            });

            await test.step('Assert Open Modal trigger button is visible and enabled', async () => {
                await expect(modalsPage.openModalBtn).toBeVisible();
                await expect(modalsPage.openModalBtn).toBeEnabled();
            });
        });

        test('TC-MOD-NEG-02: Verify clicking inside modal content card does NOT close the modal', async ({ modalsPage }) => {
            await test.step('Open modal dialog', async () => {
                await modalsPage.openModal();
                await expect(modalsPage.modalBox).toBeVisible();
            });

            await test.step('Click inside modal body text and title', async () => {
                await modalsPage.modalTitle.click();
                await modalsPage.modalText.click();
            });

            await test.step('Assert modal remains visible and does not dismiss due to inner click bubbling', async () => {
                await expect(modalsPage.modalBox).toBeVisible();
                await expect(modalsPage.modalOverlay).toBeVisible();
            });
        });

        test('TC-MOD-NEG-03: Verify accessibility standards, ARIA attributes, and semantic roles', async ({ modalsPage }) => {
            await test.step('Assert Open Modal button accessibility attributes', async () => {
                await expect(modalsPage.openModalBtn).toHaveAttribute('aria-label', 'Open modal');
            });

            await test.step('Open modal and assert accessibility attributes on modal elements', async () => {
                await modalsPage.openModal();

                await expect(modalsPage.modalBox).toHaveAttribute('role', 'dialog');
                await expect(modalsPage.modalBox).toHaveAttribute('aria-label', 'Practice modal');
                await expect(modalsPage.modalOverlay).toHaveAttribute('aria-label', 'Modal overlay');
                await expect(modalsPage.modalXBtn).toHaveAttribute('aria-label', 'Close modal X');
                await expect(modalsPage.modalCloseBtn).toHaveAttribute('aria-label', 'Close modal');
            });
        });

        test('TC-MOD-NEG-04: Verify data-testid attributes for robust automation locators', async ({ modalsPage }) => {
            await test.step('Assert data-testid on Open Modal trigger button', async () => {
                await expect(modalsPage.openModalBtn).toHaveAttribute('data-testid', 'open-modal-btn');
            });

            await test.step('Open modal and assert data-testid on all modal components', async () => {
                await modalsPage.openModal();

                await expect(modalsPage.modalOverlay).toHaveAttribute('data-testid', 'modal-overlay');
                await expect(modalsPage.modalBox).toHaveAttribute('data-testid', 'modal-box');
                await expect(modalsPage.modalXBtn).toHaveAttribute('data-testid', 'modal-x');
                await expect(modalsPage.modalCloseBtn).toHaveAttribute('data-testid', 'modal-close-btn');
            });

            await test.step('Assert section container and heading visibility', async () => {
                await expect(modalsPage.heading).toHaveText('Section 10: Modals');
                await expect(modalsPage.description).toContainText('opening a modal');
            });
        });
    });
});
