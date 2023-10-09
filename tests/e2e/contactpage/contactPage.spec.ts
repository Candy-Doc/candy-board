import { test } from "@playwright/test";
import goToContactPage from "../CommonFunctions/goToContactPage";
import clickContributorButton from "./clickContributorButton";
import clickCommunityButton from "./clickCommunityButton";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await goToContactPage(page);
});

test.describe("User wants to access the contact page", () => {
  test("User click on become a contributor button", async ({ page }) => {
    await clickContributorButton(page);
  });
  test("User click on join the community button", async ({ page }) => {
    await clickCommunityButton(page);
  });
});

test.afterEach(async ({ page }) => {
  await page.close();
})
