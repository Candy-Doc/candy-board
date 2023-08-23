import { type Page, expect } from "@playwright/test"

export default async (page: Page) => {
  const topbarGrapButton = page.getByRole('button', { name: 'Graph', exact: true });
  const graphCanvas = page.getByTestId('graph-canvas');

  await topbarGrapButton.click();
  await expect(page).toHaveURL("http://localhost:5173/graph")
  await expect(graphCanvas).toBeVisible();
}