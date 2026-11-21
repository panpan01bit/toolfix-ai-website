import { icon, href } from '../lib/layout.mjs';
import { eyebrow, btn, sec, table, note, callout } from '../lib/ui.mjs';
import { barChart, hBars, rangeBar } from '../lib/charts.mjs';

const US_RETURNS = [
  { x: '2021', value: 761 },
  { x: '2022', value: 816 },
  { x: '2023', value: 743 },
  { x: '2024', value: 890 },
];

export default {
  path: '/returns/',
  nav: 'returns',
  title: 'The returns problem — a trillion dollars comes back every year · ToolFix AI',
  description:
    'Industry data on retail returns: USD 1.1 trillion returned globally, USD 890 billion in the US in 2024, 27% of the sale price lost to processing, and 20–50% of returned electronics showing no fault at all.',
  body: (ctx) => {
    const l = (p) => href(ctx, p);
    return `
<section class="phero">
  <div class="hero__grid"></div>
  <div class="wrap phero__in">
    <div>
      <p class="phero__crumbs"><a href="${l('')}">Home</a> / The returns problem</p>
      <h1>A trillion dollars comes back every year. A large share of it was never broken.</h1>
      <p class="phero__sub">The third-party numbers behind the problem — not our own estimates.</p>
    </div>
    <div class="phero__aside">
      <b>Industry data, 2021–2026</b>
      NRF &amp; Happy Returns, Appriss Retail / Deloitte, Optoro, and published no-fault-found research. Every figure is linked at the bottom of this page.
    </div>
  </div>
</section>

${sec({
  tone: 'white',
  cls: 'sec--tight',
  inner: `
  <figure class="imgband" style="margin-bottom:34px">
    <img src="${ctx.base}img/doorstep.jpg" alt="A returned drill beside its cardboard parcel on a doorstep" width="1440" height="720" style="aspect-ratio:1440/520;object-fit:cover;object-position:center 55%">
    <figcaption class="imgband__cap">The tool works. It still comes back — and the cost lands weeks later, on freight, refurbishment and markdown.</figcaption>
  </figure>
  <div class="statgrid">
    ${[
      ['$1.1<small>tn</small>', 'Returned globally in 2024 across all retail', 'ReverseLogix, 2025'],
      ['$890<small>bn</small>', 'Returned in the United States in 2024 — 16.9% of sales', 'NRF × Happy Returns, Dec 2024'],
      ['27<small>%</small>', 'Of the sale price is what a return costs to process, before the refund', 'Optoro, 2024'],
      ['20–50<small>%</small>', 'Of returned electronics show no fault when tested', 'Published NFF estimates'],
    ]
      .map(([v, k, s]) => `<div class="cell"><p class="cell__v">${v}</p><p class="cell__k">${k}</p><p class="src" style="margin-top:8px">${s}</p></div>`)
      .join('')}
  </div>`,
})}

${sec({
  tone: '',
  inner: `
  <div class="sechead sechead--split">
    <div>${eyebrow('The trend')}<h2 class="h2">Returns grew faster than retail did.</h2></div>
    <p class="lead">Returns grew faster than retail did. Online is worse: 17.6% of orders came back in 2024.</p>
  </div>
  <div class="grid grid-2-1" style="align-items:start">
    <div class="figframe">
      <h4>US retail returns, USD billions</h4>
      <p class="figframe__sub">2023 dips because total sales grew slower, not because behaviour changed.</p>
      ${barChart(US_RETURNS, { unit: 'bn', height: 230 })}
      <p class="src">Source: NRF &amp; Happy Returns, December 2024; NRF &amp; Appriss Retail, December 2022.</p>
    </div>
    <div style="display:flex;flex-direction:column;gap:14px">
      ${callout({ label: 'Online is the expensive channel', body: '17.6% of online purchases were returned in 2024 — $247bn. A cross-border power-tool seller ships into that channel with no store to fall back on.' })}
      ${callout({ label: 'Fraud is a separate $103bn', body: '15.14% of all returns in 2024 were fraudulent by Appriss Retail’s definition — not our problem to solve, but it explains why sellers are tightening return policies.', tone: 'warn' })}
    </div>
  </div>`,
})}

${sec({
  tone: 'paper2',
  inner: `
  <div class="sechead sechead--split">
    <div>${eyebrow('What a return costs')}<h2 class="h2">The refund is only the beginning.</h2></div>
    <p class="lead">About 27% of the sale price goes to processing — before the refund, before the markdown.</p>
  </div>
  <div class="grid grid-1-2" style="align-items:start">
    <div class="figframe">
      <h4>One avoided return, USD 80 tool</h4>
      <p class="figframe__sub">Founders’ interview range. Refund excluded: the unit returns to stock.</p>
      ${table(
        ['Line', 'Low', 'High'],
        [
          ['Return freight, both ways', '$18', '$26'],
          ['Inspection &amp; re-pack', '$6', '$12'],
          ['Re-listing markdown', '$12', '$20'],
          ['Support time &amp; review damage', 'not priced', 'not priced'],
          ['<strong>Total loss</strong>', '<strong>$50</strong>', '<strong>$70</strong>'],
        ],
      )}
    </div>
    <div>
      <div class="callout" style="margin-bottom:16px">
        <span class="callout__label">Why this is the right wedge</span>
        <p>A return destroys value in four places at once. An intercepted session destroys it in none: the buyer keeps a working tool, the seller keeps the sale, and the platform records no defect.</p>
      </div>
      <div class="figframe">
        <h4>Where the loss lands</h4>
        <p class="figframe__sub">Share of the USD 50–70 range, midpoint.</p>
        ${hBars([
          { label: 'Freight, both directions', value: 22, display: '~$22' },
          { label: 'Re-listing markdown', value: 17, display: '~$17' },
          { label: 'Inspection &amp; re-pack', value: 9, display: '~$9' },
        ], { max: 30 })}
        <p class="src">Components sum to the lower half of the range; support time and review damage are real but not priced.</p>
      </div>
    </div>
  </div>`,
})}

${sec({
  tone: 'white',
  inner: `
  <div class="sechead sechead--split">
    <div>${eyebrow('No fault found')}<h2 class="h2">Put it on a test bench and a fifth to half of them work.</h2></div>
    <p class="lead">“No fault found” is measured, not anecdotal: 20–50% of returned electronics. Power tools with battery systems run high.</p>
  </div>
  <div class="grid grid-1-2" style="align-items:center">
    <div class="figframe">
      <h4>Share of returned units with no defect found</h4>
      <p class="figframe__sub">Published estimates across electronics categories.</p>
      ${rangeBar({ from: 20, to: 50, max: 100, label: 'No fault found' })}
      <div style="margin-top:22px">
        ${rangeBar({ from: 0, to: 15.14, max: 100, label: 'Fraudulent returns' })}
      </div>
      <p class="src">Sources: no-fault-found literature and industry commentary (2026); fraud share from Appriss Retail / Deloitte (2024).</p>
    </div>
    <div>
      <p class="lead" style="margin-bottom:18px">We target the easiest slice: one specific action the buyer can take.</p>
      <div class="flow">
        <div class="flow__row"><span class="flow__k">Battery</span><div class="flow__v">Shipped in transport-sleep mode. The tool is silent until the pack is woken.</div></div>
        <div class="flow__row"><span class="flow__k">Mode dial</span><div class="flow__v">Stopped between drill and hammer. The chuck turns but the bit does not strike.</div></div>
        <div class="flow__row"><span class="flow__k">Guard</span><div class="flow__v">Mounted backwards, blocking the dust path and tripping the thermal cut-out.</div></div>
        <div class="flow__row"><span class="flow__k">Direction switch</span><div class="flow__v">Centred between forward and reverse; the trigger feels dead.</div></div>
      </div>
      <p class="note" style="margin-top:14px">The <a href="${l('product/')}" style="color:var(--teal-deep)">platform page</a> shows how each of these is handled without a human.</p>
    </div>
  </div>`,
})}

${sec({
  tone: 'night',
  inner: `
  <div class="sechead sechead--split">
    <div>${eyebrow('Platform pressure', 'light')}<h2 class="h2">Marketplaces already put a number on it.</h2></div>
    <p class="lead" style="color:#a9b6c5">Return rate is not only a margin problem. Amazon charges sellers whose category return rate crosses a threshold — and base equipment power tools have one of the tightest thresholds in the catalogue.</p>
  </div>
  <div class="grid grid-3">
    ${[
      ['7.1%', 'Return-rate threshold for base equipment power tools under Amazon’s 2024 return-processing fee policy', 'superfuel.io summary of Amazon policy, 2024'],
      ['8.7%', 'Threshold for the wider tools &amp; home improvement category', 'Seller forum, 2024–2026'],
      ['16.9%', 'The all-retail average, for comparison', 'NRF × Happy Returns, 2024'],
    ]
      .map(
        ([v, k, s]) => `<article class="card card--dark"><p class="cell__v" style="color:#fff">${v}</p><p class="cell__k" style="color:#9ca9b8;margin-top:10px">${k}</p><p class="src" style="color:#6d7c8f;margin-top:12px">${s}</p></article>`,
      )
      .join('')}
  </div>
  <p class="src">A seller above the threshold pays a fee on every return. That converts a support metric into an invoice line — and makes interception something a finance team can sign off on.</p>`,
})}

${sec({
  tone: '',
  inner: `
  <div class="sechead sechead--split">
    <div>${eyebrow('The arithmetic')}<h2 class="h2">What it means for one seller.</h2></div>
    <p class="lead">6,000 orders a month, USD 60 average order, 12% returns.</p>
  </div>
  <div class="grid grid-2" style="align-items:start">
    <div class="figframe">
      <h4>Monthly exposure</h4>
      ${table(
        ['Line', 'Value'],
        [
          ['Orders per month', '6,000'],
          ['Returns at 12%', '720'],
          ['Returns that are operation-class, at 30%', '216'],
          ['Self-resolved by AI at 70%', '151'],
          ['Value of one avoided return', '$50'],
          ['<strong>Recovered per month</strong>', '<strong>≈ $7,560</strong>'],
        ],
      )}
      <p class="src">Illustrative. 30% sits inside the published 20–50% no-fault-found band; 70% self-resolution is our design target, not yet a measured rate.</p>
    </div>
    <div style="display:flex;flex-direction:column;gap:14px">
      ${callout({ label: 'Against a ¥899 plan', body: 'Roughly $125 a month. One interception pays for the subscription several times over — which is why the pilot is priced around a report, not a demo.' })}
      ${btn({ href: l('pricing/#roi'), label: 'Run your own numbers', variant: 'primary', ic: 'arrow' })}
    </div>
  </div>`,
})}

${sec({
  tone: 'paper2',
  id: 'sources',
  inner: `
  <div class="sechead">
    ${eyebrow('Sources')}
    <h2 class="h2">Where every number comes from.</h2>
  </div>
  <div class="grid grid-2">
    <div class="flow">
      <div class="flow__row"><span class="flow__k">NRF × Happy Returns</span><div class="flow__v">2024 retail returns $890bn / 16.9% of sales; 2023 $743bn / 14.5%; online 17.6%, $247bn. <a class="tlink" href="https://cdn.nrf.com/media-center/press-releases/nrf-and-happy-returns-report-2024-retail-returns-total-890-billion" target="_blank" rel="noopener">Press release →</a></div></div>
      <div class="flow__row"><span class="flow__k">NRF × Appriss Retail</span><div class="flow__v">2022 returns $816bn, 16.5% of sales, flat against 16.6% in 2021. <a class="tlink" href="https://cdn.nrf.com/media-center/press-releases/2022-retail-returns-rate-remains-flat-816-billion" target="_blank" rel="noopener">Press release →</a></div></div>
      <div class="flow__row"><span class="flow__k">Appriss Retail / Deloitte</span><div class="flow__v">15.14% of 2024 returns fraudulent, $103bn. <a class="tlink" href="https://finance.yahoo.com/news/fraudulent-returns-cost-retailers-103b-152933117.html" target="_blank" rel="noopener">Report coverage →</a></div></div>
    </div>
    <div class="flow">
      <div class="flow__row"><span class="flow__k">Optoro</span><div class="flow__v">Average return costs 27% of the original sale price in labour, transport and warehousing. <a class="tlink" href="https://www.fortna.com/en_gb/insights-resources/8-steps-to-optimize-returns/" target="_blank" rel="noopener">Source →</a></div></div>
      <div class="flow__row"><span class="flow__k">No-fault-found estimates</span><div class="flow__v">20–50% of returned electronics show no defect; battery-powered power tools flagged as high. <a class="tlink" href="https://www.claimlane.com/resources/blog/no-fault-found-warranty-claims" target="_blank" rel="noopener">Article →</a></div></div>
      <div class="flow__row"><span class="flow__k">Amazon fee policy</span><div class="flow__v">7.1% threshold for base equipment power tools; 8.7% for tools &amp; home improvement. <a class="tlink" href="https://superfuel.io/blog/new-amazon-return-policy/" target="_blank" rel="noopener">Summary →</a></div></div>
    </div>
  </div>
  <p class="src">Global returns figure ($1.1 trillion) from ReverseLogix commentary, 2025. Third-party figures are reproduced as published; they are not audited by ToolFix AI and category definitions differ between sources. The USD 50–70 loss range and the 70% self-resolution target are our own estimates and are labelled as such.</p>`,
})}

<section class="cta">
  <div class="cta__grid"></div>
  <div class="wrap cta__in">
    <div>
      <h2 class="h2">The cheapest return is the one that never happens.</h2>
      <p>Start with three SKUs and a manual you already own. The pilot report tells you what share of your own tickets the AI could have closed.</p>
    </div>
    <div class="cta__acts">
      ${btn({ href: l('pricing/#pilot'), label: 'Book a pilot', variant: 'onDark', ic: 'arrow' })}
      ${btn({ href: l('investors/'), label: 'Investor materials', variant: 'ghostDark', ic: 'arrow' })}
    </div>
  </div>
</section>
`;
  },
};
