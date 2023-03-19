const { test, expect } = require('@playwright/test');
const AxeBuilder = require("@axe-core/playwright").default;

export const TITLE_404_PAGE = "Mobi's Lost and Found";

test.describe('404 page', () => {

	const pageLink = '/404';

	test.beforeEach(async ({ page }) => await page.goto(pageLink));

	test('renders', async ({ page }) => {
		await expect(page).toHaveScreenshot({fullPage: true, scale: 'css'});
	});

	test('no automatically detectable accessibility issues', async ({ page }) => {
		const scanResults = await new AxeBuilder({ page }).analyze();
		expect (scanResults.violations).toEqual([]);
	});

	test('has intro', async ({ page }) => {
		await expect(page).toHaveTitle("Mobi's Lost and Found");
		await expect(page.getByRole('heading', { name: 'What you are looking for is not here' })).toBeVisible();
	});

	test('no dead links', async ({ page }) => {

		const links = await page.getByRole('link');

		await expect(links).toHaveCount(2);

		for (const link of await links.all()) {
			await link.click();
			await expect(page).not.toHaveTitle(TITLE_404_PAGE);
			await page.goto(pageLink);
		}
	});

	test('has content', async ({ page }) => {
		await expect(page
			.getByRole('paragraph')
			.filter({ hasText: 'what you are looking for' })
			.getByRole('link', { name: 'home page'})
		).toBeVisible();
	});

});
