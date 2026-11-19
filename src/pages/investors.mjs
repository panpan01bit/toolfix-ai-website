import { icon, href } from '../lib/layout.mjs';
import { eyebrow, btn, sec, table, callout, note } from '../lib/ui.mjs';
import { MILESTONES, FINANCE } from '../lib/data.mjs';

export default {
  path: '/investors/',
  nav: 'investors',
  title: 'Investors — pre-seed, MVP live, pilot-ready · ToolFix AI',
  description:
    'The ToolFix AI investment case: what is already proven, what remains an assumption, how the pilot converts, what the pre-seed round funds, and the metrics we expect to be judged on.',
  body: (ctx) => {
    const l = (p) => href(ctx, p);
    return `
<section class="phero">
  <div class="hero__grid"></div>
  <div class="wrap phero__in">
    <div>
      <p class="phero__crumbs"><a href="${l('')}">Home</a> / Investors</p>
      <h1>Evidence first, then capital.</h1>
      <p class="phero__sub">We wrote the survey before the product, the acceptance tests before the pilot, and this page before the round — so the difference between what is proven and what is assumed is visible to anyone doing diligence.</p>
    </div>
    <div class="phero__aside">
      <b>Round · pre-seed</b>
      Amount and terms shared directly. Use of funds: general availability, a listed Shopify app, and pilot-conversion support.
    </div>
  </div>
</section>

${snapshot()}
${proven()}
${whyNow()}
${milestones()}
${useOfFunds()}
${materials(l)}
${disclaimer()}
`;
  },
};

function snapshot() {
  const items = [
    ['Stage', 'Pre-seed'],
    ['Product', 'MVP live'],
    ['Revenue', 'Pre-revenue · pilot-ready'],
    ['Survey', '100 respondents'],
    ['SAM', '5,284 Shopify sellers'],
    ['Team', '2 founders + contractors'],
  ];
  return sec({
    tone: 'white',
    inner: `
    <div class="kv">
      ${items.map(([k, v]) => `<div class="kv__i"><p class="kv__k">${k}</p><p class="kv__v">${v}</p></div>`).join('')}
    </div>
    <p class="sourceline">As of November 2026. The MVP has been running in production with merchant accounts, manual parsing, AI diagnosis, human handover and a Chrome extension.</p>`,
  });
}

function proven() {
  const proven = [
    ['A working system, not a spec', 'Merchant accounts, PDF parsing with OCR fallback, RAG diagnosis, live handover and a Manifest V3 extension are deployed at toolfixai.cn.'],
    ['Demand measured with a real instrument', '100 responses across consumers, sellers and technicians, plus semi-structured interviews with every enterprise respondent.'],
    ['A safety boundary that is testable', 'A deterministic tripwire with 100% escalation as a release gate — a claim a reviewer can verify in the console.'],
    ['Pricing a merchant can evaluate', 'Four plans with defined SKU and volume limits, plus a paid pilot that bundles curation, so willingness to pay is measurable.'],
  ];
  const assumed = [
    ['Pilot-to-paid conversion', 'Base case assumes 40%; conservative assumes 25%. Neither is observed yet — the pilot programme exists to replace this number.'],
    ['Interception rate in the wild', 'We expect a meaningful share of operation-class tickets to self-resolve. Our number comes from product design, not from a live cohort.'],
    ['Outbound reply rate', 'Base case 3%, consistent with industry benchmarks for personalised cold email. Our own list has not been mailed at scale.'],
    ['Retention after month three', 'Priced as a subscription with quarterly effect reports. Renewal behaviour is unsurveyed.'],
  ];
  return sec({
    tone: '',
    inner: `
    <div class="sechead sechead--split">
      <div>${eyebrow('Diligence')}<h2 class="h2">What is proven, and what is still a bet.</h2></div>
      <p class="lead">Every unproven number in the business plan is labelled there, and labelled again here. The point of the round is to convert the right-hand column into the left.</p>
    </div>
    <div class="grid grid-2">
      <div class="card" style="border-color:rgba(20,160,160,.4);background:rgba(20,160,160,.04)">
        <h3 class="h4" style="display:flex;align-items:center;gap:8px;color:var(--teal-deep)">${icon('check')} Proven or built</h3>
        <ul class="feats" style="margin-top:16px">
          ${proven.map(([t, d]) => `<li>${icon('check')}<span><b style="color:var(--ink)">${t}</b><br><span style="color:var(--muted);font-size:.84rem">${d}</span></span></li>`).join('')}
        </ul>
      </div>
      <div class="card" style="border-color:rgba(232,161,60,.45);background:rgba(232,161,60,.05)">
        <h3 class="h4" style="display:flex;align-items:center;gap:8px;color:#8a5d13">${icon('clock')} Assumption to retire</h3>
        <ul class="feats" style="margin-top:16px">
          ${assumed.map(([t, d]) => `<li>${icon('target')}<span><b style="color:var(--ink)">${t}</b><br><span style="color:var(--muted);font-size:.84rem">${d}</span></span></li>`).join('')}
        </ul>
      </div>
    </div>`,
  });
}

