// Minimal service worker — enables notifications on mobile (Android Chrome).
// We intentionally do NOT cache anything to avoid stale content in the Lovable preview.
self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes("/admin") && "focus" in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow("/admin");
    }),
  );
});
