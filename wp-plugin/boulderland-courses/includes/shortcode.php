<?php
/**
 * [boulderland_courses] — renders the course cards grid + the registration modal.
 * Each "ثبت‌نام" button opens the modal, titled with that course's name.
 *
 * Optional attributes:
 *   [boulderland_courses status="open"]   limit to one status
 *   [boulderland_courses count="-1"]      how many (default: all)
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_shortcode( 'boulderland_courses', 'blc_courses_shortcode' );

function blc_enqueue_assets() {
	wp_enqueue_style( 'blc-courses', BLC_URL . 'assets/courses.css', array(), BLC_VER );
	wp_enqueue_script( 'blc-courses', BLC_URL . 'assets/courses.js', array(), BLC_VER, true );
	wp_localize_script(
		'blc-courses',
		'BLC',
		array(
			'ajax'  => admin_url( 'admin-ajax.php' ),
			'nonce' => wp_create_nonce( 'blc_register' ),
		)
	);
}

function blc_courses_shortcode( $atts ) {
	$atts = shortcode_atts(
		array(
			'status' => '',
			'count'  => -1,
		),
		$atts,
		'boulderland_courses'
	);

	blc_enqueue_assets();

	$args = array(
		'post_type'      => 'blc_course',
		'posts_per_page' => (int) $atts['count'],
		'orderby'        => array( 'menu_order' => 'ASC', 'date' => 'DESC' ),
		'post_status'    => 'publish',
	);
	if ( $atts['status'] ) {
		$args['meta_query'] = array(
			array(
				'key'   => 'blc_status',
				'value' => sanitize_text_field( $atts['status'] ),
			),
		);
	}

	$q = new WP_Query( $args );

	ob_start();

	if ( ! $q->have_posts() ) {
		echo '<p class="blc-empty">هنوز دوره‌ای ثبت نشده است.</p>';
		return ob_get_clean();
	}

	echo '<div class="blc-grid">';

	$i = 0;
	while ( $q->have_posts() ) {
		$q->the_post();
		++$i;
		$id     = get_the_ID();
		$status = blc_get( $id, 'blc_status', 'open' );
		$st     = blc_status_meta( $status );
		$reg    = (int) blc_get( $id, 'blc_registered', 0 );
		$name   = get_the_title();

		echo '<article class="blc-course" data-status="' . esc_attr( $status ) . '" style="--acc:' . esc_attr( $st['acc'] ) . '">';

		echo '<div class="blc-top">';
		echo '<span class="blc-index">' . esc_html( blc_fa( str_pad( $i, 2, '0', STR_PAD_LEFT ) ) ) . '</span>';
		echo '<span class="blc-badge ' . esc_attr( $st['cls'] ) . '"><span class="bdot"></span>' . esc_html( $st['label'] ) . '</span>';
		echo '</div>';

		echo '<h3 class="blc-name">' . esc_html( $name ) . '</h3>';

		// Specs — only fields that actually have a value are shown.
		$specs = array(
			'تاریخ شروع' => blc_get( $id, 'blc_start', '' ),
			'پیش‌نیاز'   => blc_get( $id, 'blc_prereq', '' ),
			'مدرس'       => blc_get( $id, 'blc_instructor', '' ),
			'جنسیت'      => blc_get( $id, 'blc_gender', '' ),
		);
		$specs = array_filter( $specs, function ( $v ) { return '' !== trim( (string) $v ); } );
		if ( $specs ) {
			echo '<div class="blc-specs">';
			foreach ( $specs as $k => $v ) {
				echo '<div class="blc-spec"><span class="k">' . esc_html( $k ) . '</span><span class="v">' . esc_html( $v ) . '</span></div>';
			}
			echo '</div>';
		}

		echo '<div class="blc-count" data-course-id="' . esc_attr( $id ) . '"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/></svg><span class="blc-count-n">' . esc_html( blc_fa( $reg ) ) . '</span> نفر ثبت‌نام کرده‌اند</div>';

		echo '<div class="blc-foot">';
		$price_raw = (string) blc_get( $id, 'blc_price', '' );
		if ( '' !== trim( $price_raw ) ) {
			$digits = preg_replace( '/\\D/', '', $price_raw );
			echo '<div class="blc-price"><span class="k">شهریه دوره</span>';
			if ( '' === $digits || '0' === $digits ) {
				echo '<span class="blc-free">رایگان</span>';
			} else {
				echo '<span class="amt">' . esc_html( blc_price_fa( $price_raw ) ) . ' <small>تومان</small></span>';
			}
			echo '</div>';
		}

		if ( $st['enabled'] ) {
			echo '<button type="button" class="blc-buy" data-blc-buy data-course-id="' . esc_attr( $id ) . '" data-course-name="' . esc_attr( $name ) . '">' . esc_html( $st['cta'] )
				. ' <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5"/><path d="m12 5-7 7 7 7"/></svg></button>';
		} else {
			echo '<button type="button" class="blc-buy" disabled>' . esc_html( $st['cta'] ) . '</button>';
		}
		echo '</div>'; // foot

		echo '</article>';
	}

	echo '</div>'; // grid

	wp_reset_postdata();

	// Output the modal only once per page, even with multiple shortcodes.
	static $modal_done = false;
	if ( ! $modal_done ) {
		echo blc_modal_html();
		$modal_done = true;
	}

	return ob_get_clean();
}

/** The single, reusable registration modal (title is set per course in JS). */
function blc_modal_html() {
	ob_start();
	?>
	<div class="blc-modal-overlay" id="blc-modal" aria-hidden="true">
		<div class="blc-modal" role="dialog" aria-modal="true" aria-labelledby="blc-m-title">
			<button type="button" class="blc-m-close" aria-label="بستن">
				<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>
			</button>
			<div class="blc-m-head">
				<span class="blc-m-kicker">ثبت‌نام دوره</span>
				<h3 class="blc-m-title" id="blc-m-title"></h3>
			</div>
			<form class="blc-form" novalidate enctype="multipart/form-data">
				<input type="hidden" name="course_id" value="">

				<div class="blc-field">
					<label>نام و نام خانوادگی</label>
					<input type="text" name="full_name" data-required autocomplete="name">
					<span class="blc-err">این فیلد الزامی است</span>
				</div>

				<div class="blc-field">
					<label>شماره تماس</label>
					<input type="tel" name="phone" data-required inputmode="numeric" placeholder="۰۹۱۲۳۴۵۶۷۸۹" autocomplete="tel">
					<span class="blc-err">شماره تماس معتبر وارد کنید</span>
				</div>

				<div class="blc-field">
					<label>تاریخ انقضای بیمه ورزشی</label>
					<input type="text" name="insurance_expiry" data-required placeholder="مثال: ۱۴۰۵/۰۹/۰۱">
					<span class="blc-err">این فیلد الزامی است</span>
				</div>

				<div class="blc-field">
					<label>کد ملی</label>
					<input type="text" name="national_id" data-required inputmode="numeric" maxlength="10">
					<span class="blc-err">کد ملی باید ۱۰ رقم باشد</span>
				</div>

				<div class="blc-field blc-file">
					<label>بارگذاری فیش واریزی</label>
					<div class="blc-file-box">
						<input type="file" name="receipt" accept="image/*" data-required id="blc-receipt">
						<label for="blc-receipt" class="blc-file-btn">
							<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M17 8l-5-5-5 5"/><path d="M12 3v12"/></svg>
							انتخاب تصویر
						</label>
						<span class="blc-file-name">فایلی انتخاب نشده</span>
					</div>
					<span class="blc-err">بارگذاری فیش واریزی الزامی است</span>
				</div>

				<div class="blc-msg" role="status" aria-live="polite"></div>

				<button type="submit" class="blc-submit">
					<span class="blc-submit-txt">ثبت‌نام</span>
					<span class="blc-spinner" aria-hidden="true"></span>
				</button>
			</form>
		</div>
	</div>
	<?php
	return ob_get_clean();
}
