import {expect, test} from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const routes = [
	"/",
	"/404",
	"/photos",
	"/photos/tags",
	"/photos/concrete",
	"/photos/2025-04-19-concrete-pale-sands"
];

for (let route of routes) {

	test.describe(route, () => {

		test.beforeEach(async ({page}) => {
			await page.goto(route);
		});

		if (route != "/404") {
			test('loaded', async({page}) => {
				await expect(page).not.toHaveTitle('m0b1.dev/404');
			});
		}

		test('accessibility', async ({page}) => {
			const axe = new AxeBuilder({ page });
			const result = await axe.analyze();
			expect(result.violations).toEqual([]);
		});

		test('screenshot', async ({page}) => {
			await page.screenshot({
				path: `./test-results/${route}.png`,
				scale: 'css',
			})
		});

		if (route != '/') {
			test('back-link', async ({page}) => {

				const link = page.getByTitle('Return');

				await expect(link).toBeVisible();
				await link.click();
				await expect(page).not.toHaveTitle('m0b1.dev/404');
			});
		}

	});
}
