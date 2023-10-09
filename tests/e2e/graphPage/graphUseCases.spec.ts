import { test } from "@playwright/test";
import goToGraphPage from "../CommonFunctions/goToGraphPage";
import searchForKartPattern from "./searchForKartPattern";
import openGraphLegend from "./openGraphLegend";
import useGraphToolsButton from "./useGraphToolsButton";

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

test.afterEach(async ({ page }) => {
  await page.close();
})
