import { href } from '../lib/layout.mjs';
import { btn } from '../lib/ui.mjs';

export default {
  path: '/404/',
  nav: '',
  noindex: true,
  title: 'Page not found · ToolFix AI',
  description: 'That page does not exist. Head back to the product, the tour or the pricing page.',
  body: (ctx) => `
<section class="sec" style="min-height:62vh;display:flex;align-items:center">
  <div class="wrap">
    <p class="eyebrow"><span class="eyebrow__dash"></span>Error 404</p>
    <h1 class="h1" style="max-width:20ch;font-size:clamp(2.2rem,4.2vw,3.4rem)">This page is not in the manual.</h1>
    <p class="lead" style="margin-top:18px">The link is broken or the page has moved. The diagnosis is simple: start again from one of these.</p>
    <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:30px">
      ${btn({ href: href(ctx, ''), label: 'Home', variant: 'primary', ic: 'arrow' })}
      ${btn({ href: href(ctx, 'product/'), label: 'Platform', variant: 'line' })}
      ${btn({ href: href(ctx, 'demo/'), label: 'Product tour', variant: 'line' })}
      ${btn({ href: href(ctx, 'pricing/'), label: 'Pricing', variant: 'line' })}
    </div>
  </div>
</section>`,
};
