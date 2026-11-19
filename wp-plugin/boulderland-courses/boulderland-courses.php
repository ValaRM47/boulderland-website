<?php
/**
 * Plugin Name:       Boulderland Courses & Registration
 * Plugin URI:        https://boulderland.ir
 * Description:        دوره‌های بلدرلند: مدیریت دوره‌ها (با ACF)، فرم ثبت‌نام اختصاصی هر دوره همراه با بارگذاری فیش واریزی، ذخیره‌ی ثبت‌نام‌ها در پیشخوان و شمارنده‌ی زنده‌ی ثبت‌نام روی هر کارت.
 * Version:           1.0.0
 * Author:            Boulderland
 * Text Domain:       boulderland-courses
 * Requires at least: 6.0
 * Requires PHP:      7.4
 *
 * Recommended companion plugin: Advanced Custom Fields (ACF) — used to edit each course's
 * fields in a friendly UI. The plugin still works without ACF (fields fall back to post meta).
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'BLC_VER', '1.0.0' );
define( 'BLC_DIR', plugin_dir_path( __FILE__ ) );
define( 'BLC_URL', plugin_dir_url( __FILE__ ) );

/* ============================================================
 * Shared helpers
 * ========================================================== */

/**
 * Read a course field. Prefers ACF (get_field) and falls back to post meta,
 * so courses work whether or not ACF is installed.
 */
function blc_get( $post_id, $name, $default = '' ) {
	if ( function_exists( 'get_field' ) ) {
		$v = get_field( $name, $post_id );
		if ( null !== $v && '' !== $v ) {
			return $v;
		}
	}
	$v = get_post_meta( $post_id, $name, true );
	return ( '' === $v || null === $v ) ? $default : $v;
}

/** Normalise Persian/Arabic digits to Latin and strip non-digits. */
function blc_digits( $s ) {
	$fa = array( '۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹' );
	$ar = array( '٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩' );
	$en = array( '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' );
	$s  = str_replace( $fa, $en, (string) $s );
	$s  = str_replace( $ar, $en, $s );
	return preg_replace( '/\D/', '', $s );
}

/** Latin digits -> Persian digits, for display (keeps separators like ٬). */
function blc_fa( $n ) {
	$en = array( '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' );
	$fa = array( '۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹' );
	return str_replace( $en, $fa, (string) $n );
}

/** Format a toman price with the ٬ thousands separator and Persian digits. */
function blc_price_fa( $n ) {
	$n = preg_replace( '/\D/', '', (string) $n );
	if ( '' === $n ) {
		return '';
	}
	return blc_fa( number_format( (float) $n, 0, '.', '٬' ) );
}

/** Metadata for each course status value. */
function blc_status_meta( $status ) {
	$map = array(
		'open' => array( 'label' => 'در حال ثبت‌نام', 'cls' => 'open', 'cta' => 'ثبت‌نام',        'enabled' => true,  'acc' => 'var(--sand)' ),
		'live' => array( 'label' => 'در حال برگزاری', 'cls' => 'live', 'cta' => 'در حال برگزاری', 'enabled' => false, 'acc' => 'rgba(226,194,161,.55)' ),
		'soon' => array( 'label' => 'به‌زودی',        'cls' => 'soon', 'cta' => 'به‌زودی',        'enabled' => false, 'acc' => 'rgba(231,173,114,.45)' ),
		'done' => array( 'label' => 'برگزار شده',     'cls' => 'done', 'cta' => 'برگزار شده',     'enabled' => false, 'acc' => 'rgba(246,237,225,.2)' ),
	);
	return isset( $map[ $status ] ) ? $map[ $status ] : $map['open'];
}

/* ============================================================
 * Bootstrap
 * ========================================================== */

require_once BLC_DIR . 'includes/cpts.php';
require_once BLC_DIR . 'includes/acf-fields.php';
require_once BLC_DIR . 'includes/admin.php';
require_once BLC_DIR . 'includes/ajax.php';
require_once BLC_DIR . 'includes/rest.php';
require_once BLC_DIR . 'includes/shortcode.php';
require_once BLC_DIR . 'includes/page-template.php';

register_activation_hook(
	__FILE__,
	function () {
		blc_register_cpts();
		flush_rewrite_rules();
	}
);

register_deactivation_hook(
	__FILE__,
	function () {
		flush_rewrite_rules();
	}
);
