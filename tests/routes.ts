import {Route} from "./route";

export const routes: Record<string, Route> = {
	error404: {
		description: "This page cannot be found.",
		heading: "What you are looking for is not here",
		link: "/404",
		title: "M0b1's lost and found",
	},
	home: {
		description: "I write code and enjoy virtual reality.",
		heading: "Hi, I'm m0b1!",
		link: "/",
		title: "Hi, I'm m0b1!",
	},
	photos: {
		description: "Exploring another reality.",
		heading: "Photos",
		link: "/photos",
		title: "M0b1's photos",
	},
	research: {
		description: "Useful collected information.",
		heading: "Research",
		link: "/research",
		title: "M0b1's research",
	},
};
