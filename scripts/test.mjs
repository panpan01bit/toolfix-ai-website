#!/usr/bin/env node
/** Interaction smoke test against a running copy of the site (CDP, no deps). */
import { spawn } from 'node:child_process';
import { rm, mkdir } from 'node:fs/promises';
import { setTimeout as sleep } from 'node:timers/promises';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const origin = process.argv[2] || 'http://127.0.0.1:4173/toolfix-ai-website/';
const port = 9700 + Math.floor(Math.random() * 200);
const profile = `/tmp/cdp-test-${port}`;
await rm(profile, { recursive: true, force: true });
await mkdir(profile, { recursive: true });

const chrome = spawn(CHROME, [
  '--headless=new',
  `--remote-debugging-port=${port}`,
  `--user-data-dir=${profile}`,
  '--disable-gpu',
  '--no-first-run',
  '--hide-scrollbars',
  'about:blank',
], { stdio: 'ignore' });

let wsUrl;
for (let i = 0; i < 60 && !wsUrl; i++) {
  try {
    const r = await fetch(`http://127.0.0.1:${port}/json/version`);
    wsUrl = (await r.json()).webSocketDebuggerUrl;
  } catch { await sleep(200); }
}
const ws = new WebSocket(wsUrl);
await new Promise((r) => ws.addEventListener('open', r, { once: true }));

let id = 0;
const pending = new Map();
ws.addEventListener('message', (ev) => {
  const m = JSON.parse(ev.data);
  if (m.id && pending.has(m.id)) {
    const { res } = pending.get(m.id);
    pending.delete(m.id);
    res(m.result);
  }
});
const send = (method, params = {}, sessionId) =>
  new Promise((res) => {
    const mid = ++id;
    pending.set(mid, { res });
    ws.send(JSON.stringify({ id: mid, method, params, ...(sessionId ? { sessionId } : {}) }));
  });

const { targetInfos } = await send('Target.getTargets');
const page = targetInfos.find((t) => t.type === 'page');
const { sessionId } = await send('Target.attachToTarget', { targetId: page.targetId, flatten: true });
await send('Page.enable', {}, sessionId);

async function go(path) {
  await send('Page.navigate', { url: origin + path }, sessionId);
  await sleep(1400);
}
async function evalJs(expression) {
  const r = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true }, sessionId);
  if (r.exceptionDetails) throw new Error(JSON.stringify(r.exceptionDetails));
  return r.result.value;
}

const results = [];
const check = (name, pass, detail = '') => {
  results.push({ name, pass, detail });
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}${detail ? '  — ' + detail : ''}`);
};

// 1. demo filter
await go('demo/');
const filtered = await evalJs(`(() => {
  const chip = [...document.querySelectorAll('[data-filter]')].find(c => c.textContent.trim() === 'Onboarding');
  chip.click();
  const cards = [...document.querySelectorAll('[data-cat]')];
  return { visible: cards.filter(c => c.style.display !== 'none').length, on: chip.classList.contains('is-on') };
})()`);
check('demo filter narrows to onboarding clips', filtered.visible === 3 && filtered.on, JSON.stringify(filtered));

// 2. lightbox opens with a video source
const lb = await evalJs(`(() => {
  document.querySelector('[data-play]').click();
  const box = document.querySelector('[data-lb]');
  const v = document.querySelector('[data-lb-video]');
  return { open: box.classList.contains('is-open'), src: (v.getAttribute('src') || '').split('/').pop() };
})()`);
check('lightbox opens a product clip', lb.open && lb.src.endsWith('.mp4'), JSON.stringify(lb));

// 3. FAQ accordion + search
await go('faq/');
const faq = await evalJs(`(() => {
  const item = [...document.querySelectorAll('[data-faq-item]')].find(i => !i.classList.contains('is-open'));
  item.querySelector('.acc__btn').click();
  const opened = item.classList.contains('is-open');
  const input = document.querySelector('[data-faqsearch]');
  input.value = 'GDPR';
  input.dispatchEvent(new Event('input', { bubbles: true }));
  const visible = [...document.querySelectorAll('[data-faq-item]')].filter(i => i.style.display !== 'none').length;
  return { opened, searchHits: visible };
})()`);
check('FAQ accordion opens', faq.opened === true);
check('FAQ search filters to GDPR', faq.searchHits === 1, JSON.stringify(faq));

// 4. ROI calculator reacts to input
await go('pricing/');
const calc = await evalJs(`(() => {
  const t = document.querySelector('[name=tickets]');
  const before = document.querySelector('[data-out-value]').textContent;
  t.value = 1000;
  t.dispatchEvent(new Event('input', { bubbles: true }));
  const after = document.querySelector('[data-out-value]').textContent;
  return { before, after };
})()`);
check('ROI calculator recomputes', calc.before !== calc.after, JSON.stringify(calc));

// 5. mobile menu
await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true }, sessionId);
await go('');
const menu = await evalJs(`(() => {
  const b = document.querySelector('[data-burger]');
  b.click();
  const m = document.querySelector('[data-menu]');
  return { expanded: b.getAttribute('aria-expanded'), open: m.classList.contains('is-open'), links: m.querySelectorAll('a').length };
})()`);
check('mobile menu opens with nav links', menu.expanded === 'true' && menu.open && menu.links >= 9, JSON.stringify(menu));

// 6. no horizontal overflow at 390px
const overflow = await evalJs(`document.documentElement.scrollWidth - window.innerWidth`);
check('no horizontal overflow at 390px', overflow <= 0, `overflow=${overflow}px`);

// 7. inline videos have a playable source and poster
await send('Emulation.clearDeviceMetricsOverride', {}, sessionId);
await go('product/');
const vid = await evalJs(`(() => {
  const v = document.querySelector('video');
  return { src: v.currentSrc.split('/').pop(), poster: !!v.getAttribute('poster'), ready: v.readyState };
})()`);
check('product video is attached and playable', vid.src.endsWith('.mp4') && vid.poster && vid.ready >= 1, JSON.stringify(vid));

const failed = results.filter((r) => !r.pass).length;
console.log(`\n${results.length - failed}/${results.length} checks passed`);
ws.close();
chrome.kill();
process.exit(failed ? 1 : 0);
