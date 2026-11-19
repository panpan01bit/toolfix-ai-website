import { icon, href } from '../lib/layout.mjs';
import { eyebrow, btn, sec } from '../lib/ui.mjs';
import { FAQ_GROUPS } from '../lib/data.mjs';

export default {
  path: '/faq/',
  nav: 'faq',
  title: 'FAQ — 30 questions on product, safety, data and pricing · ToolFix AI',
  description:
    'Thirty questions from merchants, buyers, partners and investors: how the diagnosis works, how safety is enforced, what data is stored, how pricing and pilots are structured, and what stage the company is at.',
  body: (ctx) => {
    const l = (p) => href(ctx, p);
    return `
<section class="phero">
  <div class="hero__grid"></div>
  <div class="wrap phero__in">
    <div>
      <p class="phero__crumbs"><a href="${l('')}">Home</a> / FAQ</p>
      <h1>Thirty questions, answered without hedging.</h1>
      <p class="phero__sub">Product, safety, data, commercial terms and stage — including the ones where the honest answer is “not yet measured”.</p>
    </div>
    <div class="phero__aside">
      <b>Still stuck?</b>
      Email <a href="mailto:kuangqisun@gmail.com" style="color:#cfd8e3;border-bottom:1px solid rgba(255,255,255,.3)">kuangqisun@gmail.com</a> — a founder replies, usually the same day.
    </div>
  </div>
</section>

${sec({
  tone: 'white',
  inner: `
  <div class="grid grid-1-2" style="align-items:start;gap:48px">
    <div style="position:sticky;top:104px">
      ${eyebrow('Contents')}
      <h2 class="h2" style="font-size:clamp(1.5rem,2.2vw,2rem)">Jump to a section</h2>
      <nav style="margin-top:18px;display:grid;gap:2px">
        ${FAQ_GROUPS.map(
          (g) => `<a href="#${g.id}" style="padding:10px 0;border-bottom:1px solid var(--line);font-size:.9rem;display:flex;justify-content:space-between;gap:10px;color:var(--text)">${g.title}<span style="color:var(--muted-2)">${g.items.length}</span></a>`,
        ).join('')}
      </nav>
      <div style="margin-top:24px">
        ${btn({ href: l('pricing/#pilot'), label: 'Book a pilot', variant: 'primary', ic: 'arrow' })}
      </div>
    </div>
    <div>
      <label class="faqsearch" for="faq-q">
        ${icon('chat')}
        <input id="faq-q" type="search" placeholder="Search all 30 questions…" data-faqsearch autocomplete="off">
      </label>
      ${FAQ_GROUPS.map(
        (g) => `<section class="faqgroup" id="${g.id}" data-faq-group>
        <div class="faqgroup__h"><span>${String(FAQ_GROUPS.indexOf(g) + 1).padStart(2, '0')}</span><h2 class="h3">${g.title}</h2></div>
        <div class="acc" data-acc>
          ${g.items
            .map(
              (item, i) => `<div class="acc__item${i === 0 ? ' is-open' : ''}" data-faq-item>
              <button class="acc__btn" type="button" aria-expanded="${i === 0}">${item.q}<span class="acc__sign">${icon('plus')}</span></button>
              <div class="acc__panel"><p>${item.a}</p></div>
            </div>`,
            )
            .join('')}
        </div>
      </section>`,
      ).join('')}
      <p class="faqempty" data-faq-empty style="display:none">No question matches that search. Try a shorter phrase, or <a href="mailto:kuangqisun@gmail.com" style="color:var(--teal-deep)">email us</a>.</p>
    </div>
  </div>`,
})}

${sec({
  tone: 'paper2',
  inner: `
  <div class="grid grid-3">
    <div class="card card--tight"><h3 class="h4">See it first</h3><p style="margin-top:6px">Fifteen recordings of the deployed build, one task each.</p><div style="margin-top:14px">${btn({ href: l('demo/'), label: 'Product tour', variant: 'line', size: 'sm', ic: 'play' })}</div></div>
    <div class="card card--tight"><h3 class="h4">Check the maths</h3><p style="margin-top:6px">Plans, overage rates and an ROI estimator you can move.</p><div style="margin-top:14px">${btn({ href: l('pricing/'), label: 'Pricing', variant: 'line', size: 'sm', ic: 'arrow' })}</div></div>
    <div class="card card--tight"><h3 class="h4">Read the plan</h3><p style="margin-top:6px">The full business plan, survey and financial model on request.</p><div style="margin-top:14px">${btn({ href: l('investors/'), label: 'Investors', variant: 'line', size: 'sm', ic: 'arrow' })}</div></div>
  </div>`,
})}
`;
  },
};
