import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckboxesRadiosPage extends BasePage {
    // Locators for Section 3: Checkboxes & Radio Buttons
    readonly sectionContainer: Locator;
    readonly heading: Locator;
    readonly description: Locator;

    // Checkboxes
    readonly selectAllCheckbox: Locator;
    readonly checkboxA: Locator;
    readonly checkboxB: Locator;
    readonly checkboxC: Locator;
    readonly allOptionCheckboxes: Locator[];

    // Radio Group
    readonly radio1: Locator;
    readonly radio2: Locator;
    readonly radioResult: Locator;

    // Reveal Checkbox & Dynamic Content
    readonly revealCheckbox: Locator;
    readonly revealedText: Locator;

    constructor(page: Page) {
        super(page);

        this.sectionContainer = page.locator('#section-3');
        this.heading = page.locator('#section-3 h2');
        this.description = page.locator('#section-3 p.text-muted');

        // Checkboxes
        this.selectAllCheckbox = page.locator('#select-all, [data-testid="select-all"]');
        this.checkboxA = page.locator('#check-a, [data-testid="check-a"]');
        this.checkboxB = page.locator('#check-b, [data-testid="check-b"]');
        this.checkboxC = page.locator('#check-c, [data-testid="check-c"]');
        this.allOptionCheckboxes = [this.checkboxA, this.checkboxB, this.checkboxC];

        // Radio Group
        this.radio1 = page.locator('#radio-1, [data-testid="radio-1"]');
        this.radio2 = page.locator('#radio-2, [data-testid="radio-2"]');
        this.radioResult = page.locator('[data-testid="radio-result"]');

        // Reveal Section
        this.revealCheckbox = page.locator('#reveal-checkbox, [data-testid="reveal-checkbox"]');
        this.revealedText = page.locator('[data-testid="revealed-text"]');
    }

    /**
     * Navigates to practice page and scrolls directly to Section 3
     */
    async navigate(): Promise<void> {
        await this.goto('/practice');
        await this.scrollIntoView(this.sectionContainer);
    }

    /**
     * Toggles Select All master checkbox
     * @param check Whether to check (true) or uncheck (false)
     */
    async toggleSelectAll(check: boolean = true): Promise<void> {
        await this.scrollIntoView(this.selectAllCheckbox);
        await this.selectAllCheckbox.setChecked(check);
    }

    /**
     * Toggles an individual checkbox option
     * @param checkbox Target checkbox locator
     * @param check Whether to check (true) or uncheck (false)
     */
    async toggleCheckbox(checkbox: Locator, check: boolean = true): Promise<void> {
        await this.scrollIntoView(checkbox);
        await checkbox.setChecked(check);
    }

    /**
     * Selects a radio button by choice ('one' | 'two')
     * @param choice Radio option identifier
     */
    async selectRadioChoice(choice: 'one' | 'two'): Promise<void> {
        await this.scrollIntoView(this.radioResult);
        if (choice === 'one') {
            await this.radio1.check();
        } else {
            await this.radio2.check();
        }
    }

    /**
     * Retrieves the current radio result display text
     */
    async getRadioResultText(): Promise<string> {
        return await this.getElementText(this.radioResult);
    }

    /**
     * Toggles the reveal checkbox to show or hide hidden text
     * @param check Whether to check (true) or uncheck (false)
     */
    async toggleRevealHiddenText(check: boolean = true): Promise<void> {
        await this.scrollIntoView(this.revealCheckbox);
        await this.revealCheckbox.setChecked(check);
    }

    /**
     * Checks if revealed text is visible
     */
    async isRevealedTextVisible(): Promise<boolean> {
        return await this.isElementVisible(this.revealedText, 2000);
    }

    /**
     * Gets all option checkboxes checked state
     */
    async getOptionCheckboxesState(): Promise<{ optionA: boolean; optionB: boolean; optionC: boolean }> {
        return {
            optionA: await this.checkboxA.isChecked(),
            optionB: await this.checkboxB.isChecked(),
            optionC: await this.checkboxC.isChecked(),
        };
    }
}
