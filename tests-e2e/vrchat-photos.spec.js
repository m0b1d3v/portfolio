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
	test('heading', () => fixture.heading("Mobi's VRChat Photos"));
	test('description', () => fixture.description("Albums I've taken of friends and myself"));
	test('dead links', () => fixture.checkForDeadLinks(pageLink, 1, { name: 'Go back' }));

	test('albums have images and captions', async ({ page }) => {
		const albumsLocator = await page.getByRole('figure');
		for (const album of await albumsLocator.all()) {
			await expect(album.getByRole('img')).toHaveCount(1);
			await expect(album.getByText('Album')).toHaveCount(1);
		}
	});

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
