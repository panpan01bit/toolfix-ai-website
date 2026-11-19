/**
 * Content data for the site. Every figure here traces to the founders'
 * business plan, PRD, survey (n=100) or the live product build.
 */

export const VIDEOS = [
  {
    slug: 'ai-diagnosis',
    title: 'AI diagnosis, start to finish',
    cat: 'Buyer journey',
    dur: 17.4,
    blurb:
      'A buyer describes a dead drill in plain English. The agent asks one question at a time, rules causes out, and closes with a verdict — no account, no app.',
  },
  {
    slug: 'token-link',
    title: 'One link per order',
    cat: 'Buyer journey',
    dur: 12.5,
    blurb:
      'The merchant mints a token link bound to buyer, product and order number. The session opens already knowing which SKU is in the box.',
  },
  {
    slug: 'pdf-parsing',
    title: 'PDF manual → structured knowledge',
    cat: 'Knowledge engine',
    dur: 15.8,
    blurb:
      'Upload the manufacturer PDF. The text layer is extracted, scanned pages fall back to OCR, and the parsed summary is reviewed before anything is published.',
  },
  {
    slug: 'knowledge-base',
    title: 'The knowledge base',
    cat: 'Knowledge engine',
    dur: 13.0,
    blurb:
      'Documents are indexed per model with chunk counts and status. When a manual is revised, the SKU is re-indexed and the old answer stops being served.',
  },
  {
    slug: 'grounded-answers',
    title: 'Answers anchored to the manual',
    cat: 'Knowledge engine',
    dur: 15.9,
    blurb:
      'Retrieval narrows to the model’s own chunks, then the answer is assembled from them. When nothing clears the threshold, the merchant’s fallback script answers instead.',
  },
  {
    slug: 'customers-sessions',
    title: 'Customers and sessions',
    cat: 'Service console',
    dur: 14.0,
    blurb:
      'Every buyer session is a record: product, status, handover flag, full transcript and outcome — filterable by what happened.',
  },
  {
    slug: 'human-handover',
    title: 'Handover without the restart',
    cat: 'Service console',
    dur: 15.2,
    blurb:
      'One click moves the session from AI to a human in the same chat window, with symptoms, photos and ruled-out causes attached.',
  },
  {
    slug: 'service-dashboard',
    title: 'Service dashboard',
    cat: 'Service console',
    dur: 12.5,
    blurb:
      'Self-resolution, handover rate and session volume in one view — the numbers a merchant needs to judge whether the pilot worked.',
  },
  {
    slug: 'brand-voice',
    title: 'Your AI’s voice and boundaries',
    cat: 'Brand & language',
    dur: 13.9,
    blurb:
      'Role prompt, tone and the fallback answer are merchant settings, not model defaults. The AI cannot improvise past the script.',
  },
  {
    slug: 'merchant-brand',
    title: 'Merchant branding',
    cat: 'Brand & language',
    dur: 10.4,
    blurb:
      'Logo, colours and business profile carry into the buyer-facing chat, so the help looks like the store it came from.',
  },
  {
    slug: 'multilingual',
    title: 'Four languages, one knowledge base',
    cat: 'Brand & language',
    dur: 13.9,
    blurb:
      'The buyer interface switches between English, Chinese, Spanish and Japanese. The manuals stay in the source language; translation happens inside the answer.',
  },
  {
    slug: 'chrome-workbench',
    title: 'Chrome workbench',
    cat: 'Workflow',
    dur: 11.6,
    blurb:
      'A Manifest V3 extension puts link generation, SKU lookup and session status next to whatever tab the seller is already working in.',
  },
  {
    slug: 'signup-verification',
    title: 'Merchant sign-up',
    cat: 'Onboarding',
    dur: 9.7,
    blurb: 'Account creation with email verification — the first step of merchant onboarding.',
  },
  {
    slug: 'login-console',
    title: 'Console sign-in',
    cat: 'Onboarding',
    dur: 6.2,
    blurb: 'JWT session, 2-hour access token with a 7-day refresh, per merchant.',
  },
  {
    slug: 'password-reset',
    title: 'Password reset',
    cat: 'Onboarding',
    dur: 10.2,
    blurb: 'Six-digit email code flow, BCrypt-hashed credentials, no support ticket required.',
  },
];

