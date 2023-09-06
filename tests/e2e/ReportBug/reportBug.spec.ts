import { test } from "@playwright/test";
import goToBoardGithubIssues from "./goToBoardGithubIssues";


test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:5173/");
});

test.describe("User finds a bug and wish to report it", () => {
  test("User click on the report bug button", async ({ page, context }) => {
    await goToBoardGithubIssues(page, context);
  });
});

test.afterEach(async ({ page }) => {
  await page.close();
})
