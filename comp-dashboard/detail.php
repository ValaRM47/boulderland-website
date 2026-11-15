<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>اطلاعات مسابقه | بلدرلند کاپ</title>
<meta name="description" content="مرکز اطلاعات مسابقات سنگ‌نوردی بلدرلند کاپ؛ برنامه زمان‌بندی، ویدیو مسیرها، استارت‌لیست و نتایج." />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@100;300;400;500;600;700;800;900&family=Anton&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="/assets/css/global.css" />
<link rel="stylesheet" href="/assets/css/header.css" />
<link rel="stylesheet" href="/assets/css/footer.css" />
<link rel="stylesheet" href="/assets/css/detail.css" />
</head>
<body>

<!-- ============ NAV ============ -->
<?php $PAGE = 'comps'; include $_SERVER['DOCUMENT_ROOT'] . '/components/header.php'; ?>

<!-- ============ HERO ============ -->
<section class="hero">
  <div class="wrap">
    <span class="eyebrow"><span class="dot"></span> بلدرلند کاپ ۱۴۰۴</span>
    <h1>اطلاعات <span class="accent">مسابقه</span></h1>
    <p>هر آنچه برای روز مسابقه نیاز داری، یک‌جا. بخش موردنظرت را انتخاب کن.</p>
  </div>
</section>

<!-- ============ HUB ============ -->
<section class="hub">
  <div class="wrap">
    <div class="hub-grid">

      <a class="hub-card reveal" href="timetable.php">
        <span class="hub-ico"><svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg></span>
        <span class="t"><b>برنامه زمان‌بندی</b><span>ساعت پذیرش، مسابقه و فینال رده‌ها</span></span>
        <span class="hub-ar"><svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="m12 5-7 7 7 7"/></svg></span>
      </a>

      <a class="hub-card reveal" href="videos.php">
        <span class="hub-ico"><svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2.5"/><path d="m10 9 5 3-5 3z"/></svg></span>
        <span class="t"><b>ویدیو مسیرها</b><span>نمایش مسیرهای هر رده‌ی سنی</span></span>
        <span class="hub-ar"><svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="m12 5-7 7 7 7"/></svg></span>
      </a>

      <a class="hub-card reveal" href="start-list.php">
        <span class="hub-ico"><svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg></span>
        <span class="t"><b>استارت‌لیست</b><span>فهرست شروع شرکت‌کنندگان</span></span>
        <span class="hub-ar"><svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="m12 5-7 7 7 7"/></svg></span>
      </a>

      <a class="hub-card reveal" href="results.php">
        <span class="hub-ico"><svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M8.5 13 7 22l5-3 5 3-1.5-9"/></svg></span>
        <span class="t"><b>نتایج</b><span>نتایج و رده‌بندی نهایی مسابقه</span></span>
        <span class="hub-ar"><svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="m12 5-7 7 7 7"/></svg></span>
      </a>

      <a class="hub-card hub-featured reveal" href="https://boulderland.ir" target="_blank" rel="noopener">
        <span class="hub-ico"><svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20"/></svg></span>
        <span class="t"><b>وبسایت بلدرلند</b><span>بازگشت به سایت اصلی باشگاه سنگ‌نوردی بلدرلند</span></span>
        <span class="hub-ar"><svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7"/><path d="M8 7h9v9"/></svg></span>
      </a>

    </div>
  </div>
</section>

<!-- ============ FOOTER ============ -->
<?php include $_SERVER['DOCUMENT_ROOT'] . '/components/footer.php'; ?>

<script src="/assets/js/main.js" defer></script>
<script src="/assets/js/detail.js" defer></script>
</body>
</html>
