# SillyBaby (sillybaby.shmor.ai)

A Shmor marketplace (shared rules in `../../CLAUDE.md`): its own brand, design and SEO. Playful, fact-checked baby and child care guides for young and first-time parents (mainly mums) in the US, UK and Europe, from newborn to age 12: feeding, sleep, milestones, health, safety, care how-tos, gear (with "what to look for" product shelves ready for referral links), play, a printable baby diary and a blog. Repo: `Shmorai/shmor-sillybaby` (private until launch). Status: **building** (pre-launch: not public, no DNS, not submitted to Google; created 2026-11-18).

## Where things are
| What | Where |
|---|---|
| Card on shmor.ai, search keywords, popular searches, **referral links**, offers, SEO defaults | `shmor-site.json` |
| Pages (1 JSON file = 1 Google landing page) | `content/` (`home.json` = homepage) |
| Design: header, logo, footer (medical + affiliate disclaimers) | `templates/layout.html` |
| Design: styles | `assets/site.css` (kit defaults, then the "nursery confetti" theme block at the bottom) |
| Site-specific blocks: `shelf` (product checklists by age, optional `link` + `cta` + `guide`) and `resources` (verified outside experts/helplines) | `tools/blocks.js` |
| Self-hosted partner banners | `assets/img/partners/` |
| Generated output (don't edit by hand) | `index.html`, `*/index.html`, `sitemap.xml`, `robots.txt`, `404.html`, `search/` |

## Pages (35)
Home · ages (hub) · newborn (0–3m) · baby (3–12m) · toddler (1–3) · preschool (3–5) · school-age (5–8) · big-kids (8–12) · feeding (hub) + feeding/breastfeeding, feeding/formula-and-bottle-feeding, feeding/starting-solids · sleep (hub, sleep-by-age chart) + sleep/safe-sleep (cot diagram) · milestones (timeline) · health (hub) + health/fever-in-babies-and-children · safety/car-seats (stages diagram) · safety/childproofing · care (hub) + care/nappy-changing, care/bathing-your-baby, care/teething, care/potty-training · gear · play-and-learning · baby-diary (printable log; menus hide when printed) · resources (official sources, helplines, real creators) · how-we-write (editorial standards, linked from the byline bar) · blog + 5 posts (tog-ratings-explained, hospital-bag-checklist, first-week-with-a-newborn, colic-signs-and-soothing, winter-baby-care).
Top menu (navOrder): By age, Feeding, Sleep, Milestones, Health, Care, Baby gear, Blog. Play, Diary and Resources are in the footer and linked in content.

## Design: "nursery confetti"
Cream pages #FFF8F2, deep grape ink/hero #2A2350 → #3D2F73 with confetti dots and a wavy bottom edge, bubblegum pink actions #FF7EB6 (hover #E7559A, soft #FFE6F1), age colours sky #7CC6FE, sunshine #FFD166, mint #6FDDB8, lilac #B9A6FF, peach #FFAD86 (each with a soft tint), links #B8236A. Baloo 2 headings + Nunito body (`seo.fontsUrl`). Logo = tilted pink rounded square with a smiling baby face + "Silly**Baby**" (Baby in pink); favicon = same mark. Footer is grape with a wavy top. Visual order on every page (CSS `order`): content → shelves/partner offers → FAQs/sources → related → search band. Diagrams are inline SVG in `<figure class="diagram">` (scroll sideways on phones); other helpers: `ul.ladder` (age timeline), `div.cards-3 > .mini.pink|sky|sun|mint|lilac|peach`, `p.callout` (+ `.tip`, `.warn`), `div.table-wrap`. Checked at 375px and 1280px (no horizontal scroll).
**Photos:** free-licence Unsplash images (not Unsplash+), credited in each page's "image". The safe-sleep page uses an empty bassinet on purpose: never use photos showing unsafe sleep (pillows, toys, bumpers, tummy sleeping).

## Content rules for this site
- YMYL (health of babies): every health, feeding, sleep and safety fact comes from official sources (NHS, NICE, CDC, AAP/HealthyChildren.org, WHO, NIH Safe to Sleep, The Lullaby Trust, GOV.UK, NHTSA, CPSC, CAPT, RoSPA, AASM, NSF), listed in each page's `sources`. Point readers to their midwife, health visitor, GP, paediatrician, NHS 111 or 999/911/112. Footer carries the "not medical advice" notice.
- Never give vaccine schedule details (they change): link the NHS and CDC schedules instead.
- No invented products, prices, reviews, statistics or testimonials. Byline = "the SillyBaby editorial team" + "Checked against NHS, CDC and AAP guidance" (`seo.checkedText`); never invent named experts.
- Resources page lists only real, verified organisations and creators (official websites checked 2026-11-18: PedsDocTalk, Solid Starts, Good Inside, Big Little Feelings, Taking Cara Babies, Busy Toddler, Happiest Baby, KellyMom, Basis, ICON, PANDAS, PSI, La Leche League, National Breastfeeding Helpline). Re-check before adding more.
- UK + US wording: nappy/diaper, dummy/pacifier, cot/crib, pram/stroller, mum/mom.

## Affiliate partners
- **Kaiya Baby** (CJ advertiser 8022425, joined; added 2026-11-18). Baby/toddler sleep sacks, swaddles and clothes (organic cotton, camel wool). 12% of sales, 30-day cookie; ~97% of conversions are US. Terms: no "Kaiya" in our domains/URLs (slugs and images `cj8022425-*`), no brand bidding or direct linking from paid search, logos only unaltered and never implying we're official; coupons only from the programme or public. Copy says "check delivery to your country at checkout" (shipping beyond the US not confirmed).
- CJ property **SillyBaby | Baby & Child Care Guides, PID 101932353** (created 2026-11-18, Content/Blog/Media primary). All codes generated there: evergreen `cj8022425-home` (link 17342824, featured), deep links via the same evergreen link to sleep-sacks, swaddle, guide (sleep sack selection guide), walker, bodysuits; DEAL10 offers (10% off with code DEAL10, links 17347377/17347378/17347380) `cj8022425-deal10-sleep|bodysuits|best`, `expires` 2027-02-27 with `then` fallbacks; banners `cj8022425-b-designed-886` (886x443, desktop) + `cj8022425-b-nights-686` (686x572, mobile), self-hosted PNGs. No 728x90/300x250 exists for this advertiser.
- **Not used:** banners 17342328 (sleeping baby on a pillow), 17342336 (soft toy in the cot) and 17342339 (baby asleep on its tummy on an adult bed): they contradict safe-sleep advice. Never place them.
- Placed: home (partner card + DEAL10 best sellers), newborn/baby/sleep/safe-sleep/gear shelves (sleep sacks), sleep hub banner, safe-sleep button + swaddle link, toddler walker link, offers on sleep/safe-sleep/newborn/baby/gear/TOG/hospital-bag posts, TOG post (guide link, banner, button), winter post (sleep sacks), hospital bag (bodysuits), first week (swaddles).
- More partners wanted: nappies/diapers, prams/car seats (only R129/FMVSS 213 stock), feeding kit, toys/books, kids' clothing. Every shelf card already accepts `"link"` + `"cta"`.

## Blog, social and diary
- Starter posts are dated 10–18 Nov 2026. Add SillyBaby to a weekly blog routine (`shmor-ai/tools/blog-routine/PROMPT.md`) once the repo is on GitHub; posts must stay official-source only and keep any partner placement safe-sleep compliant.
- Social posts (Buffer: Facebook, X, LinkedIn) and the "Shmor.ai social posts" calendar diary pick up SillyBaby automatically once it is `live` (they read `network-index.json`, which now lists live sites only). Until launch it stays out of Shmor Daily, the weekly email and other sites' network boxes.

## Going live (only when the user says "launch")
1. `shmor-site.json` → `"status": "live"`, rebuild, `node tools/sync-network.js` + `node tools/rebuild-all.js` in `../../shmor-ai`.
2. GitHub: make the repo public, Pages from `main` / root, custom domain `sillybaby.shmor.ai` (CNAME file is already here), enforce HTTPS.
3. DNS (never touch MX/SPF): CNAME `sillybaby` → `shmorai.github.io`.
4. Google Search Console (youtube@shmor.ai): open https://search.google.com/search-console/sitemaps?resource_id=https%3A%2F%2Fsillybaby.shmor.ai%2F → "Verify your ownership" (auto via `sc-domain:shmor.ai`) → submit `sitemap.xml`; request indexing for the homepage, safe-sleep, starting-solids and milestones. Then Bing Webmaster Tools → Import from GSC, and `node --use-system-ca tools/indexnow.js` in shmor-ai after pushing.

## Commands (run here)
```bash
node tools/build.js           # rebuild after ANY change to content/, templates/, tools/blocks.js or shmor-site.json
node tools/serve.js 4025      # local preview (the "sillybaby" preview config / shmor serve.js on port 4025)
```
After changing `shmor-site.json`, also run `node tools/sync-network.js` in `../../shmor-ai`, then commit both repos.
