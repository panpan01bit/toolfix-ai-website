import { icon, href } from '../lib/layout.mjs';
import { eyebrow, btn, sec, table } from '../lib/ui.mjs';

/**
 * 中文简介页。对外通稿文体：事实、数字、边界写清楚，不喊口号。
 */
export default {
  path: '/zh/',
  nav: 'zh',
  title: 'ToolFix AI 中文简介 — 电动工具跨境售后 AI 诊断',
  description:
    'ToolFix AI 是面向电动工具出海商家的 AI 售后诊断 SaaS：上传说明书构建知识库，买家通过专属链接自助排查，假故障当场解决，真故障和安全隐患转人工。MVP 已上线，pre-seed。',
  bodyClass: 'zh',
  body: (ctx) => {
    const l = (p) => href(ctx, p);
    return `
<section class="phero">
  <div class="hero__grid"></div>
  <div class="wrap phero__in">
    <div>
      <p class="phero__crumbs"><a href="${l('')}">Home</a> / 中文简介</p>
      <h1>电动工具出海的售后，不用每次都靠退货解决。</h1>
      <p class="phero__sub">把厂家自己的说明书变成一条能自查的对话：买家点开专属链接，AI 按型号一步步问到问题所在；假故障当场解决，真故障和安全隐患转人工，带着完整记录过去。</p>
    </div>
    <div class="phero__aside">
      <b>现状 · 2026 年 11 月</b>
      MVP 已部署在 toolfixai.cn 运行，100 人调研完成，定价与商业计划已定稿，正在找第一批试点商家。pre-seed 阶段。
    </div>
  </div>
</section>

${sec({
  tone: 'white',
  inner: `
  <div class="grid grid-1-2 zh-copy" style="align-items:start;gap:56px">
    <div>
      ${eyebrow('问题')}
      <h2 class="h2">大部分售后工单，不是故障。</h2>
    </div>
    <div>
      <p class="lead">电池出厂是休眠模式，买家不知道要激活；模式旋钮停在钻和锤中间；护罩装反了。工具是好的，买家判断不了，于是一轮一轮问，最后有一部分变成了退货。</p>
      <p class="small" style="margin-top:16px">电动工具类目的退货率行业基准大约 15%。一台 80 美元的机器退回一趟，运费、退款、重新上架的折价加起来在 50–70 美元。这一单本来可以不发生。</p>
      <p class="small" style="margin-top:16px">商家真正缺的不是客服人手，是让买家在提问的那一刻就得到“你这台机器具体该按哪里”的答案。</p>
    </div>
  </div>
  <div class="kv" style="margin-top:34px">
    <div class="kv__i"><p class="kv__k">行业退货率基准</p><p class="kv__v">约 15%</p></div>
    <div class="kv__i"><p class="kv__k">安装 / 模式类问题占比</p><p class="kv__v">调研样本中 40%</p></div>
    <div class="kv__i"><p class="kv__k">单次可避免退货损失</p><p class="kv__v">USD 50–70（80 美元机型）</p></div>
    <div class="kv__i"><p class="kv__k">旺季工单量</p><p class="kv__v">淡季的 3–5 倍</p></div>
  </div>`,
})}

${sec({
  tone: 'paper2',
  inner: `
  <div class="sechead sechead--split">
    <div>${eyebrow('怎么跑')}<h2 class="h2">一条链接，一篇说明书，五轮问诊。</h2></div>
    <p class="lead">买家不需要注册。商家为每个订单生成一条专属链接，绑定姓名、型号和订单号，发邮件或二维码过去，点开就是对话页。</p>
  </div>
  <div class="tl">
    ${[
      ['第 1 步 · 入口', '链接绑定订单，AI 一开口就知道是哪台机器，不需要买家先描述产品。'],
      ['第 2 步 · 检索', '说明书按 800 字切块、向量化，带型号标签；提问里出现型号时，先缩小到该型号的知识再检索。'],
      ['第 3 步 · 问诊', '一轮只问一个问题，最多五轮——对应调研里 68% 买家愿意给的五分钟。'],
      ['第 4 步 · 拦截', '冒烟、火花、漏电、电池鼓包、用户受伤这类关键词在模型之外做确定性判断，命中就停，转人工。'],
      ['第 5 步 · 结论', '能自己解决就落到图文自查页，买家点“好了”结案；解决不了转人工，在同一窗口接手，带着已排除项和照片。'],
    ]
      .map(([k, d], i) => `<div class="tl__item${i === 0 ? ' is-next' : ''}"><div class="tl__when">${k}</div><div class="tl__body"><p style="font-size:.95rem;color:var(--text);line-height:1.8">${d}</p></div></div>`)
      .join('')}
  </div>`,
})}

${sec({
  tone: 'white',
  inner: `
  <div class="sechead">
    ${eyebrow('三条边界')}
    <h2 class="h2">哪些事它不做。</h2>
  </div>
  <div class="splitlist">
    <div><h4>不脱离说明书回答</h4><p>检索不到就用商家预设的兜底话术，或者转人工。模型不会自由发挥，电动工具上说错一句是安全问题。</p></div>
    <div><h4>不碰带电作业</h4><p>市电、充电器、裸露导线一律转人工。AI 不会让买家拿万用表去测活线。</p></div>
    <div><h4>不承诺修好机器</h4><p>它确认操作是否正确、给出安全指引。需要拆机到用户可维护范围之外的，交给技师。</p></div>
    <div><h4>不静默失败</h4><p>每一轮都有置信度，连续解决不了或买家点踩，会话进人工队列，后台高亮并邮件提醒。</p></div>
  </div>`,
})}

${sec({
  tone: '',
  inner: `
  <div class="grid grid-1-2" style="align-items:start;gap:56px">
    <div>
      ${eyebrow('调研')}
      <h2 class="h2">先做问卷，再做功能。</h2>
      <p class="lead" style="margin-top:16px">21 道题，消费者和经销商两条线，100 份有效样本，其中 50 份来自企业和技师。企业方每一位都补了一次 30–45 分钟的访谈，把最近一次真实售后从头走一遍。</p>
      <p class="note" style="margin-top:16px">样本通过家族供应链、工厂、跨境卖家社群和转介绍招募，属于方向性证据，不是对全类目的统计推断。这一点我们在商业计划里也写明了。</p>
    </div>
    <div class="grid" style="gap:12px">
      ${[
        ['85%', '愿意先试 AI 自查（或视准确率而定）'],
        ['68%', '最多愿意花五分钟自助排查'],
        ['87%', '认为快速转人工重要或非常重要'],
        ['48%', '企业愿意立刻开始 4–8 周试点'],
        ['98%', '认为买家已受伤必须人工处理'],
        ['88%', '可以拿出产品说明书'],
      ]
        .map(
          ([v, k]) => `<div class="card card--tight" style="display:flex;align-items:baseline;gap:16px"><span class="stat__v" style="font-size:1.5rem;min-width:64px">${v}</span><span style="font-size:.9rem;color:var(--muted)">${k}</span></div>`,
        )
        .join('')}
    </div>
  </div>`,
})}

${sec({
  tone: 'paper2',
  inner: `
  <div class="sechead">
    ${eyebrow('价格')}
    <h2 class="h2">按型号和诊断次数收费，不按坐席。</h2>
  </div>
  ${table(
    ['方案', '价格', '包含', '超出计费'],
    [
      ['试点版', '¥2,999 / 60 天', '5 个型号、500 次诊断、专人整理知识库、一次培训、试点效果报告', '单独报价'],
      ['基础版', '¥399 / 月', '5 个型号、300 次/月、买家自助入口、诊断记录', '¥0.80 / 次'],
      ['成长版', '¥899 / 月', '20 个型号、1,000 次/月、人工接管、基础报表', '¥0.60 / 次'],
      ['企业版', '¥19,800 / 年', '60 个型号、3,000 次/月、多账号权限、优先支持', '¥0.45 / 次'],
    ],
    { firstCol: '方案' },
  )}
  <p class="sourceline">一次诊断指围绕同一台机器同一个问题的连续多轮排查，不是按消息条数计。单次诊断的模型与托管成本约 ¥0.3–0.8，套餐内额度已覆盖成本，超出部分按次计费仍有正毛利。</p>`,
})}

${sec({
  tone: 'white',
  inner: `
  <div class="grid grid-1-2" style="align-items:start;gap:56px">
    <div>
      ${eyebrow('市场')}
      <h2 class="h2">先服务 Shopify 上已经在卖货的人。</h2>
      <p class="lead" style="margin-top:16px">Shopify + WooCommerce 电动工具与园林工具类目店铺 15,136 条；其中活跃 Shopify 卖家 5,284 家，约 69.4% 公开可联系邮箱，去重筛选后约 3,670 家可触达，首年聚焦名单约 950 家。</p>
      <p class="small" style="margin-top:16px">永康作为验证基地：约 150 家规上电动工具企业、1,700 多家配套企业。那里能拿到说明书、故障案例和愿意当场挑错的工程师；这些工厂做出海品牌之后，就是下一批跨境客户。</p>
    </div>
    <div class="tblwrap">
      <table class="tbl">
        <thead><tr><th>层级</th><th>数量</th></tr></thead>
        <tbody>
          <tr><td class="tbl__first">TAM · 类目店铺</td><td>15,136</td></tr>
          <tr><td class="tbl__first">SAM · 活跃 Shopify 卖家</td><td>5,284</td></tr>
          <tr><td class="tbl__first">可触达</td><td>约 3,670</td></tr>
          <tr><td class="tbl__first">首年目标名单</td><td>约 950</td></tr>
        </tbody>
      </table>
      <p class="note" style="padding:14px 18px">数据来源 Store Leads（2025）。每一层过滤条件都可复核。</p>
    </div>
  </div>`,
})}

${sec({
  tone: 'paper2',
  inner: `
  <div class="sechead">
    ${eyebrow('团队')}
    <h2 class="h2">两个人，各管一半。</h2>
  </div>
  <div class="team">
    <article class="member">
      <div class="member__top"><img class="member__img" src="${ctx.base}img/team-kuangqi.jpg" alt="孙旷淇" width="84" height="84" loading="lazy"><div><p class="member__name">孙旷淇</p><p class="member__role">联合创始人 · 商业、财务与市场</p></div></div>
      <div class="member__body">
        <p>新南威尔士大学商学院会计专业，2027 届。负责商业计划、定价、市场规模测算和财务模型，以及竞品分析和试点商务条款。</p>
        <p>家里做电动工具进出口，问题就是从那里来的：同一类问题每个季度都会再问一遍。</p>
      </div>
    </article>
    <article class="member">
      <div class="member__top"><img class="member__img" src="${ctx.base}img/team-edwin.jpg" alt="南子涵" width="84" height="84" loading="lazy"><div><p class="member__name">南子涵（Edwin）</p><p class="member__role">联合创始人 · 产品内容与用户研究</p></div></div>
      <div class="member__body">
        <p>悉尼大学 Digital Culture 专业、视觉艺术辅修，二年级。设计了 100 人问卷和访谈提纲，负责买家端自查页、产品文档和品牌视觉。</p>
        <p>在 Canva 和 Photoshop 里按真实说明书照片做页面原型，再拿给用过这类工具的同学试。</p>
      </div>
    </article>
  </div>`,
})}

${sec({
  tone: 'white',
  inner: `
  <div class="grid grid-2" style="gap:48px;align-items:center">
    <div>
      ${eyebrow('现在')}
      <h2 class="h2">已经有的，和还没有的。</h2>
      <p class="lead" style="margin-top:16px">产品已经能跑：商家注册、说明书解析、AI 诊断、人工接管、Chrome 插件 v0.2.0，都在 toolfixai.cn 上。</p>
      <p class="small" style="margin-top:14px">还没有的是付费客户和真实的拦截率。未来三个月签 3–5 家免费试点（永康工厂 + Shopify 卖家），六个月内转首批付费，十二个月基准累计约 5 家。pre-seed 融资用于产品 GA、上架 Shopify App Store 和试点转化支持。</p>
    </div>
    <div class="kv">
      <div class="kv__i"><p class="kv__k">产品</p><p class="kv__v">MVP 上线运行</p></div>
      <div class="kv__i"><p class="kv__k">收入</p><p class="kv__v">pre-revenue，准备试点</p></div>
      <div class="kv__i"><p class="kv__k">调研</p><p class="kv__v">100 份样本 + 企业访谈</p></div>
      <div class="kv__i"><p class="kv__k">融资阶段</p><p class="kv__v">pre-seed</p></div>
    </div>
  </div>
  <div style="margin-top:32px;display:flex;gap:10px;flex-wrap:wrap">
    ${btn({ href: l('demo/'), label: '看产品录屏', variant: 'primary', ic: 'play' })}
    ${btn({ href: l('pricing/#pilot'), label: '了解试点', variant: 'line', ic: 'arrow' })}
    ${btn({ href: 'mailto:kuangqisun@gmail.com', label: 'kuangqisun@gmail.com', variant: 'line', ic: 'mail' })}
  </div>`,
})}
`;
  },
};
