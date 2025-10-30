self.addEventListener('install', (e) => {
  console.log('✅ Service Worker installed');
});

self.addEventListener('fetch', (e) => {
  // Optional caching logic here
});
