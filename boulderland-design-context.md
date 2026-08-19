# Boulderland Design System — Context for Claude

> Paste this whole file into Claude (as the first message, Project knowledge, or custom instructions) before asking it to design or build any Boulderland page, section, or component. It is self-contained and directive. Follow it exactly; do not invent tokens or drift from the rules.

## ROLE

You are designing/coding for **Boulderland (بلدرلند)** — Iran's largest indoor climbing gym. The aesthetic is **bold, editorial, "award-site", athletic, warm-premium**. Output must be **Farsi, right-to-left (RTL)**, and match the existing system below pixel-for-feel.

## HARD CONSTRAINTS (never violate)

- **Single static HTML file.** All CSS in one `<style>`, all JS in vanilla `<script>`. **No frameworks, no build step, no Tailwind, no React.** Fonts via Google Fonts CDN only.
- **RTL always:** `<html lang="fa" dir="rtl">`. Use **logical properties** (`inset-inline-*`, `margin-inline`, `padding-inline`, `scroll-padding-inline`) — never physical `left`/`right`. Remember: **in RTL flexbox, `flex-start` = physical RIGHT**.
- **Use the design tokens only.** Never introduce new hex colors (one allowed exception: `#e8862f` orange, reserved for the map/utility button). Borders = sand at low alpha.
- **Respect `prefers-reduced-motion`** — every animation must degrade to none.
- Farsi numerals (۰۱۲۳۴۵۶۷۸۹) in all UI numbers; Farsi thousands separators (٬) in prices; `font-variant-numeric:tabular-nums` where digits align.

## COPY-PASTE BOILERPLATE (use verbatim as the base of any new page)

```html
<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@100;300;400;500;600;700;800;900&family=Anton&display=swap" rel="stylesheet" />
<style>
:root{
  --sand:#e7ad72;      /* accent: CTAs, tags, numbers, hairlines */
  --forest:#3c4b48;    /* card surfaces / alt bg */
  --moss:#3f6356;      /* secondary alt bg */
  --cream:#e2c2a1;     /* body text on dark */
  --ink:#202927;       /* base bg / darkest sections */
  --white:#fdfbf7;     /* headings */
  --radius:22px;
  --ease:cubic-bezier(.22,1,.36,1);
  --maxw:1320px;
}
*{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth}
body{font-family:'Vazirmatn',system-ui,sans-serif;background:var(--ink);color:var(--cream);line-height:1.7;overflow-x:hidden;-webkit-font-smoothing:antialiased}
a{color:inherit;text-decoration:none}
img{display:block;max-width:100%}
section{position:relative}
.wrap{max-width:var(--maxw);margin:0 auto;padding:0 clamp(20px,5vw,64px)}
::selection{background:var(--sand);color:var(--forest)}
.display{font-family:'Anton',sans-serif;font-weight:400;letter-spacing:.5px}
@media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}html{scroll-behavior:auto}}
</style>
</head>
<body>
<!-- content -->
</body>
</html>
```

## TOKENS (JSON, for reference/tooling)

```json
{
  "color": {
    "sand":   "#e7ad72",
    "forest": "#3c4b48",
    "moss":   "#3f6356",
    "cream":  "#e2c2a1",
    "ink":    "#202927",
    "white":  "#fdfbf7",
    "orangeUtility": "#e8862f"
  },
  "textMuted":  "rgba(246,237,225,0.7)",
  "textMutedStrong": "rgba(246,237,225,0.85)",
  "hairline":   "rgba(231,173,114,0.16)",
  "hairlineStrong": "rgba(231,173,114,0.5)",
  "radius":     { "card": "22px", "modal": "26px", "ctaBox": "34px", "pill": "99px" },
  "easing":     "cubic-bezier(.22,1,.36,1)",
  "container":  "1320px",
  "gutter":     "clamp(20px,5vw,64px)",
  "sectionPadY":"clamp(90px,12vw,150px)",
  "font": { "body": "Vazirmatn", "display": "Anton" },
  "shadow": {
    "card":  "0 30px 60px -30px rgba(0,0,0,.55)",
    "float": "0 20px 50px -15px rgba(0,0,0,.5)",
    "sandGlow": "0 12px 30px -10px rgba(231,173,114,.6)"
  }
}
```

## COLOR RULES

- **6 tokens only.** Accent = `--sand`. Surfaces/backgrounds = `--forest` / `--moss` / `--ink`. Text = `--cream` (muted via `rgba(246,237,225,.7–.85)`). Headings = `--white`.
- **All borders/dividers = sand at low alpha** (`rgba(231,173,114,.14 / .16 / .2 / .35 / .5)`).
- **Section background rhythm:** cycle `forest → ink → moss`, and interrupt with a **sand block** for punctuation (marquee, featured card, CTA). Sand blocks invert to `--forest` text.
- On a sand surface, text/icons are `--forest`.

## TYPOGRAPHY RULES

