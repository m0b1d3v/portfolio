const yaml = require("js-yaml");

module.exports = function(eleventy) {

	eleventy.addDataExtension("yaml", contents => yaml.load(contents));

	eleventy.addPassthroughCopy({
		"static/favicons": "/favicons",
		"static/*": "/",
	});

	// Return your Object options:
	return {
		dir: {
			input: ""
		}
	}
};
