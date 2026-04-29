// 1. Firebase ki zaruri files ko load karo
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

const CACHE_NAME = "jmd-cache-v3"; // Version badal diya taaki fresh load ho

// Offline files
const urlsToCache = [
  "./",
  "./invoice.html",
  "./dashboard.html",
  "https://i.postimg.cc/D0JzRh6x/download.png",
  "https://i.postimg.cc/htQppn1q/jmd-app.png", // Logo bhi add kar diya
  "https://i.postimg.cc/nhcgGrdj/jmdbadge.png"  // Badge bhi add kar diya
];

// Firebase Config (Jo tune mujhe bheja tha)
const firebaseConfig = {
  apiKey: "AIzaSyCtXaYpbyg4A4rmj_27N4mUtE_IssWPCZM",
  authDomain: "jmd-traders.firebaseapp.com",
  projectId: "jmd-traders",
  storageBucket: "jmd-traders.firebasestorage.app",
  messagingSenderId: "799017023327",
  appId: "1:799017023327:web:316a19b47283eb5b4c28ea"
};

// Firebase Initialize
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// --- PWA OFFLINE LOGIC ---
self.addEventListener("install", (event) => {
  self.skipWaiting(); 
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});

// --- FIREBASE BACKGROUND MESSAGING ---
messaging.onBackgroundMessage((payload) => {
  console.log('Background message: ', payload);
  const notificationTitle = payload.notification.title || "JMD Traders Alert";
  const notificationOptions = {
    body: payload.notification.body,
    icon: 'https://i.postimg.cc/D0JzRh6x/download.png',
    badge: 'https://i.postimg.cc/nhcgGrdj/jmdbadge.png',
    vibrate: [200, 100, 200]
  };
  return self.registration.showNotification(notificationTitle, notificationOptions);
});

// Notification click par app kholna
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('https://xanimeshhh.github.io/jmdtraders/invoice.html')
    );
});
