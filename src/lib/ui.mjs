/** Small presentational helpers shared by every page. */
import { icon } from './layout.mjs';

export const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export const wrap = (inner, cls = '') => `<div class="wrap${cls ? ' ' + cls : ''}">${inner}</div>`;

export function eyebrow(text, tone = '') {
  return `<p class="eyebrow${tone ? ' eyebrow--' + tone : ''}"><span class="eyebrow__dash"></span>${text}</p>`;
}

export function btn({ href, label, variant = 'primary', ic = '', size = '', external = false }) {
  return `<a class="btn btn--${variant}${size ? ' btn--' + size : ''}" href="${href}"${external ? ' target="_blank" rel="noopener"' : ''}>${label}${ic ? icon(ic) : ''}</a>`;
}

export function sec({ id = '', tone = '', cls = '', inner, pad = '' }) {
  return `<section class="sec ${tone ? 'sec--' + tone : ''} ${cls}"${id ? ` id="${id}"` : ''}${pad ? ` data-pad="${pad}"` : ''}>
  <div class="wrap">${inner}</div>
</section>`;
}

export function secHead({ label, title, intro = '', align = '', cls = '' }) {
  return `<div class="sechead ${align ? 'sechead--' + align : ''} ${cls}">
    ${label ? eyebrow(label) : ''}
    <h2 class="h2">${title}</h2>
    ${intro ? `<p class="lead">${intro}</p>` : ''}
  </div>`;
}

export function note(text, cls = '') {
  return `<p class="note ${cls}">${text}</p>`;
}

export function stat({ value, unit = '', label, sub = '', dark = false }) {
  return `<div class="stat${dark ? ' stat--dark' : ''}">
    <p class="stat__v">${value}${unit ? `<span class="stat__u">${unit}</span>` : ''}</p>
    <p class="stat__l">${label}</p>
    ${sub ? `<p class="stat__s">${sub}</p>` : ''}
  </div>`;
}

export function statRow(items, cls = '') {
  return `<div class="statrow ${cls}">${items.map((s) => stat(s)).join('')}</div>`;
}

/* ------------------------------------------------------------------ video */
export function videoCard(ctx, v, { big = false } = {}) {
  const mins = Math.floor(v.dur / 60);
  const secs = String(Math.round(v.dur % 60)).padStart(2, '0');
  return `<figure class="vcard${big ? ' vcard--big' : ''}" data-cat="${v.cat}">
    <button class="vcard__frame" type="button" data-play="${v.slug}" data-title="${esc(v.title)}" data-base="${ctx.base}" aria-label="Play: ${esc(v.title)}">
      <img src="${ctx.base}media/poster/${v.slug}.jpg" alt="Screenshot of ${esc(v.title)} in the ToolFix AI product" width="1440" height="794" loading="lazy">
      <span class="vcard__play">${icon('play')}</span>
      <span class="vcard__dur">${mins}:${secs}</span>
    </button>
    <figcaption class="vcard__body">
      <span class="vcard__cat">${v.cat}</span>
      <h3>${v.title}</h3>
      <p>${v.blurb}</p>
    </figcaption>
  </figure>`;
}

export function videoPanel(ctx, slug, { caption = '', label = '', flip = false, autoplay = true, cls = '' } = {}) {
  // Loops start at the content-rich moment of a clip (see scripts/encode-videos.sh).
  const looped = ['ai-diagnosis', 'token-link', 'pdf-parsing', 'grounded-answers', 'chrome-workbench'].includes(slug);
  const src = looped ? 'loop-' + slug : slug;
  return `<figure class="vpanel ${flip ? 'vpanel--flip' : ''} ${cls}">
    <div class="vpanel__glass">
      ${label ? `<span class="vpanel__label">${label}</span>` : ''}
      <video class="vpanel__video" muted playsinline ${autoplay ? 'autoplay' : ''} preload="metadata" poster="${ctx.base}media/poster/${src}.jpg" data-inline-tour data-start="0">
        <source src="${ctx.base}media/video/${src}.mp4" type="video/mp4">
      </video>
    </div>
    ${caption ? `<figcaption class="vpanel__cap">${caption}</figcaption>` : ''}
  </figure>`;
}

/* ------------------------------------------------------------------ charts */
export function bars(data, { max = 100, unit = '%', tone = 'teal', thin = false } = {}) {
  return `<div class="bars bars--${tone}${thin ? ' bars--thin' : ''}">
    ${data
      .map(
        (d) => `<div class="bar">
        <span class="bar__k">${d.label}</span>
        <span class="bar__t"><i style="width:${Math.round((d.value / max) * 100)}%"></i></span>
        <span class="bar__v">${d.value}${unit}</span>
      </div>`,
      )
      .join('')}
  </div>`;
}

export function columns(data, { unit = '%', tone = 'teal', max = 100 } = {}) {
  return `<div class="cols cols--${tone}">
    ${data
      .map(
        (d) => `<div class="col">
        <span class="col__v">${d.value}<small>${unit}</small></span>
        <span class="col__bar" style="--h:${Math.round((d.value / max) * 100)}%"><i></i></span>
        <span class="col__k">${d.label}</span>
      </div>`,
      )
      .join('')}
  </div>`;
}

export function table(head, rows, { cls = '', firstCol = '', highlightCol = null } = {}) {
  const mark = (c) =>
    String(c)
      .replace(/^✓$/, '<span class="mark mark--yes">✓</span>')
      .replace(/^—$/, '<span class="mark mark--no">—</span>');
  const cellCls = (i) => [i === 0 ? 'tbl__first' : '', i === highlightCol ? 'is-hl' : ''].filter(Boolean).join(' ');
  return `<div class="tblwrap ${cls}"><table class="tbl">
    <thead><tr>${head
      .map((h, i) => `<th class="${cellCls(i)}">${h}</th>`)
      .join('')}</tr></thead>
    <tbody>${rows
      .map((r) => `<tr>${r.map((c, i) => `<td class="${cellCls(i)}">${mark(c)}</td>`).join('')}</tr>`)
      .join('')}</tbody>
  </table></div>`;
}

export function pills(items) {
  return `<div class="pills">${items.map((i) => `<span class="pill">${i}</span>`).join('')}</div>`;
}

export function callout({ label = 'Note', body, tone = '' }) {
  return `<aside class="callout ${tone ? 'callout--' + tone : ''}">
    <span class="callout__label">${label}</span>
    <p>${body}</p>
  </aside>`;
}
