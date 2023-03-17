const { test, expect } = require('@playwright/test');

test.describe("404 page", () => {

	test("loads", async ({ page }) => {

		await page.goto('/404');

		await expect(page).toHaveScreenshot({ fullPage: true });

		await expect(page).toHaveTitle("Mobi's Lost and Found");
	});

});
