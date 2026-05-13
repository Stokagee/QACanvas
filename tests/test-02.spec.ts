import { test, expect, Locator } from "@playwright/test"
import { faker } from "@faker-js/faker"
import { QALogin } from "./helpers/auth"

test("Testing inputs Page, Standard text", async ({ page }) => {
    await QALogin(page, "admin", "admin123");
    await page.getByTestId("nav-link-inputs").click();
    await expect(page).toHaveTitle("Inputs — QACanvas");
    const standardTextInput: Locator = page.getByPlaceholder("Enter text");
    const standardTextInputValue: string = faker.lorem.sentence();
    standardTextInput.fill(standardTextInputValue);
    await expect(standardTextInput).toHaveValue(standardTextInputValue);
});

test("Testing inputs Page, Disabled input", async ({ page }) => {
    await QALogin(page, "admin", "admin123");
    await page.getByTestId("nav-link-inputs").click();
    await expect(page).toHaveTitle("Inputs — QACanvas");
    const disabledInput: Locator = page.getByTestId("input-disabled");
    await expect(disabledInput).toBeDisabled();
    await expect(disabledInput).toHaveValue("Cannot edit");

    try{
        await disabledInput.fill("This should not work");
    } catch (error) {
        // Expected to fail
    }
});