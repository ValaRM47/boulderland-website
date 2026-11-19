<?php $PAGE = $PAGE ?? ''; ?>
<!-- ================= SITE HEADER (shared) ================= -->
<header class="nav" id="nav">
  <div class="wrap nav-inner">
    <a href="/" class="brand" aria-label="بلدرلند، باشگاه سنگ‌نوردی">
      <span class="mark">
        <img src="https://boulderland.ir/wp-content/uploads/2026/07/logo.svg" alt="لوگوی بلدرلند" width="52" height="52" />
      </span>
    </a>
    <nav class="nav-links" aria-label="ناوبری اصلی">
      <a href="/"<?= $PAGE==='home'?' class="active"':'' ?>>خانه</a>
      <a href="/#walls">دیواره‌ها</a>
      <a href="/#coaches">مربیان</a>
      <a href="/courses/"<?= $PAGE==='courses'?' class="active"':'' ?>>دوره‌ها</a>
      <a href="/comp-dashboard/detail.php"<?= $PAGE==='comps'?' class="active"':'' ?>>مسابقات</a>
      <a href="/#contact">تماس</a>
    </nav>
    <div style="display:flex;align-items:center;gap:14px">
      <a class="btn btn-primary" href="/comp-dashboard/results.php">
        نتایج لید کاپ
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="m12 5-7 7 7 7"/></svg>
      </a>
      <button class="nav-toggle" id="navToggle" aria-label="باز کردن منو">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
      </button>
    </div>
  </div>
</header>

<!-- mobile menu -->
<div class="mobile-menu" id="mobileMenu">
  <button class="mobile-close" id="mobileClose" aria-label="بستن منو">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
  </button>
  <a href="/">خانه</a>
  <a href="/#walls">دیواره‌ها</a>
  <a href="/#coaches">مربیان</a>
  <a href="/courses/">دوره‌ها</a>
  <a href="/comp-dashboard/detail.php">مسابقات</a>
  <a href="/#contact">تماس</a>
</div>
