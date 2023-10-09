import { expect, test } from "@playwright/test";
import clickOnDDDLink from "./clickOnDDDLink";
import openAndCloseAccordion from "../CommonFunctions/openAndCloseAccordions";
import goToGraphPage from "../CommonFunctions/goToGraphPage";
import clickOnFirstDocTopic from "./clickOnFirstDocTopic";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:5173/");
});

test.describe("User read the getting started then go to the graph page", () => {
  test("Documentation is visible", async ({ page }) => {
    const welcomeHeading = page.getByRole("heading", { name: "Welcome on Candy-Board" });
    await expect(welcomeHeading).toBeVisible();
  });
  test("User click on ddd link", async ({ page }) => {
    await clickOnDDDLink(page);
  });
  test("User click on first topic", async ({ page }) => {
    const offset = await clickOnDDDLink(page);
    await clickOnFirstDocTopic(page, offset);
  });
  test("User open and close accordions", async ({ page }) => {
    await openAndCloseAccordion(
      page,
      "Welcome on Candy-Board",
      "How to fully live the candy-board experience"
    );
    await openAndCloseAccordion(page, "Domain-Driven-Design", "Key Concepts in DDD");
  });
  test("User go to graph page", async ({ page }) => {
    await goToGraphPage(page);
  });
});

test.afterEach(async ({ page }) => {
  await page.close();
})