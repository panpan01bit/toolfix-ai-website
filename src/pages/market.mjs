import { icon, href } from '../lib/layout.mjs';
import { eyebrow, btn, sec, table, callout, bars, note } from '../lib/ui.mjs';
import { MARKET, COMPETITORS, FINANCE } from '../lib/data.mjs';

const num = (n) => n.toLocaleString('en-US');
const cny = (n) => '¥' + n.toLocaleString('en-US');

export default {
  path: '/market/',
  nav: 'market',
  title: 'Market, business model and competition · ToolFix AI',
  description:
    'A bottom-up market: 15,136 category listings, 5,284 active Shopify sellers, ~950 merchants on the year-one list. Plus pricing, unit economics, competitive positioning and the risks we are underwriting.',
  body: (ctx) => {
    const l = (p) => href(ctx, p);
    return `
<section class="phero">
  <div class="hero__grid"></div>
  <div class="wrap phero__in">
    <div>
      <p class="phero__crumbs"><a href="${l('')}">Home</a> / Market &amp; model</p>
      <h1>A narrow market, counted from the bottom up.</h1>
      <p class="phero__sub">Cross-border power-tool sellers already pay for software and already absorb the cost of a return. We sized that population by filtering store data until only merchants we could actually serve remained.</p>
    </div>
    <div class="phero__aside">
      <b>Two entry points</b>
      Shopify is the paying market. Yongkang is where the manuals, fault history and sceptical engineers are — and where next year’s cross-border brands are being built.
    </div>
  </div>
</section>

${sizing()}
${segments()}
${competition()}
${gtm()}
${economics(l)}
${risks()}
${cta(l)}
`;
  },
};

function sizing() {
  const rows = [
    ['TAM', MARKET.tam, 'Power-tool and garden-tool store listings across Shopify and WooCommerce.'],
    ['SAM', MARKET.sam, 'Active Shopify sellers — the platform our order integration and token link serve today.'],
    ['Reachable', MARKET.contactable, 'After de-duplication and fit filtering; 69.4% of category stores publish a contactable email.'],
    ['Year-one list', MARKET.som, 'Priority English-speaking markets, worked through personalised outbound.'],
  ];
  const max = MARKET.tam;
  return sec({
    tone: 'white',
    inner: `
    <div class="sechead sechead--split">
      <div>${eyebrow('Market sizing')}<h2 class="h2">${num(MARKET.tam)} listings is not a customer count.</h2></div>
      <p class="lead">We treat store listings as an upper bound. Each filter below removes a group that would never buy this product: wrong platform, no contact route, wrong catalogue, no after-sales cost.</p>
    </div>
    <div class="funnel">
      ${rows
        .map(
          ([k, v, d]) => `<div class="funnel__row"><span class="funnel__k">${k}</span><span class="funnel__bar" style="width:${Math.max(6, (v / max) * 100)}%"></span><span class="funnel__v">${num(v)}</span></div>`,
        )
        .join('')}
    </div>
    <div class="tblwrap" style="margin-top:22px">
      <table class="tbl">
        <thead><tr><th>Layer</th><th>Definition</th></tr></thead>
        <tbody>${rows.map(([k, v, d]) => `<tr><td class="tbl__first">${k} · ${num(v)}</td><td>${d}</td></tr>`).join('')}</tbody>
      </table>
    </div>
    <p class="sourceline">Store counts from Store Leads (2025), category-filtered. Contactability measured by sampling published store emails. Filter steps and query definitions are available in the investor data room.</p>`,
  });
}

