package com.mobiusk.portfolio;

import com.deque.html.axecore.playwright.AxeBuilder;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.options.AriaRole;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.EnumSource;

import static org.junit.jupiter.api.Assertions.assertEquals;
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
	void title(PageEnum pageEnum) {

		navigate(pageEnum);

		assertEquals(pageEnum.getTitle(), page.title());
	}

	// Test utility method(s)
	private void navigate(PageEnum pageEnum) {
		page.navigate(pageEnum.getLink());
	}

}
