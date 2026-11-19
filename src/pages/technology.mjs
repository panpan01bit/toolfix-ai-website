import { icon, href } from '../lib/layout.mjs';
import { eyebrow, btn, sec, videoPanel, callout, table, note } from '../lib/ui.mjs';

export default {
  path: '/technology/',
  nav: 'technology',
  title: 'Technology — RAG grounded in manuals, safety outside the model · ToolFix AI',
  description:
    'The engineering behind ToolFix AI: Spring Boot service layer, PDFBox/Tesseract ingestion, 800-character chunking, 1536-dimension embeddings, model-tagged retrieval, deterministic safety rules, and a single-database deployment.',
  body: (ctx) => {
    const l = (p) => href(ctx, p);
    return `
<section class="phero">
  <div class="hero__grid"></div>
  <div class="wrap phero__in">
    <div>
      <p class="phero__crumbs"><a href="${l('')}">Home</a> / Technology</p>
      <h1>The boring stack is the feature.</h1>
      <p class="phero__sub">Retrieval instead of memory. A deterministic rule where a wrong answer is dangerous. One database, no exotic infrastructure, and an acceptance test that blocks the release.</p>
    </div>
    <div class="phero__aside">
      <b>v1.0 — running</b>
      Spring Boot 3.3 · Java 18 · MySQL 8 · Vue 3.5 · DashScope qwen-plus + text-embedding-v2 · Manifest V3 extension.
    </div>
  </div>
</section>

${architecture(ctx)}
${pipeline(ctx)}
${safetyRule()}
${dataModel()}
${security()}
${cost()}
${acceptance()}
${stack()}
${roadmap(l)}
${cta(l)}
`;
  },
};

function architecture(ctx) {
  return sec({
    tone: 'white',
    inner: `
    <div class="sechead sechead--split">
      <div>${eyebrow('Architecture')}<h2 class="h2">Four parts, one database.</h2></div>
      <p class="lead">A conventional front-end/back-end platform: a Java service exposing REST and STOMP, two independently deployed Vue applications, and a browser extension that talks to the same API.</p>
    </div>
    <div class="archstack" style="background:#0b1220;border:1px solid var(--line-dark);border-radius:8px;padding:22px">
      <div class="layer">
        <span class="layer__k">Buyer</span>
        <div class="layer__n"><span class="node"><b>H5 chat page</b> — token link, no auth</span><span class="node">EN · ZH · ES · JA</span><span class="node">photos + guide pages</span></div>
      </div>
      <div class="layer">
        <span class="layer__k">Edge / client</span>
        <div class="layer__n"><span class="node"><b>Vue 3.5 + Vite 5</b> buyer app</span><span class="node"><b>Vue 3.5 + Vite 5</b> merchant console</span><span class="node"><b>Chrome MV3</b> workbench</span></div>
      </div>
      <div class="layer">
        <span class="layer__k">Service</span>
        <div class="layer__n"><span class="node"><b>Spring Boot 3.3</b> · MyBatis-Plus</span><span class="node">REST API</span><span class="node node--hl">STOMP over WebSocket</span><span class="node">JWT filter · BCrypt</span></div>
      </div>
      <div class="layer">
        <span class="layer__k">Domain</span>
        <div class="layer__n"><span class="node">session state machine</span><span class="node node--hl">retrieval &amp; prompt assembly</span><span class="node node--warn">safety tripwire</span><span class="node">parsing jobs</span></div>
      </div>
      <div class="layer">
        <span class="layer__k">Data &amp; AI</span>
        <div class="layer__n"><span class="node"><b>MySQL 8</b> — 7 tables, vectors as JSON</span><span class="node">PDFBox + Tesseract OCR</span><span class="node node--hl">DashScope qwen-plus</span><span class="node node--hl">text-embedding-v2 · 1536d</span></div>
      </div>
    </div>
    <div class="grid grid-3" style="margin-top:26px">
      <article class="card card--tight"><h3 class="h4">No vector database</h3><p style="margin-top:6px;font-size:.84rem">Embeddings are stored as JSON rows in MySQL and scored in the service layer. At the corpus sizes a merchant actually has — tens of documents, not millions — this is faster to operate and cheaper to run than a second piece of infrastructure.</p></article>
      <article class="card card--tight"><h3 class="h4">One deployable unit</h3><p style="margin-top:6px;font-size:.84rem">JDK 18, Node 18 and MySQL 8. OCR engages only for scanned manuals, so the base footprint stays small enough to run on a single mid-size instance.</p></article>
      <article class="card card--tight"><h3 class="h4">Two independent front-ends</h3><p style="margin-top:6px;font-size:.84rem">The buyer page can sit on its own domain, in the merchant’s branding, without the console being exposed. Both are static builds.</p></article>
    </div>
    <p class="sourceline">Architecture as deployed for the MVP; component choices are documented in the PRD and visible in the running build.</p>`,
  });
}

