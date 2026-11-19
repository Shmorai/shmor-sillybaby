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
};
