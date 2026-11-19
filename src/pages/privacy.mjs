import { href } from '../lib/layout.mjs';

export default {
  path: '/privacy/',
  nav: '',
  title: 'Privacy policy · ToolFix AI',
  description:
    'How this website handles information: no analytics, no advertising cookies, no tracking pixels. What is logged by the hosting provider, what we receive by email, and how to exercise your rights.',
  body: (ctx) => `
<section class="sec sec--tight">
  <div class="wrap">
    <div class="doc">
      <p class="phero__crumbs" style="color:var(--muted-2)"><a href="${href(ctx, '')}">Home</a> / Privacy</p>
      <h1 class="h1" style="font-size:clamp(2rem,3.4vw,2.7rem)">Privacy policy</h1>
      <p class="doc__meta">Last updated 20 November 2026 · applies to this marketing website only</p>

      <p>This site exists to explain a product. It does not try to build a profile of you. There is no analytics script, no advertising pixel, no cookie banner because there are no cookies to consent to, and no contact form that quietly stores your details.</p>

      <h2>What this website collects</h2>
      <p>Nothing that identifies you, by design. The site is a set of static files served by GitHub Pages. When you request a page, GitHub's infrastructure receives the usual technical data — IP address, user agent, requested URL, timestamp — and may retain it in its own logs under <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener">GitHub's privacy statement</a>. We do not receive, store or analyse those logs.</p>
      <ul>
        <li>No analytics or measurement scripts.</li>
        <li>No cookies, and no local storage used for tracking.</li>
        <li>No advertising, retargeting or social pixels.</li>
        <li>No embedded third-party scripts. Fonts are served from this domain.</li>
        <li>Product videos are served from this domain; they do not report playback to a third party.</li>
      </ul>

      <h2>When you email us</h2>
      <p>If you write to the addresses on this site, we receive your email address, your message and anything you attach. We use it to answer you, and we keep it in the mailbox for as long as the conversation is commercially relevant. We do not add you to a marketing list without asking, and we do not sell or rent contact details to anyone.</p>

      <h2>The product is a separate system</h2>
      <p>This policy covers the marketing site only. The ToolFix AI console and buyer chat run on a separate deployment at <a href="https://www.toolfixai.cn" target="_blank" rel="noopener">www.toolfixai.cn</a> and have their own terms. In the product, buyer data is deliberately minimal — the name, product and order number bound to a service link — and a data-processing agreement is provided in commercial contracts.</p>

      <h2>Your rights</h2>
      <p>Depending on where you live, you may have the right to ask what personal data an organisation holds about you, to have it corrected or deleted, and to object to certain processing. Because this website collects nothing, the only personal data we could hold is correspondence you sent us. Write to the address below and we will confirm, correct or delete it.</p>

      <h2>Children</h2>
      <p>This site is aimed at businesses and is not directed at children under 16. We do not knowingly collect information from them.</p>

      <h2>Changes</h2>
      <p>If this policy changes, the date at the top changes with it. We will not retroactively widen how previously collected information is used.</p>

      <h2>Contact</h2>
      <p>Privacy questions and data requests: <a href="mailto:kuangqisun@gmail.com">kuangqisun@gmail.com</a>. We aim to answer within five working days.</p>
    </div>
  </div>
</section>`,
};
