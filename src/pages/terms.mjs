import { href } from '../lib/layout.mjs';

export default {
  path: '/terms/',
  nav: '',
  title: 'Terms of use · ToolFix AI',
  description:
    'Terms governing use of this marketing website, and a clear statement that the material here is informational, not an offer of securities or a guarantee of results.',
  body: (ctx) => `
<section class="sec sec--tight">
  <div class="wrap">
    <div class="doc">
      <p class="phero__crumbs" style="color:var(--muted-2)"><a href="${href(ctx, '')}">Home</a> / Terms</p>
      <h1 class="h1" style="font-size:clamp(2rem,3.4vw,2.7rem)">Terms of use</h1>
      <p class="doc__meta">Last updated 20 November 2026</p>

      <p>This website is operated by the founders of ToolFix AI. By using it you accept these terms. If you do not accept them, please stop using the site.</p>

      <h2>What this site is</h2>
      <p>It is an informational site about a product and a company in formation. It is not the product itself. The merchant console and buyer chat run on a separate deployment at <a href="https://www.toolfixai.cn" target="_blank" rel="noopener">www.toolfixai.cn</a>, which has its own terms of service and data-processing terms.</p>

      <h2>No offer, no advice, no guarantee</h2>
      <p>Nothing on this site is an offer to sell or a solicitation to buy securities, an investment recommendation, or professional advice of any kind. Figures describing market size, pricing, unit economics, savings and customer counts are the founders' own estimates, restated from the business plan, and are forward-looking. They are not audited, not guarantees, and may change as pilots produce evidence.</p>
      <p>Survey results describe a 100-person sample recruited through the founders' networks. They are directional evidence used for product decisions, not a statistically representative study of the category.</p>

      <h2>The product must not replace the manual or a qualified technician</h2>
      <p>Descriptions here explain how the product behaves; they are not instructions for repairing a tool. Always follow the manufacturer's manual and local safety requirements. The product is designed to escalate safety-relevant situations to a human, and it must not be used as a substitute for licensed repair work or for emergency services.</p>

      <h2>Intellectual property</h2>
      <p>The ToolFix AI name, wordmark, logo, page designs, illustrations, diagrams and written content on this site belong to the founders, except for third-party trademarks and product names referenced for identification. You may read, quote and link to the material for non-commercial purposes with attribution. You may not republish it wholesale, use it to train a competing product, or imply endorsement without written permission.</p>
      <p>Customer names and product names mentioned in case references belong to their respective owners.</p>

      <h2>Recordings and demonstration data</h2>
      <p>The product clips on this site are recordings of the deployed build using sample merchants, buyers, SKUs and figures. Names such as “Alex Morgan”, order numbers and the values shown in dashboards are demonstration data, not real customer information.</p>

      <h2>Links to other sites</h2>
      <p>We link to third-party pages for reference. We do not control them and are not responsible for their content, availability or privacy practices.</p>

      <h2>Availability</h2>
      <p>The site is provided “as is”. We do not warrant uninterrupted availability or that the information is complete or current at the moment you read it. We may change or withdraw any part of the site at any time.</p>

      <h2>Limitation of liability</h2>
      <p>To the extent permitted by law, the founders are not liable for indirect or consequential loss arising from use of this website or reliance on its content. Nothing in these terms excludes liability that cannot lawfully be excluded.</p>

      <h2>Governing law</h2>
      <p>These terms are governed by the laws of the People's Republic of China, without prejudice to mandatory consumer protections in your own jurisdiction. Disputes will be brought before the competent court at the founders' place of business unless the law requires otherwise.</p>

      <h2>Contact</h2>
      <p><a href="mailto:kuangqisun@gmail.com">kuangqisun@gmail.com</a></p>
    </div>
  </div>
</section>`,
};