function pipeline(ctx) {
  const rows = [
    ['Extraction', 'PDF text layer via PDFBox. If the layer is empty or missing, the page is rasterised and passed to Tesseract with Chinese and English data files. Extracted text is normalised for line-break hyphenation and table junk.'],
    ['Chunking', '800-character sliding windows with 100-character overlap, paragraph-priority: a numbered step is kept whole wherever possible, because half a step is worse than none.'],
    ['Anticipated questions', 'Twelve questions per document, generated across six angles — warranty, repair, returns, process, timing, cost — embedded separately so a colloquial buyer question finds the manual even when the manual never phrases it that way.'],
    ['Model tagging', 'Documents carry product-model tags. A question that names a model narrows the candidate set before similarity is computed, which removes cross-SKU contamination.'],
    ['Retrieval', 'Cosine similarity over the filtered chunks; threshold 0.5, top 5. Keyword and model matching run as fallback; results are merged and de-duplicated by chunk id.'],
    ['Assembly', 'The prompt carries the merchant’s role definition, the buyer question and the retrieved chunks with their source document. The model is instructed to answer from those chunks only.'],
    ['Fallback', 'If nothing clears the threshold, or the model flags insufficient grounding, the merchant’s pre-written fallback script is sent — or the session escalates. The system does not free-form.'],
  ];
  return sec({
    tone: '',
    id: 'pipeline',
    inner: `
    <div class="sechead sechead--split">
      <div>${eyebrow('Retrieval pipeline')}<h2 class="h2">From a 40-page PDF to an answer in four seconds.</h2></div>
      <p class="lead">Every stage exists because of a failure we saw: manuals that lost their steps, model names that collided, buyer phrasing that no manual would ever match.</p>
    </div>
    <div class="split">
      <div class="flow">
        ${rows.map(([k, d], i) => `<div class="flow__row"><span class="flow__k">${String(i + 1).padStart(2, '0')} · ${k}</span><div class="flow__v">${d}</div></div>`).join('')}
      </div>
      ${videoPanel(ctx, 'grounded-answers', { caption: 'Retrieval and answer assembly in the console.', label: 'Grounded answers' })}
    </div>
    <div class="kv" style="margin-top:30px">
      <div class="kv__i"><p class="kv__k">Chunk size</p><p class="kv__v">800 chars · 100 overlap</p></div>
      <div class="kv__i"><p class="kv__k">Vectors</p><p class="kv__v">1536 dimensions</p></div>
      <div class="kv__i"><p class="kv__k">Threshold</p><p class="kv__v">cosine ≥ 0.5 · top 5</p></div>
      <div class="kv__i"><p class="kv__k">Per document</p><p class="kv__v">+12 anticipated questions</p></div>
      <div class="kv__i"><p class="kv__k">Fallback</p><p class="kv__v">merchant script, else escalate</p></div>
    </div>`,
  });
}

