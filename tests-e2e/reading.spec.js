const { test, expect } = require('@playwright/test');

test.describe("Reading lists page", () => {

	test("loads", async ({ page }) => {

		await page.goto('/reading');

		await expect(page).toHaveScreenshot({ fullPage: true });

		await expect(page).toHaveTitle("Mobi's Reading Lists");
	});

});
