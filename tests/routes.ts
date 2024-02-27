import {Route} from "./route";

export const routes: Record<string, Route> = {
	error404: {
		description: "This page cannot be found.",
		heading: "What you are looking for is not here",
		link: "/404",
		title: "m0b1.dev/404",
	},
	home: {
		description: "I write code and enjoy virtual reality.",
		heading: "m0b1.dev",
		link: "/",
		title: "m0b1.dev",
	},
	photos: {
		description: "Exploring another reality.",
		heading: "Photos",
		link: "/photos",
		title: "m0b1.dev/photos",
	},
	research: {
		description: "Useful collected information.",
		heading: "Research",
		link: "/research",
		title: "m0b1.dev/research",
	},
};
