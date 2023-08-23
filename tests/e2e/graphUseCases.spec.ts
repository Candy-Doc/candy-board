import { test } from "@playwright/test";
import goToGraphPage from "./Functions/goToGraphPage";
import searchForKartPattern from "./Functions/searchForKartPattern";
import openGraphLegend from "./Functions/openGraphLegend";
import useGraphToolsButton from "./Functions/useGraphToolsButton";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await goToGraphPage(page);
});

test.describe("User manipulate the pattern tools", () => {
  test("User search for the kart pattern", async ({ page }) => {
    await searchForKartPattern(page);
  });
  test("User open the legend accordion", async ({ page }) => {
    await openGraphLegend(page);
  });
  test("User use all tools buttons", async ({ page, context }) => {
    await useGraphToolsButton(page, context);
  });
});