function segments() {
  return sec({
    tone: 'paper2',
    inner: `
    <div class="sechead sechead--split">
      <div>${eyebrow('Who buys')}<h2 class="h2">The payer, the user and the blocker.</h2></div>
      <p class="lead">In a five-person merchant, the person who feels the return cost is usually the person who signs. In a manufacturer, they are rarely the same person — which is why the sales motion differs by segment.</p>
    </div>
    ${table(
      ['Segment', 'Why they buy', 'Who decides', 'First conversation'],
      [
        ['Shopify seller, 5–50 SKUs', 'Return rate is visible in the dashboard and they answer tickets themselves at night.', 'Founder / ops lead', 'Cold email + 90-second demo clip'],
        ['Cross-border brand, 50–200 SKUs', 'Support cost scales faster than revenue; agents lack technical depth.', 'Head of customer experience', 'Pilot with measurable KPIs'],
        ['Manufacturer going direct', 'Owns the manuals and the fault knowledge; wants DTC margin without DTC support cost.', 'Export / e-commerce director', 'Yongkang factory visit'],
        ['Distributor / multi-brand', 'Several catalogues, one support team, no per-brand expertise.', 'Operations manager', 'Console demo on their own SKU'],
      ],
      { firstCol: 'Segment' },
    )}
    <div class="grid grid-2" style="margin-top:28px">
      <article class="card">
        <div class="card__ic">${icon('target')}</div>
        <h3 class="h3">Why Shopify first</h3>
        <p>Stores ship worldwide, support in English, track return rates in dashboards and install apps without a procurement committee. The buying behaviour already matches a subscription product.</p>
      </article>
      <article class="card">
        <div class="card__ic">${icon('box')}</div>
        <h3 class="h3">Why Yongkang matters</h3>
        <p>Roughly ${MARKET.yongkang.manufacturers} large manufacturers and ${num(MARKET.yongkang.suppliers)}+ suppliers in one city. An afternoon there yields more fault lore than a month of desk research — and those factories become cross-border customers as they go direct.</p>
      </article>
    </div>`,
  });
}

function competition() {
  const pts = [
    ['Gorgias', 86, 20, false],
    ['Shulex', 68, 46, false],
    ['Aquant', 20, 86, false],
    ['ToolFix AI', 76, 82, true],
  ];
  return sec({
    tone: '',
    id: 'competition',
    inner: `
    <div class="sechead sechead--split">
      <div>${eyebrow('Competition')}<h2 class="h2">Not an empty market. A specific gap.</h2></div>
      <p class="lead">AI after-sales is crowded at the generalist layer and deep at the industrial layer. Nobody makes cross-border power-tool consumer after-sales their core scenario — that intersection is the position.</p>
    </div>
    <div class="grid grid-2-1" style="align-items:start">
      <div class="matrix">
        <div class="matrix__plot">
          <span class="matrix__q" style="left:10px;top:8px">Industrial depth</span>
          <span class="matrix__q" style="right:10px;bottom:8px">Commerce fit</span>
          ${pts
            .map(
              ([name, x, y, self]) =>
                `<span class="matrix__pt${self ? ' is-self' : ''}" style="left:${x}%;top:${100 - y}%"><i></i>${name}</span>`,
            )
            .join('')}
        </div>
        <div class="matrix__x matrix__axis">Cross-border commerce fit →</div>
      </div>
      <div style="display:flex;flex-direction:column;gap:14px">
        ${COMPETITORS.map(
          (c) => `<article class="card card--tight${c.self ? ' card--dark' : ''}">
          <h3 class="h4" style="${c.self ? 'color:#fff' : ''}">${c.name} <span style="font-weight:400;color:${c.self ? '#8fdcd7' : 'var(--muted-2)'};font-size:.78rem">· ${c.kind}</span></h3>
          <p style="margin-top:6px;font-size:.82rem">${c.position}</p>
        </article>`,
        ).join('')}
      </div>
    </div>
    <div style="margin-top:30px">
      ${table(
        ['Dimension', 'Gorgias', 'Shulex', 'Aquant', 'ToolFix AI'],
        [
          ['Industry & scenario fit', '4', '4', '2', '5'],
          ['Fault-diagnosis depth', '2', '3', '5', '5'],
          ['Knowledge & product data', '3', '4', '5', '4'],
          ['UX & after-sales flow', '5', '4', '3', '4'],
          ['Platform integration', '5', '4', '2', '4'],
          ['Commercial readiness', '5', '4', '4', '3 · in pilot'],
        ],
        { firstCol: 'Dimension' },
      )}
    </div>
    <p class="sourceline">Scored 1–5 by the founders against public product documentation and published case studies; ToolFix scores are targets, not audited results. Case evidence: Cocorico × Gorgias (48% automation), Mammotion × Shulex (−50% complex handling time), Comfort Systems × Aquant (+9% first-time fix).</p>`,
  });
}

