import { Fixture } from "./fixture";

const { test, expect } = require('@playwright/test');

const pageLink = '/404';

test.describe(pageLink, () => {

	let fixture;

	test.beforeEach(async ({ page }) => {
		await page.goto(pageLink);
		fixture = new Fixture(page);
	});

	test('accessibility', () => fixture.accessibility());
	test('renders', () => fixture.screenshot());
	test('title', () => fixture.title("Mobi's Lost and Found"));
	test('heading', () => fixture.heading('What you are looking for is not here'));
	test('dead links', () => fixture.checkForDeadLinks(pageLink, 2));

	test('has content', async ({ page }) => {
		await expect(page
			.getByRole('paragraph')
			.filter({ hasText: 'what you are looking for' })
			.getByRole('link', { name: 'home page'})
		).toBeVisible();
	});

});
