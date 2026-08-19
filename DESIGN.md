# Boulderland (بلدرلند) — Design Language & Design System

Reference for anyone continuing the design of the site. The canonical source of truth is `index.html` (the home page) — a single, framework-free static file with all CSS in one `<style>` block and all JS in one `<script>`. Match this document to keep new pages coherent with the existing look.

---

## 1. Brand & Voice

- **Who:** Boulderland — positioned as the largest indoor climbing gym in Iran ("بزرگ‌ترین مرکز سنگ‌نوردی داخل سالن ایران").
- **Personality:** bold, energetic, premium-but-warm, editorial/"award-site" feel. Athletic, aspirational, human.
- **Language:** Farsi, **RTL** (`<html lang="fa" dir="rtl">`).
- **Copy voice:** motivational, second-person informal ("تو")، story-driven ("اینجا هر صعود، یک داستان تازه است"). Headlines are short, punchy, emotive and often break to a second line. Body copy is calm and reassuring. Farsi numerals everywhere (۰۱۲۳۴۵۶۷۸۹).

---

## 2. Color Tokens

Defined as CSS custom properties on `:root`. **Always use the token, never a raw hex** (except the one documented exception).

| Token | Hex | Role |
|-------|-----|------|
| `--sand` | `#e7ad72` | Primary **accent** — CTAs, section tags, highlights, numbers, active states, hairlines (at low alpha) |
| `--forest` | `#3c4b48` | Deep charcoal-green — card surfaces, alternating section background |
| `--moss` | `#3f6356` | Secondary green — alternating section background, CTA box |
| `--cream` | `#e2c2a1` | Warm light — default text color on dark surfaces |
| `--ink` | `#202927` | Darkest — page/base background, darkest sections |
| `--white` | `#fdfbf7` | Headings (h1/h2/h3) |

**Derived / alpha usages (conventions):**
- Muted body text: `rgba(246,237,225,.7–.85)` (a near-cream white), lighter = lower emphasis.
- Hairlines, borders, dividers: **sand at low alpha** → `rgba(231,173,114,.14 / .16 / .2 / .35 / .5)`.
- Subtle surface tints: `rgba(226,194,161,.05–.1)` (cream) or `rgba(32,41,39,.4–.82)` (ink) for glass/overlays.
- `::selection` → sand background, forest text.

**One documented exception:** the "view on map" button in the visit modal is `#e8862f` (bright orange). It is intentionally off-palette to read as an external/utility action. Don't introduce other off-palette colors without a similar rationale.

### Section background rhythm (important)
The page alternates dark surfaces, with **sand used as a periodic "flash"**. Keep this cadence when adding sections:

```
Hero        → photo + ink scrim
Marquee     → SAND band (inverted: forest text on sand)
Intro       → forest
Walls       → ink
Coaches     → moss
Programs    → forest
Gallery     → ink
Membership  → moss
CTA         → ink page, MOSS box
Footer      → forest
```
Rule of thumb: cycle **forest → ink → moss**; interrupt with a **sand** block (marquee, featured plan, CTAs) for punctuation.

---

## 3. Typography

Two families, loaded from Google Fonts:
- **Vazirmatn** — everything (Farsi body + headings). Weights 100–900 available.
- **Anton** — Latin display face, used only via the `.display` class for big numeric/stat displays (e.g. `۱۲۰۰`, program index `۰۱`). ⚠️ Anton is Latin-only, so Farsi digits fall back to Vazirmatn — it mainly contributes letter-spacing/feel here.

Base: `line-height:1.7`, `-webkit-font-smoothing:antialiased`.

