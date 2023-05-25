const { test, expect } = require('@playwright/test');
const {Fixture} = require("./fixture");

const pageLink = '/code/vrsvp';

test.describe(pageLink, () => {

	let fixture;

	test.beforeEach(async ({ page }) => {
		await page.goto(pageLink);
		fixture = new Fixture(page);
	});

	test('accessibility', () => fixture.accessibility());
	test('renders', () => fixture.screenshot());
	test('title', () => fixture.title("VRSVP"));
	test('heading', () => fixture.heading("VRSVP"));
	test('description', () => fixture.description("Discord schedule sign-up bot"));
	test('dead links', () => fixture.checkForDeadLinks(pageLink, 1, { name: 'Go back' }));

});
