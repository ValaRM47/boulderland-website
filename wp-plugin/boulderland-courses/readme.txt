=== Boulderland Courses & Registration ===
Requires at least: WordPress 6.0
Requires PHP: 7.4
Recommended: Advanced Custom Fields (ACF) — free version is enough

Courses for Boulderland, each with its own registration form (name, phone,
sports‑insurance expiry, national ID, payment‑receipt upload). Submissions are
saved in the WordPress dashboard and every successful registration bumps a live
counter on the course card.

== Install ==
1. Zip the `boulderland-courses` folder and upload it in
   WordPress → Plugins → Add New → Upload Plugin, then Activate.
   (Or copy the folder into wp-content/plugins/ and activate.)
2. Install & activate **Advanced Custom Fields (ACF)** — the course fields
   appear automatically; you don't have to build them by hand.

== Add courses ==
WordPress admin → «دوره‌ها» → «دوره جدید»:
  - Title = نام دوره
  - ACF box «مشخصات دوره»: تاریخ شروع، پیش‌نیاز، مدرس، قیمت (تومان)،
    وضعیت دوره (در حال ثبت‌نام / در حال برگزاری / به‌زودی / برگزار شده)،
    و «تعداد ثبت‌نام» که خودکار زیاد می‌شود.
  - Use «ترتیب» (Page Attributes → Order) to control the display order.
Only courses set to «در حال ثبت‌نام» show an active ثبت‌نام button.

== Show the courses on a page ==
Put this shortcode on the دوره‌ها page (or any page/template):

    [boulderland_courses]

Optional attributes:
    [boulderland_courses status="open"]   only one status
    [boulderland_courses count="6"]       limit how many

In a custom PHP template you can also do:
    <?php echo do_shortcode('[boulderland_courses]'); ?>

== Registrations ==
Submissions land in WordPress admin → «ثبت‌نام دوره‌ها»:
  - List columns: دوره، نام، شماره تماس، کد ملی، انقضای بیمه، فیش واریزی، تاریخ
  - Filter by course from the dropdown above the list
  - Open a row to see full details + the receipt image
  - Receipts are stored in the Media Library, attached to each submission

== Behaviour ==
  - All fields required. A missed/invalid field turns red and the form won't submit.
  - Success  → «ثبت نام با موفقیت انجام شد» and the card counter +1.
  - Failure  → «ثبت نام انجام نشد».
  - Phone validated as 09xxxxxxxxx, national ID as 10 digits (Persian digits accepted).
  - Receipt accepts images only (jpg, png, webp, gif).

== Notes ==
  - Without ACF the plugin still runs; course fields fall back to post meta and you'd
    edit them with a custom‑fields plugin. ACF is strongly recommended for the nice UI.
  - Uninstalling the plugin does not delete your courses/registrations (they stay as
    custom post types in the database).