function whyNow() {
  const items = [
    ['One', 'Inference got cheap enough to spend ¥0.3–0.8 on a conversation', 'Twelve months ago a five-round diagnostic session at this quality was not economically viable at a ¥399 monthly price point. Today the gross margin holds even at our overage rate.'],
    ['Two', 'Chinese power-tool manufacturers are going direct', 'Factories that used to sell only to importers now run their own storefronts. They own the manuals and the fault knowledge — and they now inherit the after-sales cost they never had to answer for.'],
    ['Three', 'Returns became a marketplace performance metric', 'Return rate affects listing placement and account health, not just margin. That moves after-sales from a cost centre to a growth lever — which is how a support tool gets budget.'],
  ];
  return sec({
    tone: 'paper2',
    inner: `
    <div class="sechead sechead--split">
      <div>${eyebrow('Why now')}<h2 class="h2">Three things changed at once.</h2></div>
      <p class="lead">The problem is old. What is new is that solving it with grounded AI is now cheaper than answering the ticket with a person.</p>
    </div>
    <div class="grid grid-3">
      ${items
        .map(
          ([n, t, d]) => `<article class="card"><span class="step__n">${n}</span><h3 class="h3" style="margin:12px 0 8px">${t}</h3><p>${d}</p></article>`,
        )
        .join('')}
    </div>`,
  });
}

function milestones() {
  return sec({
    tone: 'white',
    inner: `
    <div class="sechead sechead--split">
      <div>${eyebrow('Milestones')}<h2 class="h2">What the next twelve months buy.</h2></div>
      <p class="lead">Each milestone is a decision point with a number attached, not a feature list. If a milestone misses, the next one does not start.</p>
    </div>
    <div class="tl">
      ${MILESTONES.map(
        (m) => `<div class="tl__item is-${m.state}">
        <div class="tl__when">${m.when}</div>
        <div class="tl__body"><span class="tl__state">${m.state === 'done' ? 'Done' : m.state === 'next' ? 'Next' : 'Planned'}</span><h3>${m.title}</h3><p>${m.body}</p></div>
      </div>`,
      ).join('')}
    </div>
    <div class="grid grid-3" style="margin-top:30px">
      <div class="card card--tight"><p class="kv__k">Base case, month 12</p><p class="stat__v" style="font-size:1.8rem">5</p><p class="stat__l">paying merchants — 2 Growth, 2 Basic, 1 Enterprise</p></div>
      <div class="card card--tight"><p class="kv__k">Contract value</p><p class="stat__v" style="font-size:1.8rem">¥59.4k</p><p class="stat__l">plus ¥4–6k usage overage</p></div>
      <div class="card card--tight"><p class="kv__k">Operating break-even</p><p class="stat__v" style="font-size:1.8rem">M10–12</p><p class="stat__l">excluding fully-loaded founder time</p></div>
    </div>`,
  });
}

