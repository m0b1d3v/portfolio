const { test } = require('@playwright/test');
const {coverBasics, checkDeadLinks} = require("../tests-e2e/util-e2e");

const pageLink = '/';

test.describe(pageLink, () => {

	test.beforeEach(async ({ page }) => await page.goto(pageLink));

	coverBasics(test, 'New page', 'New page');

	checkDeadLinks(test, pageLink, 0);

});
