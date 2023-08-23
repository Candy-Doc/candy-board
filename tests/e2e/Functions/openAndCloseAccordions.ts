import { expect, type Page } from "@playwright/test";

export default async (page: Page, accordionButtonName, childrenButtonName) => {
  const welcomeAccordionComponent = page.getByRole('button', { name: accordionButtonName })
  const firstChildAccordionChild = page.getByRole('button', { name: childrenButtonName });

  await expect(firstChildAccordionChild).toBeVisible();
  await welcomeAccordionComponent.click();
  await expect(firstChildAccordionChild).toBeHidden();
}