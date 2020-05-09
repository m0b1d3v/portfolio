import { ServiceWorkerCache } from "shared/scripts/service-worker-cache";

// Identifier used to ensure browsers are caching the right version of assets
const cacheId = "5";

// Cache manipulator
const cache: ServiceWorkerCache = new ServiceWorkerCache(cacheId);

// @ts-ignore Install the service worker and cache any files for offline use
self.addEventListener("install", (event: InstallEvent) => {

	event.waitUntil(cache.add([
		"/404.html",
		"/favicon.ico",
		"/icon.png",
		"/index.html",
		"/manifest.json",
		"/offline.html",
		"/portfolio.css",
		"/portfolio.js",
		"/robots.txt",
	]));

	// @ts-ignore Don't require browsers to close and re-open tab
	self.skipWaiting();
});

// @ts-ignore Activate the service worker and remove previous caches
self.addEventListener("activate", (event: ExtendableEvent) => event.waitUntil(
	cache.delete((id: string) => id != cacheId)
));

// @ts-ignore Response priority: Cache > Network (cache after) > Offline message
self.addEventListener("fetch", (event: FetchEvent) => event.respondWith(
	cache.fetchOrFallback(
		event.request,
		async (request: Request) => cache.put(request, await fetch(request)),
		() => cache.match("/offline.html")
	)
));
