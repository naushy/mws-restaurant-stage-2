var cacheName = 'Restaurants';
var filesToCache = [
     '/',
  './index.html',
  './restaurant.html',
  './css/styles.css',
  './js/db.js',
  './js/main.js',
  './js/info.js',
  './data/restaurants.json',
  './img/1.jpg',
  './img/2.jpg',
  './img/3.jpg',
  './img/4.jpg',
  './img/5.jpg',
  './img/6.jpg',
  './img/7.jpg',
  './img/8.jpg',
  './img/9.jpg',
  './img/10.jpg'
];
self.addEventListener('install', function (e) {
    console.log('ServiceWorker Installed');
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            console.log('Caching');
            return cache.addAll(filesToCache);
        })
    );
});

fetch(request, {mode: 'no-cors'})
.then(function(response) {
  console.log(response); 
}).catch(function(error) {  
  console.log('Request failed', error)  
});

if (typeof idb === "undefined") {
        self.importScripts('js/idb.js');
    }

self.addEventListener('fetch', function (event) {
    const CACHE_NAME = 'Restaurants';
    event.respondWith(
        caches.match(event.request)
        .then(function (response) {
            if (response) {
                return response;
            }
            var fetchRequest = event.request.clone();

            return fetch(fetchRequest).then(
                function (response) {
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }

                    var responseToCache = response.clone();

                    caches.open(CACHE_NAME)
                        .then(function (cache) {
                            cache.put(event.request, responseToCache);
                        });

                    return response;
                }
            );
        }).catch(function (error) {
            console.log(error);
        })
    );
});