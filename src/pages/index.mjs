import { icon, href } from '../lib/layout.mjs';
import { VIDEOS, EVIDENCE, MARKET } from '../lib/data.mjs';
import { eyebrow, btn, sec, statRow, bars, callout } from '../lib/ui.mjs';
import { chatMockup, consoleMockup, guideMockup } from '../lib/mockups.mjs';
import { barChart, hBars } from '../lib/charts.mjs';

export default {
  path: '/',
  nav: 'home',
  title: 'ToolFix AI — Vertical AI after-sales diagnostics for power-tool brands',
  description:
    'ToolFix AI turns a manufacturer’s own manuals into a diagnostic agent that resolves false faults before they become returns, and escalates real ones to a human with the evidence attached. MVP live; pre-seed.',
  body: (ctx) => {
    const l = (p) => href(ctx, p);
    return [
      hero(ctx, l),
      strip(),
      problem(ctx, l),
      returnsBill(l),
      showcase(ctx),
      coverage(ctx),
      loop(ctx, l),
      safety(),
      advantages(l),
      evidence(l),
      market(l),
      cta(l),
    ].join('\n');
  },
};

function hero(ctx, l) {
  return `<section class="hero">
  <div class="hero__grid"></div><div class="hero__glow"></div>
  <div class="wrap hero__in">
    <div>
      <span class="hero__eyebrow"><span class="dot-live"></span>Pre-seed · MVP live at toolfixai.cn</span>
      <h1 class="h1">Stop refunding tools that were <em>never broken.</em></h1>
      <p class="hero__sub">ToolFix AI turns your own product manuals into a diagnostic agent that resolves false faults in the buyer’s language — and hands the real ones to your team with the evidence already collected.</p>
      <div class="hero__cta">
        ${btn({ href: l('pricing/#pilot'), label: 'Book a 60-day pilot', variant: 'onDark', ic: 'arrow', size: 'lg' })}
        ${btn({ href: l('demo/'), label: 'Watch the product tour', variant: 'ghostDark', ic: 'play', size: 'lg' })}
      </div>
      <div class="hero__proof">
        <span>${icon('check')}100 buyer &amp; seller interviews</span>
        <span>${icon('check')}Shopify loop running live</span>
        <span>${icon('check')}100% safety escalation by rule</span>
      </div>
    </div>
    <div class="hero__media">
      <div class="hero__frame">
        <div class="hero__chrome"><i></i><i></i><i></i><span>buyer session · token link · EN</span></div>
        <video muted playsinline loop autoplay preload="metadata" poster="${ctx.base}media/poster/hero-loop.jpg" aria-label="Recording of an AI diagnostic session answering a buyer question from the manual">
          <source src="${ctx.base}media/video/hero-loop.mp4" type="video/mp4">
        </video>
      </div>
      <div class="hero__tag">
        ${icon('shield')}
        <div><b>Fake fault intercepted</b><small>Battery in transport mode → guide page, no agent needed</small></div>
      </div>
    </div>
  </div>
</section>`;
}

function strip() {
  const items = ['Cordless drills', 'Impact drivers', 'Angle grinders', 'Rotary hammers', 'Circular saws', 'Lawn mowers', 'Line trimmers', 'Blowers'];
  return `<div class="strip"><div class="wrap strip__in">
    <span class="strip__label">Covered today</span>
    ${items.map((i) => `<span class="strip__item">${i}</span>`).join('')}
    <span class="strip__item" style="color:#c3cedb;margin-left:auto"><span class="dot-live" style="margin-right:2px"></span><b>Shopify</b>&nbsp;live</span>
  </div></div>`;
}

