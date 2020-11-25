import {ServiceWorkerCache} from "shared/scripts/service-worker-cache";

const serviceWorkerCache: ServiceWorkerCache = new ServiceWorkerCache("");
serviceWorkerCache.unregisterServiceWorker();
