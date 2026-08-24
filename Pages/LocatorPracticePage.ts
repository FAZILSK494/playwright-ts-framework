import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LocatorPracticePage extends BasePage {
    // Section 5 Locators
    readonly sectionContainer: Locator;
    readonly heading: Locator;
    readonly description: Locator;

    readonly byId: Locator;
    readonly byClass: Locator;
    readonly byName: Locator;
    readonly byTestId: Locator;
    readonly byAriaLabel: Locator;
    readonly byPlaceholder: Locator;
    readonly byExactText: Locator;
    readonly byPartialText: Locator;
    readonly byDataCss: Locator;

    readonly xpathGrandparent: Locator;
    readonly xpathParent: Locator;
    readonly xpathChild1: Locator;
    readonly xpathChild2: Locator;
    readonly xpathLeaf: Locator;

    constructor(page: Page) {
        super(page);

        this.sectionContainer = page.locator('#section-5');
        this.heading = page.locator('#section-5 h2');
        this.description = page.locator('#section-5 > p.text-muted').first();

        this.byId = page.locator('#locator-by-id');
        this.byClass = page.locator('.locator-by-class');
        this.byName = page.locator('input[name="locator-name"]');
        this.byTestId = page.locator('[data-testid="locator-by-testid"]');
        this.byAriaLabel = page.locator('[aria-label="locator-by-aria"]');
        this.byPlaceholder = page.locator('input[placeholder="locator-by-placeholder"]');
        this.byExactText = page.getByText('ExactTextTarget', { exact: true });
        this.byPartialText = page.getByText('PartialMatch');
        this.byDataCss = page.locator('[data-css="css-only-target"]');

        this.xpathGrandparent = page.locator('xpath=//div[@id="xpath-grandparent"]');
        this.xpathParent = page.locator('xpath=//div[@id="xpath-parent"]');
        this.xpathChild1 = page.locator('xpath=//div[@id="xpath-child-1"]');
        this.xpathChild2 = page.locator('xpath=//div[@id="xpath-child-2"]');
        this.xpathLeaf = page.locator('xpath=//span[@id="xpath-leaf"]');
    }

    async navigate(): Promise<void> {
        await this.goto('/practice');
        await this.scrollIntoView(this.sectionContainer);
    }
}
