const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;

test.describe('Programming readings page', () => {

	test.beforeEach(async ({ page }) => await page.goto('/reading/programming'));

	test('renders', async ({ page }) => {
		await expect(page).toHaveScreenshot({fullPage: true, scale: 'css'});
	});

	test('no automatically detectable accessibility issues', async ({ page }) => {
		const scanResults = await new AxeBuilder({ page }).analyze();
		expect (scanResults.violations).toEqual([]);
	});

	test('intro', async ({ page }) => {
		await expect(page).toHaveTitle("Mobi's Programming Reading");
		await expect(page.getByRole('link', { name: 'Go back'})).toBeVisible();
		await expect(page.getByRole('heading', { name: "Mobi's Programming Reading" })).toBeVisible();
	});

	test('content', async ({ page }) => {
		const expectedEntries = 4;
		await expect(page.getByRole('heading')).toHaveCount(expectedEntries + 1); // +1 for page header
		await expect(page.getByRole('paragraph')).toHaveCount(expectedEntries + 1); // +1 for page description
	});

});