function safetyRule() {
  return `<section class="sec sec--night">
  <div class="wrap">
    <div class="sechead sechead--split">
      <div>${eyebrow('Deterministic layer', 'light')}<h2 class="h2">The safety check does not run in the model.</h2></div>
      <p class="lead" style="color:#a9b6c5">Keyword matching runs before and after every round, outside the LLM. A prompt can be injected; a keyword table cannot be argued with.</p>
    </div>
    <div class="grid grid-2">
      <div class="figure">
        <h4 style="color:#cfd8e3">The rule</h4>
        <div class="flow" style="background:transparent;border-color:var(--line-dark)">
          <div class="flow__row" style="border-color:rgba(255,255,255,.08)"><span class="flow__k" style="color:#f0bd6f">Trigger set</span><div class="flow__v" style="color:#a9b6c5">smoke · fire · spark · burnt · electric shock · shock · swollen / bulging battery · leaking · injury · bleeding · exposed wire · water ingress · cracked disc</div></div>
          <div class="flow__row" style="border-color:rgba(255,255,255,.08)"><span class="flow__k" style="color:#f0bd6f">Match</span><div class="flow__v" style="color:#a9b6c5">Normalised against buyer text in the session language, plus image captions and structured symptom fields.</div></div>
          <div class="flow__row" style="border-color:rgba(255,255,255,.08)"><span class="flow__k" style="color:#f0bd6f">Action</span><div class="flow__v" style="color:#a9b6c5">Diagnosis halts, a safety notice replaces the guide page, the session moves to human hand-over with a high-priority flag.</div></div>
          <div class="flow__row" style="border-color:rgba(255,255,255,.08)"><span class="flow__k" style="color:#7fd3cf">Audit</span><div class="flow__v" style="color:#a9b6c5">Every trip is logged with the matched term and the transcript up to that point, so a false positive is diagnosable.</div></div>
        </div>
      </div>
      <div style="display:flex;flex-direction:column;gap:14px">
        ${callout({ label: 'Why not a classifier', body: 'A model that is 99% accurate on safety is a model that fails on one call in a hundred. A rule that is deterministic fails only when the table is wrong — and the table is reviewable.', tone: 'dark' })}
        ${callout({ label: 'Why not a system prompt', body: '“Never advise on smoke” is an instruction the model may ignore under pressure or injection. The tripwire runs in application code, before the model is called and after it replies.', tone: 'dark' })}
        ${callout({ label: 'Cost of a false positive', body: 'A needless escalation costs one agent interaction. A false negative is a liability event. The thresholds are deliberately biased toward escalation.', tone: 'dark' })}
      </div>
    </div>
  </div>
</section>`;
}

function dataModel() {
  const rows = [
    ['merchants', 'Tenant, brand profile, AI role prompt, fallback script, plan and quota state.'],
    ['verification_codes', 'Email codes for registration and password reset, with expiry and attempt counters.'],
    ['documents', 'Source manual, model tags, extracted summary, parsing status, chunk count.'],
    ['chunks', 'Text, embedding vector (JSON), source offsets, keyword index terms.'],
    ['customers', 'Name, product and order number behind a token link. No account, no password.'],
    ['messages', 'Every turn — buyer, AI or human — with role, timestamp, confidence and safety flags.'],
    ['refresh_tokens', 'Hashed refresh tokens with rotation and revocation, 7-day lifetime.'],
  ];
  return sec({
    tone: 'white',
    inner: `
    <div class="sechead sechead--split">
      <div>${eyebrow('Data model')}<h2 class="h2">Seven tables. Nothing clever.</h2></div>
      <p class="lead">The schema is small enough to reason about in an afternoon and small enough to hand to a security reviewer without a diagram.</p>
    </div>
    ${table(['Table', 'What it holds'], rows)}
    <div class="grid grid-2" style="margin-top:26px">
      <div class="callout">
        <span class="callout__label">Multi-tenancy</span>
        <p>Every document, chunk, customer and message carries a merchant id. Cross-tenant reads are rejected in the service layer, not left to query discipline.</p>
      </div>
      <div class="callout">
        <span class="callout__label">Retention</span>
        <p>Sessions are retained for the merchant’s review. Buyer personal data is limited to what the link was issued with, and deletion requests cascade from the customer row.</p>
      </div>
    </div>`,
  });
}

