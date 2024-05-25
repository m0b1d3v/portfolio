import {expect, test} from "@playwright/test";
import {routes} from "./routes";
import AxeBuilder from "@axe-core/playwright";

for (let routeKey in routes) {

	const route = routes[routeKey];

	test.describe(routeKey, () => {

		test.beforeEach(async ({page}) => {
			await page.goto(route.link);
		});

		test('title', async ({page}) => {
			await expect(page).toHaveTitle(route.title);
		});

		test('description', async ({page}) => {
			const description = await page.locator('meta[name=\"description\"]').getAttribute('content');
			expect(description).toEqual(route.description);
		});

		test('heading', async ({page}) => {
			const heading = page.getByRole('heading', {name: route.heading});
			await expect(heading).toBeVisible();
		});

		test('accessibility', async ({page}) => {
			const axe = new AxeBuilder({ page });
			const result = await axe.analyze();
			expect(result.violations).toEqual([]);
		});

		test('screenshot', async ({page}) => {
			await page.screenshot({
				path: `./test-results/${routeKey}.png`,
				scale: 'css',
			})
		});

		if (routeKey != 'home') {
			test('back-link', async ({page}) => {

				const link = page.getByRole('link', {name: 'Go Back'});

				await expect(link).toBeVisible();
				await link.click();
				await expect(page).not.toHaveTitle(routes['error404'].title);
			});
		}

	});
}
