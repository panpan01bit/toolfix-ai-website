#!/usr/bin/env node
/**
 * Zero-dependency static site builder for the ToolFix AI marketing site.
 *
 * Every page is a module exporting { path, title, description, nav, body }.
 * The builder wraps each body in the shared shell, writes pretty URLs
 * (dist/<path>/index.html), copies static assets, fingerprints CSS/JS,
 * and emits sitemap.xml / robots.txt / 404.html / .nojekyll.
 *
 *   node build.mjs                 build to dist/
 *   node build.mjs --serve         build, then serve on 127.0.0.1:4173
 *   SITE_BASE=/repo/ node build.mjs
 */
import { readFile, writeFile, mkdir, rm, cp, stat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import http from 'node:http';

const ROOT = dirname(fileURLToPath(import.meta.url));
const DIST = join(ROOT, 'dist');

const BASE = (process.env.SITE_BASE || '/').replace(/\/?$/, '/');
const ORIGIN = (process.env.SITE_ORIGIN || 'https://panpan01bit.github.io').replace(/\/$/, '');
const SITE_PATH_ROOT = ORIGIN + BASE; // always ends with '/'
const IS_SERVE = process.argv.includes('--serve');

const PAGES = [
  'index',
  'product',
  'technology',
  'demo',
  'pricing',
  'market',
  'investors',
  'company',
  'faq',
  'zh',
  'privacy',
  'terms',
  '404',
];

const hash = (buf) => createHash('sha256').update(buf).digest('hex').slice(0, 10);

const clean = (dir) => rm(dir, { recursive: true, force: true });
const ensure = (dir) => mkdir(dir, { recursive: true });

async function copyDir(from, to) {
  if (!existsSync(from)) return;
  await ensure(dirname(to));
  await cp(from, to, { recursive: true });
}

function formatDuration(total) {
  const m = Math.floor(total / 60);
  const s = Math.round(total % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

async function main() {
  const t0 = Date.now();
  await clean(DIST);
  await ensure(DIST);

  // ---- styles & client script (fingerprinted) -----------------------------
  const css = await readFile(join(ROOT, 'src/styles/main.css'), 'utf8');
  const cssName = `main.${hash(css)}.css`;
  await ensure(join(DIST, 'assets'));
  await writeFile(join(DIST, 'assets', cssName), css);

  const js = await readFile(join(ROOT, 'src/client/site.js'), 'utf8');
  const jsName = `site.${hash(js)}.js`;
  await writeFile(join(DIST, 'assets', jsName), js);

  await copyDir(join(ROOT, 'public/fonts'), join(DIST, 'assets/fonts'));
  await copyDir(join(ROOT, 'public/media'), join(DIST, 'media'));
  await copyDir(join(ROOT, 'public/img'), join(DIST, 'img'));
  await copyDir(join(ROOT, 'public/downloads'), join(DIST, 'downloads'));

  // ---- pages --------------------------------------------------------------
  const { page: renderPage } = await import(pathToFileURL(join(ROOT, 'src/lib/layout.mjs')).href);
  const ctx = { base: BASE, origin: ORIGIN, sitePathRoot: SITE_PATH_ROOT, css: `assets/${cssName}`, js: `assets/${jsName}` };

  const only = process.env.ONLY ? process.env.ONLY.split(',') : null;
  const built = [];
  for (const name of PAGES.filter((n) => !only || only.includes(n))) {
    const mod = await import(pathToFileURL(join(ROOT, 'src/pages', `${name}.mjs`)).href);
    const page = mod.default;
    const html = renderPage(page, ctx);
    const outDir = page.path === '/' ? DIST : join(DIST, page.path.replace(/^\/|\/$/g, ''));
    await ensure(outDir);
    await writeFile(join(outDir, 'index.html'), html);
    built.push({ path: page.path, title: page.title });
    console.log(`  ${page.path.padEnd(14)} ${String(html.length).padStart(7)} bytes`);
  }

  // SPA-free 404: GitHub Pages serves this for unknown paths.
  if (existsSync(join(DIST, '404', 'index.html'))) {
    await writeFile(join(DIST, '404.html'), await readFile(join(DIST, '404', 'index.html'), 'utf8'));
  }

  // ---- sitemap / robots ---------------------------------------------------
  const indexable = built.filter((p) => p.path !== '/404');
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexable
  .map((p) => `  <url><loc>${SITE_PATH_ROOT}${p.path.replace(/^\//, '')}</loc><changefreq>monthly</changefreq><priority>${p.path === '/' ? '1.0' : '0.7'}</priority></url>`)
  .join('\n')}
</urlset>`;
  await writeFile(join(DIST, 'sitemap.xml'), sitemap);
  await writeFile(join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_PATH_ROOT}sitemap.xml\n`);
  await writeFile(join(DIST, '.nojekyll'), '');

  console.log(`\n  built ${built.length} pages in ${Date.now() - t0}ms  (base: ${BASE})`);

  if (IS_SERVE) serve();
}

function serve() {
  const types = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.svg': 'image/svg+xml',
    '.jpg': 'image/jpeg',
    '.png': 'image/png',
    '.mp4': 'video/mp4',
    '.woff2': 'font/woff2',
    '.json': 'application/json',
    '.txt': 'text/plain; charset=utf-8',
    '.xml': 'application/xml',
    '.zip': 'application/zip',
  };
  const port = Number(process.env.PORT || 4173);
  http
    .createServer(async (req, res) => {
      let urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
      if (BASE !== '/' && urlPath.startsWith(BASE)) urlPath = '/' + urlPath.slice(BASE.length);
      let file = join(DIST, urlPath);
      if (urlPath.endsWith('/')) file = join(file, 'index.html');
      try {
        const s = await stat(file);
        if (s.isDirectory()) file = join(file, 'index.html');
      } catch {
        file = join(DIST, '404.html');
        res.statusCode = 404;
      }
      try {
        const buf = await readFile(file);
        const ext = file.slice(file.lastIndexOf('.'));
        res.setHeader('Content-Type', types[ext] || 'application/octet-stream');
        res.setHeader('Cache-Control', 'no-store');
        res.setHeader('Accept-Ranges', 'bytes');
        // byte ranges, so locally-served video behaves like GitHub Pages
        const range = req.headers.range;
        if (range) {
          const m = /bytes=(\d*)-(\d*)/.exec(range);
          if (m) {
            const start = m[1] ? Number(m[1]) : 0;
            const end = m[2] ? Number(m[2]) : buf.length - 1;
            if (start >= buf.length) {
              res.statusCode = 416;
              res.setHeader('Content-Range', `bytes */${buf.length}`);
              res.end();
              return;
            }
            res.statusCode = 206;
            res.setHeader('Content-Range', `bytes ${start}-${end}/${buf.length}`);
            res.setHeader('Content-Length', String(end - start + 1));
            res.end(buf.subarray(start, end + 1));
            return;
          }
        }
        res.setHeader('Content-Length', String(buf.length));
        res.end(buf);
      } catch {
        res.statusCode = 404;
        res.end('Not found');
      }
    })
    .listen(port, '127.0.0.1', () => console.log(`\n  serving http://127.0.0.1:${port}${BASE}\n`));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
