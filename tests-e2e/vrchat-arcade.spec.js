const { test, expect } = require('@playwright/test');
const {Fixture} = require("./fixture");

const pageLink = '/vrchat/arcade';

test.describe(pageLink, () => {

	let fixture;

	test.beforeEach(async ({ page }) => {
		await page.goto(pageLink);
		fixture = new Fixture(page);
	});

	test('accessibility', () => fixture.accessibility());
	test('renders', async ({ page }) => await expect(page).toHaveScreenshot());
	test('title', () => fixture.title("The Arcade"));
	test('heading', () => fixture.heading("The Arcade"));
	test('description', () => fixture.description("One of my first social clubs in VRChat"));
	test('dead links', () => fixture.checkForDeadLinks(pageLink, 1, { name: 'Go back' }));

	test('changelog link', () => fixture.checkForDeadLinks(pageLink, 1, { name: 'change log' }));

	test('later images lazily load', async ({ page }) => {

		const imagesLocator = await page.getByRole('img');
		const images = await imagesLocator.all();

		for (let imageCounter = 0; imageCounter < images.length; imageCounter++) {

			const image = images[imageCounter];
			const loading = await image.getAttribute('loading');

			if (imageCounter < 3) {
				await expect(loading).toBeNull();
			} else {
				await expect(loading).toBe('lazy');
			}
		}
	});

});
