const {defineConfig, devices} = require('@playwright/test');

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({

	// Directory to recursively scan for test files
	testDir: './tests-e2e',

	/**
	 * Shared settings for all the projects below.
	 *
	 * @see https://playwright.dev/docs/api/class-testoptions.
	 */
	use: {

		// Base URL to use in actions like `await page.goto('/')`
		baseURL: 'http://localhost:5000',

		/**
		 * Collect trace when retrying the failed test.
		 * @see https://playwright.dev/docs/trace-viewer
		 */
		trace: 'on-first-retry',
	},

	// Configure projects for major browsers
	projects: [
		{ name: 'chromium', use: {...devices['Desktop Chrome']}},
		{ name: 'firefox', use: {...devices['Desktop Firefox']}},
		{ name: 'webkit', use: {...devices['Desktop Safari']}},
		{ name: 'Mobile Chrome', use: {...devices['Pixel 5']}},
		{ name: 'Mobile Safari', use: {...devices['iPhone 12']}},
	],

	// Folder for test artifacts such as screenshots, videos, traces, etc.
	outputDir: 'tests-e2e/results/',

	// Run your local dev server before starting the tests
	webServer: {
	  command: 'npm run start',
	  port: 5000,
	},

});

