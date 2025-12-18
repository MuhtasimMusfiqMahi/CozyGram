const CACHE_NAME = 'cozygram-v1';

// List of files to cache immediately
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  'https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4',
  'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2',
  'https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&family=Fraunces:opsz,wght@9..144,600;800&display=swap',
  'https://cdn-icons-png.flaticon.com/512/2550/2550223.png'
];

// 1. Install Service Worker & Cache Assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching assets');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// 2. Activate & Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[Service Worker] Removing old cache', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// 3. Fetch Strategy (Stale-While-Revalidate)
self.addEventListener('fetch', (event) => {
  // Ignore Supabase API calls (let them go to network always)
  if (event.request.url.includes('supabase.co')) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Return cached response if found
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        // Update the cache with the new network response
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, responseToCache);
            });
        }
        return networkResponse;
      });

      // Return cached response immediately, or wait for network if cache is empty
      return cachedResponse || fetchPromise;
    })
  );
});
const CACHE_NAME = 'cozygram-v1';

// List of files to cache immediately
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json'
];
// 1. Install Service Worker & Cache Assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching assets');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// 2. Activate & Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[Service Worker] Removing old cache', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// 3. Fetch Strategy (Stale-While-Revalidate)
self.addEventListener('fetch', (event) => {
  // Ignore Supabase API calls (let them go to network always)
  if (event.request.url.includes('supabase.co')) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Return cached response if found
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        // Update the cache with the new network response
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, responseToCache);
            });
        }
        return networkResponse;
      });

      // Return cached response immediately, or wait for network if cache is empty
      return cachedResponse || fetchPromise;
    })
  );
});
