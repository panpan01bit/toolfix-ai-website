import { icon, href } from '../lib/layout.mjs';
import { eyebrow, btn, sec, table, callout } from '../lib/ui.mjs';

export default {
  path: '/company/',
  nav: 'company',
  title: 'Company — founders, research method and how we work · ToolFix AI',
  description:
    'ToolFix AI is built by two founders who split the seller’s world and the buyer’s world. The 100-person survey, the interview method, and the principles that decide what ships.',
  body: (ctx) => {
    const l = (p) => href(ctx, p);
    return `
<section class="phero">
  <div class="hero__grid"></div>
  <div class="wrap phero__in">
    <div>
      <p class="phero__crumbs"><a href="${l('')}">Home</a> / Company</p>
      <h1>Raised next to the machines.</h1>
      <p class="phero__sub">The problem did not start as an AI idea. It started as the same phone call every season: a tool that works, a buyer who cannot tell, and an agent in another time zone reading a manual out loud.</p>
    </div>
    <div class="phero__aside">
      <b>Two founders, two halves</b>
      One owns the seller’s numbers, one owns the buyer’s experience. Contract developers and advisors cover engineering, deployment and security review.
    </div>
  </div>
</section>

${story(ctx)}
${team(ctx)}
${principles()}
${research()}
${support()}
${contact(ctx)}
`;
  },
};

function story(ctx) {
  return sec({
    tone: 'white',
    inner: `
    <div class="grid grid-1-2" style="align-items:start;gap:56px">
      <div>
        ${eyebrow('Origin')}
        <h2 class="h2">A repeated annoyance, turned into a testable business.</h2>
      </div>
      <div>
        <p class="lead">Family exposure to power-tool import and export meant watching avoidable after-sales questions eat days of working time, season after season. In a venture-programme workshop we were asked to turn an irritation into a testable business — and after-sales diagnostics survived every screen we put it through.</p>
        <div class="flow" style="margin-top:26px">
          <div class="flow__row"><span class="flow__k">Frequent</span><div class="flow__v">40% of surveyed problems are installation, mode or setup class — the same handful of questions, in different languages.</div></div>
          <div class="flow__row"><span class="flow__k">Identifiable payer</span><div class="flow__v">The seller owns the after-sales cost, the return freight and the review. That is who buys the software.</div></div>
          <div class="flow__row"><span class="flow__k">Buildable</span><div class="flow__v">A small team can ship a grounded diagnostic loop if it refuses to answer outside the manual.</div></div>
        </div>
        <p class="note" style="margin-top:20px">Neither founder claims industry authority we do not have. We replace it with measurement — a survey, an acceptance test and a running system.</p>
      </div>
    </div>`,
  });
}

function team(ctx) {
  const members = [
    {
      name: 'Kuangqi Sun',
      role: 'Co-founder — Business, Finance & Market Strategy',
      img: `${ctx.base}img/team-kuangqi.jpg`,
      bio: [
        'Owns the business plan, pricing research, market sizing and the financial model, and leads competitor analysis and pilot commercial terms.',
        'Bachelor of Commerce (Accounting major), University of New South Wales, class of 2027 — coursework in corporate reporting, management accounting, business analytics and international business.',
      ],
      tags: ['Financial modelling', 'Cost analysis', 'Market sizing', 'Pilot terms'],
      quote:
        '“In the power tool industry, diagnosing product failures can be slow, expensive and frustrating for both businesses and customers.”',
    },
    {
      name: 'Zihan (Edwin) Nan',
      role: 'Co-founder — Product Content, User Research & Brand',
      img: `${ctx.base}img/team-edwin.jpg`,
      bio: [
        'Designed and ran the 100-person survey programme and interview guides; produces the buyer-facing self-fix guide pages, product documentation and all brand visuals.',
        'Digital Culture major with a Visual Art minor at the University of Sydney, after a foundation year at HKU SPACE — coursework in internet culture, platform mechanisms and technology–society relations.',
      ],
      tags: ['User research', 'Guide-page design', 'Brand & content', 'Buyer experience'],
      quote:
        '“When a power drill suddenly stops working, it might not actually be broken. Maybe the battery isn’t connected properly — but customers don’t know that, so they contact customer service or request a return.”',
    },
  ];
  return sec({
    tone: 'paper2',
    inner: `
    <div class="sechead sechead--split">
      <div>${eyebrow('Team')}<h2 class="h2">One reads the P&amp;L, one reads the buyer.</h2></div>
      <p class="lead">Neither of us could carry this alone. Each validation step — a survey finding, a pricing assumption, a live session — has an owner who understands both the data and the person behind it.</p>
    </div>
    <div class="team">
      ${members
        .map(
          (m) => `<article class="member">
        <div class="member__top">
          <img class="member__img" src="${m.img}" alt="${m.name}" width="84" height="84" loading="lazy">
          <div><p class="member__name">${m.name}</p><p class="member__role">${m.role}</p></div>
        </div>
        <div class="member__body">
          ${m.bio.map((p) => `<p>${p}</p>`).join('')}
          <div class="member__tags">${m.tags.map((t) => `<span>${t}</span>`).join('')}</div>
          <p style="margin-top:16px;font-size:.86rem;color:var(--ink);line-height:1.6;border-left:2px solid var(--teal);padding-left:14px">${m.quote}</p>
        </div>
      </article>`,
        )
        .join('')}
    </div>
    <div class="grid grid-2" style="margin-top:22px">
      <div class="card card--tight"><h3 class="h4">Contract development</h3><p style="margin-top:6px">Engineering, deployment and security review are contracted. The founders own product decisions and every acceptance test.</p></div>
      <div class="card card--tight"><h3 class="h4">Advisors</h3><p style="margin-top:6px">Power-tool manufacturing, cross-border marketplace operations and application security. Named on request during diligence.</p></div>
    </div>`,
  });
}

