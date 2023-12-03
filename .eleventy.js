module.exports = function(eleventy) {

	eleventy.addPassthroughCopy({ "site/static/.well-known": "/.well-known" });
	eleventy.addPassthroughCopy({ "site/static/favicons": "/favicons" });
	eleventy.addPassthroughCopy({ "site/static/*": "/" });

	// Return your Object options:
	return {
		dir: {
			input: "site"
		}
	}
};
