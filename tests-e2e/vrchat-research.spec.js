const { test } = require('@playwright/test');
const {Fixture} = require("./fixture");

const pageLink = '/vrchat/research';

test.describe(pageLink, () => {

	let fixture;

	test.beforeEach(async ({ page }) => {
		await page.goto(pageLink);
		fixture = new Fixture(page);
	});

	test('accessibility', () => fixture.accessibility());
	test('renders', () => fixture.screenshot());
	test('title', () => fixture.title("Mobi's VRChat Research"));
	test('heading', () => fixture.heading("Mobi's VRChat Research"));
	test('description', () => fixture.description("Useful information for VRChat creation"));
	test('dead links', () => fixture.checkForDeadLinks(pageLink, 1, { name: 'Go back' }));

});
