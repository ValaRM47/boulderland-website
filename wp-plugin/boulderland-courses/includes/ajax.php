<?php
/**
 * Registration submission handling.
 * The core logic lives in blc_process_registration() and is shared by both the
 * admin-ajax handler (used on WordPress pages / the full-page template) and the
 * REST endpoint (used by the standalone static HTML page).
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Validate + store one registration.
 *
 * @param array $p     Field values (course_id, full_name, phone, insurance_expiry, national_id).
 * @param array $files The $_FILES array (expects 'receipt').
 * @return array { ok:bool, message:string, registered?:int }
 */
function blc_process_registration( $p, $files ) {

	$course_id = isset( $p['course_id'] ) ? absint( $p['course_id'] ) : 0;
	if ( ! $course_id || 'blc_course' !== get_post_type( $course_id ) || 'publish' !== get_post_status( $course_id ) ) {
		return array( 'ok' => false, 'message' => 'ثبت نام انجام نشد' );
	}
	if ( 'open' !== blc_get( $course_id, 'blc_status', 'open' ) ) {
		return array( 'ok' => false, 'message' => 'ثبت‌نام این دوره در حال حاضر باز نیست' );
	}

	$name   = sanitize_text_field( isset( $p['full_name'] ) ? wp_unslash( $p['full_name'] ) : '' );
	$phone  = blc_digits( isset( $p['phone'] ) ? wp_unslash( $p['phone'] ) : '' );
	$expiry = sanitize_text_field( isset( $p['insurance_expiry'] ) ? wp_unslash( $p['insurance_expiry'] ) : '' );
	$nid    = blc_digits( isset( $p['national_id'] ) ? wp_unslash( $p['national_id'] ) : '' );

	if ( '' === $name || '' === $expiry || '' === $phone || '' === $nid ) {
		return array( 'ok' => false, 'message' => 'لطفاً همه‌ی فیلدها را کامل کنید' );
	}
	if ( ! preg_match( '/^09\d{9}$/', $phone ) ) {
		return array( 'ok' => false, 'message' => 'شماره تماس معتبر نیست' );
	}
	if ( ! preg_match( '/^\d{10}$/', $nid ) ) {
		return array( 'ok' => false, 'message' => 'کد ملی باید ۱۰ رقم باشد' );
	}

	if ( empty( $files['receipt'] ) || empty( $files['receipt']['name'] ) || ! empty( $files['receipt']['error'] ) ) {
		return array( 'ok' => false, 'message' => 'بارگذاری فیش واریزی الزامی است' );
	}
	$check = wp_check_filetype( $files['receipt']['name'] );
	if ( ! in_array( strtolower( (string) $check['ext'] ), array( 'jpg', 'jpeg', 'png', 'webp', 'gif' ), true ) ) {
		return array( 'ok' => false, 'message' => 'فرمت فایل باید تصویر باشد (jpg, png, webp)' );
	}

	require_once ABSPATH . 'wp-admin/includes/file.php';
	require_once ABSPATH . 'wp-admin/includes/image.php';
	require_once ABSPATH . 'wp-admin/includes/media.php';

	$attachment_id = media_handle_upload( 'receipt', 0 );
	if ( is_wp_error( $attachment_id ) ) {
		return array( 'ok' => false, 'message' => 'ثبت نام انجام نشد' );
	}

	$course_name = get_the_title( $course_id );
	$post_id     = wp_insert_post(
		array(
			'post_type'   => 'blc_signup',
			'post_status' => 'publish',
			'post_title'  => $course_name . ' — ' . $name,
		),
		true
	);
	if ( is_wp_error( $post_id ) ) {
		wp_delete_attachment( $attachment_id, true );
		return array( 'ok' => false, 'message' => 'ثبت نام انجام نشد' );
	}

	update_post_meta( $post_id, 'blc_course_id', $course_id );
	update_post_meta( $post_id, 'blc_course_name', $course_name );
	update_post_meta( $post_id, 'blc_full_name', $name );
	update_post_meta( $post_id, 'blc_phone', $phone );
	update_post_meta( $post_id, 'blc_insurance_expiry', $expiry );
	update_post_meta( $post_id, 'blc_national_id', $nid );
	update_post_meta( $post_id, 'blc_receipt_id', $attachment_id );
	wp_update_post( array( 'ID' => $attachment_id, 'post_parent' => $post_id ) );

	$registered = (int) blc_get( $course_id, 'blc_registered', 0 ) + 1;
	if ( function_exists( 'update_field' ) ) {
		update_field( 'blc_registered', $registered, $course_id );
	} else {
		update_post_meta( $course_id, 'blc_registered', $registered );
	}

	return array(
		'ok'         => true,
		'message'    => 'ثبت نام با موفقیت انجام شد',
		'registered' => $registered,
	);
}

/* ---- admin-ajax handler (WordPress page / full-page template; nonce-protected) ---- */
add_action( 'wp_ajax_blc_register', 'blc_handle_register' );
add_action( 'wp_ajax_nopriv_blc_register', 'blc_handle_register' );

function blc_handle_register() {
	$nonce = isset( $_POST['nonce'] ) ? sanitize_text_field( wp_unslash( $_POST['nonce'] ) ) : '';
	if ( ! wp_verify_nonce( $nonce, 'blc_register' ) ) {
		wp_send_json( array( 'ok' => false, 'message' => 'ثبت نام انجام نشد' ) );
	}
	// Honeypot: real users leave this empty.
	if ( ! empty( $_POST['website'] ) ) {
		wp_send_json( array( 'ok' => false, 'message' => 'ثبت نام انجام نشد' ) );
	}
	wp_send_json( blc_process_registration( $_POST, $_FILES ) );
}
