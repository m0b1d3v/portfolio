import {checkDeadLinks, coverBasics} from "./util-e2e";

const { test, expect } = require('@playwright/test');

export const TITLE_404_PAGE = "Mobi's Lost and Found";

const pageLink = '/404';

test.describe(pageLink, () => {

	test.beforeEach(async ({ page }) => await page.goto(pageLink));

	coverBasics(test, TITLE_404_PAGE, 'What you are looking for is not here');

	checkDeadLinks(test, pageLink, 2);

	test('has content', async ({ page }) => {
		await expect(page
			.getByRole('paragraph')
			.filter({ hasText: 'what you are looking for' })
			.getByRole('link', { name: 'home page'})
		).toBeVisible();
	});

});
