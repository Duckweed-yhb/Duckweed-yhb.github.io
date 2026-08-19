// Service Worker - 离线缓存支持
var CACHE_NAME = 'xingyu-cache-v1';
var urlsToCache = [
  '/',
  '/assets/css/main.css',
  '/assets/css/sidebar.css',
  '/assets/css/layout.css',
  '/favicon.png'
];

// 安装：缓存核心资源
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

// 激活：清理旧缓存
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(name) {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// 请求拦截：缓存优先，回退到网络
self.addEventListener('fetch', function(event) {
  // 只处理 GET 请求
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(function(cached) {
      if (cached) return cached;

      return fetch(event.request).then(function(response) {
        // 只缓存同源的成功响应
        if (!response || response.status !== 200) return response;

        var responseClone = response.clone();
        caches.open(CACHE_NAME).then(function(cache) {
          cache.put(event.request, responseClone);
        });
        return response;
      }).catch(function() {
        // 网络失败时，如果是导航请求，返回首页缓存
        if (event.request.mode === 'navigate') {
          return caches.match('/');
        }
      });
    })
  );
});
