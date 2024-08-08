module.exports = function(eleventy) {

	eleventy.addPassthroughCopy({
		"site/static/.well-known": "/.well-known",
		"site/static/favicons": "/favicons",
		"site/static/*": "/",
	});

	// Return your Object options:
	return {
		dir: {
			input: "site"
		}
	}
};
