import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ButtonInteractionsPage extends BasePage {
    // Locators for Section 2: Button Interactions
    readonly sectionContainer: Locator;
    readonly heading: Locator;
    readonly description: Locator;

    // Buttons
    readonly singleClickBtn: Locator;
    readonly doubleClickBtn: Locator;
    readonly rightClickBtn: Locator;
    readonly disabledBtn: Locator;
    readonly startDelayBtn: Locator;
    readonly delayedEnableBtn: Locator;
    readonly relabelBtn: Locator;

    // Result Text Elements
    readonly singleClickResult: Locator;
    readonly doubleClickResult: Locator;
    readonly rightClickResult: Locator;

    constructor(page: Page) {
        super(page);

        this.sectionContainer = page.locator('#section-2');
        this.heading = page.locator('#section-2 h2');
        this.description = page.locator('#section-2 p.text-muted');

        this.singleClickBtn = page.locator('#single-click-btn, [data-testid="single-click-btn"]');
        this.doubleClickBtn = page.locator('#double-click-btn, [data-testid="double-click-btn"]');
        this.rightClickBtn = page.locator('#right-click-btn, [data-testid="right-click-btn"]');
        this.disabledBtn = page.locator('#disabled-btn, [data-testid="disabled-btn"]');
        this.startDelayBtn = page.locator('#start-delay-btn, [data-testid="start-delay-btn"]');
        this.delayedEnableBtn = page.locator('#delayed-enable-btn, [data-testid="delayed-enable-btn"]');
        this.relabelBtn = page.locator('#relabel-btn, [data-testid="relabel-btn"]');

        this.singleClickResult = page.locator('[data-testid="single-click-result"]');
        this.doubleClickResult = page.locator('[data-testid="double-click-result"]');
        this.rightClickResult = page.locator('[data-testid="right-click-result"]');
    }

    /**
     * Navigates to practice page and scrolls directly to Section 2
     */
    async navigate(): Promise<void> {
        await this.goto('/practice');
        await this.scrollIntoView(this.sectionContainer);
    }

    /**
     * Performs standard left click on Single Click button
     */
    async performSingleClick(): Promise<void> {
        await this.scrollIntoView(this.singleClickBtn);
        await this.clickElement(this.singleClickBtn);
    }

    /**
     * Performs double click on Double Click button
     */
    async performDoubleClick(): Promise<void> {
        await this.scrollIntoView(this.doubleClickBtn);
        await this.doubleClickBtn.dblclick();
    }

    /**
     * Performs context / right click on Right Click button
     */
    async performRightClick(): Promise<void> {
        await this.scrollIntoView(this.rightClickBtn);
        await this.rightClickBtn.click({ button: 'right' });
    }

    /**
     * Triggers the 3s delay timer button
     */
    async startDelayTimer(): Promise<void> {
        await this.scrollIntoView(this.startDelayBtn);
        await this.clickElement(this.startDelayBtn);
    }

    /**
     * Waits for delayed button to transition from disabled to enabled
     * @param timeout Timeout in milliseconds (defaults to 6000ms)
     */
    async waitForDelayedButtonToBeEnabled(timeout: number = 6000): Promise<void> {
        await this.delayedEnableBtn.waitFor({ state: 'visible', timeout });
        await this.page.waitForFunction(
            (btn) => !(btn as HTMLButtonElement).disabled,
            await this.delayedEnableBtn.elementHandle(),
            { timeout }
        );
    }

    /**
     * Clicks on the self-relabelling button
     */
    async clickRelabelButton(): Promise<void> {
        await this.scrollIntoView(this.relabelBtn);
        await this.clickElement(this.relabelBtn);
    }

    /**
     * Gets the text label of the relabel button
     */
    async getRelabelButtonText(): Promise<string> {
        return await this.getElementText(this.relabelBtn);
    }
}