function gtm() {
  return sec({
    tone: 'paper2',
    inner: `
    <div class="sechead sechead--split">
      <div>${eyebrow('Go to market')}<h2 class="h2">Two tracks that feed each other.</h2></div>
      <p class="lead">Factory validation produces the fault libraries that make the Shopify product good. Shopify revenue produces the case studies that open factory doors.</p>
    </div>
    <div class="grid grid-2">
      <article class="card">
        <span class="vcard__cat">Track A · months 0–6</span>
        <h3 class="h3" style="margin:8px 0 10px">Yongkang validation</h3>
        <p style="font-size:.88rem">Direct visits and demonstrations to 20–30 manufacturers, converting 3–5 into design-partner pilots. The goal is not revenue; it is real manuals, real fault cases and documented before/after metrics.</p>
        <ul class="feats">
          <li>${icon('check')}Factory engineers test the AI against hard cases on site</li>
          <li>${icon('check')}A local reference customer socialises trust through the cluster</li>
          <li>${icon('check')}Manuals and fault lore become product assets</li>
        </ul>
      </article>
      <article class="card">
        <span class="vcard__cat">Track B · months 3–12</span>
        <h3 class="h3" style="margin:8px 0 10px">Shopify outbound</h3>
        <p style="font-size:.88rem">Personalised cold outreach to the ~950-merchant list plus presence in seller communities and the Shopify app ecosystem. Expected baseline reply rate 3%; everything above that is a signal to double down.</p>
        <ul class="feats">
          <li>${icon('check')}Email 1: store-specific category and one observable after-sales signal</li>
          <li>${icon('check')}Email 2 (day 3): a 90-second demo recording</li>
          <li>${icon('check')}Email 3: a one-page pilot proposal</li>
        </ul>
      </article>
    </div>
    <div class="grid grid-3" style="margin-top:22px">
      <div class="card card--tight"><h3 class="h4">Exhibitions</h4><p style="margin-top:6px">One per quarter. A live interception on a visitor’s own SKU outsells any deck.</p></div>
      <div class="card card--tight"><h3 class="h4">Communities</h4><p style="margin-top:6px">Seller WeChat groups, operator forums, Amazon and Shopify meet-ups — answer the question publicly, then offer the tool.</p></div>
      <div class="card card--tight"><h3 class="h4">Referrals</h3><p style="margin-top:6px">The pilot report recruits suppliers more persuasively than we can. Renewal rides on quarterly effect reports.</p></div>
    </div>`,
  });
}

