import { icon, href } from '../lib/layout.mjs';
import { eyebrow, btn, sec, videoCard } from '../lib/ui.mjs';
import { VIDEOS, VIDEO_CATS } from '../lib/data.mjs';

export default {
  path: '/demo/',
  nav: 'demo',
  title: 'Product tour — 15 recordings of the live build · ToolFix AI',
  description:
    'Watch ToolFix AI working: buyer diagnosis, token links, manual parsing, grounded answers, human handover, the merchant dashboard, branding, four languages and the Chrome workbench. Every clip is a recording of the deployed build.',
  body: (ctx) => {
    const l = (p) => href(ctx, p);
    return `
<section class="phero">
  <div class="hero__grid"></div>
  <div class="wrap phero__in">
    <div>
      <p class="phero__crumbs"><a href="${l('')}">Home</a> / Product tour</p>
      <h1>Fifteen clips. One working product.</h1>
      <p class="phero__sub">Every recording here is captured from the deployed MVP — merchant console, buyer chat, parsing pipeline and browser extension. Nothing is a mock-up, and nothing is staged beyond sample data.</p>
    </div>
    <div class="phero__aside">
      <b>Live build · v0.2.0 extension</b>
      Runtime 10–19 seconds per clip. Short on purpose: each shows one task end to end.
    </div>
  </div>
</section>

${sec({
  tone: 'white',
  inner: `
  <div class="filters" data-filters role="group" aria-label="Filter recordings">
    ${VIDEO_CATS.map(
      (c, i) => `<button class="chip${i === 0 ? ' is-on' : ''}" data-filter="${c}" aria-pressed="${i === 0}">${c}</button>`,
    ).join('')}
  </div>
  <div class="vgrid">
    ${VIDEOS.map((v) => videoCard(ctx, v)).join('')}
  </div>
  <p class="sourceline">Sample merchants, buyers and SKUs appear in these recordings. Names, order numbers and figures shown in the interface are demonstration data, not customer data.</p>`,
})}

${sec({
  tone: 'paper2',
  inner: `
  <div class="grid grid-2" style="align-items:center;gap:48px">
    <div>
      ${eyebrow('Rather than watch')}
      <h2 class="h2">Open the console yourself.</h2>
      <p class="lead" style="margin-top:16px">Create a merchant account, upload a manual you already own, and run a session against it. The free-tier account is enough to see parsing, retrieval and the buyer page.</p>
      <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:24px">
        ${btn({ href: 'https://www.toolfixai.cn', label: 'www.toolfixai.cn', variant: 'primary', ic: 'external', external: true })}
        ${btn({ href: l('pricing/#pilot'), label: 'Book a guided pilot', variant: 'line', ic: 'arrow' })}
      </div>
    </div>
    <div class="card" style="padding:28px">
      <h3 class="h4" style="margin-bottom:14px">What you can test in one sitting</h3>
      <ul class="feats" style="margin-top:0">
        <li>${icon('check')}Upload a manual and watch the parse, chunk and index steps</li>
        <li>${icon('check')}Ask a question that names a model and inspect the retrieved chunks</li>
        <li>${icon('check')}Generate a token link and open the buyer page on your phone</li>
        <li>${icon('check')}Trigger a safety keyword and watch the session escalate</li>
        <li>${icon('check')}Take over a session as an agent and hand it back</li>
      </ul>
    </div>
  </div>`,
})}

<div class="lb" data-lb aria-hidden="true" role="dialog" aria-modal="true" aria-label="Video player">
  <div class="lb__box">
    <div class="lb__head">
      <h3 data-lb-title>Product clip</h3>
      <button class="lb__close" type="button" data-lb-close aria-label="Close video">${icon('close')}</button>
    </div>
    <video data-lb-video controls playsinline preload="none"></video>
    <p class="lb__hint">Recorded from the deployed build · press Esc to close</p>
  </div>
</div>
`;
  },
};
