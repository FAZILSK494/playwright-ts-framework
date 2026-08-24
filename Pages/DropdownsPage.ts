import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class DropdownsPage extends BasePage {
    // Locators for Section 4: Dropdowns
    readonly sectionContainer: Locator;
    readonly heading: Locator;
    readonly description: Locator;

    // 1. Standard Select
    readonly standardSelect: Locator;
    readonly standardSelectResult: Locator;

    // 2. Multi-Select
    readonly multiSelect: Locator;
    readonly multiSelectResult: Locator;

    // 3. Custom Div Dropdown
    readonly customDropdownToggle: Locator;
    readonly customDropdownMenu: Locator;
    readonly customOptionAlpha: Locator;
    readonly customOptionBeta: Locator;
    readonly customOptionGamma: Locator;
    readonly customDropdownResult: Locator;

    // 4. Dynamic Options Select
    readonly dynamicSelect: Locator;
    readonly dynamicSelectResult: Locator;

    constructor(page: Page) {
        super(page);

        this.sectionContainer = page.locator('#section-4');
        this.heading = page.locator('#section-4 h2');
        this.description = page.locator('#section-4 > p.text-muted').first();

        this.standardSelect = page.locator('#standard-select, [data-testid="standard-select"]');
        this.standardSelectResult = page.locator('[data-testid="standard-select-result"]');

        this.multiSelect = page.locator('#multi-select, [data-testid="multi-select"]');
        this.multiSelectResult = page.locator('[data-testid="multi-select-result"]');

        this.customDropdownToggle = page.locator('#custom-dropdown-toggle, [data-testid="custom-dropdown-toggle"]');
        this.customDropdownMenu = page.locator('[data-testid="custom-dropdown-menu"]');
        this.customOptionAlpha = page.locator('[data-testid="custom-option-alpha"]');
        this.customOptionBeta = page.locator('[data-testid="custom-option-beta"]');
        this.customOptionGamma = page.locator('[data-testid="custom-option-gamma"]');
        this.customDropdownResult = page.locator('[data-testid="custom-dropdown-result"]');

        this.dynamicSelect = page.locator('#dynamic-select, [data-testid="dynamic-select"]');
        this.dynamicSelectResult = page.locator('[data-testid="dynamic-select-result"]');
    }

    async navigate(): Promise<void> {
        await this.goto('/practice');
        await this.scrollIntoView(this.sectionContainer);
    }

    async selectStandardOption(valueOrLabel: string): Promise<void> {
        await this.scrollIntoView(this.standardSelect);
        await this.standardSelect.selectOption(valueOrLabel);
    }

    async selectMultipleOptions(values: string[]): Promise<void> {
        await this.scrollIntoView(this.multiSelect);
        await this.multiSelect.selectOption(values);
    }

    async selectCustomOption(option: 'Alpha' | 'Beta' | 'Gamma'): Promise<void> {
        await this.scrollIntoView(this.customDropdownToggle);
        await this.customDropdownToggle.click();
        await this.customDropdownMenu.waitFor({ state: 'visible', timeout: 3000 });
        if (option === 'Alpha') await this.customOptionAlpha.click();
        else if (option === 'Beta') await this.customOptionBeta.click();
        else if (option === 'Gamma') await this.customOptionGamma.click();
    }

    async selectDynamicOption(tool: string): Promise<void> {
        await this.scrollIntoView(this.dynamicSelect);
        await this.dynamicSelect.selectOption(tool);
    }
}