function useOfFunds() {
  const items = [
    ['01', 'General availability', 'Multi-tenant onboarding, billing, the ROI dashboard, and the engineering hours to harden parsing across messy real-world manuals.'],
    ['02', 'A listed Shopify app', 'Review requirements, listing assets, lifecycle emails and the install flow that turns a store owner into a live merchant in under an hour.'],
    ['03', 'Pilot conversion support', 'Onboarding labour for the first cohort — the actual bottleneck in the base case. Curation is the cost that decides whether five pilots become five customers.'],
    ['04', 'Evidence production', 'Pilot effect reports, case studies and the sales assets that shorten the next conversation.'],
  ];
  return sec({
    tone: '',
    inner: `
    <div class="sechead sechead--split">
      <div>${eyebrow('Use of funds')}<h2 class="h2">Where the money goes, in priority order.</h2></div>
      <p class="lead">We are deliberately not funding headcount ahead of revenue. The round buys product completeness and pilot conversion, in that order.</p>
    </div>
    <div class="tl">
      ${items
        .map(
          ([n, t, d]) => `<div class="tl__item"><div class="tl__when">Priority ${n}</div><div class="tl__body"><h3>${t}</h3><p>${d}</p></div></div>`,
        )
        .join('')}
    </div>
    <p class="sourceline">Allocation between these buckets will be set with the lead investor; the ordering reflects the constraint in the base case.</p>`,
  });
}

function materials(l) {
  return sec({
    id: 'materials',
    tone: 'paper2',
    inner: `
    <div class="grid grid-1-2" style="align-items:start">
      <div>
        ${eyebrow('Materials')}
        <h2 class="h2">Everything a reviewer asks for.</h2>
        <p class="lead" style="margin-top:14px">We would rather send the primary material than a summary of it. Ask for anything on this list and we will send it the same day.</p>
        <div style="margin-top:24px;display:flex;gap:10px;flex-wrap:wrap">
          ${btn({ href: 'mailto:kuangqisun@gmail.com?subject=ToolFix%20AI%20investor%20materials', label: 'Request the data room', variant: 'primary', ic: 'mail', })}
          ${btn({ href: l('market/'), label: 'Market & model', variant: 'line', ic: 'arrow' })}
        </div>
      </div>
      <div class="splitlist">
        <div><h4>Business plan</h4><p>Full document: problem, solution, technology, research, market, competition, pricing, financial outlook, risks.</p></div>
        <div><h4>Survey instrument &amp; results</h4><p>21 questions across consumer and enterprise tracks, the findings-to-decision map, and the raw response workbook.</p></div>
        <div><h4>Product requirements</h4><p>PRD with acceptance criteria written as testable numbers, including the 15–20 scripted fault scenarios.</p></div>
        <div><h4>Financial model</h4><p>Cost models at 1,000 / 5,000 / 20,000 sessions per month, and the three customer scenarios.</p></div>
        <div><h4>Competitor profiles</h4><p>Six-dimension scoring against Gorgias, Shulex and Aquant, with the case studies cited.</p></div>
        <div><h4>Security &amp; data</h4><p>Schema, authentication design, third-party AI data flow, and a DPA template for commercial contracts.</p></div>
      </div>
    </div>`,
  });
}

function disclaimer() {
  return `<section class="sec sec--tight">
  <div class="wrap">
    <div class="doc" style="max-width:820px">
      <p class="note">This page is provided for information only. It is not an offer to sell or a solicitation to buy any security, and it is not investment advice. Forward-looking statements — including customer counts, revenue, pricing and market sizing — are the founders’ own base-case estimates, restated from the business plan, and are not guarantees. Market data is drawn from third-party store databases and is subject to their coverage limits. Survey results describe a 100-person sample recruited through the founders’ networks and are not a statistically representative study of the category.</p>
    </div>
  </div>
</section>`;
}

function cta() {
  return '';
}
