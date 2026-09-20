---
layout: none
permalink: /sw.js
render_with_liquid: true
---
// Service Worker - 离线缓存支持
//
// 说明：本文件由 Jekyll 渲染（开头的 front matter 只为启用 Liquid，不会输出到最终文件）。
// CACHE_NAME 里拼了构建时间戳 —— 每次发布都会诞生一个新缓存，activate 阶段把旧缓存全部删掉；
// 再配合 HTML 中资源 URL 的 ?v= 版本号，就不会再出现"改了样式但访客仍看到旧版"的问题。
// 静态资源依然会被缓存，所以访问过的页面离线仍可打开。

var CACHE_VERSION = '{{ site.time | date: "%Y%m%d%H%M%S" }}';
var CACHE_NAME = 'xingyu-cache-' + CACHE_VERSION;
var urlsToCache = [
  '/',
  '/favicon.png'
];

// 安装：预缓存核心资源（失败也不阻塞安装，避免首访离线时整站不可用）
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache).catch(function () { /* 忽略预缓存失败 */ });
    })
  );
  self.skipWaiting();
});

// 激活：清掉所有旧版本缓存，并立即接管现有页面
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (name) {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    }).then(function () {
      return self.clients.claim();
    })
  );
});

// 请求拦截：页面导航 network-first（保证更新及时可见），静态资源 cache-first
self.addEventListener('fetch', function (event) {
  // 只处理 GET 请求
  if (event.request.method !== 'GET') return;

  // 只管同源请求，第三方（CDN、统计脚本等）不接管，避免缓存到不该缓存的东西
  var url;
  try { url = new URL(event.request.url); } catch (e) { return; }
  if (url.origin !== self.location.origin) return;

  // 页面导航请求：优先网络，保证用户总能看到最新内容
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).then(function (response) {
        if (response && response.status === 200) {
          var responseClone = response.clone();
          caches.open(CACHE_NAME).then(function (cache) {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      }).catch(function () {
        // 网络失败（如离线）时回退到缓存
        return caches.match(event.request).then(function (cached) {
          return cached || caches.match('/');
        });
      })
    );
    return;
  }

  // 静态资源：cache-first。资源 URL 自带 ?v= 构建版本号，
  // 所以新版本一定是新 URL，不会命中旧缓存；旧版本会在下次发布换缓存名时被清掉。
  event.respondWith(
    caches.match(event.request).then(function (cached) {
      if (cached) return cached;

      return fetch(event.request).then(function (response) {
        // 只缓存同源的成功响应
        if (!response || response.status !== 200 || response.type === 'opaque') return response;

        var responseClone = response.clone();
        caches.open(CACHE_NAME).then(function (cache) {
          cache.put(event.request, responseClone);
        });
        return response;
      }).catch(function () {
        return undefined;
      });
    })
  );
});
