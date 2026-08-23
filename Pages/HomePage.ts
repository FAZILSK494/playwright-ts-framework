import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { UserFormData } from '../src/utils/TestData';

export class HomePage extends BasePage {
    // 1. Header / Hero Elements
    readonly heroTitle: Locator;
    readonly heroDescription: Locator;
    readonly sectionsCountBadge: Locator;
    readonly elementsCountBadge: Locator;
    readonly sectionsNavList: Locator;
    readonly startPractisingBtn: Locator;

    // 2. Section 1: Basic Form Elements
    readonly sectionBasicForm: Locator;
    readonly nameInput: Locator;
    readonly passwordInput: Locator;
    readonly emailInput: Locator;
    readonly phoneInput: Locator;
    readonly bioTextarea: Locator;
    readonly formSubmitBtn: Locator;
    readonly formResetBtn: Locator;
    readonly formResultText: Locator;

    // 3. Section 2: Button Interactions
    readonly sectionButtons: Locator;
    readonly singleClickBtn: Locator;
    readonly doubleClickBtn: Locator;
    readonly rightClickBtn: Locator;
    readonly disabledBtn: Locator;
    readonly singleClickResult: Locator;
    readonly doubleClickResult: Locator;
    readonly rightClickResult: Locator;

    // 4. Section 3: Checkboxes & Radio Buttons
    readonly sectionCheckboxes: Locator;
    readonly selectAllCheckbox: Locator;
    readonly checkboxA: Locator;
    readonly checkboxB: Locator;
    readonly checkboxC: Locator;
    readonly radio1: Locator;
    readonly radio2: Locator;
    readonly radioResult: Locator;

    // 5. Section 4: Dropdowns
    readonly sectionDropdowns: Locator;
    readonly standardSelect: Locator;
    readonly standardSelectResult: Locator;
    readonly multiSelect: Locator;
    readonly multiSelectResult: Locator;
    readonly dynamicSelect: Locator;
    readonly dynamicSelectResult: Locator;

    // 6. Section 8: Table Automation
    readonly sectionTable: Locator;
    readonly tableSearchInput: Locator;
    readonly tableSortBtn: Locator;
    readonly tableBody: Locator;
    readonly tableRows: Locator;
    readonly prevPageBtn: Locator;
    readonly nextPageBtn: Locator;
    readonly pageIndicator: Locator;

    constructor(page: Page) {
        super(page);

        // Header & Hero
        this.heroTitle = page.locator('h1');
        this.heroDescription = page.locator('header p.text-lg');
        this.sectionsCountBadge = page.locator('header strong:has-text("30")');
        this.elementsCountBadge = page.locator('header strong:has-text("120+")');
        this.sectionsNavList = page.locator('nav[aria-label="Practice sections"]');
        this.startPractisingBtn = page.locator('a:has-text("Start practising")');

        // Section 1: Form
        this.sectionBasicForm = page.locator('#section-1');
        this.nameInput = page.locator('#text-input, [data-testid="text-input"]');
        this.passwordInput = page.locator('#password-input, [data-testid="password-input"]');
        this.emailInput = page.locator('#email-input, [data-testid="email-input"]');
        this.phoneInput = page.locator('#phone-input, [data-testid="phone-input"]');
        this.bioTextarea = page.locator('#textarea-input, [data-testid="textarea-input"]');
        this.formSubmitBtn = page.locator('#form-submit, [data-testid="form-submit"]');
        this.formResetBtn = page.locator('#form-reset, [data-testid="form-reset"]');
        this.formResultText = page.locator('[data-testid="form-result"]');

        // Section 2: Buttons
        this.sectionButtons = page.locator('#section-2');
        this.singleClickBtn = page.locator('#single-click-btn, [data-testid="single-click-btn"]');
        this.doubleClickBtn = page.locator('#double-click-btn, [data-testid="double-click-btn"]');
        this.rightClickBtn = page.locator('#right-click-btn, [data-testid="right-click-btn"]');
        this.disabledBtn = page.locator('#disabled-btn, [data-testid="disabled-btn"]');
        this.singleClickResult = page.locator('[data-testid="single-click-result"]');
        this.doubleClickResult = page.locator('[data-testid="double-click-result"]');
        this.rightClickResult = page.locator('[data-testid="right-click-result"]');

        // Section 3: Checkboxes & Radios
        this.sectionCheckboxes = page.locator('#section-3');
        this.selectAllCheckbox = page.locator('#select-all, [data-testid="select-all"]');
        this.checkboxA = page.locator('#check-a, [data-testid="check-a"]');
        this.checkboxB = page.locator('#check-b, [data-testid="check-b"]');
        this.checkboxC = page.locator('#check-c, [data-testid="check-c"]');
        this.radio1 = page.locator('#radio-1, [data-testid="radio-1"]');
        this.radio2 = page.locator('#radio-2, [data-testid="radio-2"]');
        this.radioResult = page.locator('[data-testid="radio-result"]');

        // Section 4: Dropdowns
        this.sectionDropdowns = page.locator('#section-4');
        this.standardSelect = page.locator('#standard-select, [data-testid="standard-select"]');
        this.standardSelectResult = page.locator('[data-testid="standard-select-result"]');
        this.multiSelect = page.locator('#multi-select, [data-testid="multi-select"]');
        this.multiSelectResult = page.locator('[data-testid="multi-select-result"]');
        this.dynamicSelect = page.locator('#dynamic-select, [data-testid="dynamic-select"]');
        this.dynamicSelectResult = page.locator('[data-testid="dynamic-select-result"]');

        // Section 8: Tables
        this.sectionTable = page.locator('#section-8');
        this.tableSearchInput = page.locator('#table-search, [data-testid="table-search"]');
        this.tableSortBtn = page.locator('#sort-name-btn, [data-testid="sort-name-btn"]');
        this.tableBody = page.locator('[data-testid="table-body"]');
        this.tableRows = page.locator('[data-testid="table-body"] tr');
        this.prevPageBtn = page.locator('#prev-page-btn, [data-testid="prev-page-btn"]');
        this.nextPageBtn = page.locator('#next-page-btn, [data-testid="next-page-btn"]');
        this.pageIndicator = page.locator('[data-testid="page-indicator"]');
    }

