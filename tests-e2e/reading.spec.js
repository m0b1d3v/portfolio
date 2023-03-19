const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;

test.describe('Reading lists page', () => {

	test.beforeEach(async ({ page }) => await page.goto('/reading'));

	test('renders', async ({ page }) => {
		await expect(page).toHaveScreenshot({fullPage: true, scale: 'css'});
	});

	test('no automatically detectable accessibility issues', async ({ page }) => {
		const scanResults = await new AxeBuilder({ page }).analyze();
		expect (scanResults.violations).toEqual([]);
	});

	test('intro', async ({ page }) => {
		await expect(page).toHaveTitle("Mobi's Reading Lists");
		await expect(page.getByRole('link', { name: 'Go back'})).toBeVisible();
		await expect(page.getByRole('heading', { name: "Mobi's Reading Lists" })).toBeVisible();
	});

	test('content', async ({ page }) => {
		await expect(page.getByRole('listitem')).toHaveCount(2);
	});

});