export const VIDEO_CATS = ['All', 'Buyer journey', 'Knowledge engine', 'Service console', 'Brand & language', 'Workflow', 'Onboarding'];

export const PLANS = [
  {
    id: 'pilot',
    name: 'Pilot',
    price: 2999,
    period: '60 days',
    usd: 420,
    tag: 'Start here',
    pitch: 'Prove the loop on your own SKUs before you commit to a subscription.',
    features: [
      '5 SKUs, 500 diagnoses total',
      'Manual curation done for you',
      'One onboarding & training session',
      'Before/after effect report',
      'Both sides agree success metrics up front',
    ],
    note: 'Fee credited toward the first subscription.',
    cta: 'Book a pilot',
  },
  {
    id: 'basic',
    name: 'Basic',
    price: 399,
    period: 'per month',
    usd: 55,
    pitch: 'For small sellers who want the self-service door open.',
    features: ['5 SKUs', '300 diagnoses / month', 'Buyer self-service entry', 'Diagnostic records & basic stats', 'Email support'],
    note: 'Overage ¥0.80 per diagnosis session.',
    cta: 'Start with Basic',
  },
  {
    id: 'growth',
    name: 'Growth',
    price: 899,
    period: 'per month',
    usd: 125,
    tag: 'Recommended',
    pitch: 'The plan the model is built around: handover, analytics, enough SKUs to matter.',
    features: [
      '20 SKUs',
      '1,000 diagnoses / month',
      'Human hand-over queue with email alerts',
      'Self-resolution & interception analytics',
      'Priority onboarding for new manuals',
    ],
    note: 'Overage ¥0.60 per diagnosis session.',
    cta: 'Choose Growth',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 19800,
    period: 'per year',
    usd: 2750,
    pitch: 'Multi-line brands and manufacturers running several catalogues.',
    features: ['60 SKUs', '3,000 diagnoses / month', 'Multi-account & permissions', 'Priority support', 'Quarterly effect review'],
    note: 'Overage ¥0.45 per diagnosis session.',
    cta: 'Talk to sales',
  },
];

