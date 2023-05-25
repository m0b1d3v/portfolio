const {expect} = require("@playwright/test");
const {default: AxeBuilder} = require("@axe-core/playwright");

export class Fixture {

	/**
	 * @param {import('@playwright/test').Page} page - Playwright page being tested
	 */
	constructor(page) {
		this.page = page;
	}

	/**
	 * Run Axe accessibility test engine
	 */
	async accessibility() {
		const scanResults = await new AxeBuilder({ page: this.page }).analyze();
		expect (scanResults.violations).toEqual([]);
	}

	/**
	 * Take a screenshot of the entire page
	 */
	async screenshot() {
		await expect(this.page).toHaveScreenshot('', {fullPage: true, scale: 'css'});
	}

	/**
	 * Is the tab title what we expect?
	 *
	 * @param {string} expected - Head title tag
	 */
	async title(expected) {
		await expect(this.page).toHaveTitle(expected);
	}

	/**
	 * Is the first heading of the page what we expect and visible?
	 *
	 * @param {string } expected - Heading text
	 */
	async heading(expected) {
		await expect(this.page.getByRole('heading', { name: expected })).toBeVisible();
	}

	/**
	 * Is the meta description tag of the page what we expect?
	 *
	 * @param {string} expected - Head meta description tag content
	 */
	async description(expected) {
		await expect(this.page.locator('meta[name="description"]')).toHaveAttribute('content', expected);
	}

	/**
	 * Given a Playwright locator to find links with, ensure that the given count is found and none 404
	 *
	 * @param {string} pageLink - Absolute href to return to after clicking each found link
	 * @param {int} expectedLinkCount - How many links should match the given locator
	 * @param {{name?: string|RegExp}} locatorOptions - Extra locator options to pass for narrowing down links found on page
	 */
	async checkForDeadLinks(
		pageLink,
		expectedLinkCount,
		locatorOptions = {}
	) {

		const links = await this.page.getByRole('link', locatorOptions);

		await expect(links).toHaveCount(expectedLinkCount);

		for (const link of await links.all()) {

			let linkText = await link.textContent();
			if ("Email" === linkText) {
				continue;
			}

			await link.click();
			await expect(this.page).not.toHaveTitle("Mobi's Lost and Found");
			await this.page.goto(pageLink);
		}
	}

}
