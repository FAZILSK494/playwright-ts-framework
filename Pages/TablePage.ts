import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class TablePage extends BasePage {
    readonly sectionContainer: Locator;
    readonly heading: Locator;
    readonly description: Locator;

    readonly searchInput: Locator;
    readonly sortNameBtn: Locator;
    readonly table: Locator;
    readonly tableHeaders: Locator;
    readonly tableBody: Locator;
    readonly tableRows: Locator;
    readonly prevPageBtn: Locator;
    readonly nextPageBtn: Locator;
    readonly pageIndicator: Locator;

    constructor(page: Page) {
        super(page);

        this.sectionContainer = page.locator('#section-8');
        this.heading = page.locator('#section-8 h2');
        this.description = page.locator('#section-8 > p.text-muted').first();

        this.searchInput = page.locator('#table-search, [data-testid="table-search"]');
        this.sortNameBtn = page.locator('#sort-name-btn, [data-testid="sort-name-btn"]');
        this.table = page.locator('#practice-table, [data-testid="practice-table"]');
        this.tableHeaders = page.locator('#practice-table th');
        this.tableBody = page.locator('[data-testid="table-body"]');
        this.tableRows = page.locator('[data-testid="table-body"] tr');
        this.prevPageBtn = page.locator('#prev-page-btn, [data-testid="prev-page-btn"]');
        this.nextPageBtn = page.locator('#next-page-btn, [data-testid="next-page-btn"]');
        this.pageIndicator = page.locator('[data-testid="page-indicator"]');
    }

    async navigate(): Promise<void> {
        await this.goto('/practice');
        await this.scrollIntoView(this.sectionContainer);
    }

    async searchTable(query: string): Promise<void> {
        await this.scrollIntoView(this.searchInput);
        await this.fillInput(this.searchInput, query);
    }

    async clickSortByName(): Promise<void> {
        await this.scrollIntoView(this.sortNameBtn);
        await this.sortNameBtn.click();
    }

    async goToNextPage(): Promise<void> {
        await this.nextPageBtn.click();
    }

    async goToPrevPage(): Promise<void> {
        await this.prevPageBtn.click();
    }

    async getVisibleRowNames(): Promise<string[]> {
        const rows = this.tableRows;
        const count = await rows.count();
        const names: string[] = [];
        for (let i = 0; i < count; i++) {
            const nameCell = rows.nth(i).locator('td').first();
            names.push((await nameCell.innerText()).trim());
        }
        return names;
    }
}
