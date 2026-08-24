import { test, expect } from '../src/fixtures/baseTest';

test.describe('Section 4: Dropdowns Test Suite', () => {

    test.beforeEach(async ({ dropdownsPage }) => {
        await dropdownsPage.navigate();
    });

    test.describe('Positive Scenarios', () => {

        test('TC-DD-POS-01: Select single option in Standard Dropdown', async ({ dropdownsPage }) => {
            await test.step('Select Red option', async () => {
                await dropdownsPage.selectStandardOption('red');
            });

            await test.step('Verify result text updates with selected color', async () => {
                await expect(dropdownsPage.standardSelectResult).toContainText('red');
            });
        });

        test('TC-DD-POS-02: Select multiple options in Multi-Select Dropdown', async ({ dropdownsPage }) => {
            await test.step('Select Python and JavaScript', async () => {
                await dropdownsPage.selectMultipleOptions(['python', 'javascript']);
            });

            await test.step('Verify multi-select result reflects selected items', async () => {
                await expect(dropdownsPage.multiSelectResult).toContainText('python');
                await expect(dropdownsPage.multiSelectResult).toContainText('javascript');
            });
        });

        test('TC-DD-POS-03: Select option from Custom Div Dropdown', async ({ dropdownsPage }) => {
            await test.step('Open custom dropdown and pick Beta', async () => {
                await dropdownsPage.selectCustomOption('Beta');
            });

            await test.step('Verify custom dropdown result displays selected choice', async () => {
                await expect(dropdownsPage.customDropdownResult).toContainText('Beta');
            });
        });

        test('TC-DD-POS-04: Select option from Dynamic State Select', async ({ dropdownsPage }) => {
            await test.step('Select Playwright from dynamic tool select', async () => {
                await dropdownsPage.selectDynamicOption('Playwright');
            });

            await test.step('Verify dynamic select result updates', async () => {
                await expect(dropdownsPage.dynamicSelectResult).toContainText('Playwright');
            });
        });
    });

    test.describe('Negative & Edge Case Scenarios', () => {

        test('TC-DD-NEG-01: Default unselected state on page load', async ({ dropdownsPage }) => {
            await test.step('Verify default results show "none" or default prompt', async () => {
                await expect(dropdownsPage.standardSelectResult).toHaveText('Selected: none');
                await expect(dropdownsPage.multiSelectResult).toHaveText('Selected: none');
                await expect(dropdownsPage.dynamicSelectResult).toHaveText('Selected: none');
            });
        });

        test('TC-DD-NEG-02: Custom dropdown menu closes after selection', async ({ dropdownsPage }) => {
            await test.step('Select Alpha option', async () => {
                await dropdownsPage.selectCustomOption('Alpha');
            });

            await test.step('Verify dropdown menu is dismissed', async () => {
                await expect(dropdownsPage.customDropdownMenu).toBeHidden();
            });
        });

        test('TC-DD-NEG-03: ARIA accessibility and test IDs', async ({ dropdownsPage }) => {
            await test.step('Verify aria-label and testids', async () => {
                await expect(dropdownsPage.standardSelect).toHaveAttribute('aria-label', 'Standard select');
                await expect(dropdownsPage.multiSelect).toHaveAttribute('aria-label', 'Multi select');
                await expect(dropdownsPage.customDropdownToggle).toHaveAttribute('aria-label', 'Custom dropdown toggle');
                await expect(dropdownsPage.dynamicSelect).toHaveAttribute('aria-label', 'Dynamic options select');
            });
        });
    });
});
