import { ServiceWorkerCache } from "shared/scripts/service-worker-cache";

/* eslint-disable @typescript-eslint/ban-ts-comment */

// Cache manipulator
const cache: ServiceWorkerCache = new ServiceWorkerCache("replaceAtBuildWithDate");

// @ts-ignore Install the service worker and cache any files for offline use
self.addEventListener("install", (event: InstallEvent) => event.waitUntil(
	cache.initialize([
		"/404.html",
		"/favicon.ico",
		"/icon.png",
		"/index.html",
		"/manifest.json",
		"/offline.html",
		"/portfolio.css",
		"/portfolio.js",
		"/robots.txt",
	]).then(() =>
		// @ts-ignore New service workers require a tab close and re-open to activate without this
		self.skipWaiting()
	)
));

// @ts-ignore Activate the service worker and remove previous caches
self.addEventListener("activate", (event: ExtendableEvent) => event.waitUntil(
	cache.deletePreviousCaching().then(() =>
		// @ts-ignore New service workers can immediately take control over current service workers
		self.clients.claim()
	)
));

// @ts-ignore Response priority: Cache > Network > Offline message
self.addEventListener("fetch", (event: FetchEvent) => event.respondWith(
	cache.fetchOrFallback(
		event.request,
		() => fetch(event.request),
		() => cache.match("/offline.html")
	)
));
