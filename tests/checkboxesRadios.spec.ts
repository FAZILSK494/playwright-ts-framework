import { test, expect } from '../src/fixtures/baseTest';
import { TestData } from '../src/utils/TestData';

test.describe('Section 3: Checkboxes & Radio Buttons Test Suite', () => {

    test.beforeEach(async ({ checkboxesRadiosPage }) => {
        await checkboxesRadiosPage.navigate();
    });

    // ==========================================
    // POSITIVE SCENARIOS
    // ==========================================
    test.describe('Positive Scenarios', () => {

        test('TC-CR-POS-01: Verify individual checkboxes can be checked and unchecked independently', async ({ checkboxesRadiosPage }) => {
            await test.step('Check Option A and verify only Option A is checked', async () => {
                await checkboxesRadiosPage.toggleCheckbox(checkboxesRadiosPage.checkboxA, true);
                await expect(checkboxesRadiosPage.checkboxA).toBeChecked();
                await expect(checkboxesRadiosPage.checkboxB).not.toBeChecked();
                await expect(checkboxesRadiosPage.checkboxC).not.toBeChecked();
            });

            await test.step('Check Option B and Option C', async () => {
                await checkboxesRadiosPage.toggleCheckbox(checkboxesRadiosPage.checkboxB, true);
                await checkboxesRadiosPage.toggleCheckbox(checkboxesRadiosPage.checkboxC, true);
                await expect(checkboxesRadiosPage.checkboxB).toBeChecked();
                await expect(checkboxesRadiosPage.checkboxC).toBeChecked();
            });

            await test.step('Uncheck Option B and verify Option A and Option C remain checked', async () => {
                await checkboxesRadiosPage.toggleCheckbox(checkboxesRadiosPage.checkboxB, false);
                await expect(checkboxesRadiosPage.checkboxA).toBeChecked();
                await expect(checkboxesRadiosPage.checkboxB).not.toBeChecked();
                await expect(checkboxesRadiosPage.checkboxC).toBeChecked();
            });
        });

        test('TC-CR-POS-02: Verify "Select All" master checkbox checks all option checkboxes (A, B, C)', async ({ checkboxesRadiosPage }) => {
            await test.step('Click Select All checkbox to check all options', async () => {
                await checkboxesRadiosPage.toggleSelectAll(true);
            });

            await test.step('Assert Select All and all child checkboxes (A, B, C) are checked', async () => {
                await expect(checkboxesRadiosPage.selectAllCheckbox).toBeChecked();
                await expect(checkboxesRadiosPage.checkboxA).toBeChecked();
                await expect(checkboxesRadiosPage.checkboxB).toBeChecked();
                await expect(checkboxesRadiosPage.checkboxC).toBeChecked();
            });
        });

        test('TC-CR-POS-03: Verify "Select All" master checkbox unchecks all option checkboxes (A, B, C)', async ({ checkboxesRadiosPage }) => {
            await test.step('Check Select All first to ensure all options are active', async () => {
                await checkboxesRadiosPage.toggleSelectAll(true);
                await expect(checkboxesRadiosPage.checkboxA).toBeChecked();
                await expect(checkboxesRadiosPage.checkboxB).toBeChecked();
                await expect(checkboxesRadiosPage.checkboxC).toBeChecked();
            });

            await test.step('Uncheck Select All checkbox', async () => {
                await checkboxesRadiosPage.toggleSelectAll(false);
            });

            await test.step('Assert Select All and all child checkboxes (A, B, C) are unchecked', async () => {
                await expect(checkboxesRadiosPage.selectAllCheckbox).not.toBeChecked();
                await expect(checkboxesRadiosPage.checkboxA).not.toBeChecked();
                await expect(checkboxesRadiosPage.checkboxB).not.toBeChecked();
                await expect(checkboxesRadiosPage.checkboxC).not.toBeChecked();
            });
        });

        test('TC-CR-POS-04: Verify selecting Radio Choice One updates the result display text', async ({ checkboxesRadiosPage }) => {
            await test.step('Select Choice One radio button', async () => {
                await checkboxesRadiosPage.selectRadioChoice('one');
            });

            await test.step('Assert Choice One radio is checked and result reflects "Selected: one"', async () => {
                await expect(checkboxesRadiosPage.radio1).toBeChecked();
                await expect(checkboxesRadiosPage.radioResult).toHaveText(TestData.checkboxesRadios.radioChoiceOneResult);
            });
        });

        test('TC-CR-POS-05: Verify selecting Radio Choice Two updates the result display text and switches selection', async ({ checkboxesRadiosPage }) => {
            await test.step('Select Choice One first', async () => {
                await checkboxesRadiosPage.selectRadioChoice('one');
                await expect(checkboxesRadiosPage.radio1).toBeChecked();
            });

            await test.step('Switch selection to Choice Two', async () => {
                await checkboxesRadiosPage.selectRadioChoice('two');
            });

            await test.step('Assert Choice Two is checked, Choice One is unchecked, and result updates to "Selected: two"', async () => {
                await expect(checkboxesRadiosPage.radio2).toBeChecked();
                await expect(checkboxesRadiosPage.radio1).not.toBeChecked();
                await expect(checkboxesRadiosPage.radioResult).toHaveText(TestData.checkboxesRadios.radioChoiceTwoResult);
            });
        });

        test('TC-CR-POS-06: Verify reveal checkbox dynamically displays hidden text when checked', async ({ checkboxesRadiosPage }) => {
            await test.step('Verify revealed text is not visible initially', async () => {
                await expect(checkboxesRadiosPage.revealedText).toBeHidden();
            });

            await test.step('Check reveal checkbox to trigger dynamic content', async () => {
                await checkboxesRadiosPage.toggleRevealHiddenText(true);
            });

            await test.step('Assert revealed text becomes visible with expected content', async () => {
                await expect(checkboxesRadiosPage.revealedText).toBeVisible();
                await expect(checkboxesRadiosPage.revealedText).toHaveText(TestData.checkboxesRadios.revealedHiddenMessage);
            });
        });

        test('TC-CR-POS-07: Verify reveal checkbox hides dynamic text when unchecked', async ({ checkboxesRadiosPage }) => {
            await test.step('Check reveal checkbox to show text', async () => {
                await checkboxesRadiosPage.toggleRevealHiddenText(true);
                await expect(checkboxesRadiosPage.revealedText).toBeVisible();
            });

            await test.step('Uncheck reveal checkbox', async () => {
                await checkboxesRadiosPage.toggleRevealHiddenText(false);
            });

            await test.step('Assert revealed text is hidden again', async () => {
                await expect(checkboxesRadiosPage.revealedText).toBeHidden();
            });
        });

        test('TC-CR-POS-08: Verify keyboard accessibility to toggle checkbox and select radio button using Space key', async ({ checkboxesRadiosPage }) => {
            await test.step('Focus on Option A checkbox and press Space key', async () => {
                await checkboxesRadiosPage.checkboxA.focus();
                await checkboxesRadiosPage.page.keyboard.press('Space');
            });

            await test.step('Assert Option A is checked via keyboard interaction', async () => {
                await expect(checkboxesRadiosPage.checkboxA).toBeChecked();
            });

            await test.step('Focus on Radio Choice One and press Space key', async () => {
                await checkboxesRadiosPage.radio1.focus();
                await checkboxesRadiosPage.page.keyboard.press('Space');
            });

            await test.step('Assert Radio Choice One is selected via keyboard interaction and result updates', async () => {
                await expect(checkboxesRadiosPage.radio1).toBeChecked();
                await expect(checkboxesRadiosPage.radioResult).toHaveText(TestData.checkboxesRadios.radioChoiceOneResult);
            });
        });
    });

    // ==========================================
    // NEGATIVE & EDGE CASE SCENARIOS
    // ==========================================
    test.describe('Negative & Edge Case Scenarios', () => {

        test('TC-CR-NEG-01: Verify default initial unselected state of all controls on page load', async ({ checkboxesRadiosPage }) => {
            await test.step('Assert all checkboxes are unchecked by default', async () => {
                await expect(checkboxesRadiosPage.selectAllCheckbox).not.toBeChecked();
                await expect(checkboxesRadiosPage.checkboxA).not.toBeChecked();
                await expect(checkboxesRadiosPage.checkboxB).not.toBeChecked();
                await expect(checkboxesRadiosPage.checkboxC).not.toBeChecked();
                await expect(checkboxesRadiosPage.revealCheckbox).not.toBeChecked();
            });

            await test.step('Assert all radio buttons are unchecked by default', async () => {
                await expect(checkboxesRadiosPage.radio1).not.toBeChecked();
                await expect(checkboxesRadiosPage.radio2).not.toBeChecked();
            });

            await test.step('Assert radio result text defaults to "Selected: none"', async () => {
                await expect(checkboxesRadiosPage.radioResult).toHaveText(TestData.checkboxesRadios.initialRadioResult);
            });

            await test.step('Assert dynamic revealed text is not visible / detached on load', async () => {
                await expect(checkboxesRadiosPage.revealedText).toBeHidden();
            });
        });

        test('TC-CR-NEG-02: Verify clicking an already selected radio button does not deselect it', async ({ checkboxesRadiosPage }) => {
            await test.step('Select Choice One radio button', async () => {
                await checkboxesRadiosPage.selectRadioChoice('one');
                await expect(checkboxesRadiosPage.radio1).toBeChecked();
                await expect(checkboxesRadiosPage.radioResult).toHaveText(TestData.checkboxesRadios.radioChoiceOneResult);
            });

            await test.step('Click Choice One radio button again', async () => {
                await checkboxesRadiosPage.radio1.click();
            });

            await test.step('Assert Choice One remains checked and result text does not revert to "Selected: none"', async () => {
                await expect(checkboxesRadiosPage.radio1).toBeChecked();
                await expect(checkboxesRadiosPage.radioResult).toHaveText(TestData.checkboxesRadios.radioChoiceOneResult);
            });
        });

        test('TC-CR-NEG-03: Verify radio button group mutual exclusivity integrity', async ({ checkboxesRadiosPage }) => {
            await test.step('Assert radio buttons share the identical "name" attribute group', async () => {
                const name1 = await checkboxesRadiosPage.radio1.getAttribute('name');
                const name2 = await checkboxesRadiosPage.radio2.getAttribute('name');
                expect(name1).toBeTruthy();
                expect(name1).toBe(name2);
                expect(name1).toBe('practice-radio');
            });

            await test.step('Verify switching choices retains mutual exclusivity', async () => {
                await checkboxesRadiosPage.selectRadioChoice('one');
                expect(await checkboxesRadiosPage.radio1.isChecked()).toBe(true);
                expect(await checkboxesRadiosPage.radio2.isChecked()).toBe(false);

                await checkboxesRadiosPage.selectRadioChoice('two');
                expect(await checkboxesRadiosPage.radio1.isChecked()).toBe(false);
                expect(await checkboxesRadiosPage.radio2.isChecked()).toBe(true);
            });
        });

        test('TC-CR-NEG-04: Verify unchecking one option after "Select All" maintains independent option states', async ({ checkboxesRadiosPage }) => {
            await test.step('Check Select All', async () => {
                await checkboxesRadiosPage.toggleSelectAll(true);
                await expect(checkboxesRadiosPage.checkboxA).toBeChecked();
                await expect(checkboxesRadiosPage.checkboxB).toBeChecked();
                await expect(checkboxesRadiosPage.checkboxC).toBeChecked();
            });

            await test.step('Uncheck Option A only', async () => {
                await checkboxesRadiosPage.toggleCheckbox(checkboxesRadiosPage.checkboxA, false);
            });

            await test.step('Verify Option A is unchecked while Option B and Option C remain checked', async () => {
                await expect(checkboxesRadiosPage.checkboxA).not.toBeChecked();
                await expect(checkboxesRadiosPage.checkboxB).toBeChecked();
                await expect(checkboxesRadiosPage.checkboxC).toBeChecked();
            });
        });

        test('TC-CR-NEG-05: Verify ARIA labels, input types, and test attributes integrity', async ({ checkboxesRadiosPage }) => {
            await test.step('Assert input types on checkboxes and radio buttons', async () => {
                await expect(checkboxesRadiosPage.selectAllCheckbox).toHaveAttribute('type', 'checkbox');
                await expect(checkboxesRadiosPage.checkboxA).toHaveAttribute('type', 'checkbox');
                await expect(checkboxesRadiosPage.checkboxB).toHaveAttribute('type', 'checkbox');
                await expect(checkboxesRadiosPage.checkboxC).toHaveAttribute('type', 'checkbox');
                await expect(checkboxesRadiosPage.revealCheckbox).toHaveAttribute('type', 'checkbox');
                await expect(checkboxesRadiosPage.radio1).toHaveAttribute('type', 'radio');
                await expect(checkboxesRadiosPage.radio2).toHaveAttribute('type', 'radio');
            });

            await test.step('Assert aria-label attributes for accessibility compliance', async () => {
                await expect(checkboxesRadiosPage.selectAllCheckbox).toHaveAttribute('aria-label', 'Select all checkboxes');
                await expect(checkboxesRadiosPage.checkboxA).toHaveAttribute('aria-label', 'Checkbox A');
                await expect(checkboxesRadiosPage.checkboxB).toHaveAttribute('aria-label', 'Checkbox B');
                await expect(checkboxesRadiosPage.checkboxC).toHaveAttribute('aria-label', 'Checkbox C');
                await expect(checkboxesRadiosPage.radio1).toHaveAttribute('aria-label', 'Radio one');
                await expect(checkboxesRadiosPage.radio2).toHaveAttribute('aria-label', 'Radio two');
                await expect(checkboxesRadiosPage.revealCheckbox).toHaveAttribute('aria-label', 'Reveal checkbox');
            });

            await test.step('Assert data-testid attributes are correctly configured', async () => {
                await expect(checkboxesRadiosPage.selectAllCheckbox).toHaveAttribute('data-testid', 'select-all');
                await expect(checkboxesRadiosPage.checkboxA).toHaveAttribute('data-testid', 'check-a');
                await expect(checkboxesRadiosPage.checkboxB).toHaveAttribute('data-testid', 'check-b');
                await expect(checkboxesRadiosPage.checkboxC).toHaveAttribute('data-testid', 'check-c');
                await expect(checkboxesRadiosPage.radio1).toHaveAttribute('data-testid', 'radio-1');
                await expect(checkboxesRadiosPage.radio2).toHaveAttribute('data-testid', 'radio-2');
                await expect(checkboxesRadiosPage.radioResult).toHaveAttribute('data-testid', 'radio-result');
                await expect(checkboxesRadiosPage.revealCheckbox).toHaveAttribute('data-testid', 'reveal-checkbox');
            });
        });
    });
});