function problem(ctx, l) {
  return sec({
    tone: 'paper2',
    id: 'problem',
    inner: `
    <div class="sechead sechead--split">
      <div>
        ${eyebrow('The problem')}
        <h2 class="h2">Most after-sales tickets are not defects.</h2>
      </div>
      <p class="lead">A battery ships asleep. A direction switch sits in the middle. A guard is mounted backwards. The tool works; the buyer cannot tell — so the conversation starts, and sometimes ends in a refund.</p>
    </div>
    ${statRow([
      { value: '15', unit: '%', label: 'Category return rate benchmark', sub: 'The number our PRD benchmarks against' },
      { value: '40', unit: '%', label: 'Of surveyed problems are install / mode / setup class', sub: 'The part an AI can safely absorb' },
      { value: 'USD 50–70', label: 'Lost on one avoidable return of an USD 80 tool', sub: 'Freight, refund, re-listing discount' },
      { value: '3–5×', label: 'Peak-season ticket volume vs. off-season', sub: 'Outdoor-equipment case: Shulex × Mammotion' },
    ])}
    <div class="grid grid-2-1" style="margin-top:34px">
      <div class="card">
        <h3 class="h3">What actually happens in a fake-fault return</h3>
        <div class="flow" style="margin-top:18px">
          <div class="flow__row"><span class="flow__k">Day 0 · Ticket</span><div class="flow__v">The buyer writes “the drill does not work”. No model, no symptom detail, no photos. The agent starts from zero, in another time zone.</div></div>
          <div class="flow__row"><span class="flow__k">Day 1 · Advice</span><div class="flow__v">A generic reply arrives overnight. The buyer follows it loosely, it does not work, and trust drops — advice that is not anchored to this SKU reads like a template.</div></div>
          <div class="flow__row"><span class="flow__k">Day 2 · Return</span><div class="flow__v">The buyer requests a refund. The seller pays return freight, refunds, re-inspects the unit, relists it at a discount — and the listing carries another review.</div></div>
          <div class="flow__row"><span class="flow__k">Day 12 · Unit back</span><div class="flow__v">The tool arrives functionally sound. Nothing was wrong except the battery’s transport mode, and nobody asked the question that would have found it.</div></div>
        </div>
        <p class="sourceline">Reconstructed from founder interviews; cost range from the business plan’s unit-economics section.</p>
      </div>
      <div style="display:flex;flex-direction:column;gap:16px">
        ${callout({
          label: 'Why the obvious fixes fall short',
          body: 'PDF manuals do not get opened. Generic chatbots guess, and on power tools a guess is a safety risk. Human service does not scale into peak season. When self-service fails, buyers request a refund — the most expensive outcome for everyone.',
        })}
        <div class="card card--dark" style="margin-top:auto">
          <p class="mono" style="color:#7fd3cf;margin-bottom:12px">The wedge</p>
          <p style="font-size:1rem;line-height:1.55;color:#d7e0ea;margin-bottom:18px">Not “AI customer service”. A diagnostic layer with the manual as its only source, a safety rule it cannot override, and a buyer entry that already knows the order.</p>
          ${btn({ href: l('product/'), label: 'See how the platform works', variant: 'ghostDark', ic: 'arrow', size: 'sm' })}
        </div>
      </div>
    </div>`,
  });
}