function security() {
  return sec({
    tone: 'paper2',
    inner: `
    <div class="sechead sechead--split">
      <div>${eyebrow('Security')}<h2 class="h2">Designed for a buyer who never logs in.</h2></div>
      <p class="lead">The hardest security problem in this product is that buyers have no credentials. The answer is a token that is unguessable, scoped to one order and useless everywhere else.</p>
    </div>
    <div class="splitlist">
      <div><h4>Token links</h4><p>High-entropy per-customer tokens bound to one product and order. No enumeration surface, no session list to leak.</p></div>
      <div><h4>Merchant auth</h4><p>JWT access tokens with a 2-hour lifetime, rotating 7-day refresh tokens, BCrypt password hashing, email verification on sign-up.</p></div>
      <div><h4>Transport</h4><p>TLS everywhere; authenticated STOMP channels for merchants, anonymous but session-scoped channels for buyers, so an agent joins a room rather than intercepting a stream.</p></div>
      <div><h4>Secrets</h4><p>Database credentials, DashScope keys and mail credentials are injected as environment variables — never committed, never in an image layer.</p></div>
      <div><h4>Third-party AI</h4><p>Only the retrieved chunks, the merchant’s role prompt and the buyer question are sent to the model. No buyer identity, no order number, no full transcript.</p></div>
      <div><h4>Audit</h4><p>Every message and verdict is stored against the session. Safety trips, handovers and confidence scores are queryable after the fact.</p></div>
    </div>`,
  });
}

function cost() {
  return sec({
    tone: 'white',
    inner: `
    <div class="grid grid-1-2" style="align-items:start">
      <div>
        ${eyebrow('Unit economics of a session')}
        <h2 class="h2">Pennies per diagnosis, logged per call.</h2>
        <p class="lead" style="margin-top:16px">A five-round session costs roughly ¥0.3–0.8 in model and hosting spend at current pricing. Every call records tokens and fees, so the model cost is a measured line item rather than an assumption.</p>
        <p class="note" style="margin-top:18px">Checked monthly against cost models at 1,000 / 5,000 / 20,000 sessions per month. The dominant cost risk is onboarding labour, not inference — which is what the pilot fee covers and what better parsing reduces over time.</p>
      </div>
      <div class="tblwrap">
        <table class="tbl">
          <thead><tr><th>Volume</th><th>Monthly AI spend (est.)</th><th>Cost per session</th><th>Overage rate</th></tr></thead>
          <tbody>
            <tr><td class="tbl__first">1,000 sessions</td><td>¥300–800</td><td>¥0.30–0.80</td><td>¥0.45–0.80</td></tr>
            <tr><td class="tbl__first">5,000 sessions</td><td>¥1,500–4,000</td><td>¥0.30–0.80</td><td>¥0.45–0.80</td></tr>
            <tr><td class="tbl__first">20,000 sessions</td><td>¥6,000–16,000</td><td>¥0.30–0.80</td><td>¥0.45–0.80</td></tr>
          </tbody>
        </table>
      </div>
    </div>
    <p class="sourceline">Estimates from the business plan’s cost model; actuals are logged per call in the running system. Overage rates differ by plan.</p>`,
  });
}

