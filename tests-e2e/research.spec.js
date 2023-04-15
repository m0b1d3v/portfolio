const { test, expect } = require('@playwright/test');
const {Fixture} = require("./fixture");

const pageLink = '/research';

test.describe(pageLink, () => {

	let fixture;

	test.beforeEach(async ({ page }) => {
		await page.goto(pageLink);
		fixture = new Fixture(page);
	});

	test('accessibility', () => fixture.accessibility());
	test('renders', () => fixture.screenshot());
	test('title', () => fixture.title("Mobi's Research Lists"));
	test('heading', () => fixture.heading("Mobi's Research Lists"));
	test('dead links', () => fixture.checkForDeadLinks(pageLink, 2));

	test('has content', async ({ page }) => {
		await expect(page.getByRole('listitem')).toHaveCount(1);
	});

});
