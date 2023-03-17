const { test, expect } = require('@playwright/test');
const AxeBuilder = require("@axe-core/playwright").default;

test.describe("Reading lists page", () => {

	test.beforeEach(async ({ page }) => await page.goto('/reading'));

	test("renders", async ({ page, browserName }) => {
		await page.screenshot({
			fullPage: true,
			path: `tests-e2e/screenshots/${browserName}/${page.viewportSize().width}/reading.png`,
			scale: 'css'
		});
	});

	test("has title", async ({ page }) => {
		await expect(page).toHaveTitle("Mobi's Reading Lists");
	});

	test("no automatically detectable accessibility issues", async ({ page }) => {
		const scanResults = await new AxeBuilder({ page }).analyze();
		expect (scanResults.violations).toEqual([]);
	});

});
