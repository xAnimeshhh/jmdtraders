self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    // Notification click karte hi seedha tere billing page pe le jayega
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