function returnsBill(l) {
  const data = [
    { x: '2021', value: 761 },
    { x: '2022', value: 816 },
    { x: '2023', value: 743 },
    { x: '2024', value: 890 },
  ];
  return sec({
    tone: 'white',
    id: 'returns',
    inner: `
    <div class="sechead sechead--split">
      <div>${eyebrow('The bill')}<h2 class="h2">USD 890 billion came back in the US last year.</h2></div>
      <p class="lead">Returns are the most expensive way to learn a tool was fine. Roughly a fifth to a half of returned electronics show no fault when tested — and the seller pays the freight either way.</p>
    </div>
    <div class="grid grid-1-2" style="align-items:start">
      <div>
        <div class="bignum" style="margin-bottom:22px">
          <span class="bignum__v">$890<em>bn</em></span>
          <span class="bignum__l">returned in the US in 2024 — 16.9% of retail sales, and 17.6% of online orders.</span>
        </div>
        ${hBars([
          { label: 'Cost to process a return', value: 27, display: '27% of price' },
          { label: 'Returned electronics with no fault', value: 35, display: '20–50%' },
          { label: 'Share of returns that are fraud', value: 15, display: '15.1%' },
        ], { max: 60 })}
        <p class="src">NRF × Happy Returns (2024) · Optoro (2024) · Appriss Retail / Deloitte (2024) · published no-fault-found estimates.</p>
        <div style="margin-top:22px">${btn({ href: l('returns/'), label: 'The full data story', variant: 'primary', ic: 'arrow' })}</div>
      </div>
      <div class="figframe">
        <h4>US retail returns, USD billions</h4>
        <p class="figframe__sub">Growth outran retail sales; the rate rose from 16.6% to 16.9%.</p>
        ${barChart(data, { unit: 'bn', height: 250 })}
        <p class="src">NRF &amp; Happy Returns, December 2024; NRF &amp; Appriss Retail, December 2022.</p>
      </div>
    </div>`,
  });
}

function showcase(ctx) {
  return sec({
    tone: '',
    inner: `
    <div class="sechead sechead--split">
      <div>${eyebrow('The product')}<h2 class="h2">Two windows. One session record.</h2></div>
      <p class="lead">The buyer never installs anything. The merchant never opens a second tool. Everything below is the shipped interface, rebuilt here as live HTML so it stays legible at any size.</p>
    </div>
    <div class="grid grid-2" style="gap:34px;align-items:start">
      <div>
        ${chatMockup(ctx, { caption: 'Buyer chat — the AI answers from the model’s own manual and shows the source. No login, no app.' })}
      </div>
      <div>
        ${consoleMockup(ctx, { caption: 'Merchant console — self-resolution, interceptions and the handover queue in one view. Sample data.' })}
      </div>
    </div>
    <div class="grid grid-3" style="margin-top:34px">
      <article class="card card--tight"><div class="card__ic">${icon('lock')}</div><h3 class="h4">No account for the buyer</h3><p style="margin-top:6px">A token link bound to one order. Nothing to install, nothing to remember.</p></article>
      <article class="card card--tight"><div class="card__ic">${icon('layers')}</div><h3 class="h4">Answers cite the manual</h3><p style="margin-top:6px">Every answer carries the source document it came from, so a merchant can audit it later.</p></article>
      <article class="card card--tight"><div class="card__ic">${icon('users')}</div><h3 class="h4">Handover keeps the context</h3><p style="margin-top:6px">Symptoms, photos and ruled-out causes travel with the session when a human takes over.</p></article>
    </div>`,
  });
}

function coverage(ctx) {
  const tools = [
    ['tool-drill-2.jpg', 'FD1104071', 'Impact drill', '“It runs for two seconds then stops.”', 'Battery in transport-sleep mode'],
    ['tool-grinder-2.jpg', 'FD1105075', 'Angle grinder', '“It overheats after a minute.”', 'Guard mounted the wrong way round'],
    ['tool-drill.jpg', 'FD1104071-H', 'Rotary hammer', '“The bit spins but never hammers.”', 'Mode dial left between two detents'],
    ['tool-grinder.jpg', 'AG-125', 'Angle grinder', '“The disc wobbles out of the box.”', 'Disc seated on the wrong flange'],
  ];
  return sec({
    tone: '',
    inner: `
    <div class="sechead sechead--split">
      <div>${eyebrow('Coverage')}<h2 class="h2">The same five questions, in every catalogue.</h2></div>
      <p class="lead">False faults are not random. Across drills, hammers and grinders the same handful of setup mistakes produces most of the avoidable tickets — which is why a knowledge base of a few dozen scenarios covers a catalogue.</p>
    </div>
    <div class="grid grid-4">
      ${tools
        .map(
          ([img, sku, name, ticket, cause]) => `<article class="toolcard">
          <div class="toolcard__img"><img src="${ctx.base}img/${img}" alt="${name} ${sku}" loading="eager" decoding="async"></div>
          <div class="toolcard__b">
            <span class="toolcard__sku">${sku}</span>
            <h3 class="h4">${name}</h3>
            <p class="toolcard__q">${ticket}</p>
            <p class="toolcard__a">${cause}</p>
          </div>
        </article>`,
        )
        .join('')}
    </div>
    <p class="src">Product photography from the founders’ own catalogue (HST). Model codes as they appear in the uploaded manuals.</p>`,
  });
}

