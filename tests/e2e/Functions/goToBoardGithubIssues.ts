import { type Page, expect, BrowserContext } from "@playwright/test";

export default async (page: Page, context: BrowserContext) => {
  const topbarBugIcon = page.getByRole("link").first();
  const newPagePriomise = context.waitForEvent("page");

  await topbarBugIcon.click();
  const newPage = await newPagePriomise;
  expect(newPage).toHaveURL(
    "https://github.com/login?return_to=https%3A%2F%2Fgithub.com%2FCandy-Doc%2Fcandy-board%2Fissues%2Fnew%2Fchoose"
  );
};
