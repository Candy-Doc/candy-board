import { type Page, expect } from "@playwright/test";

export default async (page: Page, offset: number) => {
  const firstTopicElement = page.getByRole("button", {
    name: "How to fully live the candy-board experience",
  });

  await firstTopicElement.click();
  await page.waitForTimeout(200);
  const currentOffset = await page.evaluate(() => window.scrollY);
  await expect(currentOffset).not.toEqual(offset);
  await expect(currentOffset).not.toEqual(0);
};
