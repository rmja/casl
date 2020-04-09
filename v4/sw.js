try{self["workbox:core:5.1.2"]&&_()}catch(e){}const e=(e,...t)=>{let s=e;return t.length>0&&(s+=` :: ${JSON.stringify(t)}`),s};class t extends Error{constructor(t,s){super(e(t,s)),this.name=t,this.details=s}}try{self["workbox:routing:5.1.2"]&&_()}catch(e){}const s=e=>e&&"object"==typeof e?e:{handle:e};class n{constructor(e,t,n="GET"){this.handler=s(t),this.match=e,this.method=n}}class a extends n{constructor(e,t,s){super(({url:t})=>{const s=e.exec(t.href);if(s&&(t.origin===location.origin||0===s.index))return s.slice(1)},t,s)}}const i=e=>new URL(String(e),location.href).href.replace(new RegExp(`^${location.origin}`),"");class r{constructor(){this.t=new Map}get routes(){return this.t}addFetchListener(){self.addEventListener("fetch",e=>{const{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)})}addCacheListener(){self.addEventListener("message",e=>{if(e.data&&"CACHE_URLS"===e.data.type){const{payload:t}=e.data,s=Promise.all(t.urlsToCache.map(e=>{"string"==typeof e&&(e=[e]);const t=new Request(...e);return this.handleRequest({request:t})}));e.waitUntil(s),e.ports&&e.ports[0]&&s.then(()=>e.ports[0].postMessage(!0))}})}handleRequest({request:e,event:t}){const s=new URL(e.url,location.href);if(!s.protocol.startsWith("http"))return;const{params:n,route:a}=this.findMatchingRoute({url:s,request:e,event:t});let i,r=a&&a.handler;if(!r&&this.s&&(r=this.s),r){try{i=r.handle({url:s,request:e,event:t,params:n})}catch(e){i=Promise.reject(e)}return i instanceof Promise&&this.i&&(i=i.catch(n=>this.i.handle({url:s,request:e,event:t}))),i}}findMatchingRoute({url:e,request:t,event:s}){const n=this.t.get(t.method)||[];for(const a of n){let n;const i=a.match({url:e,request:t,event:s});if(i)return n=i,Array.isArray(i)&&0===i.length?n=void 0:i.constructor===Object&&0===Object.keys(i).length?n=void 0:"boolean"==typeof i&&(n=void 0),{route:a,params:n}}return{}}setDefaultHandler(e){this.s=s(e)}setCatchHandler(e){this.i=s(e)}registerRoute(e){this.t.has(e.method)||this.t.set(e.method,[]),this.t.get(e.method).push(e)}unregisterRoute(e){if(!this.t.has(e.method))throw new t("unregister-route-but-not-found-with-method",{method:e.method});const s=this.t.get(e.method).indexOf(e);if(!(s>-1))throw new t("unregister-route-route-not-registered");this.t.get(e.method).splice(s,1)}}let c;const o=()=>(c||(c=new r,c.addFetchListener(),c.addCacheListener()),c);function l(e,s,i){let r;if("string"==typeof e){const t=new URL(e,location.href);r=new n(({url:e})=>e.href===t.href,s,i)}else if(e instanceof RegExp)r=new a(e,s,i);else if("function"==typeof e)r=new n(e,s,i);else{if(!(e instanceof n))throw new t("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});r=e}return o().registerRoute(r),r}const u={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},h=e=>[u.prefix,e,u.suffix].filter(e=>e&&e.length>0).join("-"),f=e=>e||h(u.precache),w=e=>e||h(u.runtime);function d(e){e.then(()=>{})}const p=new Set;class y{constructor(e,t,{onupgradeneeded:s,onversionchange:n}={}){this.o=null,this.l=e,this.u=t,this.h=s,this.p=n||(()=>this.close())}get db(){return this.o}async open(){if(!this.o)return this.o=await new Promise((e,t)=>{let s=!1;setTimeout(()=>{s=!0,t(new Error("The open request was blocked and timed out"))},this.OPEN_TIMEOUT);const n=indexedDB.open(this.l,this.u);n.onerror=()=>t(n.error),n.onupgradeneeded=e=>{s?(n.transaction.abort(),n.result.close()):"function"==typeof this.h&&this.h(e)},n.onsuccess=()=>{const t=n.result;s?t.close():(t.onversionchange=this.p.bind(this),e(t))}}),this}async getKey(e,t){return(await this.getAllKeys(e,t,1))[0]}async getAll(e,t,s){return await this.getAllMatching(e,{query:t,count:s})}async getAllKeys(e,t,s){return(await this.getAllMatching(e,{query:t,count:s,includeKeys:!0})).map(e=>e.key)}async getAllMatching(e,{index:t,query:s=null,direction:n="next",count:a,includeKeys:i=!1}={}){return await this.transaction([e],"readonly",(r,c)=>{const o=r.objectStore(e),l=t?o.index(t):o,u=[],h=l.openCursor(s,n);h.onsuccess=()=>{const e=h.result;e?(u.push(i?e:e.value),a&&u.length>=a?c(u):e.continue()):c(u)}})}async transaction(e,t,s){return await this.open(),await new Promise((n,a)=>{const i=this.o.transaction(e,t);i.onabort=()=>a(i.error),i.oncomplete=()=>n(),s(i,e=>n(e))})}async g(e,t,s,...n){return await this.transaction([t],s,(s,a)=>{const i=s.objectStore(t),r=i[e].apply(i,n);r.onsuccess=()=>a(r.result)})}close(){this.o&&(this.o.close(),this.o=null)}}y.prototype.OPEN_TIMEOUT=2e3;const g={readonly:["get","count","getKey","getAll","getAllKeys"],readwrite:["add","put","clear","delete"]};for(const[e,t]of Object.entries(g))for(const s of t)s in IDBObjectStore.prototype&&(y.prototype[s]=async function(t,...n){return await this.g(s,t,e,...n)});try{self["workbox:expiration:5.1.2"]&&_()}catch(e){}const v=e=>{const t=new URL(e,location.href);return t.hash="",t.href};class m{constructor(e){this.v=e,this.o=new y("workbox-expiration",1,{onupgradeneeded:e=>this.m(e)})}m(e){const t=e.target.result.createObjectStore("cache-entries",{keyPath:"id"});t.createIndex("cacheName","cacheName",{unique:!1}),t.createIndex("timestamp","timestamp",{unique:!1}),(async e=>{await new Promise((t,s)=>{const n=indexedDB.deleteDatabase(e);n.onerror=()=>{s(n.error)},n.onblocked=()=>{s(new Error("Delete blocked"))},n.onsuccess=()=>{t()}})})(this.v)}async setTimestamp(e,t){const s={url:e=v(e),timestamp:t,cacheName:this.v,id:this.q(e)};await this.o.put("cache-entries",s)}async getTimestamp(e){return(await this.o.get("cache-entries",this.q(e))).timestamp}async expireEntries(e,t){const s=await this.o.transaction("cache-entries","readwrite",(s,n)=>{const a=s.objectStore("cache-entries").index("timestamp").openCursor(null,"prev"),i=[];let r=0;a.onsuccess=()=>{const s=a.result;if(s){const n=s.value;n.cacheName===this.v&&(e&&n.timestamp<e||t&&r>=t?i.push(s.value):r++),s.continue()}else n(i)}}),n=[];for(const e of s)await this.o.delete("cache-entries",e.id),n.push(e.url);return n}q(e){return this.v+"|"+v(e)}}class q{constructor(e,t={}){this.R=!1,this.j=!1,this.U=t.maxEntries,this.L=t.maxAgeSeconds,this.v=e,this.N=new m(e)}async expireEntries(){if(this.R)return void(this.j=!0);this.R=!0;const e=this.L?Date.now()-1e3*this.L:0,t=await this.N.expireEntries(e,this.U),s=await self.caches.open(this.v);for(const e of t)await s.delete(e);this.R=!1,this.j&&(this.j=!1,d(this.expireEntries()))}async updateTimestamp(e){await this.N.setTimestamp(e,Date.now())}async isURLExpired(e){if(this.L){return await this.N.getTimestamp(e)<Date.now()-1e3*this.L}return!1}async delete(){this.j=!1,await this.N.expireEntries(1/0)}}const R=(e,t)=>e.filter(e=>t in e),b=async({request:e,mode:t,plugins:s=[]})=>{const n=R(s,"cacheKeyWillBeUsed");let a=e;for(const e of n)a=await e.cacheKeyWillBeUsed.call(e,{mode:t,request:a}),"string"==typeof a&&(a=new Request(a));return a},j=async({cacheName:e,request:t,event:s,matchOptions:n,plugins:a=[]})=>{const i=await self.caches.open(e),r=await b({plugins:a,request:t,mode:"read"});let c=await i.match(r,n);for(const t of a)if("cachedResponseWillBeUsed"in t){const a=t.cachedResponseWillBeUsed;c=await a.call(t,{cacheName:e,event:s,matchOptions:n,cachedResponse:c,request:r})}return c},x=async({cacheName:e,request:s,response:n,event:a,plugins:r=[],matchOptions:c})=>{const o=await b({plugins:r,request:s,mode:"write"});if(!n)throw new t("cache-put-with-no-response",{url:i(o.url)});const l=await(async({request:e,response:t,event:s,plugins:n=[]})=>{let a=t,i=!1;for(const t of n)if("cacheWillUpdate"in t){i=!0;const n=t.cacheWillUpdate;if(a=await n.call(t,{request:e,response:a,event:s}),!a)break}return i||(a=a&&200===a.status?a:void 0),a||null})({event:a,plugins:r,response:n,request:o});if(!l)return;const u=await self.caches.open(e),h=R(r,"cacheDidUpdate"),f=h.length>0?await j({cacheName:e,matchOptions:c,request:o}):null;try{await u.put(o,l)}catch(e){throw"QuotaExceededError"===e.name&&await async function(){for(const e of p)await e()}(),e}for(const t of h)await t.cacheDidUpdate.call(t,{cacheName:e,event:a,oldResponse:f,newResponse:l,request:o})},U=j,L=async({request:e,fetchOptions:s,event:n,plugins:a=[]})=>{if("string"==typeof e&&(e=new Request(e)),n instanceof FetchEvent&&n.preloadResponse){const e=await n.preloadResponse;if(e)return e}const i=R(a,"fetchDidFail"),r=i.length>0?e.clone():null;try{for(const t of a)if("requestWillFetch"in t){const s=t.requestWillFetch,a=e.clone();e=await s.call(t,{request:a,event:n})}}catch(e){throw new t("plugin-error-request-will-fetch",{thrownError:e})}const c=e.clone();try{let t;t="navigate"===e.mode?await fetch(e):await fetch(e,s);for(const e of a)"fetchDidSucceed"in e&&(t=await e.fetchDidSucceed.call(e,{event:n,request:c,response:t}));return t}catch(e){for(const t of i)await t.fetchDidFail.call(t,{error:e,event:n,originalRequest:r.clone(),request:c.clone()});throw e}};try{self["workbox:strategies:5.1.2"]&&_()}catch(e){}const N={cacheWillUpdate:async({response:e})=>200===e.status||0===e.status?e:null};let E;async function K(e,t){const s=e.clone(),n={headers:new Headers(s.headers),status:s.status,statusText:s.statusText},a=t?t(n):n,i=function(){if(void 0===E){const e=new Response("");if("body"in e)try{new Response(e.body),E=!0}catch(e){E=!1}E=!1}return E}()?s.body:await s.blob();return new Response(i,a)}try{self["workbox:precaching:5.1.2"]&&_()}catch(e){}function O(e){if(!e)throw new t("add-to-cache-list-unexpected-type",{entry:e});if("string"==typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:s,url:n}=e;if(!n)throw new t("add-to-cache-list-unexpected-type",{entry:e});if(!s){const e=new URL(n,location.href);return{cacheKey:e.href,url:e.href}}const a=new URL(n,location.href),i=new URL(n,location.href);return a.searchParams.set("__WB_REVISION__",s),{cacheKey:a.href,url:i.href}}class M{constructor(e){this.v=f(e),this._=new Map,this.K=new Map,this.O=new Map}addToCacheList(e){const s=[];for(const n of e){"string"==typeof n?s.push(n):n&&void 0===n.revision&&s.push(n.url);const{cacheKey:e,url:a}=O(n),i="string"!=typeof n&&n.revision?"reload":"default";if(this._.has(a)&&this._.get(a)!==e)throw new t("add-to-cache-list-conflicting-entries",{firstEntry:this._.get(a),secondEntry:e});if("string"!=typeof n&&n.integrity){if(this.O.has(e)&&this.O.get(e)!==n.integrity)throw new t("add-to-cache-list-conflicting-integrities",{url:a});this.O.set(e,n.integrity)}if(this._.set(a,e),this.K.set(a,i),s.length>0){const e="Workbox is precaching URLs without revision "+`info: ${s.join(", ")}\nThis is generally NOT safe. `+"Learn more at https://bit.ly/wb-precache";console.warn(e)}}}async install({event:e,plugins:t}={}){const s=[],n=[],a=await self.caches.open(this.v),i=await a.keys(),r=new Set(i.map(e=>e.url));for(const[e,t]of this._)r.has(t)?n.push(e):s.push({cacheKey:t,url:e});const c=s.map(({cacheKey:s,url:n})=>{const a=this.O.get(s),i=this.K.get(n);return this.M({cacheKey:s,cacheMode:i,event:e,integrity:a,plugins:t,url:n})});return await Promise.all(c),{updatedURLs:s.map(e=>e.url),notUpdatedURLs:n}}async activate(){const e=await self.caches.open(this.v),t=await e.keys(),s=new Set(this._.values()),n=[];for(const a of t)s.has(a.url)||(await e.delete(a),n.push(a.url));return{deletedURLs:n}}async M({cacheKey:e,url:s,cacheMode:n,event:a,plugins:i,integrity:r}){const c=new Request(s,{integrity:r,cache:n,credentials:"same-origin"});let o,l=await L({event:a,plugins:i,request:c});for(const e of i||[])"cacheWillUpdate"in e&&(o=e);if(!(o?await o.cacheWillUpdate({event:a,request:c,response:l}):l.status<400))throw new t("bad-precaching-response",{url:s,status:l.status});l.redirected&&(l=await K(l)),await x({event:a,plugins:i,response:l,request:e===s?c:new Request(e),cacheName:this.v,matchOptions:{ignoreSearch:!0}})}getURLsToCacheKeys(){return this._}getCachedURLs(){return[...this._.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this._.get(t.href)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s){return(await self.caches.open(this.v)).match(s)}}createHandler(e=!0){return async({request:s})=>{try{const e=await this.matchPrecache(s);if(e)return e;throw new t("missing-precache-entry",{cacheName:this.v,url:s instanceof Request?s.url:s})}catch(t){if(e)return fetch(s);throw t}}}createHandlerBoundToURL(e,s=!0){if(!this.getCacheKeyForURL(e))throw new t("non-precached-url",{url:e});const n=this.createHandler(s),a=new Request(e);return()=>n({request:a})}}let T;const D=()=>(T||(T=new M),T);const S=(e,t)=>{const s=D().getURLsToCacheKeys();for(const n of function*(e,{ignoreURLParametersMatching:t,directoryIndex:s,cleanURLs:n,urlManipulation:a}={}){const i=new URL(e,location.href);i.hash="",yield i.href;const r=function(e,t=[]){for(const s of[...e.searchParams.keys()])t.some(e=>e.test(s))&&e.searchParams.delete(s);return e}(i,t);if(yield r.href,s&&r.pathname.endsWith("/")){const e=new URL(r.href);e.pathname+=s,yield e.href}if(n){const e=new URL(r.href);e.pathname+=".html",yield e.href}if(a){const e=a({url:i});for(const t of e)yield t.href}}(e,t)){const e=s.get(n);if(e)return e}};let P=!1;function A(e){P||((({ignoreURLParametersMatching:e=[/^utm_/],directoryIndex:t="index.html",cleanURLs:s=!0,urlManipulation:n}={})=>{const a=f();self.addEventListener("fetch",i=>{const r=S(i.request.url,{cleanURLs:s,directoryIndex:t,ignoreURLParametersMatching:e,urlManipulation:n});if(!r)return;let c=self.caches.open(a).then(e=>e.match(r)).then(e=>e||fetch(r));i.respondWith(c)})})(e),P=!0)}const C=[],I={get:()=>C,add(e){C.push(...e)}},k=e=>{const t=D(),s=I.get();e.waitUntil(t.install({event:e,plugins:s}).catch(e=>{throw e}))},W=e=>{const t=D();e.waitUntil(t.activate())};var B,F;self.addEventListener("message",e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()}),B={},function(e){D().addToCacheList(e),e.length>0&&(self.addEventListener("install",k),self.addEventListener("activate",W))}([{url:"/casl/v4/assets/a.0dea9028.json"},{url:"/casl/v4/assets/a.0fb79a4b.json"},{url:"/casl/v4/assets/a.192ee03a.json"},{url:"/casl/v4/assets/a.19f413ea.json"},{url:"/casl/v4/assets/a.232a1bdd.json"},{url:"/casl/v4/assets/a.2555427d.json"},{url:"/casl/v4/assets/a.26897b06.json"},{url:"/casl/v4/assets/a.37d3dd8f.json"},{url:"/casl/v4/assets/a.392cf909.json"},{url:"/casl/v4/assets/a.3a1055aa.json"},{url:"/casl/v4/assets/a.3e09ab00.json"},{url:"/casl/v4/assets/a.3eac0367.json"},{url:"/casl/v4/assets/a.4649ce6a.json"},{url:"/casl/v4/assets/a.498b686d.json"},{url:"/casl/v4/assets/a.553eb86b.json"},{url:"/casl/v4/assets/a.5eb3b0a8.json"},{url:"/casl/v4/assets/a.6895d449.json"},{url:"/casl/v4/assets/a.790c827c.json"},{url:"/casl/v4/assets/a.7ba660a3.json"},{url:"/casl/v4/assets/a.86aea29b.json"},{url:"/casl/v4/assets/a.8c56cf79.json"},{url:"/casl/v4/assets/a.8e142ab0.json"},{url:"/casl/v4/assets/a.9a7a5d5a.json"},{url:"/casl/v4/assets/a.a6a8b35f.json"},{url:"/casl/v4/assets/a.ad1a03e5.json"},{url:"/casl/v4/assets/a.b0e49197.json"},{url:"/casl/v4/assets/a.cb69cc53.json"},{url:"/casl/v4/assets/a.cce04acc.json"},{url:"/casl/v4/assets/a.ce2c3571.json"},{url:"/casl/v4/assets/a.d397cd54.json"},{url:"/casl/v4/assets/a.dcafa4dc.json"},{url:"/casl/v4/assets/a.edf41136.json"},{url:"/casl/v4/assets/a.fa592bbe.json"},{url:"/casl/v4/assets/content_pages_searchIndexes.en.2fb7439d.json"},{url:"/casl/v4/assets/content_pages_summaries.en.be651775.json"},{url:"/casl/v4/app-icons/android-chrome-192x192.png"},{url:"/casl/v4/app-icons/android-chrome-256x256.png"},{url:"/casl/v4/app-icons/apple-touch-icon.png"},{url:"/casl/v4/app-icons/favicon-16x16.png"},{url:"/casl/v4/app-icons/favicon-32x32.png"},{url:"/casl/v4/app-icons/favicon.ico"},{url:"/casl/v4/app-icons/mstile-150x150.png"},{url:"/casl/v4/app-icons/safari-pinned-tab.svg"},{url:"/casl/v4/fonts/StardosStencil-Bold.woff2"},{url:"/casl/v4/fonts/StardosStencil-Regular.woff2"},{url:"/casl/v4/manifest.json"},{url:"/casl/v4/index.html"},{url:"/casl/v4/bootstrap.f5537b2f.js"}]),A(B),self.addEventListener("activate",e=>{const t=f();e.waitUntil((async(e,t="-precache-")=>{const s=(await self.caches.keys()).filter(s=>s.includes(t)&&s.includes(self.registration.scope)&&s!==e);return await Promise.all(s.map(e=>self.caches.delete(e))),s})(t).then(e=>{}))}),l(new class extends n{constructor(e,{allowlist:t=[/./],denylist:s=[]}={}){super(e=>this.T(e),e),this.D=t,this.S=s}T({url:e,request:t}){if(t&&"navigate"!==t.mode)return!1;const s=e.pathname+e.search;for(const e of this.S)if(e.test(s))return!1;return!!this.D.some(e=>e.test(s))}}((F="/casl/v4/index.html",D().createHandlerBoundToURL(F)))),l(/\/casl\/v4\/images\//,new class{constructor(e={}){if(this.v=w(e.cacheName),this.P=e.plugins||[],e.plugins){const t=e.plugins.some(e=>!!e.cacheWillUpdate);this.P=t?e.plugins:[N,...e.plugins]}else this.P=[N];this.A=e.fetchOptions,this.C=e.matchOptions}async handle({event:e,request:s}){"string"==typeof s&&(s=new Request(s));const n=this.I({request:s,event:e});let a,i=await U({cacheName:this.v,request:s,event:e,matchOptions:this.C,plugins:this.P});if(i){if(e)try{e.waitUntil(n)}catch(a){}}else try{i=await n}catch(e){a=e}if(!i)throw new t("no-response",{url:s.url,error:a});return i}async I({request:e,event:t}){const s=await L({request:e,event:t,fetchOptions:this.A,plugins:this.P}),n=x({cacheName:this.v,request:e,response:s.clone(),event:t,plugins:this.P});if(t)try{t.waitUntil(n)}catch(e){}return s}}({cacheName:"images",plugins:[new class{constructor(e={}){var t;this.cachedResponseWillBeUsed=async({event:e,request:t,cacheName:s,cachedResponse:n})=>{if(!n)return null;const a=this.k(n),i=this.W(s);d(i.expireEntries());const r=i.updateTimestamp(t.url);if(e)try{e.waitUntil(r)}catch(e){}return a?n:null},this.cacheDidUpdate=async({cacheName:e,request:t})=>{const s=this.W(e);await s.updateTimestamp(t.url),await s.expireEntries()},this.B=e,this.L=e.maxAgeSeconds,this.F=new Map,e.purgeOnQuotaError&&(t=()=>this.deleteCacheAndMetadata(),p.add(t))}W(e){if(e===w())throw new t("expire-custom-caches-only");let s=this.F.get(e);return s||(s=new q(e,this.B),this.F.set(e,s)),s}k(e){if(!this.L)return!0;const t=this.H(e);return null===t||t>=Date.now()-1e3*this.L}H(e){if(!e.headers.has("date"))return null;const t=e.headers.get("date"),s=new Date(t).getTime();return isNaN(s)?null:s}async deleteCacheAndMetadata(){for(const[e,t]of this.F)await self.caches.delete(e),await t.delete();this.F=new Map}}({maxEntries:100,purgeOnQuotaError:!0})]}),"GET"),l(/\/casl\/v4\/@webcomponents\//,new class{constructor(e={}){this.v=w(e.cacheName),this.P=e.plugins||[],this.A=e.fetchOptions,this.C=e.matchOptions}async handle({event:e,request:s}){"string"==typeof s&&(s=new Request(s));let n,a=await U({cacheName:this.v,request:s,event:e,matchOptions:this.C,plugins:this.P});if(!a)try{a=await this.I(s,e)}catch(e){n=e}if(!a)throw new t("no-response",{url:s.url,error:n});return a}async I(e,t){const s=await L({request:e,event:t,fetchOptions:this.A,plugins:this.P}),n=s.clone(),a=x({cacheName:this.v,request:e,response:n,event:t,plugins:this.P});if(t)try{t.waitUntil(a)}catch(e){}return s}}({cacheName:"polyfills",plugins:[]}),"GET");
//# sourceMappingURL=sw.js.map
