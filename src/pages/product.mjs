import { icon, href } from '../lib/layout.mjs';
import { eyebrow, btn, sec, secHead, videoPanel, videoCard, bars, callout, table, note, pills, eyebrow as eb } from '../lib/ui.mjs';
import { VIDEOS } from '../lib/data.mjs';
import { chatMockup, guideMockup, consoleMockup } from '../lib/mockups.mjs';

const v = (s) => VIDEOS.find((x) => x.slug === s);

export default {
  path: '/product/',
  nav: 'product',
  title: 'Platform — buyer chat, knowledge engine, merchant console · ToolFix AI',
  description:
    'How ToolFix AI works end to end: signed buyer links, manual-grounded retrieval, bounded diagnosis, deterministic safety rules, human handover, and the merchant console that records every session.',
  body: (ctx) => {
    const l = (p) => href(ctx, p);
    return `
<section class="phero">
  <div class="hero__grid"></div>
  <div class="wrap phero__in">
    <div>
      <p class="phero__crumbs"><a href="${l('')}">Home</a> / Platform</p>
      <h1>Everything between a confused buyer and a refund.</h1>
      <p class="phero__sub">Three surfaces, one record: a buyer chat that needs no account, a knowledge engine that only speaks from the manual, and a console where every decision stays auditable.</p>
    </div>
    <div class="phero__aside">
      <b>Build in production</b>
      Merchant console, PDF parsing with OCR fallback, RAG diagnosis, live handover, Chrome workbench v0.2.0. Deployed at toolfixai.cn.
    </div>
  </div>
</section>

${surfaces(ctx, l)}
${buyerJourney(ctx)}
${guidePages(ctx)}
${knowledge(ctx)}
${handover(ctx)}
${consoleSection(ctx)}
${brand()}
${workbench(ctx)}
${scope(l)}
${cta(l)}
`;
  },
};

function surfaces(ctx, l) {
  const items = [
    ['Buyer surface', 'chat', 'One page behind a signed link. No login, no app.'],
    ['Knowledge engine', 'layers', 'Manuals in, cited answers out. Nothing invented.'],
    ['Merchant console', 'chart', 'SKUs, sessions, hand-over queue and the numbers a pilot is judged on.'],
  ];
  return sec({
    tone: 'white',
    inner: `
    <div class="grid grid-3">
      ${items
        .map(
          ([t, ic, d]) => `<article class="card"><div class="card__ic">${icon(ic)}</div><h3 class="h3">${t}</h3><p>${d}</p></article>`,
        )
        .join('')}
    </div>`,
  });
}

function buyerJourney(ctx) {
  return sec({
    tone: '',
    id: 'buyer',
    inner: `
    <div class="sechead sechead--split">
      <div>${eyebrow('The buyer session')}<h2 class="h2">Five rounds, one question at a time.</h2></div>
      <p class="lead">The buyer writes “my drill does nothing”. The AI already knows the model — so it asks whether the battery LEDs light up.</p>
    </div>
    <div class="split">
      <div class="split__copy">
        <div class="flow">
          <div class="flow__row"><span class="flow__k">Round 1</span><div class="flow__v"><strong>Locate the symptom.</strong> Trigger pressed, nothing happens. The agent asks about indicator LEDs rather than asking the buyer to describe the tool.</div></div>
          <div class="flow__row"><span class="flow__k">Round 2</span><div class="flow__v"><strong>Rule out the common case.</strong> No LEDs means the pack is likely in transport-sleep mode. The agent does not guess — it retrieves the wake-up procedure from this model’s manual.</div></div>
          <div class="flow__row"><span class="flow__k">Round 3</span><div class="flow__v"><strong>Guide, with media.</strong> A self-fix page opens with an annotated still and a 30-second video: press the release, slide the pack, hold the button until four LEDs show.</div></div>
          <div class="flow__row"><span class="flow__k">Round 4</span><div class="flow__v"><strong>Confirm.</strong> The buyer taps “solved”. The session closes as an interception — no agent, no return, and the console records one avoided refund.</div></div>
        </div>
        <p class="note" style="margin-top:16px">If any round fails, the buyer returns to the loop; at five rounds, low confidence or negative feedback, the session moves to a human automatically.</p>
      </div>
      ${chatMockup(ctx, { caption: 'The buyer session, rebuilt as live HTML: question, cited answer, quick replies and the guide card.' })}
    </div>
    <div class="kv" style="margin-top:34px">
      <div class="kv__i"><p class="kv__k">Entry</p><p class="kv__v">Token link per order</p></div>
      <div class="kv__i"><p class="kv__k">Round cap</p><p class="kv__v">5 rounds, ~5 minutes</p></div>
      <div class="kv__i"><p class="kv__k">Languages</p><p class="kv__v">EN · ZH · ES · JA</p></div>
      <div class="kv__i"><p class="kv__k">Handover</p><p class="kv__v">Live WebSocket (STOMP)</p></div>
      <div class="kv__i"><p class="kv__k">Record</p><p class="kv__v">Transcript + verdict + confidence</p></div>
    </div>`,
  });
}

