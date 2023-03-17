const { test, expect } = require('@playwright/test');
const AxeBuilder = require("@axe-core/playwright").default;

test.describe("Programming readings page", () => {

	test.beforeEach(async ({ page }) => await page.goto('/reading/programming'));

	test("renders", async ({ page, browserName }) => {
		await page.screenshot({
			fullPage: true,
			path: `tests-e2e/screenshots/${browserName}/${page.viewportSize().width}/reading-programming.png`,
			scale: 'css'
		});
	});

	test("has title", async ({ page }) => {
		await expect(page).toHaveTitle("Mobi's Programming Reading");
	});

	test("no automatically detectable accessibility issues", async ({ page }) => {
		const scanResults = await new AxeBuilder({ page }).analyze();
		expect (scanResults.violations).toEqual([]);
	});

});
