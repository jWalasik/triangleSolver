const CACHE_NAME = 'triangle-solver-pwa'
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/js/*.chunk.js',
  '/static/css/*.chunk.css'
]

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache)=>{
        console.log('Cache opened')
        return cache.addAll(urlsToCache)
      })
      .catch(err=> console.log(`Failed to open cache. Error: ${err}`))
  )
})

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then((res)=>{
        if(res) return res

        return fetch(event.request)
      })
  )
})

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME]
  event.waitUntil(
    caches.keys().then((cacheName) => {
      return Promise.all(
        cacheName.map(cacheName=>{
          if(cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})