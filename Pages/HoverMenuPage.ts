import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HoverMenuPage extends BasePage {
    readonly sectionContainer: Locator;
    readonly heading: Locator;
    readonly description: Locator;

    readonly hoverTrigger: Locator;
    readonly submenu: Locator;
    readonly submenuItem1: Locator;
    readonly submenuItem2: Locator;
    readonly submenuItem3: Locator;

    constructor(page: Page) {
        super(page);

        this.sectionContainer = page.locator('#section-14');
        this.heading = page.locator('#section-14 h2');
        this.description = page.locator('#section-14 > p.text-muted').first();

        this.hoverTrigger = page.locator('#hover-menu-trigger, [data-testid="hover-menu-trigger"]');
        this.submenu = page.locator('[data-testid="hover-submenu"]');
        this.submenuItem1 = page.locator('[data-testid="submenu-item-1"]');
        this.submenuItem2 = page.locator('[data-testid="submenu-item-2"]');
        this.submenuItem3 = page.locator('[data-testid="submenu-item-3"]');
    }

    async navigate(): Promise<void> {
        await this.goto('/practice');
        await this.scrollIntoView(this.sectionContainer);
    }

    async hoverOverMenu(): Promise<void> {
        await this.scrollIntoView(this.hoverTrigger);
        await this.hoverTrigger.hover();
    }
}
