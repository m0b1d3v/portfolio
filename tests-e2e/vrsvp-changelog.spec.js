const { test, expect } = require('@playwright/test');
const {Fixture} = require("./fixture");

const pageLink = '/projects/vrsvp/changelog';

test.describe(pageLink, () => {

	let fixture;

	test.beforeEach(async ({ page }) => {
		await page.goto(pageLink);
		fixture = new Fixture(page);
	});

	test('accessibility', () => fixture.accessibility());
	test('renders', () => fixture.screenshot());
	test('title', () => fixture.title("VRSVP Change Log"));
	test('heading', () => fixture.heading("VRSVP Change Log"));
	test('description', () => fixture.description("History of Discord bot work"));
	test('dead links', () => fixture.checkForDeadLinks(pageLink, 1, { name: 'Go back' }));

});