function economics(l) {
  const rev = FINANCE.base.filter((x) => x.kind === 'revenue').reduce((a, b) => a + b.value, 0);
  const cost = FINANCE.base.filter((x) => x.kind === 'cost').reduce((a, b) => a + b.value, 0);
  const max = 70000;
  return sec({
    tone: 'white',
    inner: `
    <div class="sechead sechead--split">
      <div>${eyebrow('Unit economics & base case')}<h2 class="h2">Five customers, one honest spreadsheet.</h2></div>
      <p class="lead">The base case is not profitable on fully-loaded founder time, and we present it that way. It is designed to prove the loop — interception rate, conversion, retention — before fixed costs grow.</p>
    </div>
    <div class="grid grid-2" style="align-items:start">
      <div class="figure">
        <h4>Month 12, base case — cash in and out (RMB)</h4>
        <div class="moneybar">
          ${FINANCE.base
            .map(
              (r, i) => `<div class="moneybar__row">
              <span class="moneybar__k">${r.label}</span>
              <span class="moneybar__t"><i style="width:${(r.value / max) * 100}%;background:${r.kind === 'revenue' ? 'var(--teal)' : 'var(--amber)'}"></i></span>
              <span class="moneybar__v">${cny(r.value)}</span>
            </div>`,
            )
            .join('')}
        </div>
        <div class="legend"><span><i style="background:var(--teal)"></i>Revenue</span><span><i style="background:var(--amber)"></i>Cost</span></div>
        <p class="sourceline">Total revenue ${cny(rev)} · total cost ${cny(cost)}. Founder time excluded; operating costs covered around month 10–12.</p>
      </div>
      <div>
        <div class="figure" style="margin-bottom:18px">
          <h4>Unit economics of one diagnosis session</h4>
          <div class="kv" style="border:0">
            <div class="kv__i" style="padding:12px 0"><p class="kv__k">AI + hosting cost</p><p class="kv__v">¥0.30–0.80</p></div>
            <div class="kv__i" style="padding:12px 0"><p class="kv__k">Overage price</p><p class="kv__v">¥0.45–0.80</p></div>
            <div class="kv__i" style="padding:12px 0"><p class="kv__k">Gross margin</p><p class="kv__v">Positive per incremental session</p></div>
            <div class="kv__i" style="padding:12px 0"><p class="kv__k">Dominant risk</p><p class="kv__v">Onboarding labour, not inference</p></div>
          </div>
        </div>
        ${table(
          ['Scenario', 'Assumptions', 'Customers, month 12'],
          FINANCE.scenarios.map((s) => [s.name, s.assumptions, `~${s.customers}`]),
          { firstCol: 'Scenario' },
        )}
      </div>
    </div>
    <div class="callout" style="margin-top:28px">
      <span class="callout__label">What breaks the base case</span>
      <p>Pilot-to-paid conversion below 25% and outbound reply rates below 2% both collapse the model to two customers. The plan’s risk sits in sales time, not in unit economics — which is exactly why the round is priced for pilot conversion support, not headcount.</p>
    </div>
    <div style="margin-top:26px">${btn({ href: l('investors/'), label: 'The investment case', variant: 'primary', ic: 'arrow' })}</div>`,
  });
}

function risks() {
  return sec({
    tone: '',
    inner: `
    <div class="sechead sechead--split">
      <div>${eyebrow('Risks')}<h2 class="h2">What we are underwriting, and how.</h2></div>
      <p class="lead">Every row below is a way this company fails. Pretending otherwise would be the first red flag in a diligence conversation.</p>
    </div>
    ${table(
      ['Risk', 'Why it is real', 'Response'],
      [
        ['Wrong or unsafe guidance', 'A general model answering a power-tool question can hurt someone.', 'Deterministic tripwire, retrieval thresholds, five-round cap, preset escalation — “escalate rather than guess”.'],
        ['Data-security hesitation', 'Sellers are asked to upload manuals and let a third party talk to their buyers.', 'Token links scoped to one order, BCrypt + JWT, secrets in environment variables, minimal buyer data, DPA in contract.'],
        ['Parsing quality varies', 'Scanned manuals, mixed languages, layout-heavy tables.', 'PDFBox with Tesseract fallback; merchant review before publish; fallback script catches anything retrieval misses.'],
        ['Long B2B sales cycles', 'A new support tool touches operations and brand.', 'Paid pilot lowers the entry decision; the pilot report creates a concrete upgrade moment.'],
        ['Platform contact limits', 'Shopify restricts how third-party apps message buyers.', 'Channel-agnostic: email, QR and chat-widget entry all feed the same token-link page.'],
        ['Concentration in one cluster', 'Yongkang relationships could distort the product toward one customer type.', 'Pilot metrics are measured per merchant and reported to investors cohort by cohort.'],
      ],
      { firstCol: 'Risk' },
    )}`,
  });
}

function cta(l) {
  return `<section class="cta">
  <div class="cta__grid"></div>
  <div class="wrap cta__in">
    <div>
      <h2 class="h2">The model, the market and the maths.</h2>
      <p>The full business plan, the survey instrument and the competitor profiles are available on request. The investor page explains what is proven and what is still an assumption.</p>
    </div>
    <div class="cta__acts">
      ${btn({ href: l('investors/'), label: 'Investor materials', variant: 'onDark', ic: 'arrow' })}
      ${btn({ href: l('company/#research'), label: 'Research method', variant: 'ghostDark', ic: 'arrow' })}
    </div>
  </div>
</section>`;
}
