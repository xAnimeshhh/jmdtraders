// 1. Install hote hi purane worker ko hatao
self.addEventListener('install', (event) => {
    self.skipWaiting(); 
    console.log('SW: Installing...');
});

// 2. Turant control le lo taaki app install ho sake
self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
    console.log('SW: Activated!');
});

// Baaki tera puraana code niche...
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(clients.openWindow('https://xanimeshhh.github.io/jmdtraders/invoice.html'));
});

self.addEventListener('push', function(event) {
    const options = {
        body: 'Naya Bill Generate Hua Hai!',
        icon: 'https://i.postimg.cc/D0JzRh6x/download.png',
        badge: 'https://i.postimg.cc/D0JzRh6x/download.png',
        vibrate: [200, 100, 200]
    };
    event.waitUntil(self.registration.showNotification('JMD Traders Alert', options));
});
