<?php
/**
 * Admin screens for signups: list columns + a read-only details meta box so
 * every submission is easy to review in the WordPress dashboard.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/* ---- Signup list columns ---- */
add_filter(
	'manage_blc_signup_posts_columns',
	function ( $cols ) {
		return array(
			'cb'          => isset( $cols['cb'] ) ? $cols['cb'] : '',
			'title'       => 'عنوان',
			'blc_course'  => 'دوره',
			'blc_name'    => 'نام و نام خانوادگی',
			'blc_phone'   => 'شماره تماس',
			'blc_nid'     => 'کد ملی',
			'blc_expiry'  => 'انقضای بیمه',
			'blc_receipt' => 'فیش واریزی',
			'date'        => 'تاریخ ثبت',
		);
	}
);

add_action(
	'manage_blc_signup_posts_custom_column',
	function ( $col, $post_id ) {
		switch ( $col ) {
			case 'blc_course':
				echo esc_html( get_post_meta( $post_id, 'blc_course_name', true ) );
				break;
			case 'blc_name':
				echo esc_html( get_post_meta( $post_id, 'blc_full_name', true ) );
				break;
			case 'blc_phone':
				echo esc_html( get_post_meta( $post_id, 'blc_phone', true ) );
				break;
			case 'blc_nid':
				echo esc_html( get_post_meta( $post_id, 'blc_national_id', true ) );
				break;
			case 'blc_expiry':
				echo esc_html( get_post_meta( $post_id, 'blc_insurance_expiry', true ) );
				break;
			case 'blc_receipt':
				$aid = get_post_meta( $post_id, 'blc_receipt_id', true );
				if ( $aid ) {
					$url   = wp_get_attachment_url( $aid );
					$thumb = wp_get_attachment_image( $aid, array( 46, 46 ) );
					echo '<a href="' . esc_url( $url ) . '" target="_blank" rel="noopener">' . ( $thumb ? $thumb : 'مشاهده' ) . '</a>';
				} else {
					echo '—';
				}
				break;
		}
	},
	10,
	2
);

/* ---- Filter signups by course ---- */
add_action(
	'restrict_manage_posts',
	function ( $post_type ) {
		if ( 'blc_signup' !== $post_type ) {
			return;
		}
		$courses = get_posts(
			array(
				'post_type'      => 'blc_course',
				'posts_per_page' => -1,
				'orderby'        => 'title',
				'order'          => 'ASC',
			)
		);
		$current = isset( $_GET['blc_course_filter'] ) ? absint( $_GET['blc_course_filter'] ) : 0;
		echo '<select name="blc_course_filter"><option value="0">همه‌ی دوره‌ها</option>';
		foreach ( $courses as $c ) {
			printf(
				'<option value="%d"%s>%s</option>',
				(int) $c->ID,
				selected( $current, $c->ID, false ),
				esc_html( $c->post_title )
			);
		}
		echo '</select>';
	}
);

add_action(
	'pre_get_posts',
	function ( $query ) {
		if ( ! is_admin() || ! $query->is_main_query() ) {
			return;
		}
		if ( 'blc_signup' !== $query->get( 'post_type' ) ) {
			return;
		}
		if ( ! empty( $_GET['blc_course_filter'] ) ) {
			$query->set(
				'meta_query',
				array(
					array(
						'key'   => 'blc_course_id',
						'value' => absint( $_GET['blc_course_filter'] ),
					),
				)
			);
		}
	}
);

/* ---- Read-only details meta box on the signup edit screen ---- */
add_action(
	'add_meta_boxes',
	function () {
		add_meta_box( 'blc_signup_details', 'جزئیات ثبت‌نام', 'blc_signup_metabox', 'blc_signup', 'normal', 'high' );
	}
);

function blc_signup_metabox( $post ) {
	$rows = array(
		'دوره'                 => get_post_meta( $post->ID, 'blc_course_name', true ),
		'نام و نام خانوادگی'    => get_post_meta( $post->ID, 'blc_full_name', true ),
		'شماره تماس'           => get_post_meta( $post->ID, 'blc_phone', true ),
		'کد ملی'               => get_post_meta( $post->ID, 'blc_national_id', true ),
		'تاریخ انقضای بیمه'    => get_post_meta( $post->ID, 'blc_insurance_expiry', true ),
	);
	echo '<table class="widefat striped" style="max-width:640px"><tbody>';
	foreach ( $rows as $label => $value ) {
		echo '<tr><th style="width:200px;text-align:right">' . esc_html( $label ) . '</th><td>' . esc_html( $value ) . '</td></tr>';
	}
	$aid = get_post_meta( $post->ID, 'blc_receipt_id', true );
	echo '<tr><th style="text-align:right">فیش واریزی</th><td>';
	if ( $aid ) {
		$url = wp_get_attachment_url( $aid );
		echo '<a href="' . esc_url( $url ) . '" target="_blank" rel="noopener">' . wp_get_attachment_image( $aid, array( 180, 180 ) ) . '<br>مشاهده‌ی تصویر کامل</a>';
	} else {
		echo '—';
	}
	echo '</td></tr>';
	echo '</tbody></table>';
}

/* Hide the content editor for signups (data lives in the meta box). */
add_action(
	'init',
	function () {
		remove_post_type_support( 'blc_signup', 'editor' );
	},
	20
);
