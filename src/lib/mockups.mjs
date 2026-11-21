/**
 * HTML product mockups. These replace dark screen recordings in the primary
 * storytelling surfaces: crisp at any size, text selectable, no codec artefacts.
 * Content mirrors the real build (same screens, same states).
 */

export function chatMockup(ctx, {
  lang = 'EN',
  messages = 'default',
  caption = '',
} = {}) {
  const head = `<header class="mchat__head">
      <div class="mchat__brand"><span class="mchat__mark"></span><b>ToolFix AI</b></div>
      <div class="mchat__langs"><b>${lang}</b><span>中文</span><span>ES</span><span>日本語</span></div>
    </header>`;

  const body = messages === 'safety'
    ? `<div class="mchat__assistant"><span class="mchat__av">✦</span><div><b>ToolFix assistant</b><small>Online · FD1104071</small></div></div>
       <div class="bubble bubble--me">It smells burnt and there was a spark.<time>08:24</time></div>
       <div class="safety">
         <b>Stopped for your safety</b>
         <p>Sparks and a burnt smell can mean a damaged winding or a shorted pack. Do not use the tool or charge the battery again.</p>
         <span class="safety__cta">A human is being connected →</span>
       </div>`
    : `<div class="mchat__assistant"><span class="mchat__av">✦</span><div><b>ToolFix assistant</b><small>Online · FD1104071</small></div></div>
       <div class="bubble bubble--me">Why does my drill stop after a few seconds?<time>08:24</time></div>
       <div class="bubble bubble--ai">That usually means the battery pack is not seated all the way. Does it click in firmly when you push it?<span class="bubble__src">FD1104071 · User manual</span></div>
       <div class="chips"><span>It clicks</span><span>No sound at all</span></div>
       <div class="guidecard">
         <div class="guidecard__img" style="background-image:url(${ctx.base}img/battery-closeup.jpg)"></div>
         <div class="guidecard__t"><small>STEP 2 OF 4</small><b>Seat the pack until it clicks</b><span>Open the guide →</span></div>
       </div>`;

  return `<figure class="mock mock--chat">
    <div class="mock__chrome"><i></i><i></i><i></i><span>toolfix.ai/s/8f3c-2a71</span></div>
    <div class="mchat">
      ${head}
      <div class="mchat__body">${body}</div>
      <footer class="mchat__foot"><span>Write a message…</span><b>↑</b></footer>
    </div>
    ${caption ? `<figcaption>${caption}</figcaption>` : ''}
  </figure>`;
}

export function guideMockup(ctx, { caption = '' } = {}) {
  return `<figure class="mock mock--guide">
    <div class="mock__chrome"><i></i><i></i><i></i><span>toolfix.ai/g/fd1104071</span></div>
    <div class="mguide">
      <div class="mguide__bar"><span>Step 2 of 4</span><i><b style="width:50%"></b></i><em>≈ 40 seconds</em></div>
      <div class="mguide__sheet">
        <div class="mguide__pic" style="background-image:url(${ctx.base}img/battery-closeup.jpg)">
          <span class="mguide__pin" style="left:47%;top:63%"></span>
        </div>
        <div class="mguide__copy">
          <h4>Push the battery in until it clicks</h4>
          <p>Line the pack up with the rail, slide it in, then press until you hear one click. Four LEDs should light when you press the indicator.</p>
          <div class="mguide__acts"><span class="guide-btn">Solved</span><span class="guide-btn guide-btn--ghost">Not solved</span></div>
        </div>
      </div>
      <div class="mguide__safety">◍ Stop and ask for a human if you see smoke, sparks or heat.</div>
    </div>
    ${caption ? `<figcaption>${caption}</figcaption>` : ''}
  </figure>`;
}

export function consoleMockup(ctx, { caption = '' } = {}) {
  const nav = ['Overview', 'Products', 'Knowledge', 'Conversations', 'Handover', 'Analytics'];
  const rows = [
    ['Sofia Chen', 'TF-20472', 'Precision screwdriver', 'Human support', 'warn'],
    ['Alex Morgan', 'TF-20481', 'FD1104071 · Impact drill', 'Resolved by AI', 'ok'],
    ['M. Novak', 'TF-20477', 'AG-125 · Angle grinder', 'Needs review', 'warn'],
    ['J. Fischer', 'TF-20469', 'FD1104071 · Impact drill', 'Resolved by AI', 'ok'],
  ];
  return `<figure class="mock mock--console">
    <div class="mock__chrome"><i></i><i></i><i></i><span>console.toolfix.ai/overview</span></div>
    <div class="mcon">
      <aside class="mcon__side">
        <div class="mcon__logo"><span class="mchat__mark"></span>ToolFix AI</div>
        <nav>${nav.map((n, i) => `<span class="${i === 0 ? 'is-on' : ''}">${n}${n === 'Conversations' ? '<em>12</em>' : ''}</span>`).join('')}</nav>
        <div class="mcon__plan"><small>PLAN</small><b>Growth</b><span>1,000 / mo</span></div>
      </aside>
      <div class="mcon__main">
        <header class="mcon__top"><b>Service overview</b><span class="mcon__range">Last 30 days ▾</span></header>
        <div class="mcon__kpis">
          ${[
            ['Self-resolution', '71%', '+6 pts'],
            ['Intercepted', '24', 'returns avoided'],
            ['Handover rate', '18%', '−3 pts'],
            ['Median answer', '0.3s', 'p50'],
          ]
            .map(
              ([k, v, s]) => `<div class="kpi"><small>${k}</small><b>${v}</b><span>${s}</span></div>`,
            )
            .join('')}
        </div>
        <div class="mcon__chart">
          <div class="mcon__chart-h"><small>Sessions per day</small><span>AI resolved · human</span></div>
          <div class="sparkbars">
            ${[42, 55, 48, 63, 58, 71, 66, 74, 69, 81, 77, 88, 83, 92]
              .map((v, i) => `<i style="height:${v}%" class="${i > 9 ? 'is-now' : ''}"></i>`)
              .join('')}
          </div>
        </div>
        <div class="mcon__table">
          <div class="mcon__tr mcon__tr--h"><span>Buyer</span><span>Order</span><span>Product</span><span>Status</span></div>
          ${rows
            .map(
              ([n, o, p, s, k]) => `<div class="mcon__tr"><span><b>${n}</b><i>${o}</i></span><span>${o}</span><span>${p}</span><span class="chip chip--${k}">${s}</span></div>`,
            )
            .join('')}
        </div>
      </div>
    </div>
    ${caption ? `<figcaption>${caption}</figcaption>` : ''}
  </figure>`;
}