export const FAQ_GROUPS = [
  {
    id: 'product',
    title: 'Product & functionality',
    items: [
      {
        q: 'What exactly is ToolFix AI?',
        a: 'A vertical AI after-sales diagnostics platform for power-tool businesses. Merchants upload product manuals to build a knowledge base; buyers open a personal link and chat with an AI that walks them through multi-round troubleshooting. Fake faults end on a self-fix guide; real faults or safety risks are escalated to a human with full context.',
      },
      {
        q: 'Which problem does it actually solve?',
        a: 'A large share of cross-border after-sales tickets are not defects: a battery in transport-sleep mode, a direction switch in the wrong position, a guard mounted backwards. They consume agent time and often become unnecessary returns — the category benchmark is around 15% — costing freight, refunds and reviews on tools that work.',
      },
      {
        q: 'How does a buyer use it? Is registration required?',
        a: 'No registration. The merchant generates a unique token link per order (bound to buyer name, product and order number) and sends it by email or QR code. The buyer opens it and lands straight in the chat.',
      },
      {
        q: 'Which product categories are supported?',
        a: 'Power tools and garden tools first: drills, impact drivers, angle grinders, saws, mowers. They have high fault repetition and clear safety boundaries, which suits AI troubleshooting. Other hardware categories extend on the same architecture.',
      },
      {
        q: 'Which e-commerce platforms are supported?',
        a: 'Shopify is live in the MVP, with one real store running the full loop. WooCommerce and Amazon connectors are on the roadmap. The chat page is platform-agnostic — orders from any channel can start today with manually generated links.',
      },
      {
        q: 'How is diagnostic accuracy maintained?',
        a: 'Three layers. Answers are RAG-grounded and cite the merchant’s own manuals rather than free invention. Documents carry model tags, so a question naming a model locks retrieval to that SKU. Each document adds twelve AI-anticipated buyer questions, vectorised separately to lift recall. When nothing retrieves reliably, the merchant’s configured fallback answer takes over instead of a guess.',
      },
      {
        q: 'The manuals are in Chinese. What about English buyers?',
        a: 'Chinese manuals are parsed into the knowledge base while the AI converses in the buyer’s language; the cross-language step happens inside the system during diagnosis. This matches how Chinese merchants actually work: internal documents in Chinese, overseas buyers in English, Spanish or Japanese.',
      },
      {
        q: 'Why cap a diagnosis at five rounds?',
        a: 'Our survey found 68% of buyers accept five minutes or less of self-troubleshooting, and five rounds roughly matches that budget. Beyond it the issue is probably a complex fault; dragging on only pushes the buyer toward a refund. Early hand-over is the better outcome.',
      },
      {
        q: 'What happens when the AI cannot solve an issue?',
        a: 'It escalates. Unresolved rounds, low confidence or negative buyer feedback move the session into a handover queue — highlighted in the console with an email alert. The agent takes over in the same chat window, and the session returns to AI service when they leave.',
      },
      {
        q: 'How long does merchant onboarding take?',
        a: 'Three steps: register, upload PDF manuals (auto-parsed and chunked, with OCR for scans), review and confirm. A single SKU usually goes live the same day. The paid Pilot plan includes done-for-you knowledge curation.',
      },
    ],
  },
  {
    id: 'safety',
    title: 'Safety & escalation',
    items: [
      {
        q: 'How are safety-risk issues handled?',
        a: 'With a hard rule outside the AI model. Smoke, sparks, burnt smell, electric shock, swollen batteries or user injury trigger a deterministic interception: diagnosis stops, a safety notice displays, and the session escalates. Acceptance requires 100% hand-over on every high-risk scenario, no exceptions.',
      },
      {
        q: 'Which scenarios must go to a human?',
        a: 'The highest enterprise consensus in our research: user already injured (98%), cracked or wobbling disc (96%), damaged cord (92%), smoke or strong sparks (90%), burnt smell (86%), water ingress or broken housing (86%). The keyword table covers all of them.',
      },
      {
        q: 'What if the AI gives wrong guidance anyway?',
        a: 'Four guardrails: the knowledge base is locked to the merchant’s manuals; the safety tripwire is deterministic; low confidence escalates; and hand-over plus safety scripts are preset by the merchant, never improvised by the model. The design principle is “better to escalate than to guess”, and every session is logged for review.',
      },
      {
        q: 'How does human takeover actually work?',
        a: 'Over live WebSocket (STOMP) messaging. A session state machine moves AI-serving → human takeover → closed. The merchant sees highlighted handover requests with email alerts carrying a diagnostic summary — suspected part, ruled-out causes, transcript — takes over in one click, and the session returns to AI when they leave.',
      },
      {
        q: 'Will this replace human customer service?',
        a: 'No. It divides the work: standardised, low-risk questions go to AI; complex, high-risk and uncertain ones go to humans, with a full summary attached so agents resolve faster. Reference point: Gorgias customer Cocorico reached 48% ticket automation in three months with a two-person team and no new hires.',
      },
    ],
  },
  {
    id: 'data',
    title: 'Data & security',
    items: [
      {
        q: 'What buyer data is collected and stored?',
        a: 'As little as possible: the name, product and order number bound to the link, needed to route the session to the right SKU. Chat messages are stored in full so merchants can review diagnostic records. Secrets are injected as environment variables and passwords are BCrypt-hashed.',
      },
      {
        q: 'Is the platform GDPR-compliant?',
        a: 'It is designed to GDPR basics: minimal collection, support for access and deletion requests, encrypted storage. A full data-processing agreement is provided in commercial contracts.',
      },
      {
        q: 'Are the diagnostic links secure?',
        a: 'Each customer gets a unique token bound to their own product and order. There is no registration, and URLs cannot be guessed to reach someone else’s session. Session content is visible only to that buyer and the merchant.',
      },
      {
        q: 'Where does the data live, and who can see it?',
        a: 'Sessions live in the merchant’s own tenant inside MySQL 8, with access controlled by JWT (2-hour access token, 7-day refresh). Every message — buyer, AI or human — is stored against the session for audit.',
      },
    ],
  },
  {
    id: 'business',
    title: 'Business & pricing',
    items: [
      {
        q: 'Who are the target customers?',
        a: 'Small and mid-sized cross-border sellers and brands selling power and garden tools on Shopify — they own the overseas after-sales cost and already buy SaaS. Domestically, the Yongkang cluster (roughly 150 large manufacturers, 1,700+ suppliers) is the validation base; as those factories go global they become cross-border customers too.',
      },
      {
        q: 'How big is the market?',
        a: 'Bottom-up, from Store Leads 2025 data: 15,136 category store listings on Shopify and WooCommerce, 5,284 active Shopify sellers as SAM, about 3,670 contactable after de-duplication, and a focused first-year target list of roughly 950 merchants. Every narrowing step is auditable.',
      },
      {
        q: 'What does it cost?',
        a: 'Four plans: Pilot ¥2,999 per 60 days (5 SKUs, 500 diagnoses, done-for-you curation, effect report); Basic ¥399/month; Growth ¥899/month (recommended: 20 SKUs, 1,000 diagnoses, hand-over, analytics); Enterprise ¥19,800/year (60 SKUs, 3,000 diagnoses, multi-account). Diagnoses beyond plan allowance bill at ¥0.45–0.80 per session.',
      },
      {
        q: 'How is one “diagnosis” counted?',
        a: 'One continuous multi-round diagnosis of a single issue — not one count per message. The buyer describes the problem, the AI asks follow-ups and delivers a verdict: that exchange counts once.',
      },
      {
        q: 'What does one session cost you? Is it profitable?',
        a: 'At current model pricing a five-round session costs roughly ¥0.3–0.8 in AI and hosting, below the overage rate, and in-plan volumes are priced above cost, so each incremental session is margin-positive. Costs are logged per call and checked monthly against 1,000 / 5,000 / 20,000-session models.',
      },
      {
        q: 'Is there a free trial?',
        a: 'The paid pilot replaces a free tier on purpose: it bundles manual curation, training and an effect report — services with real labour cost — and filters for merchants serious about measuring results. Research says the fee does not hurt demand: 48% of enterprises said they would start a pilot immediately.',
      },
      {
        q: 'How does a pilot run?',
        a: 'Qualify (after-sales volume, SKU count, cost of a return) → pilot (3 SKUs, 4–8 weeks, success metrics agreed up front) → prove (effect report with interceptions, interception rate, buyer feedback) → convert (pilot fee credited toward the first subscription).',
      },
      {
        q: 'How does a merchant measure ROI?',
        a: 'The console shows self-resolution rate, interceptions and the return value they avoided, plus response latency. The pilot report compares return rates before and after. Each intercepted fake-fault return saves roughly USD 50–70 in freight, refund and refurbishment — a few interceptions a month cover the Basic subscription.',
      },
      {
        q: 'How are you different from Gorgias, Shulex or Aquant?',
        a: 'Each owns one dimension: Gorgias is a mature e-commerce helpdesk without equipment diagnosis; Shulex does cross-border AI service extended into hardware troubleshooting but is not power-tool-specific; Aquant serves industrial service AI but sits outside SME budgets. None makes cross-border power-tool consumer after-sales its core scenario.',
      },
      {
        q: 'Why not just use ChatGPT or a generic chatbot?',
        a: 'A generic model has none of your manuals and answers generically — on power tools a wrong guess is a safety risk. It has no order or model binding, so no targeted path. And it has no after-sales workflow: no safety interception, no human takeover, no diagnostic record. Our answers are strictly grounded in the merchant’s knowledge base.',
      },
    ],
  },
  {
    id: 'team',
    title: 'Team & stage',
    items: [
      {
        q: 'What is the team’s background?',
        a: 'Two founders with complementary halves. Kuangqi Sun owns business, pricing, market sizing and the financial model; his family runs a power-tool factory, which is where the problem came from. Zihan (Edwin) Nan owns product content, user research and brand; he designed and ran the 100-person survey and the buyer-side guide pages. Contract developers and advisors support engineering, deployment and security review.',
      },
      {
        q: 'What stage is the project at?',
        a: 'MVP deployed and running at www.toolfixai.cn (merchant accounts, manual parsing, AI diagnosis, human takeover, Chrome extension v0.2.0), 100-person survey complete, pricing defined, business plan written. Pre-revenue: the next milestone is 3–5 pilot merchants in three months, then first paying customers within six.',
      },
      {
        q: 'What is the funding ask?',
        a: 'A pre-seed round to fund general availability, a listed Shopify app, and pilot-conversion support. Amount and terms are shared directly with investors — the material pack is on the Investors page.',
      },
      {
        q: 'Can I see the product before talking to anyone?',
        a: 'Yes. Every screen in the product tour is a recording of the live MVP build; you can also register a merchant account at www.toolfixai.cn and upload your own manual.',
      },
    ],
  },
];

