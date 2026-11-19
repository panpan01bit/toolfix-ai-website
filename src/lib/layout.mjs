/**
 * Shared page shell: <head>, header, footer, logo, icon set.
 */

export const SITE = {
  name: 'ToolFix AI',
  tagline: 'Tools keep people going.',
  position: 'Vertical AI after-sales diagnostics for power-tool brands going global',
  domain: 'www.toolfixai.cn',
  email: 'kuangqisun@gmail.com',
  wa: '',
  stage: 'Pre-seed · MVP live',
  founded: '2026',
};

const NAV = [
  ['product/', 'Product', 'product'],
  ['technology/', 'Technology', 'technology'],
  ['market/', 'Market', 'market'],
  ['pricing/', 'Pricing', 'pricing'],
  ['investors/', 'Investors', 'investors'],
  ['company/', 'Company', 'company'],
];

export function href(ctx, path) {
  const clean = String(path).replace(/^\/+/, '');
  return `${ctx.base}${clean}`;
}

/* ------------------------------------------------------------------ icons */
const ICONS = {
  arrow: '<path d="M4 12h15M13 6l6 6-6 6"/>',
  arrowUpRight: '<path d="M7 17 17 7M8 7h9v9"/>',
  play: '<path d="M7 4.5v15l13-7.5z" fill="currentColor" stroke="none"/>',
  check: '<path d="M4.5 12.5 9.5 17.5 19.5 6.5"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  minus: '<path d="M5 12h14"/>',
  chevron: '<path d="m6 9 6 6 6-6"/>',
  shield: '<path d="M12 3 5 6v5.5c0 4.2 2.9 7.7 7 9.5 4.1-1.8 7-5.3 7-9.5V6z"/><path d="m9 12 2 2 4-4"/>',
  bolt: '<path d="M13 2 4 14h6l-1 8 9-12h-6z"/>',
  wrench: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
  upload: '<path d="M12 16V4M7 9l5-5 5 5"/><path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/>',
  chat: '<path d="M20 15a2 2 0 0 1-2 2H8l-4 3V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z"/>',
  users: '<path d="M16 20v-1.5a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4V20"/><circle cx="9.5" cy="7.5" r="3.5"/><path d="M17 4.2a3.5 3.5 0 0 1 0 6.6M21 20v-1.5a4 4 0 0 0-3-3.8"/>',
  chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18z"/>',
  spark: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6.3 6.3l2.8 2.8M14.9 14.9l2.8 2.8M17.7 6.3l-2.8 2.8M9.1 14.9l-2.8 2.8"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6.5 8.5 6 8.5-6"/>',
  external: '<path d="M14 4h6v6M20 4l-8.5 8.5"/><path d="M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/>',
  lock: '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
  target: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r=".6" fill="currentColor"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5.5l4 2"/>',
  box: '<path d="M21 8 12 3 3 8v8l9 5 9-5z"/><path d="M3 8l9 5 9-5M12 13v8"/>',
  refresh: '<path d="M20 11a8 8 0 1 0-2.5 6.5"/><path d="M20 5v6h-6"/>',
  file: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/>',
  route: '<circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8.5 6H14a4 4 0 0 1 0 8H9a4 4 0 0 0 0 8h6.5"/>',
};

