import { test, expect } from '../src/fixtures/baseTest';

test.describe('Section 30: Complex DOM Structure Test Suite', () => {

    test.beforeEach(async ({ complexDomPage }) => {
        await complexDomPage.navigate();
    });

    test.describe('Positive Scenarios', () => {

        test('TC-CDOM-POS-01: Traverse multi-level nested parent-child hierarchies', async ({ complexDomPage }) => {
            await test.step('Verify grandparent, parents, and child leaves', async () => {
                await expect(complexDomPage.grandparent).toBeVisible();
                await expect(complexDomPage.parent1).toBeVisible();
                await expect(complexDomPage.parent2).toBeVisible();
                await expect(complexDomPage.leaf1a).toHaveText('leaf 1a');
                await expect(complexDomPage.leaf1b).toHaveText('leaf 1b');
            });
        });

        test('TC-CDOM-POS-02: Validate sibling list items in parent 2', async ({ complexDomPage }) => {
            await test.step('Verify list leaves 1, 2, and 3', async () => {
                await expect(complexDomPage.listLeaf1).toHaveText('list leaf 1');
                await expect(complexDomPage.listLeaf2).toHaveText('list leaf 2');
                await expect(complexDomPage.listLeaf3).toHaveText('list leaf 3');
            });
        });
    });

    test.describe('Negative & Edge Case Scenarios', () => {

        test('TC-CDOM-NEG-01: Verify structural data attributes', async ({ complexDomPage }) => {
            await test.step('Assert data-level hierarchy attributes', async () => {
                await expect(complexDomPage.grandparent).toHaveAttribute('data-level', 'grandparent');
                await expect(complexDomPage.parent1).toHaveAttribute('data-level', 'parent');
                await expect(complexDomPage.parent2).toHaveAttribute('data-level', 'parent');
                await expect(complexDomPage.child1a).toHaveAttribute('data-level', 'child');
            });
        });
    });
});
