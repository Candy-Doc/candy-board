import { test } from "@playwright/test";
import goToGraphPage from "../CommonFunctions/goToGraphPage";
import goToContactPage from "../CommonFunctions/goToContactPage";
import goToGettingStartedPage from "../CommonFunctions/goToGettingStartedPage";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:5173/");
});

test.describe("User navigate through the pages", () => {
  test("User go to the graph page", async ({ page }) => {
    await goToGraphPage(page);
  });
  test("User go to the contact page", async ({ page }) => {
    await goToContactPage(page);
  });
  test("User go to the getting started page", async ({ page }) => {
    await goToGettingStartedPage(page);
  });
});

test.afterEach(async ({ page }) => {
  await page.close();
})
