import { expect, test } from '@playwright/test';
import clickOnDDDLink from './Functions/clickOnDDDLink';
import openAndCloseAccordion from './Functions/openAndCloseAccordions';
import goToGraphPage from './Functions/goToGraphPage';
import clickOnFirstDocTopic from './Functions/clickOnFirstDocTopic';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:5173/');
})

test.describe('User read the getting started then go to the graph page', () => {
  test('Documentation is visible', async ({ page }) => {
    const welcomeHeading = page.getByRole('heading', { name: 'Welcome on Candy-Board' })
    await expect(welcomeHeading).toBeVisible()
  })
  test('User click on ddd link', async ({ page }) => {
    await clickOnDDDLink(page);
  })
  test('User click on first topic', async ({ page }) => {
    await clickOnDDDLink(page);
    await clickOnFirstDocTopic(page);
  })
  test('User open and close accordions', async ({ page }) => {
    await openAndCloseAccordion(page, 'Welcome on Candy-Board', 'How to fully live the candy-board experience');
    await openAndCloseAccordion(page, 'Domain-Driven-Design', 'Key Concepts in DDD');
  });
  test('User go to graph page', async ({ page }) => {
    await goToGraphPage(page);
  })
})