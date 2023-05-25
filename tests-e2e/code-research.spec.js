const { test, expect } = require('@playwright/test');
const {Fixture} = require("./fixture");

const pageLink = '/code/research';

test.describe(pageLink, () => {

	let fixture;

	test.beforeEach(async ({ page }) => {
		await page.goto(pageLink);
		fixture = new Fixture(page);
	});

	test('accessibility', () => fixture.accessibility());
	test('renders', () => fixture.screenshot());
	test('title', () => fixture.title("Mobi's Code Research"));
	test('heading', () => fixture.heading("Mobi's Code Research"));
	test('description', () => fixture.description("Useful information for programming"));
	test('dead links', () => fixture.checkForDeadLinks(pageLink, 1, { name: 'Go back' }));

	test('has content', async ({ page }) => {
		const expectedEntries = 4;
		await expect(page.getByRole('heading')).toHaveCount(expectedEntries + 1); // +1 for page header
		await expect(page.getByRole('paragraph')).toHaveCount(expectedEntries + 1); // +1 for page description
	});

});