export const EVIDENCE = {
  respondents: 100,
  consumer: 50,
  enterprise: 50,
  survey: [
    { label: 'Would try AI first, or with accuracy caveats', value: 85 },
    { label: 'Accept five minutes or less of self-troubleshooting', value: 68 },
    { label: 'Rated AI 4–5 / 5 for simple repairs', value: 63 },
    { label: 'Rate fast human hand-over important', value: 87 },
    { label: 'Enterprise: would pilot within 4–8 weeks', value: 48 },
    { label: 'Enterprise: can share product manuals', value: 88 },
  ],
  media: [
    { label: 'Short video with annotated stills', value: 41 },
    { label: 'Interactive step-by-step guidance', value: 29 },
    { label: 'Plain FAQ text', value: 12 },
    { label: 'Other / no preference', value: 18 },
  ],
  safety: [
    { label: 'Buyer already injured', value: 98 },
    { label: 'Cracked or wobbling disc', value: 96 },
    { label: 'Damaged power cord', value: 92 },
    { label: 'Smoke or strong sparks', value: 90 },
    { label: 'Burnt smell', value: 86 },
    { label: 'Water ingress / broken housing', value: 86 },
  ],
  pain: [
    { label: 'Buyer cannot describe the fault clearly', value: 22 },
    { label: 'Operation problem misread as defect', value: 22 },
    { label: 'Service agents without technical knowledge', value: 18 },
    { label: 'Multilingual & time-zone friction', value: 14 },
    { label: 'Other', value: 24 },
  ],
  value: [
    { label: 'Cut unnecessary returns and refunds', value: 26 },
    { label: 'Shorten handling time', value: 20 },
    { label: 'Build a unified product knowledge base', value: 18 },
    { label: 'Reduce agent workload', value: 18 },
    { label: 'Other', value: 18 },
  ],
  pilots: [
    { label: 'Pilot immediately (4–8 weeks)', value: 48 },
    { label: 'Small-scale trial first', value: 28 },
    { label: 'Decide once price & security are clear', value: 18 },
    { label: 'Not interested now', value: 6 },
  ],
};

