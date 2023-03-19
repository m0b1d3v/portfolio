import {TITLE_404_PAGE} from "./404.spec";

const {expect} = require("@playwright/test");
const {default: AxeBuilder} = require("@axe-core/playwright");

/**
 * Run visual regression, accessibility, title, and main heading checks
 *
 * @param {any} test - Playwright test object
 * @param {string} title - Page head tag for title
 * @param {string} mainHeading - First h1 tag in page
 */
export function coverBasics(test, title, mainHeading) {

	test('renders', async ({ page }) => {
		await expect(page).toHaveScreenshot({fullPage: true, scale: 'css'});
	});

	test('no automatically detectable accessibility issues', async ({ page }) => {
		const scanResults = await new AxeBuilder({ page }).analyze();
		expect (scanResults.violations).toEqual([]);
	});

	test('has intro', async ({ page }) => {
		await expect(page).toHaveTitle(title);
		await expect(page.getByRole('heading', { name: mainHeading })).toBeVisible();
	});

}

/**
 * Given a Playwright locator to find links with, ensure that the given count is found and none 404
 *
 * @param {any} test - Playwright test object
 * @param {string} pageLink - Absolute href to return to after clicking each found link
 * @param {int} expectedLinkCount - How many links should match the given locator
 * @param {{name?: string|RegExp}} locatorOptions - Extra locator options to pass for narrowing down links found on page
 * @param {array<string>} avoidLinksWithThisText - Links to include in expectedLinkCount but not to be clicked on
 */
export function checkDeadLinks(
	test,
	pageLink,
	expectedLinkCount,
	locatorOptions = {},
	avoidLinksWithThisText = []
) {
	test('no dead links', async ({ page }) => {

		const links = await page.getByRole('link', locatorOptions);

		await expect(links).toHaveCount(expectedLinkCount);

		for (const link of await links.all()) {

			let linkText = await link.textContent();
			if (avoidLinksWithThisText.includes(linkText)) {
				continue;
			}

			await link.click();
			await expect(page).not.toHaveTitle(TITLE_404_PAGE);
			await page.goto(pageLink);
		}
	});
}