- Family: **Vazirmatn** everything. **Anton** only via `.display` for large stat numbers.
- Headings: `--white`, weight **800–900**, tight tracking (−1 to −2px), short lines that break early.
- Body: muted cream, weight **300**.
- Labels/eyebrows: `--sand`, weight **700**, **UPPERCASE**, `letter-spacing:2px`, often preceded by a 40px sand rule.
- Lead paragraph: `--sand`, weight 600.
- Fluid sizes (`clamp`): Hero H1 `clamp(52px,10vw,148px)/line-height .92`; Section H2 `clamp(34px,5.5vw,72px)/1`; CTA H2 `clamp(34px,6vw,80px)`; card H3 `clamp(22px,2.6vw,34px)`; body 15–18px.
- Heading accents: wrap a word in `.accent` (sand) or `.stroke` (`color:transparent;-webkit-text-stroke:2px var(--sand)`); `em` inside a heading = sand, non-italic.

## LAYOUT & SHAPE

- Container `.wrap` (1320px, gutter `clamp(20px,5vw,64px)`). Section padding `clamp(90px,12vw,150px)`.
- Radius **22px** cards, **99px** pills, 26–34px modal/CTA.
- Bento grids: walls = `repeat(12,1fr)` with `.span-N`; gallery = `repeat(6,1fr)` `grid-auto-rows:130px` tiles spanning 2×2–3.
- Shadows: soft, large, downward, low-opacity (see JSON). Colored glow only under sand buttons.

## MOTION

- One easing: `var(--ease)`.
- Scroll-reveal: `.reveal{opacity:0;transform:translateY(38px)} .reveal.in{opacity:1;transform:none}` via IntersectionObserver, staggered by index.
- Hover: cards **lift** `translateY(-8px..-10px)`; images **zoom** `scale(1.05–1.08)` over .6–.8s; round icon buttons fill sand; nav underline grows from `inset-inline-end`.
- Fixed nav turns glassy on scroll (`rgba(32,41,39,.82)` + `blur(14px)`).

## COMPONENT RECIPES (reuse these classes/markup)

**Buttons**
```css
.btn{display:inline-flex;align-items:center;gap:9px;cursor:pointer;border:none;font-family:inherit;font-weight:700;font-size:15px;padding:13px 26px;border-radius:99px;transition:transform .25s var(--ease),background .25s,color .25s,box-shadow .25s}
.btn svg{width:17px;height:17px}
.btn-primary{background:var(--sand);color:var(--forest)}
.btn-primary:hover{background:var(--cream);box-shadow:0 12px 30px -10px rgba(231,173,114,.6)}
.btn-ghost{background:transparent;color:var(--cream);border:1.5px solid rgba(231,173,114,.5)}
.btn-ghost:hover{background:var(--sand);color:var(--forest);border-color:var(--sand)}
```

**Section header**
```css
.sec-tag{font-size:14px;font-weight:700;color:var(--sand);letter-spacing:2px;text-transform:uppercase;display:flex;align-items:center;gap:12px;margin-bottom:18px}
.sec-tag::before{content:"";width:40px;height:2px;background:var(--sand)}
.sec-head h2{font-size:clamp(34px,5.5vw,72px);line-height:1;font-weight:900;color:var(--white);letter-spacing:-1px}
```
Markup: a `.sec-head` flex row with `.sec-tag` + `h2` on one side and a ≤420px supporting `<p>` on the other.

**Card (photo + scrim + meta)** — full-bleed `<img object-fit:cover>`, a bottom dark gradient scrim, a glassy top pill chip, and a meta block (kicker-with-icon → H3 → short desc). Hover: lift + image zoom.

**Round icon button** — 52px circle, `border:1.5px solid rgba(231,173,114,.5)`, `color:var(--sand)`; hover fills sand/forest.

## IMAGERY & ICONS

- Photos: real climbing/coach shots, **WebP**, `object-fit:cover`, `object-position:center` (portraits `center top`), subtle hover zoom. Over-image text needs a **gradient scrim**.
- Icons: inline **stroke SVG**, `stroke-width` 2–2.4, round caps/joins, `currentColor`, 24×24 viewBox. Lucide-style. No icon fonts. "Forward/next" arrows point **left** (RTL).

## ACCESSIBILITY

- `aria-label` on icon-only buttons; landmarks on nav; `role="img"`+label on decorative image containers; visually-hidden labels for inputs; modal = `role="dialog"` + `aria-modal` + Esc/backdrop close + scroll lock.
- Keep muted body text ≥ `.7` alpha; sand-on-moss only for large text; headings stay white/cream on dark.

## VOICE (for any copy you generate)

Farsi, motivational, second-person informal ("تو"), story-driven, concise. Headlines short and punchy, often two lines. Example vibe: «اینجا هر صعود، یک داستان تازه است».

## ALWAYS / NEVER

- ALWAYS: use tokens; keep the forest/ink/moss + sand-flash rhythm; white 800–900 headings + cream 300 body + sand uppercase labels; 22px cards, pill buttons, lift+zoom hovers, one easing; add `.reveal`; logical RTL properties; scrims over image text; stroke SVG icons.
- NEVER: new hex colors (except `#e8862f` utility); physical left/right; frameworks/build tools; icon fonts; light text under `.7` alpha on dark; animations that ignore reduced-motion; Latin numerals in UI.
