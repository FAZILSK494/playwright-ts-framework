import { test, expect } from '../src/fixtures/baseTest';

test.describe('Section 27: Slider Test Suite', () => {

    test.beforeEach(async ({ sliderPage }) => {
        await sliderPage.navigate();
    });

    test.describe('Positive Scenarios', () => {

        test('TC-SLD-POS-01: Change slider value and verify live value echo', async ({ sliderPage }) => {
            await test.step('Set slider to 80', async () => {
                await sliderPage.setSliderValue('80');
            });

            await test.step('Verify slider echo reflects 80', async () => {
                await expect(sliderPage.sliderResult).toHaveText('Value: 80');
            });
        });

        test('TC-SLD-POS-02: Boundary slider values (0 and 100)', async ({ sliderPage }) => {
            await test.step('Set slider to minimum 0', async () => {
                await sliderPage.setSliderValue('0');
                await expect(sliderPage.sliderResult).toHaveText('Value: 0');
            });

            await test.step('Set slider to maximum 100', async () => {
                await sliderPage.setSliderValue('100');
                await expect(sliderPage.sliderResult).toHaveText('Value: 100');
            });
        });
    });

    test.describe('Negative & Edge Case Scenarios', () => {

        test('TC-SLD-NEG-01: Verify default slider position and attributes', async ({ sliderPage }) => {
            await test.step('Assert default value is 50', async () => {
                await expect(sliderPage.sliderResult).toHaveText('Value: 50');
                await expect(sliderPage.sliderInput).toHaveAttribute('min', '0');
                await expect(sliderPage.sliderInput).toHaveAttribute('max', '100');
                await expect(sliderPage.sliderInput).toHaveAttribute('aria-label', 'Slider');
            });
        });
    });
});
