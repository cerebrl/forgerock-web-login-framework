import { test, expect } from '@playwright/test';
import { asyncEvents } from '../../utilities/async-events.js';

test('ensure message node renders a button when no button is included in payload', async ({
  page,
}) => {
  const { navigate, clickButton } = asyncEvents(page);

  await navigate('widget/inline?journey=TEST_MessageNode');

  await page.getByLabel('Username').fill('demouser');
  await page.getByLabel('Password').fill('j56eKtae*1');
  await clickButton('Next', '/authenticate');

  expect(page.getByText('demouser')).toBeVisible();
  const textoutputButtonRendered = page.getByRole('button', { name: 'Next ' });
  expect(textoutputButtonRendered).toBeVisible();
});
