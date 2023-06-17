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
	test('description', () => fixture.description("Personal projects and interests"));

});
