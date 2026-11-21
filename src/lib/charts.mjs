/** SVG chart primitives — no libraries, responsive, light DOM. */

const fmt = (n) => n.toLocaleString('en-US');

/**
 * Vertical bars with gridlines, gradient fills, value labels and an optional
 * highlight + annotation on the final bar.
 */
export function barChart(series, { unit = '', height = 300, highlightLast = true, annotate = '' } = {}) {
  const W = 720;
  const H = height;
  const padL = 10;
  const padR = 10;
  const padT = 60;
  const padB = 40;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;
  const max = Math.max(...series.map((d) => d.value)) * 1.14;
  const slot = plotW / series.length;
  const bw = Math.min(slot * 0.58, 108);

  const grid = [0, 0.25, 0.5, 0.75, 1]
    .map((t) => {
      const y = padT + plotH - plotH * t;
      return `<line x1="${padL}" y1="${y.toFixed(1)}" x2="${W - padR}" y2="${y.toFixed(1)}" stroke="var(--chart-grid)" stroke-width="1"/>`;
    })
    .join('');

  const bars = series
    .map((d, i) => {
      const h = Math.max(2, (d.value / max) * plotH);
      const x = padL + slot * i + (slot - bw) / 2;
      const y = padT + plotH - h;
      const last = highlightLast && i === series.length - 1;
      return `<g>
        <rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${bw.toFixed(1)}" height="${h.toFixed(1)}" rx="6"
          fill="url(#${last ? 'g-hl' : 'g-bar'})"/>
        <text x="${(x + bw / 2).toFixed(1)}" y="${(y - 14).toFixed(1)}" text-anchor="middle" class="chart-v">${fmt(d.value)}${unit}</text>
        <text x="${(x + bw / 2).toFixed(1)}" y="${padT + plotH + 24}" text-anchor="middle" class="chart-x">${d.x}</text>
      </g>`;
    })
    .join('');

  const lastBar = series[series.length - 1];
  const ann = annotate
    ? `<g>
        <rect x="${W - padR - 132}" y="8" width="122" height="26" rx="13" fill="var(--chart-ann-bg)"/>
        <text x="${W - padR - 71}" y="26" text-anchor="middle" class="chart-ann">${annotate}</text>
      </g>`
    : '';

  return `<div class="chartwrap">
    <svg viewBox="0 0 ${W} ${H}" class="chart-svg" role="img" aria-label="Bar chart: ${series.map((d) => `${d.x} ${fmt(d.value)}${unit}`).join(', ')}">
      <defs>
        <linearGradient id="g-bar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="var(--chart-bar-top)"/>
          <stop offset="100%" stop-color="var(--chart-bar-bot)"/>
        </linearGradient>
        <linearGradient id="g-hl" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="var(--chart-hl-top)"/>
          <stop offset="100%" stop-color="var(--chart-hl-bot)"/>
        </linearGradient>
      </defs>
      ${grid}
      ${bars}
      ${ann}
    </svg>
  </div>`;
}

/** Horizontal comparison bars with gradient fills and value chips. */
export function hBars(items, { max = null, unit = '%', tone = '' } = {}) {
  const m = max || Math.max(...items.map((d) => d.value)) * 1.12;
  return `<div class="hbars ${tone ? 'hbars--' + tone : ''}">
    ${items
      .map(
        (d) => `<div class="hbar">
        <span class="hbar__k">${d.label}</span>
        <span class="hbar__t"><i style="width:${(d.value / m) * 100}%"></i></span>
        <span class="hbar__v">${d.display ?? d.value + unit}</span>
      </div>`,
      )
      .join('')}
  </div>`;
}

/** Range bar: two markers on one axis (e.g. a 20–50% range). */
export function rangeBar({ from, to, max = 100, label = '', caption = '' }) {
  return `<div class="rangebar">
    ${label ? `<span class="rangebar__k">${label}</span>` : ''}
    <span class="rangebar__t">
      <i class="rangebar__fill" style="left:${(from / max) * 100}%;width:${((to - from) / max) * 100}%"></i>
    </span>
    <span class="rangebar__v">${from}–${to}</span>
    ${caption ? `<span class="rangebar__c">${caption}</span>` : ''}
  </div>`;
}

/** Donut with centre label. Segments: {label, value, color} */
export function donut(segments, { centre = '', sub = '', size = 168 } = {}) {
  const total = segments.reduce((a, b) => a + b.value, 0);
  const r = 54;
  const c = 2 * Math.PI * r;
  let offset = 0;
  const rings = segments
    .map((s) => {
      const len = (s.value / total) * c;
      const el = `<circle r="${r}" cx="70" cy="70" fill="none" stroke="${s.color}" stroke-width="16"
        stroke-dasharray="${len - 2} ${c - len + 2}" stroke-dashoffset="${-offset}" transform="rotate(-90 70 70)"/>`;
      offset += len;
      return el;
    })
    .join('');
  return `<div class="donut" style="--donut:${size}px">
    <svg viewBox="0 0 140 140" width="${size}" height="${size}" aria-hidden="true">
      <circle r="${r}" cx="70" cy="70" fill="none" stroke="var(--paper-2)" stroke-width="16"/>
      ${rings}
    </svg>
    <div class="donut__c"><b>${centre}</b><span>${sub}</span></div>
    <ul class="donut__legend">
      ${segments
        .map(
          (s) => `<li><i style="background:${s.color}"></i><span>${s.label}</span><b>${s.display ?? s.value}</b></li>`,
        )
        .join('')}
    </ul>
  </div>`;
}

/** Tiny sparkline path from numbers, 0..1 normalised. */
export function sparkline(values, { w = 120, h = 32, color = 'var(--teal)' } = {}) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const pts = values.map((v, i) => {
    const x = (i / (values.length - 1)) * w;
    const y = h - ((v - min) / (max - min || 1)) * (h - 4) - 2;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
  return `<svg class="spark" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" aria-hidden="true">
    <polyline points="${pts.join(' ')}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
}
