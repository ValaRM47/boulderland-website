<?php
/**
 * Full-page template: «دوره‌های بلدرلند».
 * Reproduces the custom dark page design (hero, stats, section head, course grid,
 * testimonials) WITHOUT the theme header/footer, and injects the live courses via
 * the plugin shortcode. Selected from Page → Attributes → Template.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Make sure card + modal + page assets are queued before wp_head() prints.
blc_enqueue_assets();
wp_enqueue_style( 'blc-page', BLC_URL . 'assets/page.css', array( 'blc-courses' ), BLC_VER );
wp_enqueue_script( 'blc-page', BLC_URL . 'assets/page.js', array(), BLC_VER, true );

/* Edit these to change the top numbers and the testimonials. */
$blc_stats = array(
	array( 'target' => 42,  'label' => 'دوره برگزار شده',                 'icon' => '<path d="M12 14l9-5-9-5-9 5 9 5z"/><path d="M12 14l6.16-3.42A12 12 0 0 1 12 20a12 12 0 0 1-6.16-9.42L12 14z"/>' ),
	array( 'target' => 680, 'label' => 'سرتیفیکیت اهدا شده',             'icon' => '<circle cx="12" cy="9" r="6"/><path d="M8.5 14.5 7 22l5-3 5 3-1.5-7.5"/>' ),
	array( 'target' => 950, 'label' => 'ورزشکار در دوره‌ها شرکت کرده‌اند', 'icon' => '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>' ),
);

$blc_testimonials = array(
	array( 'stars' => 5, 'name' => 'سارا احمدی',   'course' => 'دوره مقدماتی سنگ‌نوردی',  'text' => 'قبل از دوره فکر می‌کردم سنگ‌نوردی فقط زور بازوست. مربی نشانم داد همه‌چیز درباره‌ی تکنیک و تعادل است. حالا با اعتمادبه‌نفس لید می‌زنم.' ),
	array( 'stars' => 5, 'name' => 'رضا موسوی',    'course' => 'دوره پیشرفته‌ی لید',      'text' => 'فضای تمرین حرفه‌ای، برنامه‌ی منظم و مربی‌ای که واقعاً پیگیر پیشرفتت است. ارزشش را چند برابر داشت.' ),
	array( 'stars' => 4, 'name' => 'نیلوفر کریمی', 'course' => 'دوره بولدرینگ و تکنیک',   'text' => 'دوره‌ی بولدرینگ کاملاً سبک حرکتم را عوض کرد. حرکت‌هایی که فکر می‌کردم غیرممکن‌اند حالا برایم عادی شده‌اند.' ),
	array( 'stars' => 5, 'name' => 'محمد رادمنش',  'course' => 'دوره کودکان و نونهالان',  'text' => 'دخترم عاشق جلسات شده و هر هفته بی‌صبرانه منتظر دوره است. محیط امن و مربیان صبور، دقیقاً همان چیزی که می‌خواستم.' ),
	array( 'stars' => 5, 'name' => 'الهام حسینی',  'course' => 'دوره ایمنی و کار با طناب', 'text' => 'بخش ایمنی و کار با طناب را هر سنگ‌نوردی باید بگذراند. بعد از این دوره دیگر هیچ‌وقت سر دیواره استرس ندارم.' ),
);

/** Render 0–5 stars. */
function blc_tpl_stars( $n ) {
	$out = '<div class="stars" aria-label="' . esc_attr( $n ) . ' از ۵ ستاره">';
	for ( $i = 1; $i <= 5; $i++ ) {
		$cls  = $i <= $n ? 'on' : 'off';
		$out .= '<svg class="' . $cls . '" viewBox="0 0 24 24" stroke-linejoin="round" stroke-width="1.6"><path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>';
	}
	return $out . '</div>';
}

$blc_fa = function ( $n ) {
	return str_replace( range( 0, 9 ), array( '۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹' ), (string) $n );
};
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?> dir="rtl">
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@100;300;400;500;600;700;800;900&family=Anton&display=swap" rel="stylesheet" />
<?php wp_head(); ?>
</head>
<body <?php body_class( 'blc-page-body' ); ?>>
<div class="blc-page">

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
				<?php foreach ( $blc_stats as $s ) : ?>
					<div class="stat reveal">
						<span class="ic"><svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><?php echo $s['icon']; // phpcs:ignore ?></svg></span>
						<span class="num display"><span class="count" data-target="<?php echo esc_attr( $s['target'] ); ?>">۰</span><span class="plus">+</span></span>
						<span class="lbl"><?php echo esc_html( $s['label'] ); ?></span>
					</div>
				<?php endforeach; ?>
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

			<?php echo do_shortcode( '[boulderland_courses]' ); ?>
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
			<div class="tst-grid" id="tstGrid">
				<?php foreach ( $blc_testimonials as $t ) : ?>
					<article class="tst reveal">
						<span class="quote-ic"><svg viewBox="0 0 24 24"><path d="M7 7h5v5a5 5 0 0 1-5 5V7zm9 0h5v5a5 5 0 0 1-5 5V7z" transform="scale(1,-1) translate(0,-24)"/></svg></span>
						<?php echo blc_tpl_stars( $t['stars'] ); // phpcs:ignore ?>
						<p class="body"><?php echo esc_html( $t['text'] ); ?></p>
						<div class="who">
							<span class="avatar"><?php echo esc_html( mb_substr( trim( $t['name'] ), 0, 1 ) ); ?></span>
							<div>
								<div class="name"><?php echo esc_html( $t['name'] ); ?></div>
								<div class="course-of"><?php echo esc_html( $t['course'] ); ?></div>
							</div>
						</div>
					</article>
				<?php endforeach; ?>
			</div>
		</div>
	</section>

</div>
<?php wp_footer(); ?>
</body>
</html>
