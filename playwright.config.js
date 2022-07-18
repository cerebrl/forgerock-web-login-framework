/** @type {import('@playwright/test').PlaywrightTestConfig} */
import { devices } from '@playwright/test';

const url = 'https://localhost:3000';
const config = {
  webServer: {
    reuseExistingServer: !process.env.CI,
    command: process.env.CI ? 'npm run preview' : 'npm run build:app && npm run preview',
    timeout: 120 * 1000,
    ignoreHTTPSErrors: true,
    url,
  },
  use: {
    headless: !!process.env.CI,
    baseURL: `${url}/e2e/`,
    ignoreHTTPSErrors: true,
  },
  forbidOnly: !!process.env.CI,
  workers: process.env.CI ? 2 : 4,
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
