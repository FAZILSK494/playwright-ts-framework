import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class SliderPage extends BasePage {
    readonly sectionContainer: Locator;
    readonly heading: Locator;
    readonly description: Locator;

    readonly sliderInput: Locator;
    readonly sliderResult: Locator;

    constructor(page: Page) {
        super(page);

        this.sectionContainer = page.locator('#section-27');
        this.heading = page.locator('#section-27 h2');
        this.description = page.locator('#section-27 > p.text-muted').first();

        this.sliderInput = page.locator('#slider-input, [data-testid="slider-input"]');
        this.sliderResult = page.locator('[data-testid="slider-result"]');
    }

    async navigate(): Promise<void> {
        await this.goto('/practice');
        await this.scrollIntoView(this.sectionContainer);
    }

    async setSliderValue(value: string): Promise<void> {
        await this.scrollIntoView(this.sliderInput);
        await this.sliderInput.fill(value);
    }
}
