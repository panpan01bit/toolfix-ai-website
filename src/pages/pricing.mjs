import { icon, href } from '../lib/layout.mjs';
import { eyebrow, btn, sec, table, callout, note, eyebrow as eb } from '../lib/ui.mjs';
import { PLANS } from '../lib/data.mjs';

const cny = (n) => '¥' + n.toLocaleString('en-US');

export default {
  path: '/pricing/',
  nav: 'pricing',
  title: 'Pricing — pilot, Basic, Growth and Enterprise · ToolFix AI',
  description:
    'ToolFix AI pricing: a 60-day pilot at ¥2,999 with done-for-you knowledge curation, then ¥399, ¥899 or ¥19,800 per year. Usage-based overage at ¥0.45–0.80 per diagnosis session, plus an ROI calculator.',
  body: (ctx) => {
    const l = (p) => href(ctx, p);
    return `
<section class="phero">
  <div class="hero__grid"></div>
  <div class="wrap phero__in">
    <div>
      <p class="phero__crumbs"><a href="${l('')}">Home</a> / Pricing</p>
      <h1>Priced against the return it prevents.</h1>
      <p class="phero__sub">Subscriptions scale with SKUs and diagnosis volume, not seats — so the bill tracks the value received. Every plan starts with a pilot you can walk away from.</p>
    </div>
    <div class="phero__aside">
      <b>Pilot first</b>
      60 days, five SKUs, curated knowledge base and a before/after report. Terms and volume discounts for manufacturers are discussed directly.
    </div>
  </div>
</section>

${sec({
  id: 'plans',
  tone: 'paper2',
  inner: `
  <div class="plans">
    ${PLANS.map(
      (p) => `<article class="plan${p.id === 'growth' ? ' is-rec' : ''}" id="${p.id}">
      ${p.tag ? `<span class="plan__tag">${p.tag}</span>` : ''}
      <p class="plan__name">${p.name}</p>
      <p class="plan__price">${cny(p.price)}<small>/ ${p.period}</small></p>
      <p class="plan__usd">≈ USD ${p.usd.toLocaleString('en-US')} · indicative</p>
      <p class="plan__pitch">${p.pitch}</p>
      <ul class="plan__feats">${p.features.map((f) => `<li>${icon('check')}${f}</li>`).join('')}</ul>
      ${btn({ href: p.id === 'pilot' ? '#pilot' : 'mailto:kuangqisun@gmail.com?subject=ToolFix%20AI%20' + p.name, label: p.cta, variant: p.id === 'growth' ? 'primary' : 'line', size: 'sm' })}
      <p class="plan__note">${p.note}</p>
    </article>`,
    ).join('')}
  </div>
  <p class="sourceline">Prices exclude tax. USD figures are indicative conversions for international readers; billing is issued in RMB. Pilot fees are credited toward the first subscription.</p>`,
})}

${sec({
  tone: 'white',
  inner: `
  <div class="sechead">
    ${eyebrow('Compare')}
    <h2 class="h2">What changes between plans.</h2>
  </div>
  ${table(
    ['Included', 'Pilot', 'Basic', 'Growth', 'Enterprise'],
    [
      ['SKUs', '5', '5', '20', '60'],
      ['Diagnosis sessions', '500 total', '300 / month', '1,000 / month', '3,000 / month'],
      ['Buyer self-service link', '✓', '✓', '✓', '✓'],
      ['Knowledge curation by us', '✓', '—', 'Optional add-on', '✓'],
      ['Human hand-over queue', '✓', '—', '✓', '✓'],
      ['Diagnostics records', '✓', '✓', '✓', '✓'],
      ['Analytics & interception report', 'Pilot report', 'Basic stats', '✓', '✓'],
      ['Multi-account & permissions', '—', '—', '—', '✓'],
      ['Support', 'Founder-led', 'Email', 'Priority', 'Priority + quarterly review'],
      ['Overage per session', 'Custom', '¥0.80', '¥0.60', '¥0.45'],
    ],
    { firstCol: 'Included', highlightCol: 3 },
  )}
  <p class="sourceline">A “diagnosis session” is one continuous multi-round resolution of one issue, not one message. Pilot overage is quoted per merchant.</p>`,
})}

${sec({
  id: 'roi',
  tone: '',
  inner: `
  <div class="sechead sechead--split">
    <div>${eb('ROI estimator')}<h2 class="h2">What one avoided return is worth to you.</h2></div>
    <p class="lead">Move the sliders. The model assumes 70% of fake-fault sessions self-resolve and a USD 60 all-in cost per return — the midpoint of the USD 50–70 range we found in interviews.</p>
  </div>
  <div class="calc" data-calc>
    <div>
      <div class="calc__field">
        <label for="tickets">After-sales tickets per month <output data-out-tickets>400</output></label>
        <input type="range" id="tickets" name="tickets" min="50" max="3000" step="25" value="400">
      </div>
      <div class="calc__field">
        <label for="share">Share that are operation / setup issues <output data-out-share>40%</output></label>
        <input type="range" id="share" name="share" min="10" max="70" step="5" value="40">
      </div>
      <div class="calc__field">
        <label for="plan">Plan you would compare against</label>
        <select id="plan" name="plan">
          <option value="399">Basic — ¥399 / month</option>
          <option value="899" selected>Growth — ¥899 / month</option>
          <option value="1650">Enterprise — ¥19,800 / year</option>
        </select>
      </div>
      <p class="note">Assumptions are adjustable per merchant during a pilot. The estimator is illustrative, not a guarantee of results.</p>
    </div>
    <div class="calc__out">
      <p class="k">Estimated monthly value recovered</p>
      <p class="calc__num" data-out-value>$0</p>
      <div class="calc__row"><span>Operation-class tickets</span><b data-out-volume>0</b></div>
      <div class="calc__row"><span>Self-resolved by AI (70%)</span><b data-out-recovered>0</b></div>
      <div class="calc__row"><span>Plan cost (USD equiv.)</span><b data-out-cost>$0</b></div>
      <div class="calc__row"><span>Net contribution</span><b data-out-net>$0</b></div>
      <p class="calc__foot">Value = recovered sessions × USD 60 average loss per avoidable return. Plan cost converted at ≈7.2 CNY/USD. Subscription is billed in RMB.</p>
    </div>
  </div>`,
})}

${sec({
  id: 'pilot',
  tone: 'paper2',
  inner: `
  <div class="sechead sechead--split">
    <div>${eb('The 60-day pilot')}<h2 class="h2">Three SKUs is enough to know.</h2></div>
    <p class="lead">We quote five SKUs in the package and start with three. The point is a verdict on your own manuals, your own buyers and your own return rate — not a demo on our sample data.</p>
  </div>
  <div class="tl">
    ${[
      ['Week 0 · Qualify', 'After-sales volume, SKU count, who handles tickets, what a return costs you. If the maths does not work, we say so.'],
      ['Week 1 · Curate', 'We take your manuals, parse them, review extracted specs and safety warnings with you, and agree the fallback script the AI uses when it is unsure.'],
      ['Weeks 2–7 · Run', 'Real buyers, real orders. Success metrics fixed in advance: self-resolution rate, interception count, hand-over rate, response latency, return rate on covered SKUs.'],
      ['Week 8 · Report', 'A before/after report with session counts, interceptions, what escalated and why, plus buyer feedback. The pilot fee is credited toward your first subscription.'],
    ]
      .map(([t, d], i) => `<div class="tl__item${i === 0 ? ' is-next' : ''}"><div class="tl__when">Step 0${i + 1}</div><div class="tl__body"><h3>${t}</h3><p>${d}</p></div></div>`)
      .join('')}
  </div>
  <div class="grid grid-2" style="margin-top:32px">
    ${callout({ label: 'What we need from you', body: 'Product manuals as PDFs, a sample of past after-sales tickets if you have them, and one person who can answer “is this normal for this model?” during curation.' })}
    ${callout({ label: 'What you get regardless of outcome', body: 'A structured knowledge base for your covered SKUs and a measured baseline for self-resolution and return rate — useful even if you never run another session.', tone: 'warn' })}
  </div>
  <div style="margin-top:28px;display:flex;gap:10px;flex-wrap:wrap">
    ${btn({ href: 'mailto:kuangqisun@gmail.com?subject=ToolFix%20AI%20pilot%20request', label: 'Request a pilot', variant: 'primary', ic: 'arrow' })}
    ${btn({ href: l('faq/'), label: 'Read the FAQ', variant: 'line', ic: 'arrow' })}
  </div>`,
})}

${sec({
  tone: 'white',
  inner: `
  <div class="grid grid-1-2" style="align-items:start">
    <div>
      ${eb('Billing questions')}
      <h2 class="h2">The parts buyers ask about.</h2>
      <p class="lead" style="margin-top:14px">The full 30-question FAQ covers product, safety, data and commercial terms.</p>
      <div style="margin-top:20px">${btn({ href: l('faq/#business'), label: 'All billing questions', variant: 'line', ic: 'arrow' })}</div>
    </div>
    <div class="acc" data-acc>
      ${[
        ['Is there a free tier?', 'Not at launch. A free tier would not cover the knowledge curation that makes a trial meaningful, and an uncurated trial produces a bad verdict on the product. The pilot is priced for that labour and filters for merchants who intend to measure.'],
        ['How is usage counted?', 'One continuous multi-round diagnosis of a single issue is one session. Messages are not counted individually. Sessions that escalate to a human still count as one session.'],
        ['What happens when we exceed the plan?', 'Overage bills per session at the plan rate: ¥0.80 Basic, ¥0.60 Growth, ¥0.45 Enterprise. We alert at 80% of the quota; nothing stops working mid-diagnosis.'],
        ['Can we cancel mid-term?', 'Monthly plans can be cancelled at the end of any billing month. Annual plans are refundable pro rata in the first 90 days if the pilot report shows no measurable interception.'],
        ['Do you charge per seat?', 'No. Plans price on SKUs and diagnosis volume. Adding agents to the hand-over queue does not change the bill.'],
      ]
        .map(
          ([q, a], i) => `<div class="acc__item${i === 0 ? ' is-open' : ''}"><button class="acc__btn" type="button" aria-expanded="${i === 0}">${q}<span class="acc__sign">${icon('plus')}</span></button><div class="acc__panel"><p>${a}</p></div></div>`,
        )
        .join('')}
    </div>
  </div>`,
})}

<section class="cta">
  <div class="cta__grid"></div>
  <div class="wrap cta__in">
    <div>
      <h2 class="h2">Start with the pilot, decide with a report.</h2>
      <p>¥2,999 for 60 days, credited against your first subscription. If the interception rate is not there, you keep the knowledge base and the baseline.</p>
    </div>
    <div class="cta__acts">
      ${btn({ href: 'mailto:kuangqisun@gmail.com?subject=ToolFix%20AI%20pilot%20request', label: 'Email the founders', variant: 'onDark', ic: 'arrow' })}
      ${btn({ href: l('investors/'), label: 'Investor materials', variant: 'ghostDark', ic: 'arrow' })}
      <p class="cta__fine">Prices are test-stage proposals and will be tuned against pilot feedback and per-session cost.</p>
    </div>
  </div>
</section>
`;
  },
};