### Type scale (all fluid via `clamp()`)
| Use | Size | Weight | Notes |
|-----|------|--------|-------|
| Hero H1 | `clamp(52px,10vw,148px)` | 900 | `line-height:.92`, `letter-spacing:-2px`, white |
| Section H2 | `clamp(34px,5.5vw,72px)` | 900 | `line-height:1`, `letter-spacing:-1px`, white |
| Intro H2 | `clamp(30px,4.5vw,56px)` | 800 | |
| CTA H2 | `clamp(34px,6vw,80px)` | 900 | |
| Card H3 (walls) | `clamp(22px,2.6vw,34px)` | 900 | |
| Card H3 (coach/plan) | ~23px | 800 | |
| Lead paragraph | `clamp(19px,2.4vw,26px)` | 600 | **sand** colored |
| Body | 15–18px | **300** (light) | muted cream |
| Section tag / eyebrow | 14px | 700 | sand, `letter-spacing:2px`, UPPERCASE, 40px leading rule |
| Small labels / kickers | 11–13px | 700–800 | UPPERCASE, wide tracking |

### Heading treatments
- **`.accent`** → colors a word `--sand` (e.g. «<span class=accent>حرفه‌ای</span>»).
- **`.stroke`** → transparent fill + `-webkit-text-stroke:2px var(--sand)` (outline text, used on the trailing period of the hero H1).
- **`em` inside headings** → recolored to sand, `font-style:normal` (used as an accent, not italic).

**Weight logic:** headings 800–900 · body 300 · labels/tags/prices 700–900. **Spacing logic:** negative tracking on big headings (−1 to −2px), wide positive tracking on small uppercase labels (+1 to +3px).

---

## 4. Spacing, Layout & Shape

- **Container:** `.wrap` → `max-width:1320px` (`--maxw`), `padding:0 clamp(20px,5vw,64px)`, centered. The clamp value `clamp(20px,5vw,64px)` is the standard page gutter — reuse it for full-bleed→content alignment (e.g. carousels negate it with `margin-inline`).
- **Section vertical padding:** standard `clamp(90px,12vw,150px)`; lighter sections (gallery, CTA) `clamp(70px,10vw,120px–130px)`.
- **Radius:** `--radius:22px` for cards/surfaces. Larger: modal 26px, CTA box 34px. **Pills** (buttons, chips, tags) = `border-radius:99px`.
- **Grid systems used:**
  - Walls: **12-column** bento (`repeat(12,1fr)`, gap 22px), children use `.span-7/.span-5/.span-4/.span-8/.span-6/.span-12`.
  - Gallery: **6-column** bento, `grid-auto-rows:130px`, tiles span 2 cols × 2–3 rows.
  - Intro: 2-col `1.1fr .9fr`.
  - Programs: list rows `grid-template-columns:80px 1.4fr 2fr auto`.
  - Membership: pricing `1.45fr .85fr`; plans `repeat(3,1fr)`.
  - Footer: `1.6fr 1fr 1fr 1.4fr`.
- **Gaps:** 18–24px inside grids; 40–60px between major blocks.
- **Shadows:** soft, large, low-opacity, downward — e.g. `0 30px 60px -30px rgba(0,0,0,.55)`, `0 20px 50px -15px rgba(0,0,0,.5)`. Colored glow only for sand buttons: `0 12px 30px -10px rgba(231,173,114,.6)`.

---

## 5. Motion & Interaction

- **Single easing everywhere:** `--ease: cubic-bezier(.22,1,.36,1)` (smooth ease-out). Use it for all transitions.
- **Reveal on scroll:** `.reveal` starts `opacity:0; translateY(38px)` → gets `.in` (`opacity:1; transform:none`) via `IntersectionObserver` (`threshold:.12`, `rootMargin:0 0 -60px 0`, unobserve after). Staggered by DOM index (`i%4 * .06s`). **Add `.reveal` to new blocks you want animated in.**
- **Hover vocabulary:**
  - Cards **lift**: `translateY(-8px to -10px)`.
  - Images **zoom**: `scale(1.05–1.08)`, `transition .6–.8s`.
  - Buttons: primary sand→cream + glow; ghost outline→sand fill.
  - Round icon buttons (52px): sand outline @.5 → fill sand on hover; program arrow also `rotate(-45deg)`.
  - Nav links: sand underline grows from `inset-inline-end`.
  - List rows (programs, price rows): `padding-inline` grows slightly on hover (inset nudge).
