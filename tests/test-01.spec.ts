import { test, expect, Locator} from '@playwright/test';

test("Testing - login", async ({page}) => {

  (await page).goto("/")
  await expect(page).toHaveTitle("Login — QACanvas")

  const loginTable: Locator = page.locator(".login-card");

  const usernameInput = loginTable.getByTestId("username-input");
  await usernameInput.fill("admin");
  await loginTable.getByTestId("password-input").fill("admin123")
  expect(usernameInput).toHaveValue("admin");
  await loginTable.getByTestId("login-btn").click();

  await expect(page).toHaveTitle("QACanvas — Home");



})