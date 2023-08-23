import { expect, type Page } from "@playwright/test";

export default async (page: Page) => {
  const contributorButton = page.getByRole('button', { name: 'Become a contributor' })

  await contributorButton.click();
  await expect(page).toHaveURL("https://github.com/Candy-Doc");
}
