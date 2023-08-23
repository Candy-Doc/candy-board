import { test } from '@playwright/test';
import goToContactPage from './Functions/goToContactPage';
import clickContributorButton from './Functions/clickContributorButton';
import clickCommunityButton from './Functions/clickCommunityButton';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await goToContactPage(page);
})

test.describe('User wants to access the contact page', () => {
  test('User click on become a contributor button', async ({ page }) => {
    await clickContributorButton(page);
  })
  test('User click on join the community button', async ({ page }) => {
    await clickCommunityButton(page);
  })
})