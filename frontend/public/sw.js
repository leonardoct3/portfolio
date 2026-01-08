const CACHE_NAME = 'site-cache-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/apple-touch-icon.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
        console.log('Opened cache');
        return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  // Navigation requests: try network, fallback to cache, fallback to index.html (SPA)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          return caches.match(event.request)
            .then(cached => cached || caches.match('/index.html'));
        })
    );
    return;
  }

  // Other requests: Cache First, fallback to network and cache
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) {
        return cached;
      }
      return fetch(event.request).then(response => {
        // Build response clone to cache
        // Check if we received a valid response
        if(!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // Cache JS and CSS files dynamically
        if (event.request.url.endsWith('.js') || event.request.url.endsWith('.css') || event.request.url.includes('assets')) {
             const responseToCache = response.clone();
             caches.open(CACHE_NAME).then(cache => {
               cache.put(event.request, responseToCache);
             });
        }
        return response;
      });
    })
  );
});
