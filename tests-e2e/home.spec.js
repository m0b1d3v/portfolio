const { test, expect } = require('@playwright/test');

test.describe("Home page", () => {

	test("loads", async ({ page }) => {

		await page.goto('/');

		await expect(page).toHaveScreenshot({ fullPage: true });

		await expect(page).toHaveTitle("Hi, I'm Mobi");
	});
});
