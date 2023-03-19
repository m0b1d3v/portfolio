const { test, expect } = require('@playwright/test');
const {TITLE_404_PAGE} = require("./404.spec");
const AxeBuilder = require("@axe-core/playwright").default;

test.describe('Home page', () => {

	const pageLink = '/';

	test.beforeEach(async ({ page }) => await page.goto(pageLink));

	test('renders', async ({ page }) => {
		await expect(page).toHaveScreenshot({fullPage: true, scale: 'css'});
	});

	test('no automatically detectable accessibility issues', async ({ page }) => {
		const scanResults = await new AxeBuilder({ page }).analyze();
		expect (scanResults.violations).toEqual([]);
	});

	test('has intro', async ({ page }) => {
		await expect(page).toHaveTitle("Hi, I'm Mobi");
		await expect(page.getByRole('heading', { name: "Hi, I'm Mobi" })).toBeVisible();
	});

	test('no dead links', async ({ page }) => {

		const links = await page.getByRole('link');

		await expect(links).toHaveCount(7);

		const textNotToClick = ['Email', 'Discord', 'Github', 'Twitter'];

		for (const link of await links.all()) {

			let linkText = await link.textContent();
			if (textNotToClick.includes(linkText)) {
				continue;
			}

			await link.click();
			await expect(page).not.toHaveTitle(TITLE_404_PAGE);
			await page.goto(pageLink);
		}
	});

	test('has content', async ({ page }) => {

		const expectedHeadings = ['Projects', 'Work', 'Links'];

		for (const heading of expectedHeadings) {
			await expect(page.getByRole('heading', { name: heading })).toBeVisible();
		}

		await expect(page.getByRole('list')).toHaveCount(expectedHeadings.length);

	});

});
