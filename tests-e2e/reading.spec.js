const { test, expect } = require('@playwright/test');
const {coverBasics, checkDeadLinks} = require("./util-e2e");

const pageLink = '/research';

test.describe(pageLink, () => {

	test.beforeEach(async ({ page }) => await page.goto(pageLink));

	coverBasics(test, "Mobi's Reading Lists", "Mobi's Reading Lists");

	checkDeadLinks(test, pageLink, 2);

	test('has content', async ({ page }) => {
		await expect(page.getByRole('listitem')).toHaveCount(1);
	});

});