function guidePages(ctx) {
  const rules = [
    ['Less input, always', 'Buyers answer by tapping options. Every free-text field is a chance to lose someone who is already frustrated.'],
    ['One question at a time', 'A page never presents two steps at once. The 68% who grant us five minutes spend them moving, not reading.'],
    ['A visible safety line', 'Smoke, sparks, heat and injury interrupt the page with a stop notice and a human hand-over button.'],
  ];
  return sec({
    tone: 'paper2',
    id: 'guides',
    inner: `
    <div class="sechead sechead--split">
      <div>${eyebrow('Self-fix guide pages')}<h2 class="h2">The page where a session succeeds or collapses.</h2></div>
      <p class="lead">Format follows the data: 41% of buyers prefer short video with annotated stills, 29% want interactive steps, and plain FAQ text satisfies 12%. So each page pairs an annotated still for orientation with a clip for motion — and ends with exactly two buttons.</p>
    </div>
    <div class="split" style="margin-bottom:34px">
      <div>
        <div class="grid" style="gap:14px">
          ${rules.map(([t, d], i) => `<article class="card card--tight"><span class="step__n">0${i + 1}</span><h3 class="h4" style="margin:8px 0 6px">${t}</h3><p style="font-size:.85rem">${d}</p></article>`).join('')}
        </div>
      </div>
      ${guideMockup(ctx, { caption: 'Step 2 of 4: one instruction, the manual’s own illustration, and exactly two ways out.' })}
    </div>
    <div class="grid grid-2" style="margin-top:24px">
      <div class="figure">
        <h4>Buyer format preference (n = 100)</h4>
        ${bars([
          { label: 'Short video with annotated stills', value: 41 },
          { label: 'Interactive step-by-step', value: 29 },
          { label: 'Plain FAQ text', value: 12 },
          { label: 'No preference / other', value: 18 },
        ])}
      </div>
      <div class="callout" style="display:flex;flex-direction:column;justify-content:center">
        <span class="callout__label">Why this matters commercially</span>
        <p style="font-size:1rem">A guide page that is read to the end is the difference between an intercepted session and a return. The page is designed against the buyer’s patience budget, not the manual’s structure — and every page ends by asking the only question that matters: solved, or not solved?</p>
      </div>
    </div>`,
  });
}

function knowledge(ctx) {
  const pipeline = [
    ['Ingest', 'PDF text layer extracted with PDFBox; scanned manuals fall back to Tesseract OCR (Chinese + English). Plain text can be pasted instead.'],
    ['Chunk', '800-character sliding windows with 100-character overlap, paragraph-priority so a step is not cut in half.'],
    ['Anticipate', 'Twelve buyer questions per document across warranty, repair, returns, process, timing and cost — vectorised separately to lift recall.'],
    ['Tag', 'Documents carry product-model tags, so a question that names a model narrows retrieval to that SKU before generation begins.'],
    ['Retrieve', 'Semantic search first: cosine similarity above 0.5, top-5 chunks. Keyword and model matching act as fallback; hits are merged and de-duplicated.'],
    ['Answer', 'The prompt assembles the merchant’s role settings, the question and the retrieved chunks. If nothing clears the threshold, the merchant’s own fallback script answers.'],
  ];
  return sec({
    tone: 'white',
    id: 'knowledge',
    inner: `
    <div class="sechead sechead--split">
      <div>${eyebrow('Knowledge engine')}<h2 class="h2">Answers are retrieved, not remembered.</h2></div>
      <p class="lead">The knowledge base is the product. A model that has read the internet still does not know this SKU’s battery latch.</p>
    </div>
    <div class="split">
      ${videoPanel(ctx, 'pdf-parsing', { caption: 'Upload, extract, review, publish — the parsing pass a merchant sees.', label: 'Manual ingestion' })}
      <div class="split__copy">
        <div class="flow">
          ${pipeline.map(([k, d]) => `<div class="flow__row"><span class="flow__k">${k}</span><div class="flow__v">${d}</div></div>`).join('')}
        </div>
      </div>
    </div>
    <div class="grid grid-2" style="margin-top:34px">
      ${videoPanel(ctx, 'knowledge-base', { caption: 'Knowledge base: documents, indexed chunks, model tags and status.', label: 'Console · knowledge' })}
      ${videoPanel(ctx, 'grounded-answers', { caption: 'Retrieval and answer assembly for a model-tagged question.', label: 'Console · answers' })}
    </div>
    <p class="sourceline">Implementation detail from the product requirements document and the deployed build (v1.0). Retrieval threshold and top-k are merchant-tunable.</p>`,
  });
}

