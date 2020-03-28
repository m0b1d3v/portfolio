import { environment } from "portfolio/scripts/environment";
import { ErrorMonitor } from "shared/scripts/error-monitor";

// Start the error watcher for the production environment
if (environment.production) {
	new ErrorMonitor("https://0e3157e4be3249678b85fd9d879b9538@sentry.io/5178458");
}

// Load our service worker to enable PWA functionality
if ("serviceWorker" in navigator) {
	window.addEventListener("load", () => {
		navigator.serviceWorker.register("service-worker.js").then();
	});
}
