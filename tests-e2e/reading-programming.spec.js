const { test, expect } = require('@playwright/test');

test.describe("Programming readings page", () => {

	test("loads", async ({ page }) => {

		await page.goto('/reading/programming');

		await expect(page).toHaveScreenshot({ fullPage: true });

		await expect(page).toHaveTitle("Mobi's Programming Reading");
	});

});