function acceptance() {
  const items = [
    ['End-to-end loop', 'A buyer moves from order link to AI diagnosis to interception or hand-over, and the seller sees the full record.'],
    ['Scripted faults', 'All 15–20 scripted real-world fault scenarios produce the expected AI verdict.'],
    ['Safety', 'Every high-risk test case escalates to a human. Zero exceptions logged.'],
    ['Seller console', 'Each session is fully visible — transcript, images, verdict, confidence and buyer feedback.'],
  ];
  return `<section class="sec sec--night">
  <div class="wrap">
    <div class="sechead sechead--split">
      <div>${eyebrow('Release gate', 'light')}<h2 class="h2">Pass or fail, not impressions.</h2></div>
      <p class="lead" style="color:#a9b6c5">Before any commercial pilot, the deployed system must complete all four checks against one real Shopify store. These are the same checks used to accept the MVP.</p>
    </div>
    <div class="grid grid-4">
      ${items
        .map(
          ([t, d], i) => `<article class="card card--dark"><span class="step__n" style="color:#7fd3cf">GATE 0${i + 1}</span><h3 class="h4" style="color:#fff;margin:10px 0 8px">${t}</h3><p style="font-size:.83rem;color:#98a6b7">${d}</p></article>`,
        )
        .join('')}
    </div>
    <p class="sourceline">From the demo acceptance section of the business plan. The scripted fault library doubles as a regression suite.</p>
  </div>
</section>`;
}

function stack() {
  const rows = [
    ['Service', 'Spring Boot 3.3, Java 18, MyBatis-Plus'],
    ['Realtime', 'STOMP over WebSocket, authenticated channels'],
    ['Database', 'MySQL 8 — seven tables, vector JSON'],
    ['AI', 'Alibaba DashScope — qwen-plus, text-embedding-v2 (1536d)'],
    ['Documents', 'PDFBox text extraction, Tesseract OCR (zh + en)'],
    ['Front-end', 'Vue 3.5, Vite 5, Element Plus (console)'],
    ['Extension', 'Chrome Manifest V3, v0.2.0'],
    ['Runtime', 'JDK 18, Node 18, MySQL 8 — single instance'],
  ];
  return sec({
    tone: '',
    inner: `
    <div class="grid grid-1-2" style="align-items:start">
      <div>
        ${eyebrow('Stack')}
        <h2 class="h2">Chosen to be operable by two people.</h2>
        <p class="lead" style="margin-top:16px">Every technology here has a large hiring pool, boring failure modes and a single well-documented way to run it. That is a deliberate trade against novelty.</p>
      </div>
      ${table(['Layer', 'Choice'], rows)}
    </div>`,
  });
}

function roadmap(l) {
  const phases = [
    ['Phase 1 — now', 'One live Shopify store, end-to-end loop, preset knowledge base of ~15 high-frequency fake-fault scenarios, English buyer interface.', 'done'],
    ['Phase 2', 'Subscription billing, multi-tenant onboarding, ROI dashboard, buyer-side multilingual expansion.', 'next'],
    ['Phase 3', 'Amazon and WooCommerce connectors, parts and accessories recommendation, RMA workflow integration.', 'plan'],
  ];
  return sec({
    tone: 'white',
    inner: `
    <div class="sechead sechead--split">
      <div>${eyebrow('Roadmap')}<h2 class="h2">Sequence matters more than scope.</h2></div>
      <p class="lead">Each phase is unlocked by evidence from the previous one, not by ambition. Connectors come after retention, not before it.</p>
    </div>
    <div class="tl">
      ${phases
        .map(
          ([when, body, state]) => `<div class="tl__item is-${state}"><div class="tl__when">${state === 'done' ? 'Shipped' : 'Planned'}</div><div class="tl__body"><h3>${when}</h3><p>${body}</p></div></div>`,
        )
        .join('')}
    </div>`,
  });
}

function cta(l) {
  return `<section class="cta">
  <div class="cta__grid"></div>
  <div class="wrap cta__in">
    <div>
      <h2 class="h2">Ask us the hard technical question.</h2>
      <p>Retrieval quality, OCR accuracy on a bad scan, safety false positives, data residency — these are the questions a pilot should answer, and we would rather answer them before you sign.</p>
    </div>
    <div class="cta__acts">
      ${btn({ href: l('pricing/#pilot'), label: 'Book a technical pilot', variant: 'onDark', ic: 'arrow' })}
      ${btn({ href: l('demo/'), label: 'See the build', variant: 'ghostDark', ic: 'play' })}
    </div>
  </div>
</section>`;
}
