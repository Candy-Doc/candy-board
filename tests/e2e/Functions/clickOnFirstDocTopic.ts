import { type Page, expect } from "@playwright/test";

export default async (page: Page) => {
  const firstTopicElement = page.getByRole('button', { name: 'How to fully live the candy-board experience' })
  const offsetAfterDDDClick = await page.evaluate(() => window.scrollY)

  await firstTopicElement.click();
  await page.waitForTimeout(200);
  const currentOffset = await page.evaluate(() => window.scrollY)
  await expect(currentOffset).toBeGreaterThan(offsetAfterDDDClick);
};