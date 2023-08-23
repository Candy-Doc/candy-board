import { type Page, expect } from "@playwright/test";

export default async (page: Page) => {
  const legendAccordion = page.getByRole('button', { name: 'Legend' });
  const legendContainer = page.getByTestId('legend-list');
  const legendChildCount = await legendContainer.evaluate(elem => elem.childElementCount);
  const firstChildLegendName = await legendContainer.evaluate(elem => elem.children[0].textContent) as string;

  await expect(firstChildLegendName).toBeDefined();
  const firstChildLegend = page.getByText(firstChildLegendName);
  await expect(firstChildLegend).toBeHidden();
  await legendAccordion.click();
  await expect(firstChildLegend).toBeVisible();
  await expect(legendChildCount).toEqual(9);
}