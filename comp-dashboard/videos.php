<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>ویدیو مسیرها | بلدرلند کاپ</title>
<meta name="description" content="ویدیوی مسیرهای مسابقات سنگ‌نوردی بلدرلند کاپ بر اساس رده سنی و جنسیت." />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@100;300;400;500;600;700;800;900&family=Anton&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="/assets/css/global.css" />
<link rel="stylesheet" href="/assets/css/header.css" />
<link rel="stylesheet" href="/assets/css/footer.css" />
<link rel="stylesheet" href="/assets/css/videos.css" />
</head>
<body>

<!-- ============ NAV ============ -->
<?php $PAGE = 'comps'; include $_SERVER['DOCUMENT_ROOT'] . '/components/header.php'; ?>

<!-- ============ HERO ============ -->
<section class="hero">
  <div class="wrap">
    <span class="eyebrow"><span class="dot"></span> بلدرلند لید کاپ ۱۴۰۵</span>
    <h1>ویدیو <span class="accent">مسیرها</span></h1>
    <p>رده‌ی سنی را انتخاب کن و با کلید بالای ویدیو میان پسران و دختران جابه‌جا شو.</p>
  </div>
</section>

<!-- ============ CONTENT ============ -->
<section class="content">
  <div class="wrap">
    <nav class="crumbs" id="crumbs" aria-label="مسیر انتخاب"></nav>
    <div id="view"></div>
  </div>
</section>

<!-- ============ FOOTER ============ -->
<?php include $_SERVER['DOCUMENT_ROOT'] . '/components/footer.php'; ?>

<script src="/assets/js/main.js" defer></script>
<script src="/assets/js/videos.js" defer></script>
</body>
</html>
