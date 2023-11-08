package dev.m0b1.portfolio;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum PageEnum {

	ERROR_404(
		"/404",
		"M0b1's Lost and Found",
		"What you are looking for is not here",
		"Requested page not found"
	),

	HOME(
		"/",
		"Hi, I'm m0b1.",
		"Hi, I'm m0b1.",
		"Some code, a lot of virtual reality."
	),

	RESEARCH(
		"/research",
		"M0b1's Research",
		"Research",
		"Useful collected information"
	),

	PHOTOS(
		"/photos",
		"M0b1's Photos",
		"Photos",
		"Exploring another reality"
	);

	private final String link;
	private final String title;
	private final String heading;
	private final String description;

}
