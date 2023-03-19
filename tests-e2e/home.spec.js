const { test, expect } = require('@playwright/test');
const {coverBasics, checkDeadLinks} = require("./util-e2e");

const pageLink = '/';

test.describe(pageLink, () => {

	test.beforeEach(async ({ page }) => await page.goto(pageLink));

	coverBasics(test, "Hi, I'm Mobi", "Hi, I'm Mobi");

	checkDeadLinks(
		test,
		pageLink,
		6,
		{},
		['Email', 'Discord', 'Github', 'Twitter']
	);

	test('has content', async ({ page }) => {

		const expectedHeadings = ['Projects', 'Work', 'Links'];

		for (const heading of expectedHeadings) {
			await expect(page.getByRole('heading', { name: heading })).toBeVisible();
		}

		await expect(page.getByRole('list')).toHaveCount(expectedHeadings.length);

	});

});