function handover(ctx) {
  const travels = [
    ['Suspected part', 'The component the diagnosis narrowed to, if any.'],
    ['Ruled out', 'What the buyer already confirmed working — the part an agent usually re-asks.'],
    ['Evidence', 'Photos the buyer uploaded, plus the generated guide page they were shown.'],
    ['Transcript', 'Every turn, timestamped, with confidence and safety flags.'],
  ];
  return `<section class="sec sec--night" id="handover">
  <div class="wrap">
    <div class="sechead sechead--split">
      <div>${eyebrow('Human handover', 'light')}<h2 class="h2">Escalation that arrives with the work already done.</h2></div>
      <p class="lead" style="color:#a9b6c5">One click moves a session from AI to a human over authenticated WebSocket. The buyer never changes window; the agent never asks the same question twice.</p>
    </div>
    <div class="split">
      <div class="split__copy">
        <div class="loop" style="grid-template-columns:repeat(2,1fr)">
          <div class="loop__node"><span class="loop__k">State 01</span><h3>AI serving</h3><p>Rounds run, confidence tracked, safety checked every turn.</p></div>
          <div class="loop__node is-branch"><span class="loop__k">Trigger</span><h3>Escalate</h3><p>Five rounds, low confidence, negative feedback, or a safety keyword.</p></div>
          <div class="loop__node is-branch"><span class="loop__k">State 02</span><h3>Human takeover</h3><p>Queue highlight plus email alert. Agent replies in the same window.</p></div>
          <div class="loop__node is-ok"><span class="loop__k">State 03</span><h3>Closed</h3><p>Outcome stored against the order; AI resumes when the agent leaves.</p></div>
        </div>
        <div class="flow" style="margin-top:18px;background:transparent;border-color:var(--line-dark)">
          ${travels.map(([k, d]) => `<div class="flow__row" style="border-color:rgba(255,255,255,.08)"><span class="flow__k" style="color:#7fd3cf">${k}</span><div class="flow__v" style="color:#a9b6c5">${d}</div></div>`).join('')}
        </div>
      </div>
      ${videoPanel(ctx, 'human-handover', { caption: 'A live takeover: AI to human and back, in one window.', label: 'Console · handover' })}
    </div>
    <p class="sourceline">Session state machine is enforced server-side; the buyer client and the agent console connect to the same room with different authentication.</p>
  </div>
</section>`;
}

function consoleSection(ctx) {
  const feats = [
    ['Products & SKUs', 'Each model carries its manual, extracted specifications, common-issue ranking and per-SKU self-resolution statistics.'],
    ['Knowledge base', 'Parsing runs asynchronously. Sellers verify extracted model, battery, safety warnings and warranty before anything reaches the AI.'],
    ['Conversations', 'A live queue of sessions with status flags — open, resolved by AI, needs human review — and handover requests highlighted.'],
    ['Diagnostics records', 'Full transcript, images, final verdict, confidence and buyer feedback, filterable by outcome.'],
    ['Takeover', 'One click from AI to human; reply in the buyer’s window; hand back and let the AI resume.'],
    ['Analytics', 'Self-resolution rate, interception count, handover share and response latency — the pilot’s scorecard.'],
  ];
  return sec({
    tone: '',
    id: 'console',
    inner: `
    <div class="sechead sechead--split">
      <div>${eyebrow('Merchant console')}<h2 class="h2">Every number a pilot is judged on, on one screen.</h2></div>
      <p class="lead">What the AI absorbed, what it escalated, what it saved.</p>
    </div>
    <div class="vgrid" style="grid-template-columns:repeat(2,1fr);margin-bottom:34px">
      ${videoCard(ctx, v('customers-sessions'))}
      ${videoCard(ctx, v('service-dashboard'))}
    </div>
    <div class="grid grid-3">
      ${feats.map(([t, d]) => `<article class="card card--tight"><h3 class="h4" style="margin-bottom:6px">${t}</h3><p style="font-size:.85rem">${d}</p></article>`).join('')}
    </div>`,
  });
}

