package com.mobiusk.portfolio;

import com.microsoft.playwright.Browser;
import com.microsoft.playwright.BrowserContext;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.Playwright;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;

public abstract class TestBase {

	protected static Playwright playwright;
	protected static Browser browser;
	protected static BrowserContext browserContext;

	protected Page page;

	@BeforeAll
	static void beforeAll() {

		var newContextOptions = new Browser.NewContextOptions();
		newContextOptions.baseURL = "http://localhost:2015";

		playwright = Playwright.create();
		browser = playwright.firefox().launch();
		browserContext = browser.newContext(newContextOptions);
	}

	@BeforeEach
	void beforeEach() {
		page = browserContext.newPage();
	}

	@AfterEach
	void afterEach() {
		page.close();
	}

	@AfterAll
	static void afterAll() {
		browserContext.close();
		browser.close();
		playwright.close();
	}

}
