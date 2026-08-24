import { test, expect } from '../src/fixtures/baseTest';

test.describe('Section 14: Hover Menu Test Suite', () => {

    test.beforeEach(async ({ hoverMenuPage }) => {
        await hoverMenuPage.navigate();
    });

    test.describe('Positive Scenarios', () => {

        test('TC-HVR-POS-01: Hover menu trigger reveals submenu items', async ({ hoverMenuPage }) => {
            await test.step('Hover over menu trigger button', async () => {
                await hoverMenuPage.hoverOverMenu();
            });

            await test.step('Verify submenu items are visible', async () => {
                await expect(hoverMenuPage.submenuItem1).toBeVisible();
                await expect(hoverMenuPage.submenuItem2).toBeVisible();
                await expect(hoverMenuPage.submenuItem3).toBeVisible();
            });
        });
    });

    test.describe('Negative & Edge Case Scenarios', () => {

        test('TC-HVR-NEG-01: Submenu is hidden by default prior to hover', async ({ hoverMenuPage }) => {
            await test.step('Assert submenu has hidden class initially', async () => {
                await expect(hoverMenuPage.submenu).toHaveClass(/hidden/);
            });
        });
    });
});
