import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ComplexDomPage extends BasePage {
    readonly sectionContainer: Locator;
    readonly heading: Locator;
    readonly description: Locator;

    readonly grandparent: Locator;
    readonly parent1: Locator;
    readonly parent2: Locator;
    readonly child1a: Locator;
    readonly child1b: Locator;
    readonly leaf1a: Locator;
    readonly leaf1b: Locator;
    readonly listLeaf1: Locator;
    readonly listLeaf2: Locator;
    readonly listLeaf3: Locator;

    constructor(page: Page) {
        super(page);

        this.sectionContainer = page.locator('#section-30');
        this.heading = page.locator('#section-30 h2');
        this.description = page.locator('#section-30 > p.text-muted').first();

        this.grandparent = page.locator('[data-testid="dom-grandparent"]');
        this.parent1 = page.locator('[data-testid="dom-parent-1"]');
        this.parent2 = page.locator('[data-testid="dom-parent-2"]');
        this.child1a = page.locator('[data-testid="dom-child-1a"]');
        this.child1b = page.locator('[data-testid="dom-child-1b"]');
        this.leaf1a = page.locator('[data-testid="dom-leaf-1a"]');
        this.leaf1b = page.locator('[data-testid="dom-leaf-1b"]');
        this.listLeaf1 = page.locator('[data-testid="dom-li-1"]');
        this.listLeaf2 = page.locator('[data-testid="dom-li-2"]');
        this.listLeaf3 = page.locator('[data-testid="dom-li-3"]');
    }

    async navigate(): Promise<void> {
        await this.goto('/practice');
        await this.scrollIntoView(this.sectionContainer);
    }
}