- **Nav:** `position:fixed`, transparent at top; on `scroll>40px` JS toggles `.scrolled` → `rgba(32,41,39,.82)` bg, `backdrop-filter:blur(14px)`, reduced padding, sand hairline bottom.
- **Marquee:** infinite horizontal loop (`26s linear`, `translateX(50%)`), pauses on hover; sand band with forest text and rotated-square separators. `aria-hidden`.
- **Hero eyebrow dot:** `pulse` keyframe.
- **`prefers-reduced-motion`:** globally kills animations/transitions, disables reveal offset, turns off smooth scroll. **Preserve this** — any new animation must degrade here.

---

## 6. Component Library

**Buttons** (`.btn` base: pill, weight 700, `13px 26px`, icon 17px + label)
- `.btn-primary` → sand bg / forest text (hover: cream + glow).
- `.btn-ghost` → transparent, cream text, sand outline (hover: sand fill / forest text).
- `.btn-map` → orange, modal only.

**Eyebrow pill** (`.hero-eyebrow`) — outlined pill, sand text, pulsing dot; used above the hero H1.

**Section header** (`.sec-head`) — flex row: left = `.sec-tag` (with 40px leading rule) + H2; right = a ≤420px supporting paragraph. Wraps on small screens.

**Cards**
- **Wall card** — full-bleed photo + bottom dark gradient scrim + `.wall-meta` (kicker w/ icon → H3 → desc) + glassy top chip `.wall-chip`. Hover lift + zoom. Laid out in the 12-col bento.
- **Coach card** — 4:5 photo, `.coach-body` (role eyebrow → name H3 → short bio), corner `.tag-lvl` sand pill. Lives in a horizontal **snap carousel** (3 visible desktop / 2 tablet / 1 mobile), scrollbar hidden, round arrow controls.
- **Plan card** — forest surface; `.featured` variant = sand fill + `scale(1.03)`; big price number, feature list with sand check icons, full-width button, `.featured-badge`.
- **Price list** (`.price-list` rows) + **`.price-hero`** sand block for the free-entry highlight.

**Stat block** (`.intro-stats`) — big sand `.num.display` (Anton) + small label; `sup` for م² exponent.

**Program row** (`.prog`) — Anton index → title → desc → round arrow; hover inset + arrow rotate.

**Modal** (`.modal-overlay` / `.modal-card`) — centered dialog, blurred backdrop, forest card, icon circle, close button at `inset-inline-start`, primary action. Opened by any `[data-visit]` trigger; closes on Esc / backdrop; locks body scroll. Proper `role="dialog"`, `aria-modal`.

**Footer** — brand + blurb + rounded-square social icons, link columns, newsletter (input + arrow button), address/phone, bottom legal bar.

**Marquee band** — see Motion.

**Image placeholder system** (`.img-slot`) — dev scaffold: diagonal-hatch + moss→forest gradient, centered icon + shape label + dimension pill + corner hint. Aspect helpers: `.ar-square`(1:1) `.ar-portrait`(4:5) `.ar-tall`(3:4) `.ar-land`(16:9) `.ar-wide`(21:9) `.ar-hero`. **These are placeholders — real photos should fully replace them** (see Known Issues).

---

## 7. RTL Conventions (must-follow)

- Document is `dir="rtl"`. **Use logical properties**: `inset-inline-start/end`, `margin-inline`, `padding-inline`, `scroll-padding-inline`. Avoid physical `left`/`right`.
- **Flexbox gotcha:** in RTL, `flex-start` = physical **RIGHT**, `flex-end` = physical **LEFT**. Verify visually, not by intuition.
- **Directional arrows:** "forward/next" arrows point **left** (RTL reading direction) — e.g. paths `M19 12H5` + `m12 5-7 7 7 7`.
- **Numerals:** Farsi digits throughout; prices use Farsi thousands separators (`،` / `٬`). Use `font-variant-numeric:tabular-nums` where digits must align.

---

## 8. Imagery & Iconography

