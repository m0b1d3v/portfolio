const { test } = require('@playwright/test');
const {Fixture} = require("./fixture");

const pageLink = '/projects/vrchat';

test.describe(pageLink, () => {

	let fixture;

	test.beforeEach(async ({ page }) => {
		await page.goto(pageLink);
		fixture = new Fixture(page);
	});

	test('accessibility', () => fixture.accessibility());
	test('renders', () => fixture.screenshot());
	test('title', () => fixture.title("Mobi's VRChat Projects"));
	test('heading', () => fixture.heading("VRChat Projects"));
	test('description', () => fixture.description("Exploring a Meta-verse"));
	test('dead links', () => fixture.checkForDeadLinks(pageLink, 1, { name: 'Go back' }));

});
