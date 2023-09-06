import { type Page, expect } from "@playwright/test";

export default async (page: Page) => {
  const topbarGrapButton = page.getByRole("button", { name: "Getting Started", exact: true });

  await topbarGrapButton.click();
  await expect(page).toHaveURL("http://localhost:5173/");
  const gettingStartedHeading = page.getByRole("heading", { name: "Welcome on Candy-Board", exact: true });
  await expect(gettingStartedHeading).toBeVisible();
};
