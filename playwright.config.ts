/** @type {import('@playwright/test').PlaywrightTestConfig} */
import { devices, PlaywrightTestConfig } from '@playwright/test';

const url = process.env.PLAYWRIGHT_TEST_BASE_URL || 'https://localhost:3000';

const config: PlaywrightTestConfig = {
  webServer: {
    command: 'npm run preview -- --host=localhost',
    url,
    ignoreHTTPSErrors: true,
    reuseExistingServer: true,
  },
  use: {
    headless: !!process.env.CI,
    baseURL: `${url}/e2e/`,
    ignoreHTTPSErrors: true,
    trace: 'on',
  },
  retries: process.env.CI ? 2 : 0,
  forbidOnly: !!process.env.CI,
  workers: process.env.CI ? 1 : undefined,
  testDir: 'tests',
  timeout: 120 * 1000,
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        ...devices['Desktop Edge'],
      },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'], ...devices['iPad (gen 7)'] },
    // },
  ],
};

export default config;