- **Photos:** real climbing/action + coach portraits, hosted on `boulderland.ir/wp-content/uploads/...` as **WebP** (a few PNG). `object-fit:cover`; `object-position:center` (coaches use `center top`). Subtle zoom on hover.
- **Hero image:** full-bleed `object-fit:cover` + bottom-weighted gradient **scrim** (`.hero-scrim`) for text legibility.
- **Coach photos:** 4:5 portrait ratio, framed to the face at the top.
- **Icons:** inline **SVG**, stroke-based (`stroke-width` ~2–2.4, round caps/joins, `currentColor`), 24×24 viewBox, rendered 16–30px. Lucide-style. No icon fonts.

---

## 9. Accessibility

- Icon-only buttons have `aria-label`; nav uses landmarks; decorative/placeholder image containers use `role="img"` + label; newsletter has a visually-hidden `<label>`; marquee and modal use `aria-hidden` (toggled).
- Modal: `role="dialog"`, `aria-modal`, Esc + backdrop close, focus target, scroll lock.
- `prefers-reduced-motion` fully respected.
- **Watch:** sand text on moss is lower-contrast (use for large text only); keep muted body text ≥ `.7` alpha; headings should stay white/cream on dark.

---

## 10. Information Architecture

Section order & anchors (single-page home):
```
NAV (fixed) → HERO → MARQUEE → INTRO(#about) → WALLS(#walls) →
COACHES(#coaches) → PROGRAMS(#programs) → GALLERY → MEMBERSHIP(#membership) →
CTA → FOOTER(#contact)
```
Nav links: دیواره‌ها · مربیان · برنامه‌ها · عضویت · تماس. Primary nav CTA: «مشاهده دیواره ها».

Current pricing (subject to change): ده جلسه ۱۰٬۰۰۰٬۰۰۰ · هشت جلسه ۸٬۵۰۰٬۰۰۰ · چهار جلسه ۶٬۰۰۰٬۰۰۰ · یک جلسه ۲٬۰۰۰٬۰۰۰ · ورودی آزاد ۵۰۰٬۰۰۰ (تومان).
Contact: تهران، سعادت‌آباد، خیابان داوود رشیدی، مجموعه ورزشی بلدرلند · ۰۹۱۲۵۱۲۳۸۷۰.

---

## 11. Tech Constraints

- **Single static HTML file**, no framework, no build step. All CSS inline in one `<style>`, all JS in one vanilla `<script>`. Google Fonts via CDN link.
- Deployed on WordPress/IranHost as the site `index.html` (served over `index.php` via DirectoryIndex). Keep everything self-contained and framework-free.
- Sibling pages exist and share this language: `coach-single/` (coach profile), `workshop/`, `timetable.html`, `climbers.html` (Google-Sheets-driven table). Reuse the same tokens, nav, footer, and component patterns.

---

## 12. Known Issues / Cleanup Backlog

- **Gallery** mixes finished `.gallery-photo` tiles with leftover `.img-slot` dev placeholders that now contain real `<img>`s → inconsistent object-fit (`fill` on img-slot vs `cover`). Also the `g5` grid class is **duplicated** and `g4` is missing. Normalize all gallery tiles to `.gallery-photo`.
- A few wall cards still wrap real photos in the `.img-slot` placeholder rather than `.wall-photo`.
- `.display` (Anton) on Farsi numerals silently falls back to Vazirmatn.
- Some inline `style="…"` overrides exist (e.g. the free-entry button recolor) — prefer promoting repeated ones to classes.

---

## 13. Quick "keep-it-on-brand" checklist for new work

1. Use the **6 tokens**; borders = sand at low alpha; don't invent colors.
2. Respect the **forest / ink / moss** background rhythm with a **sand** flash for emphasis.
3. Headings **white, 800–900, tight tracking**; body **cream, 300**; labels **sand, uppercase, wide tracking**.
4. Cards: **22px radius**, **pill** buttons/tags, **lift + image-zoom** on hover, one **easing**.
5. Add `.reveal` for scroll-in; make it degrade under `prefers-reduced-motion`.
6. RTL: logical properties only; remember `flex-start = right`.
7. Photos WebP, `cover`, with a scrim when text sits over them.
8. Icons: inline stroke SVG, round caps, `currentColor`.
```