function principles() {
  const items = [
    ['No feature without a number behind it', 'Every product rule on this site points back to a survey result or an acceptance criterion. When the data killed our text-only guide page, the feature died.'],
    ['Escalate rather than guess', 'The cheapest mistake is a hand-over. The expensive one is a confident answer about a cutting disc. The system is built to prefer the cheap mistake.'],
    ['Show the working', 'Sessions store the transcript, the retrieved source, the confidence and the verdict. A merchant can audit any answer their buyers received.'],
    ['Sell the outcome, not the model', 'Pricing is tied to SKUs and resolved sessions. If interception does not happen, the invoice should reflect that.'],
  ];
  return sec({
    tone: 'white',
    inner: `
    <div class="sechead sechead--split">
      <div>${eyebrow('How we work')}<h2 class="h2">Four rules that decide what ships.</h2></div>
      <p class="lead">We disagreed about whether the first version needed a full analytics dashboard. The survey said sellers wanted fewer returns and faster replies first, so diagnosis and hand-over shipped and analytics waited.</p>
    </div>
    <div class="grid grid-2">
      ${items
        .map(
          ([t, d], i) => `<article class="card"><span class="step__n">0${i + 1}</span><h3 class="h3" style="margin:12px 0 8px">${t}</h3><p>${d}</p></article>`,
        )
        .join('')}
    </div>`,
  });
}

