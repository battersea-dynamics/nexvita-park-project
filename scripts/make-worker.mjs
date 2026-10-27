// Turns dist/ into dist-worker/_worker.js: one file with HTML, CSS and hero image embedded,
// in the same shape as the live Cloudflare Pages project 'nexvita'. Does NOT deploy anything.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
const html = readFileSync('dist/index.html', 'utf8');
const css = readFileSync('dist/styles/main.css', 'utf8');
const img = readFileSync('dist/images/hero.jpg').toString('base64');
const src = `const HTML = ${JSON.stringify(html)};
const CSS = ${JSON.stringify(css)};
const IMG = ${JSON.stringify(img)};
function bytes(b64){const s=atob(b64);const u=new Uint8Array(s.length);for(let i=0;i<s.length;i++)u[i]=s.charCodeAt(i);return u;}
export default {
  async fetch(request) {
    const url = new URL(request.url);
    if (url.pathname === '/images/hero.jpg') return new Response(bytes(IMG), {headers:{'content-type':'image/jpeg','cache-control':'public, max-age=86400'}});
    if (url.pathname === '/styles/main.css') return new Response(CSS, {headers:{'content-type':'text/css; charset=utf-8','cache-control':'public, max-age=3600'}});
    if (url.pathname === '/' || url.pathname === '/index.html') return new Response(HTML, {headers:{'content-type':'text/html; charset=utf-8'}});
    return new Response('Not found', {status:404});
  }
};
`;
mkdirSync('dist-worker', { recursive: true });
writeFileSync('dist-worker/_worker.js', src);
console.log(`Wrote dist-worker/_worker.js (${Math.round(src.length / 1024)} KB)`);
