const { test, expect } = require('@playwright/test');
const {coverBasics, checkDeadLinks} = require("./util-e2e");

const pageLink = '/research/programming';

test.describe(pageLink, () => {

	test.beforeEach(async ({ page }) => await page.goto(pageLink));

	coverBasics(test, "Mobi's Programming Reading", "Mobi's Programming Reading");

	checkDeadLinks(test, pageLink, 1, { name: 'Go back' });

	test('has content', async ({ page }) => {
		const expectedEntries = 4;
		await expect(page.getByRole('heading')).toHaveCount(expectedEntries + 1); // +1 for page header
		await expect(page.getByRole('paragraph')).toHaveCount(expectedEntries + 1); // +1 for page description
	});

});
