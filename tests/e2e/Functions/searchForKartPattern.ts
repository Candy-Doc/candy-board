import { type Page, expect } from "@playwright/test";

export default async (page: Page) => {
  const patternAccordion = page.getByRole('button', { name: "Patterns" })
  const patternsInput = page.getByPlaceholder('Search pattern...')

  await expect(patternsInput).toBeHidden();
  await expect(patternAccordion).toBeVisible();

  await patternAccordion.click();
  await expect(patternsInput).toBeVisible();

  await patternsInput.fill("Kart");
  await expect(patternsInput).toHaveValue("Kart");
}