function loop(ctx, l) {
  const steps = [
    ['01', 'Signed entry', 'A token link bound to buyer, product and order. No sign-up, no password, no app.'],
    ['02', 'Grounded retrieval', 'The manual is chunked, embedded and matched by model before the model writes a word.'],
    ['03', 'Bounded diagnosis', 'One question per turn, five rounds maximum — the budget 68% of buyers said they would give.'],
    ['04', 'Deterministic safety', 'Smoke, sparks, shock, swelling, injury stop the conversation outside the AI model.'],
    ['05', 'Resolve or escalate', 'A self-fix guide ends it, or a human takes over in the same window with the summary attached.'],
  ];
  return sec({
    tone: 'white',
    id: 'how',
    inner: `
    <div class="sechead sechead--split">
      <div>
        ${eyebrow('How it works')}
        <h2 class="h2">One loop: intercept, resolve, or escalate.</h2>
      </div>
      <p class="lead">The product is deliberately narrow. It does not try to answer everything — it decides, quickly and defensibly, whether this ticket is self-solvable, and if not, who should own it.</p>
    </div>
    <div class="steps">
      ${steps.map(([n, t, d]) => `<article class="step"><span class="step__n">${n}</span><h3>${t}</h3><p>${d}</p></article>`).join('')}
    </div>
    <div class="split" style="margin-top:52px">
      <div class="split__copy">
        ${eyebrow('The page that decides it')}
        <h3 class="h2" style="font-size:clamp(1.6rem,2.4vw,2.1rem)">One instruction per screen. Two buttons at the end.</h3>
        <p class="lead" style="margin-top:14px">41% of buyers asked for short video with annotated stills and 29% for step-by-step interaction; plain FAQ text satisfied 12%. So the guide page shows one action at a time and ends with “solved” or “not solved”.</p>
        <ul class="feats">
          <li>${icon('check')}Annotated still for orientation, a clip for motion</li>
          <li>${icon('check')}Tap-to-answer options instead of free text</li>
          <li>${icon('check')}A visible safety line on every page</li>
          <li>${icon('check')}“Solved” closes the session as an interception</li>
        </ul>
      </div>
      ${guideMockup(ctx, { caption: 'Self-fix guide — step 2 of 4, with the manual’s own illustration and a one-tap confirmation.' })}
    </div>`,
  });
}

function safety() {
  return `<section class="sec sec--night" id="safety">
  <div class="wrap">
    <div class="sechead sechead--split">
      <div>
        ${eyebrow('Safety is not a prompt', 'light')}
        <h2 class="h2">A hard rule sits outside the AI. It does not negotiate.</h2>
      </div>
      <p class="lead" style="color:#a9b6c5">A keyword tripwire runs outside the model. When it fires, diagnosis stops, a safety notice displays, and the buyer goes to a human — every time, in acceptance tests and in production.</p>
    </div>
    <div class="grid grid-2-1" style="align-items:start">
      <div class="figframe figframe--dark">
        <h4>Scenarios enterprises insist a human must handle <span style="color:#6d7c8f">(n = 50, multi-select)</span></h4>
        ${bars(EVIDENCE.safety, { tone: 'dark' })}
      </div>
      <div style="display:flex;flex-direction:column;gap:14px">
        ${callout({ label: 'Tripwire', body: 'Smoke, sparks, fire, burnt smell, electric shock, swollen battery, injury, water ingress, damaged cord. Deterministic match, not model judgement.', tone: 'dark' })}
        ${callout({ label: 'Acceptance test', body: '100% of high-risk scenarios must escalate to a human. Zero exceptions logged, or the build does not ship.', tone: 'dark' })}
        ${callout({ label: 'Design principle', body: 'Better to escalate than to guess. A wrong answer about a cutting disc is not an accuracy problem — it is a liability.', tone: 'dark' })}
      </div>
    </div>
    <p class="sourceline">Source: founder survey of 100 respondents, 50 of them enterprise staff and technicians (Sept 2026).</p>
  </div>
</section>`;
}

