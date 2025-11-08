const CACHE_NAME = 'congreso-tic-cache-v2';

self.addEventListener('install', event => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') {
    return;
  }

  // Network-first strategy
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // If we get a valid response, clone it and cache it
        if (response && response.status === 200) {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });
        }
        return response;
      })
      .catch(() => {
        // If the network fails, try to get it from the cache
        return caches.match(event.request);
      })
  );
});
