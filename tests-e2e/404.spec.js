const { test, expect } = require('@playwright/test');
const AxeBuilder = require("@axe-core/playwright").default;

test.describe("404 page", () => {

	test.beforeEach(async ({ page }) => await page.goto('/404'));

	test("renders", async ({ page, browserName }) => {
		await page.screenshot({
			fullPage: true,
			path: `tests-e2e/screenshots/${browserName}/${page.viewportSize().width}/404.png`,
			scale: 'css'
		});
	});

	test("has title", async ({ page }) => {
		await expect(page).toHaveTitle("Mobi's Lost and Found");
	});

	test("no automatically detectable accessibility issues", async ({ page }) => {
		const scanResults = await new AxeBuilder({ page }).analyze();
		expect (scanResults.violations).toEqual([]);
	});

});