function advantages(l) {
  const rows = [
    ['Knows which SKU the buyer owns', '<span class="no">No</span>', '<span class="no">No</span>', '<span class="no">No</span>', '<span class="yes">Order-bound token link</span>'],
    ['Answers only from your manual', '<span class="no">No</span>', '<span class="part">Sometimes</span>', '<span class="no">No</span>', '<span class="yes">Retrieval + fallback script</span>'],
    ['Hard safety stop outside the model', '<span class="no">No</span>', '<span class="no">No</span>', '<span class="part">Policy only</span>', '<span class="yes">Deterministic tripwire</span>'],
    ['Hands over with a diagnostic summary', '<span class="part">Manual</span>', '<span class="yes">Yes</span>', '<span class="no">No</span>', '<span class="yes">Built into the queue</span>'],
    ['Measures interception, not CSAT', '<span class="no">No</span>', '<span class="no">No</span>', '<span class="no">No</span>', '<span class="yes">Session-level record</span>'],
    ['Works for a 5-person seller', '<span class="part">Effort</span>', '<span class="yes">Yes</span>', '<span class="no">No</span>', '<span class="yes">From ¥399/mo</span>'],
  ];
  const cards = [
    ['shield', 'Safety you can audit', 'The tripwire is a keyword table in application code, not an instruction in a prompt. Every trip is logged with the matched term.'],
    ['target', 'Narrow on purpose', 'Power tools and garden tools only. Fault trees, safety rules and manuals for one category, not every category.'],
    ['clock', 'Cheaper than a ticket', 'Roughly ¥0.3–0.8 of model and hosting spend per five-round session, against a ¥399 monthly floor.'],
    ['route', 'It ends in a record', 'Every session stores the transcript, source, confidence and verdict — the evidence a pilot review needs.'],
  ];
  return sec({
    tone: 'paper2',
    inner: `
    <div class="sechead sechead--split">
      <div>${eyebrow('Why it works')}<h2 class="h2">A vertical diagnostic layer, not another inbox.</h2></div>
      <p class="lead">Generic helpdesks automate tickets. Generic chatbots answer questions. Neither is allowed to decide that a cutting disc is fine.</p>
    </div>
    <div class="tblwrap">
      <table class="compare">
        <thead><tr><th>Capability</th><th>Manual / FAQ</th><th>Generic chatbot</th><th>E-commerce helpdesk</th><th class="is-self">ToolFix AI</th></tr></thead>
        <tbody>
          ${rows.map((r) => `<tr><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td><td class="is-self">${r[4]}</td></tr>`).join('')}
        </tbody>
      </table>
    </div>
    <div class="grid grid-4" style="margin-top:30px">
      ${cards
        .map(
          ([ic, t, d]) => `<article class="card"><div class="card__ic">${icon(ic)}</div><h3 class="h4">${t}</h3><p style="margin-top:7px;font-size:.85rem">${d}</p></article>`,
        )
        .join('')}
    </div>
    <div style="margin-top:26px">${btn({ href: l('product/'), label: 'Platform detail', variant: 'line', ic: 'arrow' })}</div>`,
  });
}