export const MARKET = {
  tam: 15136,
  sam: 5284,
  contactable: 3670,
  som: 950,
  yongkang: { manufacturers: 150, suppliers: 1700 },
};

export const COMPETITORS = [
  {
    name: 'Gorgias',
    kind: 'E-commerce helpdesk',
    position: 'Mature Shopify-native helpdesk. AI automation proven on standard tickets; no concept of a power tool failing.',
    proof: 'Cocorico: 48% ticket automation in 3 months, 2,400+ tickets, 22-second first response, no new hires.',
    scores: { fit: 4, depth: 2, knowledge: 3, ux: 5, platform: 5, commercial: 5 },
  },
  {
    name: 'Shulex',
    kind: 'Cross-border AI service',
    position: 'Closest competitor. Already extends into hardware troubleshooting, not power-tool-specific.',
    proof: 'Mammotion: 50% reduction in complex-ticket handling time.',
    scores: { fit: 4, depth: 3, knowledge: 4, ux: 4, platform: 4, commercial: 4 },
  },
  {
    name: 'Aquant',
    kind: 'Industrial service AI',
    position: 'The depth ceiling: repair histories, parts catalogues, schematics. Commercially out of reach for SME budgets.',
    proof: 'Comfort Systems: +9% first-time-fix rate, 49% lower resolution cost.',
    scores: { fit: 2, depth: 5, knowledge: 5, ux: 3, platform: 2, commercial: 4 },
  },
  {
    name: 'ToolFix AI',
    kind: 'Vertical power-tool diagnostics',
    position: 'Cross-border commerce context, SKU-level fault trees and safety rules, and a buyer entry tied to the order.',
    proof: 'MVP live; 15 scripted fault scenarios in acceptance testing.',
    scores: { fit: 5, depth: 5, knowledge: 4, ux: 4, platform: 4, commercial: 3 },
    self: true,
  },
];

