package com.mobiusk.portfolio;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum PageEnum {

	ERROR_404(
		"/404",
		"Mobi's Lost and Found",
		"What you are looking for is not here",
		"Requested page not found"
	),

	HOME(
		"/",
		"Hi, I'm Mobi",
		"Hi, I'm Mobi",
		"Personal projects and interests"
	),

	PROJECTS_CODE_RESEARCH(
		"/projects/code-research",
		"Mobi's Code Research",
		"Code Research",
		"Useful information for programming"
	),

	PROJECTS_VRCHAT(
		"/projects/vrchat",
		"Mobi's VRChat Projects",
		"VRChat Projects",
		"Exploring a Meta-verse"
	),

	PROJECTS_VRCHAT_ARCADE(
		"/projects/vrchat/arcade",
		"The Arcade",
		"The Arcade",
		"One of my first social clubs in VRChat"
	),

	PROJECTS_VRCHAT_ARCADE_CHANGELOG(
		"/projects/vrchat/arcade/changelog",
		"The Arcade Change Log",
		"The Arcade Change Log",
		"Small history of map work"
	),

	PROJECTS_VRCHAT_PHOTOS(
		"/projects/vrchat/photos",
		"Mobi's VRChat Photos",
		"VRChat Photos",
		"Photos of friends and myself"
	),

	PROJECTS_VRCHAT_RESEARCH(
		"/projects/vrchat/research",
		"Mobi's VRChat Research",
		"VRChat Research",
		"Useful information for VRChat creation"
	),

	PROJECTS_VRSVP(
		"/projects/vrsvp",
		"VRSVP",
		"VRSVP",
		"Discord schedule sign-up bot"
	),

	PROJECTS_VRSVP_CHANGELOG(
		"/projects/vrsvp/changelog",
		"VRSVP Change Log",
		"VRSVP Change Log",
		"History of Discord bot work"
	);

	private final String link;
	private final String title;
	private final String heading;
	private final String description;

}
