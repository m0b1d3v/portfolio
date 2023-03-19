const { test, expect } = require('@playwright/test');
const {coverBasics, checkDeadLinks} = require("./util-e2e");

const pageLink = '/research/code';

test.describe(pageLink, () => {

	test.beforeEach(async ({ page }) => await page.goto(pageLink));

	coverBasics(test, "Mobi's Code Research", "Mobi's Code Research");

	checkDeadLinks(test, pageLink, 1, { name: 'Go back' });

	test('has content', async ({ page }) => {
		const expectedEntries = 4;
		await expect(page.getByRole('heading')).toHaveCount(expectedEntries + 1); // +1 for page header
		await expect(page.getByRole('paragraph')).toHaveCount(expectedEntries + 1); // +1 for page description
	});

});
