const { test, expect } = require('@playwright/test');
const AxeBuilder = require("@axe-core/playwright").default;

test.describe("Home page", () => {

	test.beforeEach(async ({ page }) => await page.goto('/'));

	test("loads", async ({ page }) => {
		await expect(page).toHaveScreenshot({ fullPage: true });
		await expect(page).toHaveTitle("Hi, I'm Mobi");
	});

	test("no automatically detectable accessibility issues", async ({ page }) => {
		const scanResults = await new AxeBuilder({ page }).analyze();
		expect (scanResults.violations).toEqual([]);
	});

});
