/* SillyBaby site-specific block types (loaded by tools/build.js).

   "shelf": product "what you'll need" cards for an age group or topic, ready for referral links.
     { "type": "shelf", "title", "intro", "items": [
         { "title", "text", "icon", "age": "0–6m", "checks": ["what to look for", ...],
           "link": "<referral slug in shmor-site.json links>" (optional), "cta": "Shop sleep bags" (optional),
           "guide": "<page slug>" (optional, links to our guide) } ] }
     Cards without a live "link" still show the buying checklist (never invented products or prices).

   "resources": verified outside resources (official bodies, real experts / creators).
     { "type": "resources", "title", "intro", "items": [ { "title", "kind", "text", "url", "tag" } ] } */
module.exports = {
  shelf(b, p, kit) {
    const { esc, icon, pagePath, bySlug, goHref, LINKS, AFF, errors } = kit;
    const today = new Date().toISOString().slice(0, 10);
    const live = s => !!LINKS[s] && !(LINKS[s].expires && LINKS[s].expires < today);
    const cards = (b.items || []).map(it => {
      if (it.link && !LINKS[it.link]) errors.push(`${p._file}: shelf item link "${it.link}" isn't in shmor-site.json "links"`);
      if (it.guide !== undefined && !bySlug.has(it.guide)) errors.push(`${p._file}: shelf item guide "${it.guide}" doesn't exist`);
      const shop = it.link && live(it.link)
        ? `<a class="shelf-go" href="${goHref(it.link, p.slug || 'home')}" ${AFF}>${esc(it.cta || `Shop at ${LINKS[it.link].merchant}`)} <span aria-hidden="true">→</span></a>` : '';
      const guide = it.guide !== undefined ? `<a class="shelf-guide" href="${pagePath(bySlug.get(it.guide))}">Read our guide →</a>` : '';
      return `<article class="shelf-card">
  <div class="shelf-top">${icon(it.icon || 'gift')}${it.age ? `<span class="shelf-age">${esc(it.age)}</span>` : ''}</div>
  <h3>${esc(it.title)}</h3>${it.text ? `<p>${it.text}</p>` : ''}
  ${(it.checks || []).length ? `<p class="shelf-label">What to look for</p><ul class="shelf-checks">${it.checks.map(c => `<li>${c}</li>`).join('')}</ul>` : ''}
  ${shop || guide ? `<div class="shelf-foot">${shop}${guide}</div>` : ''}
</article>`;
    }).join('');
    const head = b.title ? `<div class="block-head"><h2>${esc(b.title)}</h2>${b.intro ? `<p>${b.intro}</p>` : ''}</div>` : '';
    return `<section class="blocks blocks-shelf${b.class ? ' ' + esc(b.class) : ''}"><div class="wrap">${head}<div class="shelf-grid">${cards}</div></div></section>`;
  },

  resources(b, p, kit) {
    const { esc } = kit;
    const cards = (b.items || []).map(it => {
      const host = new URL(it.url).hostname.replace(/^www\./, '');
      return `<a class="res-card" href="${esc(it.url)}" rel="noopener" target="_blank"${it.tag ? ` data-tag="${esc(it.tag)}"` : ''}>
  ${it.kind ? `<span class="res-kind">${esc(it.kind)}</span>` : ''}<h3>${esc(it.title)}</h3><p>${it.text}</p><span class="res-host">${esc(host)} ↗</span></a>`;
    }).join('');
    const head = b.title ? `<div class="block-head"><h2>${esc(b.title)}</h2>${b.intro ? `<p>${b.intro}</p>` : ''}</div>` : '';
    return `<section class="blocks blocks-resources${b.class ? ' ' + esc(b.class) : ''}"><div class="wrap">${head}<div class="res-grid">${cards}</div></div></section>`;
  },

  /* "signup": free weekly email sign-up (full name, email, phone, country + consent).
     Posts to the network's Google Form → Google Sheet "Shmor Network Sign-ups (MASTER)" (youtube@shmor.ai),
     the same form as the Shmor Weekly on shmor.ai; its "source" column records the SillyBaby page URL.
     Field codes are in assets/signup.js (copied from shmor-ai/assets/js/config.js → SITE.signup).
     Options: { "type": "signup", "title", "intro", "anchor" } */
  signup(b, p, kit) {
    const { esc } = kit;
    return `<section class="blocks blocks-signup${b.class ? ' ' + esc(b.class) : ''}" id="${esc(b.anchor || 'weekly')}"><div class="wrap">
<div class="signup-card">
  <div class="signup-copy">
    <p class="signup-kicker">Free · Weekly · Unsubscribe any time</p>
    <h2>${esc(b.title || 'Get the SillyBaby weekly email')}</h2>
    <p>${b.intro || 'New blog posts, baby tech, age-by-age guides and gentle, fact-checked advice, once a week. No spam, ever.'}</p>
    <ul class="signup-perks"><li>New posts and guides</li><li>Baby tech and gear explained</li><li>Seasonal care tips</li></ul>
  </div>
  <div class="signup-box">
  <form class="signup-form" data-signup novalidate>
    <label class="sf">Full name<input name="name" autocomplete="name" placeholder="e.g. Sam Taylor" required minlength="2"></label>
    <label class="sf">Email<input name="email" type="email" autocomplete="email" placeholder="you@example.com" required></label>
    <div class="sf-row">
      <label class="sf">Country<select name="country" autocomplete="country-name" required><option value="">Choose</option></select></label>
      <label class="sf">Phone number<input name="phone" type="tel" autocomplete="tel" placeholder="Phone with country code" required></label>
    </div>
    <label class="sf-tick"><input type="checkbox" name="emailConsent" required><span>Yes please, email me the free SillyBaby weekly update (new posts, baby tech, guides and advice), sent as part of the <strong>Shmor Weekly</strong>.</span></label>
    <label class="sf-tick"><input type="checkbox" name="smsConsent"><span>Also text me occasional updates (optional).</span></label>
    <input type="text" name="company" tabindex="-1" autocomplete="off" class="sf-hp" aria-hidden="true">
    <p class="sf-err" role="alert" hidden></p>
    <button type="submit" class="sf-btn">Sign me up</button>
    <p class="sf-legal">We only use your details to send the updates you ask for, and we never sell them. To prevent spam we also record when you signed up and your IP address. See our <a href="https://shmor.ai/privacy/">privacy policy</a>.</p>
  </form>
  <div class="signup-done" hidden><p class="signup-done-ico" aria-hidden="true">🎉</p><h3>You're in, <span data-signup-name>friend</span>!</h3><p>Your first SillyBaby update lands in your inbox soon. Meanwhile, explore our <a href="/ages/">age-by-age guides</a>.</p></div>
  </div>
</div></div></section><script src="/assets/signup.js" defer></script>`;
  },
};
