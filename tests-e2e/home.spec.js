const { test, expect } = require('@playwright/test');
const AxeBuilder = require("@axe-core/playwright").default;

test.describe('Home page', () => {

	test.beforeEach(async ({ page }) => await page.goto('/'));

	test('renders', async ({ page, browserName }) => {
		await expect(page).toHaveScreenshot({fullPage: true, scale: 'css'});
	});

	test('has title', async ({ page }) => {
		await expect(page).toHaveTitle("Hi, I'm Mobi");
	});

	test('no automatically detectable accessibility issues', async ({ page }) => {
		const scanResults = await new AxeBuilder({ page }).analyze();
		expect (scanResults.violations).toEqual([]);
	});

});
