import { type Page, expect, type BrowserContext } from "@playwright/test";

export default async (page: Page, context: BrowserContext) => {
  const toolsAccordion = page.getByRole("button", { name: "Tools" });
  const DownloadSvgButton = page.getByRole("button", { name: "Download SVG" });
  const ViewSvgButton = page.getByRole("button", { name: "View SVG" });

  await expect(DownloadSvgButton).toBeHidden();
  await toolsAccordion.click();
  await expect(DownloadSvgButton).toBeVisible();

  const newPagePromise = context.waitForEvent("page");
  await ViewSvgButton.click();
  const newPage = await newPagePromise;
  expect(await newPage.title()).toEqual("Candy-Board SVG View");

  const downloadPromise = page.waitForEvent("download");
  await DownloadSvgButton.click();
  const downloadEvent = await downloadPromise;
  await expect(downloadEvent).toBeDefined();
};
