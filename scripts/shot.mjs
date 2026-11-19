#!/usr/bin/env node
/**
 * Tiny CDP screenshot driver (no dependencies).
 * Launches Chrome with remote debugging, emulates a device viewport,
 * and captures a full-page screenshot.
 *
 *   node scripts/shot.mjs <url> <out.png> [width] [dpr]
 */
import { spawn } from 'node:child_process';
import { writeFile, rm, mkdir } from 'node:fs/promises';
import { setTimeout as sleep } from 'node:timers/promises';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const url = process.argv[2] || 'http://127.0.0.1:4173/';
const out = process.argv[3] || '/tmp/shot.png';
const width = Number(process.argv[4] || 1440);
const dpr = Number(process.argv[5] || 1);
const height = width < 700 ? 844 : 900;

const port = 9333 + Math.floor(Math.random() * 300);
const profile = `/tmp/cdp-profile-${port}`;
await rm(profile, { recursive: true, force: true });
await mkdir(profile, { recursive: true });

const chrome = spawn(
  CHROME,
  [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${profile}`,
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    '--hide-scrollbars',
    '--disable-extensions',
    'about:blank',
  ],
  { stdio: 'ignore', detached: false },
);

async function getWsUrl() {
  for (let i = 0; i < 60; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}/json/version`);
      const json = await res.json();
      if (json.webSocketDebuggerUrl) return json.webSocketDebuggerUrl;
    } catch {}
    await sleep(200);
  }
  throw new Error('Chrome did not expose a debugging endpoint');
}

const wsUrl = await getWsUrl();
const ws = new WebSocket(wsUrl);
await new Promise((res, rej) => {
  ws.addEventListener('open', res, { once: true });
  ws.addEventListener('error', rej, { once: true });
});

let id = 0;
const pending = new Map();
ws.addEventListener('message', (ev) => {
  const msg = JSON.parse(ev.data);
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id);
    pending.delete(msg.id);
    msg.error ? reject(new Error(JSON.stringify(msg.error))) : resolve(msg.result);
  }
});

function send(method, params = {}, sessionId) {
  const msg = { id: ++id, method, params };
  if (sessionId) msg.sessionId = sessionId;
  ws.send(JSON.stringify(msg));
  return new Promise((resolve, reject) => pending.set(msg.id, { resolve, reject }));
}

// attach to the first page target
const { targetInfos } = await send('Target.getTargets');
const page = targetInfos.find((t) => t.type === 'page');
const { sessionId } = await send('Target.attachToTarget', { targetId: page.targetId, flatten: true });

await send('Page.enable', {}, sessionId);
await send('Emulation.setDeviceMetricsOverride', {
  width,
  height,
  deviceScaleFactor: dpr,
  mobile: width < 700,
}, sessionId);
if (width < 700) {
  await send('Emulation.setTouchEmulationEnabled', { enabled: true }, sessionId);
}
await send('Page.navigate', { url }, sessionId);
await sleep(2600);

// scroll through the page so lazy images and media load before capture
await send('Runtime.evaluate', {
  expression: `(async () => {
    const h = document.documentElement.scrollHeight;
    for (let y = 0; y < h; y += 700) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 90)); }
    window.scrollTo(0, 0);
    await new Promise(r => setTimeout(r, 500));
  })()`,
  awaitPromise: true,
}, sessionId);

const { result } = await send('Runtime.evaluate', {
  expression: 'JSON.stringify({w: document.documentElement.scrollWidth, h: document.documentElement.scrollHeight, iw: window.innerWidth})',
  returnByValue: true,
}, sessionId);
const dims = JSON.parse(result.value);
const contentHeight = Math.max(dims.h, 900);

const shot = await send('Page.captureScreenshot', {
  format: 'png',
  captureBeyondViewport: true,
  clip: { x: 0, y: 0, width: Math.max(dims.w, width), height: contentHeight, scale: 1 },
}, sessionId);

await writeFile(out, Buffer.from(shot.data, 'base64'));
console.log(`${out}  viewport=${dims.iw} scrollWidth=${dims.w} height=${dims.h}`);
ws.close();
chrome.kill();
process.exit(0);