function brand() {
  return sec({
    tone: 'paper2',
    inner: `
    <div class="sechead sechead--split">
      <div>${eyebrow('Brand & language')}<h2 class="h2">The help should look like it came from the store.</h2></div>
      <p class="lead">Branding, tone and the fallback script are your settings. The manuals stay in their source language.</p>
    </div>
    <div class="grid grid-3">
      <article class="card"><div class="card__ic">${icon('spark')}</div><h3 class="h3">Voice with a fence</h3><p>A role prompt sets tone and scope; a fallback script answers when retrieval finds nothing reliable. The AI cannot improvise past either.</p></article>
      <article class="card"><div class="card__ic">${icon('wrench')}</div><h3 class="h3">Your identity</h3><p>Logo, colours and business profile carry into the buyer chat, so a white-label service still reads as the merchant’s own support.</p></article>
      <article class="card"><div class="card__ic">${icon('globe')}</div><h3 class="h3">Four languages</h3><p>EN, ZH, DE, ES on the buyer side. Chinese manuals are parsed once and answered in the buyer’s language at diagnosis time.</p></article>
    </div>
    <p class="sourceline">Language set reflects the shipped build; additional locales are a configuration change, not a rewrite.</p>`,
  });
}

function workbench(ctx) {
  return sec({
    tone: 'white',
    inner: `
    <div class="split split--media-left">
      ${videoPanel(ctx, 'chrome-workbench', { caption: 'Chrome workbench (Manifest V3, v0.2.0).', label: 'Extension' })}
      <div class="split__copy">
        ${eyebrow('Where the seller already works')}
        <h2 class="h2">A workbench in the browser, not another tab.</h2>
        <p class="lead" style="margin-top:14px">Generate links and check sessions without leaving the marketplace tab.</p>
        <ul class="feats">
          <li>${icon('check')}Manifest V3, installed from the Chrome Web Store or unpacked</li>
          <li>${icon('check')}Token-link generation without opening the console</li>
          <li>${icon('check')}SKU lookup against the merchant knowledge base</li>
          <li>${icon('check')}Session status at a glance while working elsewhere</li>
        </ul>
        <p class="note" style="margin-top:18px">The extension is a convenience layer. Every capability it exposes also exists in the console, so a merchant without it loses speed, not function.</p>
      </div>
    </div>`,
  });
}

function scope(l) {
  return sec({
    tone: 'paper2',
    inner: `
    <div class="sechead sechead--split">
      <div>${eyebrow('Scope discipline')}<h2 class="h2">What it deliberately does not do.</h2></div>
      <p class="lead">A vertical product earns trust by refusing work it cannot do safely. These limits are written into the acceptance tests, not discovered in production.</p>
    </div>
    <div class="splitlist">
      <div><h4>No diagnosis of live electrical faults</h4><p>Mains wiring, chargers and exposed conductors are escalated on sight. The AI never talks a buyer through a test that requires a multimeter on live current.</p></div>
      <div><h4>No parts ordering or RMA</h4><p>Phase 3 scope. Today the session ends with a verdict; the merchant’s existing process takes over from there.</p></div>
      <div><h4>No free-form answers outside the manual</h4><p>If retrieval misses and the fallback is unset, the session escalates. Silence is a valid answer; invention is not.</p></div>
      <div><h4>No promise of a fixed machine</h4><p>The AI confirms operation and safety guidance. Anything requiring disassembly beyond the manual’s user-serviceable steps goes to a technician.</p></div>
    </div>
    <div style="margin-top:28px">${btn({ href: l('technology/'), label: 'How the system is built', variant: 'primary', ic: 'arrow' })}</div>`,
  });
}

function cta(l) {
  return `<section class="cta">
  <div class="cta__grid"></div>
  <div class="wrap cta__in">
    <div>
      <h2 class="h2">See it run on your own manual.</h2>
      <p>Upload one PDF and we will show you the diagnosis before you sign anything. The pilot package exists for exactly this.</p>
    </div>
    <div class="cta__acts">
      ${btn({ href: l('pricing/#pilot'), label: 'Book a pilot', variant: 'onDark', ic: 'arrow' })}
      ${btn({ href: l('demo/'), label: 'Product tour', variant: 'ghostDark', ic: 'play' })}
      <p class="cta__fine">Live MVP: www.toolfixai.cn</p>
    </div>
  </div>
</section>`;
}
