const CACHE='aceitunita-pwa-v8';
const BASE=new URL('./',self.location.href);
const FILES=['./','./index.html','./styles.css','./app.js','./manifest.webmanifest','./icons/heart.svg'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET')return;
 const url=new URL(event.request.url);
 if(url.origin!==self.location.origin)return;
 const isDocument=event.request.mode==='navigate' || /\.(?:html|js|css|webmanifest)$/.test(url.pathname);
 if(isDocument){
   event.respondWith(fetch(event.request).then(response=>{
     const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));return response;
   }).catch(()=>caches.match(event.request).then(hit=>hit||caches.match('./index.html'))));
 } else {
   event.respondWith(caches.match(event.request).then(hit=>hit||fetch(event.request).then(response=>{
     if(response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));}
     return response;
   })));
 }
});