export const FINANCE = {
  base: [
    { label: 'Contract value (5 customers)', value: 59400, kind: 'revenue' },
    { label: 'Usage overage (15% beyond plan)', value: 5000, kind: 'revenue' },
    { label: 'AI + hosting (logged per call)', value: 10000, kind: 'cost' },
    { label: 'Onboarding labour (3 pilots + 5 live)', value: 15000, kind: 'cost' },
    { label: 'Outbound & marketing tooling', value: 5000, kind: 'cost' },
  ],
  scenarios: [
    { name: 'Conservative', assumptions: 'Reply rate 2%, pilot-to-paid 25%', customers: 2 },
    { name: 'Base', assumptions: 'Reply rate 3%, pilot-to-paid 40%', customers: 5 },
    { name: 'Optimistic', assumptions: 'Reply rate 5%, pilot-to-paid 50%, referrals active', customers: 9 },
  ],
};

export const MILESTONES = [
  {
    when: 'Now',
    title: 'MVP live, research done',
    body: 'Merchant console, manual parsing, AI diagnosis, human handover, Chrome workbench v0.2.0. 100-person survey closed; pricing defined.',
    state: 'done',
  },
  {
    when: 'Months 0–3',
    title: 'Three to five design partners',
    body: 'Yongkang factories and Shopify sellers onboarded on the pilot package. Acceptance tests re-run on every partner’s own manuals.',
    state: 'next',
  },
  {
    when: 'Months 3–6',
    title: 'First paying customers',
    body: 'Pilot reports convert. Billing, multi-tenant onboarding and the ROI dashboard ship.',
    state: 'plan',
  },
  {
    when: 'Months 6–9',
    title: 'General availability & Shopify app',
    body: 'Listed Shopify app, self-serve onboarding, WooCommerce connector in development.',
    state: 'plan',
  },
  {
    when: 'Months 9–12',
    title: 'Five paying customers, operating break-even',
    body: 'Base case: 5 paying merchants (2 Growth, 2 Basic, 1 Enterprise), operating costs covered around month 10–12.',
    state: 'plan',
  },
];