    /**
     * Navigates directly to the practice playground
     */
    async navigate(): Promise<void> {
        await this.goto('/practice');
        await this.waitForPageLoad();
    }

    /**
     * Fills out the entire Section 1 basic form and clicks submit
     */
    async fillAndSubmitBasicForm(data: UserFormData): Promise<void> {
        await this.scrollIntoView(this.sectionBasicForm);
        await this.fillInput(this.nameInput, data.name);
        await this.fillInput(this.passwordInput, data.password);
        await this.fillInput(this.emailInput, data.email);
        await this.fillInput(this.phoneInput, data.phone);
        await this.fillInput(this.bioTextarea, data.bio);
        await this.clickElement(this.formSubmitBtn);
    }

    /**
     * Resets the Section 1 basic form
     */
    async resetBasicForm(): Promise<void> {
        await this.scrollIntoView(this.sectionBasicForm);
        await this.clickElement(this.formResetBtn);
    }

    /**
     * Executes single, double, and right click actions
     */
    async performSingleClick(): Promise<void> {
        await this.scrollIntoView(this.sectionButtons);
        await this.clickElement(this.singleClickBtn);
    }

    async performDoubleClick(): Promise<void> {
        await this.scrollIntoView(this.sectionButtons);
        await this.doubleClickBtn.dblclick();
    }

    async performRightClick(): Promise<void> {
        await this.scrollIntoView(this.sectionButtons);
        await this.rightClickBtn.click({ button: 'right' });
    }

    /**
     * Checks/Unchecks the Select All checkbox
     */
    async toggleSelectAll(check: boolean): Promise<void> {
        await this.scrollIntoView(this.sectionCheckboxes);
        await this.selectAllCheckbox.setChecked(check);
    }

    /**
     * Selects standard dropdown option by value
     */
    async selectStandardOption(value: string): Promise<void> {
        await this.scrollIntoView(this.sectionDropdowns);
        await this.standardSelect.selectOption(value);
    }

    /**
     * Filters the practice table by search query
     */
    async filterTable(query: string): Promise<void> {
        await this.scrollIntoView(this.sectionTable);
        await this.fillInput(this.tableSearchInput, query);
    }

    /**
     * Retrieves all visible row text contents from the table
     */
    async getTableRowsText(): Promise<string[]> {
        await this.scrollIntoView(this.sectionTable);
        return await this.tableRows.allInnerTexts();
    }
}
