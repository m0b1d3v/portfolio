const { test, expect } = require('@playwright/test');
const {TITLE_404_PAGE} = require("./404.spec");
const AxeBuilder = require('@axe-core/playwright').default;

test.describe('Programming readings page', () => {

	const pageLink = '/research/programming';

	test.beforeEach(async ({ page }) => await page.goto(pageLink));

	test('renders', async ({ page }) => {
		await expect(page).toHaveScreenshot({fullPage: true, scale: 'css'});
	});

	test('no automatically detectable accessibility issues', async ({ page }) => {
		const scanResults = await new AxeBuilder({ page }).analyze();
		expect (scanResults.violations).toEqual([]);
	});

	test('has intro', async ({ page }) => {
		await expect(page).toHaveTitle("Mobi's Programming Reading");
		await expect(page.getByRole('heading', { name: "Mobi's Programming Reading" })).toBeVisible();
	});

	test('no dead links', async ({ page }) => {

		const links = await page.getByRole('link', { name: 'Go back' });

		await expect(links).toHaveCount(1);

		for (const link of await links.all()) {
			await link.click();
			await expect(page).not.toHaveTitle(TITLE_404_PAGE);
			await page.goto(pageLink);
		}
	});

	test('has content', async ({ page }) => {
		const expectedEntries = 4;
		await expect(page.getByRole('heading')).toHaveCount(expectedEntries + 1); // +1 for page header
		await expect(page.getByRole('paragraph')).toHaveCount(expectedEntries + 1); // +1 for page description
	});

});
