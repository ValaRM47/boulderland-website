# Boulderland — site structure

Static, framework‑free site. Shared chrome (header/footer) is injected with **PHP includes**, so pages are `.php`. Styles/scripts are split into a reusable `global` layer plus per‑page files.

```
index.php                 ← home page
components/
  header.php              ← shared site header + mobile menu
  footer.php              ← shared site footer
coaches/                  ← reserved (empty for now)
assets/
  css/
    global.css            ← design tokens, base, utilities (buttons, .reveal, sec-head, img-slot) — linked on EVERY page
    header.css            ← header / nav
    footer.css            ← footer
    home.css              ← home only
    courses.css           ← دوره‌ها page only
    detail.css results.css start-list.css timetable.css videos.css   ← comp-dashboard pages
  js/
    main.js              ← site-wide (header scroll, mobile menu, reveal) — linked on EVERY page
    home.js courses.js detail.js results.js start-list.js timetable.js videos.js  ← per page
Courses/
  index.php              ← دوره‌های بلدرلند
comp-dashboard/
  detail.php results.php start-list.php timetable.php videos.php
Misc/                     ← everything else, parked for now (old coach pages, images, drafts, DESIGN.md …)
```

## How the shared header/footer work

Every page sets an optional `$PAGE` (for the active nav link) and includes the components:

```php
<?php $PAGE = 'home'; include $_SERVER['DOCUMENT_ROOT'] . '/components/header.php'; ?>
...page content...
<?php include $_SERVER['DOCUMENT_ROOT'] . '/components/footer.php'; ?>
```

`$PAGE` values used for highlighting: `home`, `courses`, `comps`.

## Path convention

Assets and nav links are **root‑relative** (`/assets/css/global.css`, `/Courses/`, `/comp-dashboard/results.php`). This works when the site is served from the **web root** (e.g. `public_html`). The PHP includes use `$_SERVER['DOCUMENT_ROOT']`, which resolves from the web root regardless of a page's depth.

> If you deploy into a **sub‑folder** instead of the web root, change the two include lines to a relative path (e.g. `include __DIR__ . '/components/header.php';`) and prefix the asset/nav paths with the sub‑folder.

## Local preview

PHP must run for the includes to render:

```bash
php -S localhost:8000
```

Then open `http://localhost:8000/`. (A plain static server will serve the `.php` files without executing the includes.)

## Notes

- The home page's CSS/JS were extracted out of the old monolithic `index.html` into the files above; `index.html` and the old `comp-dashboard/*.html` were replaced by their `.php` equivalents.
- The comp‑dashboard pages now use the **shared** header/footer (their old minimal nav was removed).
- The **Courses** page is intentionally left **without** the header/footer (per request). To add site chrome there, drop the same two include lines into `Courses/index.php` and link `header.css` + `footer.css`.
- Placeholder data (course list, testimonials, stats) still lives in `assets/js/courses.js`; registration buttons point to `#`.
