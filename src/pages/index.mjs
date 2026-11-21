import { icon, href } from '../lib/layout.mjs';
import { eyebrow, btn, sec } from '../lib/ui.mjs';
import { chatMockup, guideMockup, consoleMockup } from '../lib/mockups.mjs';
import { barChart } from '../lib/charts.mjs';

export default {
  path: '/',
  nav: 'home',
  title: 'ToolFix AI — AI after-sales for power tools',
  description:
    'Stop refunding tools that were never broken. ToolFix AI answers buyers from your own manuals, resolves false faults in minutes and hands the real ones to your team with the evidence attached.',
  body: (ctx) => {
    const l = (p) => href(ctx, p);
    return [hero(ctx, l), problem(l), band(ctx), how(ctx, l), coverage(ctx), benefits(l), safety(ctx), proof(l), cta(l)].join('\n');
  },
};

function hero(ctx, l) {
  return `<section class="hero">
  <div class="hero__photo" style="background-image:url(${ctx.base}img/hero-workshop.jpg)"></div>
  <div class="hero__grid"></div><div class="hero__glow"></div>
  <div class="wrap hero__in">
    <div>
      <span class="hero__eyebrow"><span class="dot-live"></span>Live on Shopify · pre-seed</span>
      <h1 class="h1">Stop refunding tools that were <em>never broken.</em></h1>
      <p class="hero__sub">Your manual becomes a diagnostic agent. It answers the buyer in their language, fixes the false faults, and hands the real ones to your team.</p>
      <div class="hero__cta">
        ${btn({ href: l('pricing/#pilot'), label: 'Book a 60-day pilot', variant: 'onDark', ic: 'arrow', size: 'lg' })}
        ${btn({ href: l('product/'), label: 'See how it works', variant: 'ghostDark', ic: 'arrow', size: 'lg' })}
      </div>
      <div class="hero__proof">
        <span>${icon('check')}No buyer login</span>
        <span>${icon('check')}100% safety hand-over</span>
        <span>${icon('check')}From ¥399/mo</span>
      </div>
    </div>
    <div class="hero__media hero__media--mock">
      ${chatMockup(ctx)}
      <div class="hero__tag">
        ${icon('shield')}
        <div><b>Fake fault intercepted</b><small>Battery in transport mode</small></div>
      </div>
    </div>
  </div>
  <div class="wrap hero__under">
    <a class="tlink" href="${l('demo/')}">Watch the 19-second session ${icon('arrow')}</a>
  </div>
</section>`;
}

function problem(l) {
  const data = [
    { x: '2021', value: 761 },
    { x: '2022', value: 816 },
    { x: '2023', value: 743 },
    { x: '2024', value: 890 },
  ];
  return `<section class="sec sec--white" id="problem">
  <div class="wrap">
    <div class="bigline">
      ${eyebrow('The problem')}
      <h2 class="display">A return costs you <em>$50–70</em>. Most of the time, nothing was wrong.</h2>
    </div>
    <div class="statgrid statgrid--3">
      <div class="cell"><p class="cell__v">20–50<small>%</small></p><p class="cell__k">of returned electronics show no fault when tested</p></div>
      <div class="cell"><p class="cell__v">15<small>%</small></p><p class="cell__k">category return rate — the number sellers are judged on</p></div>
      <div class="cell"><p class="cell__v">$890<small>bn</small></p><p class="cell__k">returned in the US in 2024, 16.9% of retail sales</p></div>
    </div>
    <div class="grid grid-2" style="margin-top:34px;align-items:center">
      <p class="lead" style="max-width:44ch">A sleeping battery. A dial between two positions. A guard on backwards. The buyer cannot tell — so the ticket becomes a refund, and you pay freight twice.</p>
      <div class="figframe">
        <h4>US returns, USD billions</h4>
        ${barChart(data, { unit: 'bn', height: 210, annotate: '▲ 19.8% vs 2023' })}
        <p class="src">NRF × Happy Returns, 2024 · Optoro, 2024 · <a href="${l('returns/')}">full data &amp; sources</a></p>
      </div>
    </div>
  </div>
</section>`;
}

function band(ctx) {
  return `<section class="sec sec--tight">
  <div class="wrap">
    <figure class="imgband imgband--tall">
      <img src="${ctx.base}img/workbench.jpg" alt="A cordless drill, battery pack and printed manual on a workbench" width="1600" height="914">
      <figcaption class="imgband__cap">Your manual already contains every answer. The buyer just never reads it.</figcaption>
    </figure>
  </div>
</section>`;
}

function how(ctx, l) {
  const steps = [
    ['01', 'Send one link', 'Bound to the order. No app, no sign-up, no password.'],
    ['02', 'The AI asks', 'One question at a time, from your manual, in their language.'],
    ['03', 'Solved or handed over', 'A fix page ends it — or your agent takes over with the evidence.'],
  ];
  return sec({
    id: 'how',
    inner: `
    <div class="sechead sechead--split">
      <div>${eyebrow('How it works')}<h2 class="h2">Three steps. Five minutes.</h2></div>
      <p class="lead">It does not try to answer everything. It decides fast whether this ticket can be closed without you.</p>
    </div>
    <div class="steps steps--3">
      ${steps.map(([n, t, d]) => `<article class="step"><span class="step__n">${n}</span><h3>${t}</h3><p>${d}</p></article>`).join('')}
    </div>
    <div class="grid grid-2" style="margin-top:44px;gap:34px;align-items:start">
      ${guideMockup(ctx, { caption: 'The self-fix page: one action, one picture, two buttons.' })}
      ${consoleMockup(ctx, { caption: 'Your console: what the AI closed, what needs you.' })}
    </div>
    <div style="margin-top:34px">${btn({ href: l('product/'), label: 'See the full platform', variant: 'primary', ic: 'arrow' })}</div>`,
  });
}

