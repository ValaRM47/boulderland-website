<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>دوره‌های بلدرلند | ثبت‌نام دوره‌های سنگ‌نوردی</title>
<meta name="description" content="دوره‌های آموزشی سنگ‌نوردی باشگاه بلدرلند — از مقدماتی تا پیشرفته و مربیگری. مشاهده‌ی دوره‌ها، مدرسان، زمان شروع و ثبت‌نام." />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@100;300;400;500;600;700;800;900&family=Anton&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="/assets/css/global.css" />
<link rel="stylesheet" href="/assets/css/courses.css" />
</head>
<body>


<!-- ============ HERO ============ -->
<section class="hero">
  <div class="wrap">
    <span class="eyebrow"><span class="dot"></span> آموزش سنگ‌نوردی در بلدرلند</span>
    <h1>دوره‌های <span class="accent">بلدرلند</span></h1>
    <p>از نخستین صعود تا مربیگری حرفه‌ای؛ دوره‌هایی ساخته‌شده برای هر سطح، زیر نظر بهترین مربیان باشگاه. دوره‌ی خود را انتخاب کن و همین امروز ثبت‌نام کن.</p>
  </div>
</section>

<!-- ============ STATS ============ -->
<section class="stats">
  <div class="wrap">
    <div class="stat-grid">
      <div class="stat reveal">
        <span class="ic"><svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M12 14l9-5-9-5-9 5 9 5z"/><path d="M12 14l6.16-3.42A12 12 0 0 1 12 20a12 12 0 0 1-6.16-9.42L12 14z"/></svg></span>
        <span class="num display"><span class="count" data-target="42">۰</span><span class="plus">+</span></span>
        <span class="lbl">دوره برگزار شده</span>
      </div>
      <div class="stat reveal">
        <span class="ic"><svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="9" r="6"/><path d="M8.5 14.5 7 22l5-3 5 3-1.5-7.5"/></svg></span>
        <span class="num display"><span class="count" data-target="680">۰</span><span class="plus">+</span></span>
        <span class="lbl">سرتیفیکیت اهدا شده</span>
      </div>
      <div class="stat reveal">
        <span class="ic"><svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></span>
        <span class="num display"><span class="count" data-target="950">۰</span><span class="plus">+</span></span>
        <span class="lbl">ورزشکار در دوره‌ها شرکت کرده‌اند</span>
      </div>
    </div>
  </div>
</section>

<!-- ============ COURSES ============ -->
<section class="block forest" id="courses">
  <div class="wrap">
    <div class="sec-head reveal">
      <div class="sh-l">
        <span class="sec-tag">دوره‌ها</span>
        <h2>دوره‌ای که می‌خواهی، همین‌جاست</h2>
      </div>
      <div class="filter-bar">
        <label for="statusFilter">فیلتر وضعیت:</label>
        <span class="sel">
          <select id="statusFilter" aria-label="فیلتر بر اساس وضعیت دوره">
            <option value="all">همه‌ی دوره‌ها</option>
            <option value="open">در حال ثبت‌نام</option>
            <option value="live">در حال برگزاری</option>
            <option value="soon">به‌زودی</option>
            <option value="done">برگزار شده</option>
          </select>
          <svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
        </span>
      </div>
    </div>
    <div class="course-grid" id="courseGrid"></div>
  </div>
</section>

<!-- ============ TESTIMONIALS ============ -->
<section class="block tsts" id="testimonials">
  <div class="wrap">
    <div class="sec-head reveal">
      <div class="sh-l">
        <span class="sec-tag">نظر ورزشکاران</span>
        <h2>از زبان کسانی که دوره را گذرانده‌اند</h2>
      </div>
      <div class="tst-nav">
        <button class="tst-arrow" id="tstPrev" aria-label="قبلی"><svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg></button>
        <button class="tst-arrow" id="tstNext" aria-label="بعدی"><svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg></button>
      </div>
    </div>
    <div class="tst-grid" id="tstGrid"></div>
  </div>
</section>


<script src="/assets/js/main.js" defer></script>
<script src="/assets/js/courses.js" defer></script>
</body>
</html>
