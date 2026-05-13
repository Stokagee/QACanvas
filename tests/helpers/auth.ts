import { expect, Locator, Page } from "@playwright/test";

export async function QALogin(page: Page, username: string, password: string) {
    await page.goto("login.html");
    await expect(page).toHaveTitle("Login — QACanvas")

    const loginTable: Locator = page.locator(".login-card");
    const loginInput: Locator = loginTable.getByTestId("username-input");
    const passwordInput: Locator = loginTable.getByTestId("password-input");

    await loginInput.fill("admin");
    await passwordInput.fill("admin123")
    await loginTable.getByTestId("login-btn").click();
    
     await expect(page).toHaveTitle("QACanvas — Home");
}