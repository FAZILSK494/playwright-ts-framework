import { test, expect } from '../src/fixtures/baseTest';

test.describe('Section 8: Table Automation Test Suite', () => {

    test.beforeEach(async ({ tablePage }) => {
        await tablePage.navigate();
    });

    test.describe('Positive Scenarios', () => {

        test('TC-TBL-POS-01: Filter table rows by search keyword', async ({ tablePage }) => {
            await test.step('Search for "Anita" in filter input', async () => {
                await tablePage.searchTable('Anita');
            });

            await test.step('Verify table filters rows dynamically', async () => {
                const names = await tablePage.getVisibleRowNames();
                expect(names.length).toBe(1);
                expect(names[0]).toBe('Anita');
            });
        });

        test('TC-TBL-POS-02: Sort table by name column', async ({ tablePage }) => {
            await test.step('Click sort button', async () => {
                await tablePage.clickSortByName();
            });

            await test.step('Verify sort direction indicator toggles', async () => {
                await expect(tablePage.sortNameBtn).toContainText('desc');
            });
        });

        test('TC-TBL-POS-03: Navigate through table pagination', async ({ tablePage }) => {
            await test.step('Verify page 1 indicator', async () => {
                await expect(tablePage.pageIndicator).toContainText('Page 1 of 3');
                await expect(tablePage.prevPageBtn).toBeDisabled();
                await expect(tablePage.nextPageBtn).toBeEnabled();
            });

            await test.step('Click Next page', async () => {
                await tablePage.goToNextPage();
                await expect(tablePage.pageIndicator).toContainText('Page 2 of 3');
                await expect(tablePage.prevPageBtn).toBeEnabled();
            });
        });
    });

    test.describe('Negative & Edge Case Scenarios', () => {

        test('TC-TBL-NEG-01: Filter with non-matching search term displays no rows', async ({ tablePage }) => {
            await test.step('Search for non-existent employee', async () => {
                await tablePage.searchTable('NonExistentEmployeeXYZ');
            });

            await test.step('Verify zero rows match', async () => {
                const count = await tablePage.tableRows.count();
                expect(count).toBe(0);
            });
        });

        test('TC-TBL-NEG-02: Accessibility and table header integrity', async ({ tablePage }) => {
            await test.step('Verify table headers structure', async () => {
                const headers = await tablePage.tableHeaders.allInnerTexts();
                expect(headers).toEqual(['Name', 'Department', 'Role', 'Salary']);
            });
        });
    });
});
