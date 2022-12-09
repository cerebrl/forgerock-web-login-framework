/** @type {import('@playwright/test').PlaywrightTestConfig} */
import { devices, PlaywrightTestConfig } from '@playwright/test';

const url = process.env.PLAYWRIGHT_TEST_BASE_URL || 'https://localhost:3000';
const config: PlaywrightTestConfig = {
  webServer: process.env.CI
    ? undefined
    : {
      command: 'npm run preview',
      url,
      ignoreHTTPSErrors: true,
      reuseExistingServer: false,
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
        ...devices['Desktop Chrome HiDPI'],
        ...devices['Desktop Edge'],
        ...devices['Desktop Edge HiDPI'],
      },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'], ...devices['Desktop Firefox HiDPI'] },
    },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'], ...devices['iPad (gen 7)'] },
    // },
  ],
};

export default config;
