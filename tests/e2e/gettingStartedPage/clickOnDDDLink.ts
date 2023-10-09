import { type Page, expect } from "@playwright/test";

export default async (page: Page) => {
  const dddLink = page.getByTestId("ddd-link");

  await dddLink.click();
  await page.waitForTimeout(100);
  const scrollOffset = await page.evaluate(() => window.scrollY);
  await expect(scrollOffset).toBeGreaterThan(0);
  return scrollOffset
};
