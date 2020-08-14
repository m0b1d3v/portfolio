import { environment } from "portfolio/scripts/environment";
// import { ErrorMonitor } from "shared/scripts/error-monitor";

if (environment.production) {

	// Start the error watcher
	// This only needs to be enabled when significant scripting is added (don't forget to include the CDN script tag)
	// new ErrorMonitor("https://0e3157e4be3249678b85fd9d879b9538@o127434.ingest.sentry.io/5178458");

	// Load our service worker to enable PWA functionality
	if ("serviceWorker" in navigator) {
		window.addEventListener("load", () => {
			navigator.serviceWorker.register("/service-worker.js").then();
		});
	}

}