function evidence(l) {
  return sec({
    id: 'evidence',
    tone: 'white',
    inner: `
    <div class="sechead sechead--split">
      <div>
        ${eyebrow('Evidence')}
        <h2 class="h2">We measured the demand before we wrote the feature list.</h2>
      </div>
      <p class="lead">100 responses — 50 consumers and trade users, 50 enterprise staff and technicians — plus a semi-structured interview for every enterprise respondent. Findings became product decisions, not a slide.</p>
    </div>
    <div class="grid grid-4" style="margin-bottom:34px">
      ${[['85%', 'would try AI first'], ['68%', 'accept ≤ 5 minutes'], ['87%', 'rate fast hand-over important'], ['94%', 'of enterprises pilot-ready']]
        .map(([v, t]) => `<div class="card card--tight"><p class="stat__v">${v}</p><p class="stat__l">${t}</p></div>`)
        .join('')}
    </div>
    <div class="grid grid-2">
      <div class="figure">
        <h4>How buyers want to be guided (n = 100)</h4>
        ${bars(EVIDENCE.media)}
        <p class="sourceline">Plain FAQ text satisfied only 12% — which is why the guide page is image-and-video, not a manual excerpt.</p>
      </div>
      <div class="figure">
        <h4>What enterprises would pay to fix (n = 50)</h4>
        ${bars(EVIDENCE.value, { tone: 'amber' })}
        <p class="sourceline">Sellers buy outcomes on the P&amp;L, not chatbot novelty.</p>
      </div>
    </div>
    <div style="margin-top:26px">${btn({ href: l('company/#research'), label: 'Read the research method', variant: 'line', ic: 'arrow' })}</div>`,
  });
}

function market(l) {
  const rows = [
    ['TAM', '15,136', 'Power-tool & garden-tool store listings on Shopify + WooCommerce (Store Leads, 2025)'],
    ['SAM', '5,284', 'Active Shopify sellers our order integration and token link serve today'],
    ['Reachable', '~3,670', '69.4% publish a contactable email, after de-duplication and fit filtering'],
    ['Year-one list', '~950', 'Priority English-speaking markets, worked through personalised outbound'],
  ];
  return sec({
    tone: 'paper2',
    inner: `
    <div class="grid grid-1-2" style="align-items:start">
      <div>
        ${eyebrow('Market')}
        <h2 class="h2">A small number, counted honestly.</h2>
        <p class="lead" style="margin-top:16px">Store listings are an upper bound, not a customer count. Every filter below is one a sceptic can audit — platform, geography, contactability, qualification.</p>
        <div style="margin-top:24px">${btn({ href: l('market/'), label: 'Market, model & competition', variant: 'primary', ic: 'arrow' })}</div>
      </div>
      <div class="tblwrap">
        <table class="tbl">
          <thead><tr><th>Layer</th><th>Count</th><th>What it is</th></tr></thead>
          <tbody>
          ${rows.map(([a, b, c]) => `<tr><td class="tbl__first">${a}</td><td style="font-family:var(--mono);font-weight:600;color:var(--ink)">${b}</td><td>${c}</td></tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>
    <div class="legend" style="margin-top:22px"><span><i style="background:var(--teal)"></i>Yongkang, Zhejiang — ~${MARKET.yongkang.manufacturers} large manufacturers and ${MARKET.yongkang.suppliers.toLocaleString()}+ suppliers — is the validation base, not the market.</span></div>`,
  });
}

function cta(l) {
  return `<section class="cta">
  <div class="cta__grid"></div>
  <div class="wrap cta__in">
    <div>
      <h2 class="h2">Start with three SKUs and a manual you already own.</h2>
      <p>60 days, five SKUs, a curated knowledge base and a before/after report. If the interception rate is not there, you have bought evidence instead of a subscription.</p>
    </div>
    <div class="cta__acts">
      ${btn({ href: l('pricing/#pilot'), label: 'Book a pilot', variant: 'onDark', ic: 'arrow' })}
      ${btn({ href: l('demo/'), label: 'Watch the product clips', variant: 'ghostDark', ic: 'play' })}
      <p class="cta__fine">Or email the founders: kuangqisun@gmail.com</p>
    </div>
  </div>
</section>`;
}