function coverage(ctx) {
  const tools = [
    ['tool-drill-2.jpg', 'FD1104071', 'Impact drill', '“Runs two seconds, then stops.”', 'Battery in transport mode'],
    ['tool-grinder-2.jpg', 'FD1105075', 'Angle grinder', '“Overheats after a minute.”', 'Guard mounted backwards'],
    ['tool-drill.jpg', 'FD1104071-H', 'Rotary hammer', '“Spins but never hammers.”', 'Mode dial between detents'],
    ['tool-grinder.jpg', 'AG-125', 'Angle grinder', '“Disc wobbles out of the box.”', 'Disc on the wrong flange'],
  ];
  return sec({
    tone: 'white',
    inner: `
    <div class="sechead">
      ${eyebrow('Covered today')}
      <h2 class="h2">The same five questions, in every catalogue.</h2>
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
    </div>`,
  });
}

function benefits(l) {
  const items = [
    ['shield', 'Fewer refunds', 'Intercept the ticket before it becomes a return, a freight bill and a review.'],
    ['globe', 'Answer in their language', 'English, Chinese, Spanish, Japanese — from Chinese manuals.'],
    ['lock', 'Never guess on safety', 'Smoke, sparks, injury: a hard stop outside the model.'],
    ['clock', 'Prove it in 60 days', 'A pilot report with interception rate, not a demo.'],
  ];
  return sec({
    tone: 'paper2',
    inner: `
    <div class="sechead">
      ${eyebrow('What you get')}
      <h2 class="h2">Four outcomes, one subscription.</h2>
    </div>
    <div class="grid grid-4">
      ${items
        .map(
          ([ic, t, d]) => `<article class="card benefit"><div class="card__ic">${icon(ic)}</div><h3 class="h3">${t}</h3><p>${d}</p></article>`,
        )
        .join('')}
    </div>
    <div class="compare-strip">
      <span>Not another helpdesk.</span>
      <span>Knows the SKU.</span>
      <span>Cites the manual.</span>
      <span>Stops on safety.</span>
      <a class="tlink" href="${l('product/#why')}">Compare ${icon('arrow')}</a>
    </div>`,
  });
}

function safety(ctx) {
  return `<section class="sec sec--night" id="safety">
  <div class="wrap safetyband">
    <div>
      ${eyebrow('Safety', 'light')}
      <h2 class="h2">Dangerous? A human takes over. Every time.</h2>
      <p class="lead" style="color:#a9b6c5;margin:18px 0 22px;max-width:40ch">Smoke, sparks, a cracked disc, an injury: the conversation stops before the AI answers.</p>
      <div class="pills">${['Smoke', 'Sparks', 'Cracked disc', 'Damaged cord', 'Swollen battery', 'Injury'].map((p) => `<span class="pill">${p}</span>`).join('')}</div>
      <p class="note" style="color:#7f8ca0;margin-top:22px">Not a policy document — a rule in the code, checked every round, outside the model.</p>
    </div>
    <figure class="safetyband__fig">
      <img src="${ctx.base}img/safety.jpg" alt="A worn cutting disc with a visible crack on an angle grinder" width="1600" height="1066" loading="eager" decoding="async">
      <figcaption>Cracked disc · 96% of enterprises say a human must handle it</figcaption>
    </figure>
  </div>
</section>`;
}

function proof(l) {
  const rows = [
    ['100', 'buyer and seller interviews'],
    ['15', 'fault scenarios in acceptance tests'],
    ['100%', 'of high-risk cases escalate'],
  ];
  return sec({
    inner: `
    <div class="grid grid-1-2" style="align-items:center;gap:48px">
      <div>
        ${eyebrow('Evidence')}
        <h2 class="h2">Built on research, not a hunch.</h2>
        <p class="lead" style="margin-top:16px">85% of buyers said they would try AI first. 68% will give it five minutes. 94% of enterprises said they would pilot.</p>
        <div style="margin-top:24px">${btn({ href: l('company/#research'), label: 'How we researched it', variant: 'line', ic: 'arrow' })}</div>
      </div>
      <div class="statgrid statgrid--3" style="border-radius:8px;overflow:hidden">
        ${rows.map(([v, k]) => `<div class="cell"><p class="cell__v">${v}</p><p class="cell__k">${k}</p></div>`).join('')}
      </div>
    </div>`,
  });
}

function cta(l) {
  return `<section class="cta">
  <div class="cta__grid"></div>
  <div class="wrap cta__in">
    <div>
      <h2 class="h2">Try it on one manual. See what it closes.</h2>
      <p>60 days, three SKUs, a curated knowledge base and a before/after report. If the interception rate isn’t there, you keep the evidence.</p>
    </div>
    <div class="cta__acts">
      ${btn({ href: l('pricing/#pilot'), label: 'Book a pilot', variant: 'onDark', ic: 'arrow' })}
      ${btn({ href: l('demo/'), label: 'Watch the product', variant: 'ghostDark', ic: 'play' })}
      <p class="cta__fine">Or email the founders: kuangqisun@gmail.com</p>
    </div>
  </div>
</section>`;
}
