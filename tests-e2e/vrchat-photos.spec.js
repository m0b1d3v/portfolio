const { test, expect } = require('@playwright/test');
const {Fixture} = require("./fixture");

const pageLink = '/projects/vrchat/photos';

test.describe(pageLink, () => {

	let fixture;

	test.beforeEach(async ({ page }) => {
		await page.goto(pageLink);
		fixture = new Fixture(page);
	});

	test('accessibility', () => fixture.accessibility());
	test('renders', async ({ page }) => await expect(page).toHaveScreenshot());
	test('title', () => fixture.title("Mobi's VRChat Photos"));
	test('heading', () => fixture.heading("VRChat Photos"));
	test('description', () => fixture.description("Photos of friends and myself"));
	test('dead links', () => fixture.checkForDeadLinks(pageLink, 1, { name: 'Go back' }));
	test('later images lazily load', () => fixture.laterImagesLazyLoad());

});
