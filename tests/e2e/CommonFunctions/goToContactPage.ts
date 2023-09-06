import { type Page, expect } from "@playwright/test";

export default async (page: Page) => {
  const topbarGrapButton = page.getByRole("button", { name: "Contact", exact: true });

  await topbarGrapButton.click();
  await expect(page).toHaveURL("http://localhost:5173/contact");
  const contactHeading = page.getByRole("heading", { name: "CONTACT", exact: true });
  await expect(contactHeading).toBeVisible();
};
