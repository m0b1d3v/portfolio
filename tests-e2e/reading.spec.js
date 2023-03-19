const { test, expect } = require('@playwright/test');
const {TITLE_404_PAGE} = require("./404.spec");
const AxeBuilder = require('@axe-core/playwright').default;

test.describe('Reading lists page', () => {

	const pageLink = '/research';

	test.beforeEach(async ({ page }) => await page.goto(pageLink));

	test('renders', async ({ page }) => {
		await expect(page).toHaveScreenshot({fullPage: true, scale: 'css'});
	});

	test('no automatically detectable accessibility issues', async ({ page }) => {
		const scanResults = await new AxeBuilder({ page }).analyze();
		expect (scanResults.violations).toEqual([]);
	});

	test('has intro', async ({ page }) => {
		await expect(page).toHaveTitle("Mobi's Reading Lists");
		await expect(page.getByRole('heading', { name: "Mobi's Reading Lists" })).toBeVisible();
	});

	test('no dead links', async ({ page }) => {

		const links = await page.getByRole('link');

		await expect(links).toHaveCount(3);

		for (const link of await links.all()) {
			await link.click();
			await expect(page).not.toHaveTitle(TITLE_404_PAGE);
			await page.goto(pageLink);
		}
	});

	test('has content', async ({ page }) => {
		await expect(page.getByRole('listitem')).toHaveCount(2);
	});

});
