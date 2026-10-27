// Small template functions. Each returns a piece of HTML as text.
export const esc = (s = '') => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
  .replace(/©/g, '&copy;');

const back = '<a class="back" href="#top">&uarr; Back to top</a>';

export const block = (id, heading, inner) =>
  `<section class="block" id="${esc(id)}"><div class="wrap">\n<h2>${esc(heading)}</h2>\n${inner}${back}\n</div></section>`;

export const head = (site) => `<!DOCTYPE html>
<html lang="${esc(site.lang)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(site.title)}</title>
<meta name="description" content="${esc(site.description)}">
<link rel="stylesheet" href="styles/main.css">
</head>
<body id="top">`;

export const header = (site, menu) => `<header><div class="bar">
<a class="logo" href="#top">${esc(site.brand)}</a>
<nav>${menu.map(m => `<a href="#${esc(m.id)}">${esc(m.menu)}</a>`).join('')}</nav>
</div></header>`;

export const hero = (h) => `<section class="hero"><div class="hero-inner">
<h1>${esc(h.headline)}</h1>
<p>${esc(h.subtext)}</p>
<a class="btn" href="${esc(h.buttonLink)}">${esc(h.buttonText)}</a>
</div></section>`;

export const textSection = (s) => block(s.id, s.heading, `<p>${esc(s.text)}</p>\n`);

export const activity = (a) => {
  let inner = `<p>${esc(a.text)}</p>\n`;
  if (a.showDetails && a.details) {
    const d = a.details;
    inner += `<ul>\n${[['Who it is for', d.whoFor], ['What to expect', d.whatToExpect], ['Length', d.length], ['Price', d.price]]
      .filter(([, v]) => v).map(([k, v]) => `<li><strong>${k}:</strong> ${esc(v)}</li>`).join('\n')}\n</ul>\n`;
  }
  if (a.bookingEmbed) {
    const link = String(a.bookingEmbed).replace(/^https?:\/\/(app\.)?cal\.com\//, '');
    inner += `<div class="booking">${a.bookingNote ? `<p>${esc(a.bookingNote)}</p>` : ''}<a class="btn" href="https://cal.com/${esc(link)}${a.bookingStartMonth ? `?month=${esc(a.bookingStartMonth)}` : ''}" target="_blank" rel="noopener" data-cal-namespace="nexvita" data-cal-link="${esc(link)}" data-cal-config='${JSON.stringify(Object.assign({layout:'month_view'}, a.bookingStartMonth ? {month:a.bookingStartMonth} : {}))}'>${esc(a.bookingButton || 'Book a session')}</a></div>\n`;
  } else {
    inner += `<div class="placeholder">${esc(a.bookingPlaceholder)}</div>\n`;
  }
  return block(a.id, a.heading, inner);
};

export const where = (w) => {
  let inner = `<p>${esc(w.text)}</p>\n`;
  if (w.showLocations) {
    inner += `<div class="cards">\n${w.locations.map(l => `<div class="card"><h3>${esc(l.park)}</h3>${l.meetingPoint ? `<p>${esc(l.meetingPoint)}</p>` : ''}${(l.sessions || []).map(s => `<p>${esc(s)}</p>`).join('')}</div>`).join('\n')}\n</div>\n`;
  }
  return block(w.id, w.heading, inner);
};

export const faqs = (f) => block(f.id, f.heading,
  f.items.map(i => `<details><summary>${esc(i.q)}</summary><p>${esc(i.a)}</p></details>\n`).join(''));

export const footer = (site) => `<footer>${esc(site.footer)}</footer>\n${calScript}</body>\n</html>\n`;

// Cal.com official embed loader (element-click popup). Links still work without JS.
const calScript = `<script>
(function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
if (document.querySelector("[data-cal-link]")) { Cal("init", "nexvita", {origin:"https://app.cal.com"}); Cal.ns.nexvita("ui", {cssVarsPerTheme:{light:{"cal-brand":"#2f5d46"}},hideEventTypeDetails:false,layout:"month_view"}); }
</script>
`;
