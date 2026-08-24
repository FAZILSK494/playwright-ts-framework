import { test, expect } from '../src/fixtures/baseTest';
import path from 'path';

test.describe('Section 16: File Upload Test Suite', () => {

    test.beforeEach(async ({ fileUploadPage }) => {
        await fileUploadPage.navigate();
    });

    test.describe('Positive Scenarios', () => {

        test('TC-UPL-POS-01: Upload sample file and verify displayed filename', async ({ fileUploadPage }) => {
            const sampleFilePath = path.resolve(__dirname, '../package.json');

            await test.step('Upload package.json file', async () => {
                await fileUploadPage.uploadFile(sampleFilePath);
            });

            await test.step('Verify filename updates in result text', async () => {
                await expect(fileUploadPage.fileResult).toContainText('package.json');
            });
        });
    });

    test.describe('Negative & Edge Case Scenarios', () => {

        test('TC-UPL-NEG-01: Default status is "No file selected"', async ({ fileUploadPage }) => {
            await test.step('Assert default text', async () => {
                await expect(fileUploadPage.fileResult).toHaveText('No file selected');
                await expect(fileUploadPage.fileInput).toHaveAttribute('type', 'file');
            });
        });
    });
});
