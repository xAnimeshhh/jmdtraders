const CACHE_NAME = "jmd-cache-v2";

// In files ko phone ki memory mein save karega (Offline ke liye)
const urlsToCache = [
  "./",
  "./invoice.html",
  "./dashboard.html",
  "https://i.postimg.cc/D0JzRh6x/download.png",
];

// 1. INSTALL: Files save karna aur purane worker ko hatana
self.addEventListener("install", (event) => {
  self.skipWaiting(); 
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// 2. ACTIVATE: Turant app ko control mein lena
self.addEventListener("activate", (event) => {
  event.waitUntil(clients.claim());
});

// 3. FETCH: Offline hone par phone se file uthana
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// 4. NOTIFICATION CLICK: Click karne par billing page kholna
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('https://xanimeshhh.github.io/jmdtraders/invoice.html')
    );
});

// 5. PUSH NOTIFICATION: Background mein alert dikhana
self.addEventListener('push', function(event) {
    const options = {
        body: 'JMD Traders: Naya Bill Generate Hua Hai!',
        icon: 'https://i.postimg.cc/htQppn1q/jmd-app.png',
        badge: 'https://i.postimg.cc/D0JzRh6x/download.png',
        vibrate: [200, 100, 200]
    };
    event.waitUntil(self.registration.showNotification('JMD Traders Alert', options));
});
