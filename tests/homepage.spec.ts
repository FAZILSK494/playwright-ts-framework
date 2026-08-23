import { test, expect } from '../src/fixtures/baseTest';
import { TestData } from '../src/utils/TestData';

test.describe('Automation Practice Playground Baseline Suite', () => {

    test.beforeEach(async ({ homePage }) => {
        await homePage.navigate();
    });

    test('TC-HOME-01: Verify Homepage Header, Hero Section & Sections Navigation', async ({ homePage, page }) => {
        await test.step('Verify page title and main heading', async () => {
            await expect(page).toHaveTitle(/Automation Practice Playground/i);
            await expect(homePage.heroTitle).toContainText('Automation Practice Playground');
        });

        await test.step('Verify hero metadata metrics', async () => {
            await expect(homePage.sectionsCountBadge).toBeVisible();
            await expect(homePage.elementsCountBadge).toBeVisible();
        });

        await test.step('Verify practice sections navigation bar exists with links', async () => {
            await expect(homePage.sectionsNavList).toBeVisible();
            const sectionLinks = homePage.sectionsNavList.locator('a');
            await expect(sectionLinks).toHaveCount(30);
        });
    });

    test('TC-HOME-02: Verify Section 1 Basic Form Submission', async ({ homePage }) => {
        const formData = TestData.basicForm.validSubmission;

        await test.step('Fill and submit basic form', async () => {
            await homePage.fillAndSubmitBasicForm(formData);
        });

        await test.step('Assert form result message updates upon submission', async () => {
            await expect(homePage.formResultText).not.toHaveText('Not submitted');
        });
    });

    test('TC-HOME-03: Verify Section 1 Form Reset Action', async ({ homePage }) => {
        const formData = TestData.basicForm.validSubmission;

        await test.step('Fill form fields', async () => {
            await homePage.fillInput(homePage.nameInput, formData.name);
            await homePage.fillInput(homePage.emailInput, formData.email);
            await expect(homePage.nameInput).toHaveValue(formData.name);
        });

        await test.step('Click Reset button', async () => {
            await homePage.resetBasicForm();
        });

        await test.step('Verify input values are cleared', async () => {
            await expect(homePage.nameInput).toHaveValue('');
            await expect(homePage.emailInput).toHaveValue('');
        });
    });

    test('TC-HOME-04: Verify Section 2 Button Click Interactions', async ({ homePage }) => {
        await test.step('Perform Single Click and verify result', async () => {
            await homePage.performSingleClick();
            await expect(homePage.singleClickResult).not.toHaveText('No click yet');
        });

        await test.step('Perform Double Click and verify result', async () => {
            await homePage.performDoubleClick();
            await expect(homePage.doubleClickResult).not.toHaveText('Not double-clicked');
        });

        await test.step('Perform Right Click and verify result', async () => {
            await homePage.performRightClick();
            await expect(homePage.rightClickResult).not.toHaveText('Not right-clicked');
        });

        await test.step('Verify disabled button is non-interactive', async () => {
            await expect(homePage.disabledBtn).toBeDisabled();
        });
    });

    test('TC-HOME-05: Verify Section 3 Checkboxes and Radio Buttons', async ({ homePage }) => {
        await test.step('Toggle Option A checkbox', async () => {
            await homePage.scrollIntoView(homePage.sectionCheckboxes);
            await homePage.checkboxA.check();
            await expect(homePage.checkboxA).toBeChecked();
        });

        await test.step('Select Radio Choice Two and assert echoed result', async () => {
            await homePage.radio2.check();
            await expect(homePage.radio2).toBeChecked();
            await expect(homePage.radioResult).toContainText('two');
        });
    });

    test('TC-HOME-06: Verify Section 4 Dropdowns Selection', async ({ homePage }) => {
        const selectedColor = TestData.dropdowns.standardColor;

        await test.step('Select option in standard dropdown', async () => {
            await homePage.selectStandardOption(selectedColor);
        });

        await test.step('Assert dropdown echo updates with selected value', async () => {
            await expect(homePage.standardSelectResult).toContainText(selectedColor);
        });
    });

    test('TC-HOME-07: Verify Section 8 Table Search and Row Filtering', async ({ homePage }) => {
        const keyword = TestData.table.searchKeyword;

        await test.step(`Search for '${keyword}' in table filter`, async () => {
            await homePage.filterTable(keyword);
        });

        await test.step('Assert filtered rows display the matching record', async () => {
            await expect(homePage.tableBody).toContainText(keyword);
        });
    });
});
