/** SVG chart primitives — no libraries, responsive, light DOM. */

const fmt = (n) => n.toLocaleString('en-US');

/** Vertical bars with axis labels and values. */
export function barChart(series, { unit = '', height = 200, accent = 'var(--teal)', highlightLast = true } = {}) {
  const max = Math.max(...series.map((d) => d.value)) * 1.08;
  const bw = 100 / series.length;
  const bars = series
    .map((d, i) => {
      const h = (d.value / max) * 100;
      const isLast = highlightLast && i === series.length - 1;
      return `<div class="chart__col">
        <span class="chart__v">${d.label ? '' : ''}${fmt(d.value)}${unit}</span>
        <span class="chart__track"><i style="height:${h}%;background:${isLast ? 'var(--amber)' : accent}" class="${d.dim ? 'is-dim' : ''}"></i></span>
        <span class="chart__x">${d.x}</span>
      </div>`;
    })
    .join('');
  return `<div class="chart" style="--chart-h:${height}px">${bars}</div>`;
}

/** Horizontal comparison bars, labelled. */
export function hBars(items, { max = null, unit = '%', tone = '' } = {}) {
  const m = max || Math.max(...items.map((d) => d.value)) * 1.1;
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
