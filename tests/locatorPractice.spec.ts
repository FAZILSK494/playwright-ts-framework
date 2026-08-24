import { test, expect } from '../src/fixtures/baseTest';

test.describe('Section 5: Locator Practice Test Suite', () => {

    test.beforeEach(async ({ locatorPracticePage }) => {
        await locatorPracticePage.navigate();
    });

    test('TC-LOC-POS-01: Verify locators by standard strategies (ID, Class, Name, testid, aria-label, placeholder)', async ({ locatorPracticePage }) => {
        await test.step('Assert By ID locator', async () => {
            await expect(locatorPracticePage.byId).toHaveText('Find me by id');
        });

        await test.step('Assert By Class locator', async () => {
            await expect(locatorPracticePage.byClass).toHaveText('Find me by class');
        });

        await test.step('Assert By Name locator', async () => {
            await expect(locatorPracticePage.byName).toBeVisible();
            await locatorPracticePage.byName.fill('Test Name');
            await expect(locatorPracticePage.byName).toHaveValue('Test Name');
        });

        await test.step('Assert By Data-TestId locator', async () => {
            await expect(locatorPracticePage.byTestId).toHaveText('Find me by data-testid');
        });

        await test.step('Assert By Aria-Label locator', async () => {
            await expect(locatorPracticePage.byAriaLabel).toHaveText('Find me by aria-label');
        });

        await test.step('Assert By Placeholder locator', async () => {
            await expect(locatorPracticePage.byPlaceholder).toBeVisible();
        });
    });

    test('TC-LOC-POS-02: Verify text matchers and custom CSS attributes', async ({ locatorPracticePage }) => {
        await test.step('Assert exact text matcher', async () => {
            await expect(locatorPracticePage.byExactText).toBeVisible();
        });

        await test.step('Assert partial text matcher', async () => {
            await expect(locatorPracticePage.byPartialText).toContainText('PartialMatch');
        });

        await test.step('Assert custom data-css attribute locator', async () => {
            await expect(locatorPracticePage.byDataCss).toBeVisible();
        });
    });

    test('TC-LOC-POS-03: Verify nested hierarchical structure and XPath axes traversing', async ({ locatorPracticePage }) => {
        await test.step('Assert grandparent, parent, siblings, and leaf node via XPath', async () => {
            await expect(locatorPracticePage.xpathGrandparent).toBeVisible();
            await expect(locatorPracticePage.xpathParent).toBeVisible();
            await expect(locatorPracticePage.xpathChild1).toHaveText('child 1 (sibling)');
            await expect(locatorPracticePage.xpathLeaf).toHaveText('leaf node');
        });
    });
});
