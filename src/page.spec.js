const { test, expect } = require('@playwright/test');
const AxeBuilder = require("@axe-core/playwright").default;

test.describe('New page', () => {

	test.beforeEach(async ({ page }) => await page.goto('/'));

	test('renders', async ({ page }) => {
		await expect(page).toHaveScreenshot({fullPage: true, scale: 'css'});
	});

	test('no automatically detectable accessibility issues', async ({ page }) => {
		const scanResults = await new AxeBuilder({ page }).analyze();
		expect (scanResults.violations).toEqual([]);
	});

	test('intro', async ({ page }) => {
		await expect(page).toHaveTitle("New page");
		await expect(page.getByRole('heading', { name: "New page" })).toBeVisible();
	});

	test('content', async ({ page }) => {

	});

});
