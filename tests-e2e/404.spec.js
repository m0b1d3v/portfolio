const { test, expect } = require('@playwright/test');
const AxeBuilder = require("@axe-core/playwright").default;

test.describe('404 page', () => {

	test.beforeEach(async ({ page }) => await page.goto('/404'));

	test('renders', async ({ page }) => {
		await expect(page).toHaveScreenshot({fullPage: true, scale: 'css'});
	});

	test('no automatically detectable accessibility issues', async ({ page }) => {
		const scanResults = await new AxeBuilder({ page }).analyze();
		expect (scanResults.violations).toEqual([]);
	});

	test('intro', async ({ page }) => {
		await expect(page).toHaveTitle("Mobi's Lost and Found");
		await expect(page.getByRole('link', { name: 'Go back'})).toBeVisible();
		await expect(page.getByRole('heading', { name: 'What you are looking for is not here' })).toBeVisible();
	});

	test('content', async ({ page }) => {
		await expect(page
			.getByRole('paragraph')
			.filter({ hasText: 'what you are looking for' })
			.getByRole('link', { name: 'home page'})
		).toBeVisible();
	});

});
