const { test, expect } = require('@playwright/test');
const AxeBuilder = require("@axe-core/playwright").default;

test.describe('Home page', () => {

	test.beforeEach(async ({ page }) => await page.goto('/'));

	test('renders', async ({ page }) => {
		await expect(page).toHaveScreenshot({fullPage: true, scale: 'css'});
	});

	test('no automatically detectable accessibility issues', async ({ page }) => {
		const scanResults = await new AxeBuilder({ page }).analyze();
		expect (scanResults.violations).toEqual([]);
	});

	test('intro', async ({ page }) => {
		await expect(page).toHaveTitle("Hi, I'm Mobi");
		await expect(page.getByRole('heading', { name: "Hi, I'm Mobi" })).toBeVisible();
	});

	test('content', async ({ page }) => {

		const expectedHeadings = ['Projects', 'Work', 'Links'];

		for (const heading of expectedHeadings) {
			await expect(page.getByRole('heading', { name: heading })).toBeVisible();
		}

		await expect(page.getByRole('list')).toHaveCount(expectedHeadings.length);

	});

});
