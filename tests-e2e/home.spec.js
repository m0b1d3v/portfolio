const { test, expect } = require('@playwright/test');
const {Fixture} = require("./fixture");

const pageLink = '/';

test.describe(pageLink, () => {

	let fixture;

	test.beforeEach(async ({ page }) => {
		await page.goto(pageLink);
		fixture = new Fixture(page);
	});

	test('accessibility', () => fixture.accessibility());
	test('renders', () => fixture.screenshot());
	test('title', () => fixture.title("Hi, I'm Mobi"));
	test('heading', () => fixture.heading("Hi, I'm Mobi"));
	test('dead links', () => fixture.checkForDeadLinks(pageLink, 12, {}));

	test('has content', async ({ page }) => {

		const expectedHeadings = ['Projects', 'Code', 'VRChat', 'Work', 'Links'];

		for (const heading of expectedHeadings) {
			await expect(page.getByRole('heading', { name: heading })).toBeVisible();
		}

		await expect(page.getByRole('list')).toHaveCount(expectedHeadings.length);

	});

});
