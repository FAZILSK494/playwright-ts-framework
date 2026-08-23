import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Read from Command Line: e.g., ENV=staging npx playwright test
const environment = process.env.ENV || 'staging';
dotenv.config({ path: path.resolve(__dirname, 'config', `.env.${environment}`) });

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 2,
  timeout: 45000,

  reporter: [
    ['html', { open: 'never' }],
    ['list'],
    ['json', { outputFile: 'playwright-report/results.json' }]
  ],

  use: {
    headless: false,
    launchOptions: {
      slowMo: 2000,
    },
    baseURL: process.env.BASE_URL || 'https://www.sreenidhirajakrishnan.com/practice',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },


  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
