// Service Worker for Afghan Pathways Program
// Enables offline functionality for the educational video app

const CACHE_NAME = 'afghan-pathways-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/css/tailwind.css',
    '/js/alpine.min.js',
    '/manifest.json',
    '/lesson-content.json',
    '/videos/lesson1.mp4'
];

// Install event - cache all necessary files
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache.map(url => {
                    // Handle root path
                    if (url === '/') {
                        return '/index.html';
                    }
                    return url;
                }));
            })
            .catch((error) => {
                console.log('Cache addAll failed:', error);
                // Even if some files fail to cache, continue with installation
                return caches.open(CACHE_NAME)
                    .then((cache) => {
                        // Cache critical files one by one
                        const criticalFiles = ['/index.html', '/css/tailwind.min.css', '/js/alpine.min.js'];
                        return Promise.allSettled(
                            criticalFiles.map(file => cache.add(file))
                        );
                    });
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', (event) => {
    // Only handle GET requests
    if (event.request.method !== 'GET') {
        return;
    }

    // Skip cross-origin requests
    if (!event.request.url.startsWith(self.location.origin)) {
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Return cached version if available
                if (response) {
                    console.log('Serving from cache:', event.request.url);
                    return response;
                }

                // Otherwise, fetch from network
                return fetch(event.request)
                    .then((response) => {
                        // Don't cache if not successful
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // Clone the response (can only be consumed once)
                        const responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    })
                    .catch(() => {
                        // Network failed, check if we have a fallback
                        if (event.request.destination === 'document') {
                            return caches.match('/index.html');
                        }

                        // For video files, return a meaningful error
                        if (event.request.url.includes('/videos/')) {
                            return new Response('Video not available offline', {
                                status: 404,
                                statusText: 'Not Found'
                            });
                        }

                        throw error;
                    });
            })
    );
});

// Handle video caching specially due to large file sizes
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'CACHE_VIDEO') {
        const videoUrl = event.data.url;

        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.add(videoUrl);
            })
            .then(() => {
                event.ports[0].postMessage({ success: true });
            })
            .catch((error) => {
                console.log('Failed to cache video:', error);
                event.ports[0].postMessage({ success: false, error: error.message });
            });
    }
});

// Background sync for when connection is restored
self.addEventListener('sync', (event) => {
    if (event.tag === 'background-sync') {
        event.waitUntil(
            // Preload any new content when connection is restored
            caches.open(CACHE_NAME)
                .then((cache) => {
                    return cache.addAll(urlsToCache);
                })
        );
    }
});