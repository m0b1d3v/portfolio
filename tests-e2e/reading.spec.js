const { test, expect } = require('@playwright/test');
const AxeBuilder = require("@axe-core/playwright").default;

test.describe("Reading lists page", () => {

	test.beforeEach(async ({ page }) => await page.goto('/reading'));

	test("loads", async ({ page }) => {
		await expect(page).toHaveScreenshot({ fullPage: true });
		await expect(page).toHaveTitle("Mobi's Reading Lists");
	});

	test("no automatically detectable accessibility issues", async ({ page }) => {
		const scanResults = await new AxeBuilder({ page }).analyze();
		expect (scanResults.violations).toEqual([]);
	});

});
