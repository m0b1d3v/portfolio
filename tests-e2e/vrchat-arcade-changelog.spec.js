const { test, expect } = require('@playwright/test');
const {Fixture} = require("./fixture");

const pageLink = '/vrchat/arcade/changelog';

test.describe(pageLink, () => {

	let fixture;

	test.beforeEach(async ({ page }) => {
		await page.goto(pageLink);
		fixture = new Fixture(page);
	});

	test('accessibility', () => fixture.accessibility());
	test('renders', async ({ page }) => await expect(page).toHaveScreenshot());
	test('title', () => fixture.title("The Arcade Change Log"));
	test('heading', () => fixture.heading("The Arcade Change Log"));
	test('description', () => fixture.description("Small history of map work"));
	test('dead links', () => fixture.checkForDeadLinks(pageLink, 1, { name: 'Go back' }))

});
