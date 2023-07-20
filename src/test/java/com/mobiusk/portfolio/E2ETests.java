package com.mobiusk.portfolio;

import com.deque.html.axecore.playwright.AxeBuilder;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.options.AriaRole;
import com.microsoft.playwright.options.ScreenshotScale;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.EnumSource;

import java.nio.file.Paths;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

class E2ETests extends TestBase {

	@ParameterizedTest
	@EnumSource(PageEnum.class)
	void accessibility(PageEnum pageEnum) {

		navigate(pageEnum);

		var axeBuilder = new AxeBuilder(page);
		var accessibilityScanResults = axeBuilder.analyze();

		assertTrue(accessibilityScanResults.violationFree());
	}

	@ParameterizedTest
	@EnumSource(PageEnum.class)
	void description(PageEnum pageEnum) {

		navigate(pageEnum);

		var description = page.locator("meta[name=\"description\"]");
		var descriptionContent = description.getAttribute("content");

		assertEquals(pageEnum.getDescription(), descriptionContent);
	}

	@ParameterizedTest
	@EnumSource(PageEnum.class)
	void heading(PageEnum pageEnum) {

		navigate(pageEnum);

		var getByRoleOptions = new Page.GetByRoleOptions();
		getByRoleOptions.setName(pageEnum.getHeading());
		var heading = page.getByRole(AriaRole.HEADING, getByRoleOptions);

		assertTrue(heading.isVisible());
	}

	@ParameterizedTest
	@EnumSource(PageEnum.class)
	void screenshotDesktop(PageEnum pageEnum) {

		navigate(pageEnum);

		var screenshotFileName = formatPageLinkForFileName(pageEnum);
		var destination = String.format("build/test-results/screenshots/%s.png", screenshotFileName);

		var screenshotOptions = new Page.ScreenshotOptions();
		screenshotOptions.scale = ScreenshotScale.CSS;
		screenshotOptions.setPath(Paths.get(destination));

		var screenshotBytes = page.screenshot(screenshotOptions);

		assertNotNull(screenshotBytes);
	}

	@ParameterizedTest
	@EnumSource(PageEnum.class)
	void title(PageEnum pageEnum) {

		navigate(pageEnum);

		assertEquals(pageEnum.getTitle(), page.title());
	}

	// Test utility method(s)

	private void navigate(PageEnum pageEnum) {
		page.navigate(pageEnum.getLink());
	}

	private String formatPageLinkForFileName(PageEnum pageEnum) {

		var fileName = pageEnum.getLink();
		fileName = fileName.replaceAll("/", "-");
		fileName = fileName.substring(1); // All links should start with '/'

		if (fileName.isEmpty()) {
			fileName = "home";
		}

		return fileName;
	}

}