export function icon(name, cls = '') {
  const body = ICONS[name] || ICONS.check;
  return `<svg class="ic ${cls}" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
}

/* ------------------------------------------------------------------- logo */
export function logomark(extra = '') {
  return `<svg class="logomark ${extra}" viewBox="0 0 48 48" width="34" height="34" aria-hidden="true">
  <defs>
    <linearGradient id="tf-hex" x1="6" y1="44" x2="42" y2="4" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#0A2A3E"/><stop offset=".55" stop-color="#0F5C6B"/><stop offset="1" stop-color="#1BA3A3"/>
    </linearGradient>
  </defs>
  <path d="M24 3.6 41.3 13.5v21L24 44.4 6.7 34.5v-21z" fill="url(#tf-hex)"/>
  <path d="M24 7.2 38 15.3v16.6L24 40.1 10 32V15.3z" fill="none" stroke="#FFFFFF" stroke-opacity=".26" stroke-width="1.3"/>
  <g transform="translate(24 24) scale(.72) translate(-24 -24) rotate(-8 24 24)">
    <path d="M27.4 15.9a1 1 0 0 0 0 1.4l2.3 2.3a1 1 0 0 0 1.4 0l5.2-5.2a7.5 7.5 0 0 1-9.9 9.9l-9.6 9.6a2.5 2.5 0 0 1-3.6-3.6l9.6-9.6a7.5 7.5 0 0 1 9.9-9.9z" fill="#fff"/>
  </g>
</svg>`;
}

export function brand(ctx, { dark = false } = {}) {
  return `<a class="brand ${dark ? 'brand--dark' : ''}" href="${href(ctx, '')}" aria-label="ToolFix AI — home">
  ${logomark()}
  <span class="brand__text"><span class="brand__word">ToolFix</span><span class="brand__ai">AI</span></span>
</a>`;
}

/* ----------------------------------------------------------------- header */
function header(ctx) {
  const active = ctx.page.nav;
  const links = NAV.map(
    ([path, label, key]) =>
      `<a class="nav__link${active === key ? ' is-active' : ''}" href="${href(ctx, path)}"${active === key ? ' aria-current="page"' : ''}>${label}</a>`,
  ).join('');

  return `<header class="hdr" data-header>
  <div class="wrap hdr__in">
    ${brand(ctx)}
    <nav class="nav" aria-label="Primary">
      ${links}
      <a class="nav__link nav__link--alt" href="${href(ctx, 'faq/')}">FAQ</a>
    </nav>
    <div class="hdr__actions">
      <a class="btn btn--quiet hdr__demo" href="${href(ctx, 'demo/')}"><span class="dot-live"></span>Product tour</a>
      <a class="btn btn--sm btn--primary" href="${href(ctx, 'pricing/#pilot')}">Book a pilot ${icon('arrow')}</a>
      <button class="burger" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu" data-burger>
        <span></span><span></span>
      </button>
    </div>
  </div>
  <div class="mmenu" id="mobile-menu" hidden data-menu>
    <div class="mmenu__in">
      <nav class="mmenu__nav" aria-label="Mobile">
        ${NAV.map(([path, label]) => `<a href="${href(ctx, path)}">${label}${icon('arrowUpRight')}</a>`).join('')}
        <a href="${href(ctx, 'demo/')}">Product tour${icon('arrowUpRight')}</a>
        <a href="${href(ctx, 'faq/')}">FAQ${icon('arrowUpRight')}</a>
        <a href="${href(ctx, 'zh/')}">中文简介${icon('arrowUpRight')}</a>
      </nav>
      <a class="btn btn--primary btn--wide" href="${href(ctx, 'pricing/#pilot')}">Book a 60-day pilot</a>
      <p class="mmenu__meta">${SITE.email}<br>${SITE.domain}</p>
    </div>
  </div>
</header>`;
}

/* ----------------------------------------------------------------- footer */
function footer(ctx) {
  const col = (title, items) => `<div class="ftr__col">
      <h4>${title}</h4>
      <ul>${items.map(([p, label]) => `<li><a href="${href(ctx, p)}">${label}</a></li>`).join('')}</ul>
    </div>`;

  return `<footer class="ftr">
  <div class="wrap">
    <div class="ftr__top">
      <div class="ftr__brand">
        ${brand(ctx, { dark: true })}
        <p class="ftr__tag">${SITE.tagline}</p>
        <p class="ftr__desc">A diagnostic layer between global buyers and the after-sales queue — grounded in the manual, bounded by safety rules.</p>
        <a class="btn btn--line btn--sm" href="mailto:${SITE.email}">${icon('mail')} Talk to the founders</a>
      </div>
      ${col('Product', [
        ['product/', 'Platform'],
        ['technology/', 'Technology'],
        ['demo/', 'Product tour'],
        ['pricing/', 'Pricing'],
        ['faq/', 'FAQ'],
      ])}
      ${col('Company', [
        ['company/', 'About'],
        ['investors/', 'Investors'],
        ['market/', 'Market & model'],
        ['zh/', '中文简介'],
      ])}
      ${col('Documents', [
        ['investors/#materials', 'Investor materials'],
        ['privacy/', 'Privacy policy'],
        ['terms/', 'Terms of use'],
        ['pricing/#pilot', 'Pilot one-pager'],
      ])}
    </div>
    <div class="ftr__stage">
      <span class="ftr__dot"></span>
      <span>${SITE.stage}</span>
      <span class="ftr__sep"></span>
      <span>Live MVP at <a href="https://www.toolfixai.cn" target="_blank" rel="noopener">${SITE.domain}</a></span>
      <span class="ftr__sep"></span>
      <span>Yongkang, Zhejiang · Remote-first</span>
    </div>
    <div class="ftr__bottom">
      <p>© ${new Date().getFullYear()} ToolFix AI. All rights reserved.</p>
      <p class="ftr__note">Projections on this site are the founders' own base-case model and are not a forecast or an offer of securities.</p>
      <div class="ftr__links"><a href="${href(ctx, 'privacy/')}">Privacy</a><a href="${href(ctx, 'terms/')}">Terms</a><a href="https://www.toolfixai.cn" target="_blank" rel="noopener">Console</a></div>
    </div>
  </div>
</footer>`;
}

/* ------------------------------------------------------------------- page */
export function page(html, ctx) {
  const { title, description, path = '/', nav = '', bodyClass = '', noindex = false, lang = 'en' } = html;
  const canonical = `${ctx.sitePathRoot}${path.replace(/^\//, '')}`;
  const ogImage = `${ctx.sitePathRoot}img/og.jpg`;

  ctx = { ...ctx, page: html };
  const body = typeof html.body === 'function' ? html.body(ctx) : html.body;

  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${description}">
<link rel="canonical" href="${canonical}">
${noindex ? '<meta name="robots" content="noindex,follow">' : ''}
<meta name="theme-color" content="#0E1526">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${SITE.name}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${ogImage}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${description}">
<meta name="twitter:image" content="${ogImage}">
<link rel="icon" href="${ctx.base}img/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="${ctx.base}img/apple-touch-icon.png">
<link rel="preload" href="${ctx.base}assets/fonts/Inter-latin-var.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${ctx.base}${ctx.css}">
<script>document.documentElement.className+=" js";</script>\n<script defer src="${ctx.base}${ctx.js}"></script>
<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ToolFix AI',
    url: ctx.sitePathRoot,
    email: SITE.email,
    description: SITE.position,
    foundingDate: '2026',
    founders: [
      { '@type': 'Person', name: 'Kuangqi Sun', jobTitle: 'Co-founder, Business & Finance' },
      { '@type': 'Person', name: 'Zihan Nan', jobTitle: 'Co-founder, Product & Research' },
    ],
    sameAs: ['https://www.toolfixai.cn'],
  })}</script>
</head>
<body class="${bodyClass}">
<a class="skip" href="#main">Skip to content</a>
${header(ctx)}
<main id="main">${body}</main>
${footer(ctx)}
</body>
</html>
`;
}