function research() {
  const findings = [
    ['87% rate fast human hand-over as important', 'Hand-over is a first-class feature: highlighted queue, email alerts, one-click takeover.'],
    ['41% want video with annotated images', 'Guide pages ship with images and short video, not text alone.'],
    ['90%+ demand human handling of safety cases', 'Deterministic keyword tripwire outside the model; 100% escalation in acceptance tests.'],
    ['48% of enterprises ready to pilot now, 46% conditionally', 'A paid 60-day pilot with onboarding service and an effect report.'],
    ['Concerns: misjudgement (24%), wrong guidance (27%)', 'Confidence scoring, a five-round cap, and “better to escalate than to guess”.'],
    ['Preferred billing: monthly 24%, per-ticket 20%, freemium 20%', 'Subscription core with usage overage, plus a low-friction entry point.'],
  ];
  return sec({
    tone: 'paper2',
    id: 'research',
    inner: `
    <div class="sechead sechead--split">
      <div>${eyebrow('Research method')}<h2 class="h2">The survey was written before the product.</h2></div>
      <p class="lead">The position from the start was simple: we were two students with no factory-floor experience, and every assumption about after-sales could be wrong.</p>
    </div>
    <div class="grid grid-3" style="margin-bottom:34px">
      <div class="card card--tight"><p class="kv__k">Instrument</p><p class="stat__v" style="font-size:1.7rem">21</p><p class="stat__l">questions, split across consumer and enterprise tracks</p></div>
      <div class="card card--tight"><p class="kv__k">Sample</p><p class="stat__v" style="font-size:1.7rem">100</p><p class="stat__l">responses — 50 consumer / trade, 50 enterprise &amp; technician</p></div>
      <div class="card card--tight"><p class="kv__k">Interviews</p><p class="stat__v" style="font-size:1.7rem">30–45<span style="font-size:.5em"> min</span></p><p class="stat__l">semi-structured, walking through a real recent after-sales case</p></div>
    </div>
    <div class="split">
      <div>
        <h3 class="h3" style="margin-bottom:12px">How it was run</h3>
        <p class="small">Respondents were recruited through four channels — family supply-chain contacts, factory floors, cross-border seller communities and referral chains — and screened. Consumers needed hands-on power-tool use in the past twelve months, preferably with an after-sales incident. Enterprise respondents needed decision authority or frontline service experience.</p>
        <p class="small" style="margin-top:12px">The interview guide ran thirty to forty-five minutes in six fixed segments: introduction and consent, business background, a real after-sales case walked end to end, pain points and their costs, a concept test with feature ranking, and close-out questions on procurement, data and pilot conditions.</p>
        <p class="small" style="margin-top:12px">Before any feature discussion, the raw responses were mapped to decisions — the discipline that kept the PRD free of features nobody asked for.</p>
        <div class="tblwrap" style="margin-top:20px">
          <table class="tbl" style="min-width:0">
            <thead><tr><th>Group</th><th>Screen</th></tr></thead>
            <tbody>
              <tr><td class="tbl__first">Consumers / DIY &amp; pro</td><td>Bought or used power tools in the last 12 months</td></tr>
              <tr><td class="tbl__first">Sellers &amp; brand staff</td><td>Own cross-border or domestic after-sales</td></tr>
              <tr><td class="tbl__first">Technicians &amp; engineers</td><td>Repair or QC experience on drills and grinders</td></tr>
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <h3 class="h3" style="margin-bottom:12px">Findings → decisions</h3>
        <div class="flow">
          ${findings.map(([f, d]) => `<div class="flow__row"><span class="flow__k flow__k--prose">${f}</span><div class="flow__v">${d}</div></div>`).join('')}
        </div>
      </div>
    </div>
    <p class="sourceline">Sample recruited through the founders’ networks; it is directional evidence for product decisions, not a statistically representative study of the category.</p>`,
  });
}

function support() {
  return sec({
    tone: 'white',
    inner: `
    <div class="grid grid-2" style="gap:48px;align-items:center">
      <div>
        ${eyebrow('Where we are')}
        <h2 class="h2">Yongkang for knowledge, Shopify for revenue.</h2>
        <p class="lead" style="margin-top:14px">The validation base is the Yongkang cluster in Zhejiang — roughly 150 large power-tool manufacturers and 1,700+ suppliers within driving distance. The paying market is on Shopify.</p>
      </div>
      <div class="kv">
        <div class="kv__i"><p class="kv__k">Base</p><p class="kv__v">Yongkang, Zhejiang</p></div>
        <div class="kv__i"><p class="kv__k">Working style</p><p class="kv__v">Remote-first, cluster visits</p></div>
        <div class="kv__i"><p class="kv__k">Languages</p><p class="kv__v">English · 中文</p></div>
        <div class="kv__i"><p class="kv__k">Stage</p><p class="kv__v">Pre-seed, MVP live</p></div>
      </div>
    </div>`,
  });
}

function contact(ctx) {
  return `<section class="cta">
  <div class="cta__grid"></div>
  <div class="wrap cta__in">
    <div>
      <h2 class="h2">Talk to the people who built it.</h2>
      <p>No sales development sequence, no demo gate. Email one of us and you will get an answer from a founder.</p>
    </div>
    <div class="cta__acts">
      ${btn({ href: 'mailto:kuangqisun@gmail.com', label: 'kuangqisun@gmail.com', variant: 'onDark', ic: 'mail' })}
      ${btn({ href: 'https://www.toolfixai.cn', label: 'www.toolfixai.cn', variant: 'ghostDark', ic: 'external', external: true })}
      <p class="cta__fine">For investor materials, see the <a href="${href(ctx, 'investors/')}" style="color:#cfd8e3;text-decoration:underline">Investors</a> page.</p>
    </div>
  </div>
</section>`;
}
