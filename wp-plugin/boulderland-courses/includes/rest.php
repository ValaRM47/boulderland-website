<?php
/**
 * REST API so a static HTML page can list courses and submit registrations.
 *   GET  /wp-json/blc/v1/courses    -> published courses as JSON
 *   POST /wp-json/blc/v1/register   -> submit a registration (multipart, with receipt)
 *
 * Both are public (a registration form is public by nature); the register route
 * uses a honeypot + strict server-side validation against spam/bad input.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action(
	'rest_api_init',
	function () {
		register_rest_route(
			'blc/v1',
			'/courses',
			array(
				'methods'             => 'GET',
				'permission_callback' => '__return_true',
				'callback'            => 'blc_rest_courses',
			)
		);
		register_rest_route(
			'blc/v1',
			'/register',
			array(
				'methods'             => 'POST',
				'permission_callback' => '__return_true',
				'callback'            => 'blc_rest_register',
			)
		);
	}
);

function blc_rest_courses() {
	$q   = new WP_Query(
		array(
			'post_type'      => 'blc_course',
			'posts_per_page' => -1,
			'orderby'        => array( 'menu_order' => 'ASC', 'date' => 'DESC' ),
			'post_status'    => 'publish',
			'no_found_rows'  => true,
		)
	);
	$out = array();
	foreach ( $q->posts as $p ) {
		$id    = $p->ID;
		$out[] = array(
			'id'         => (int) $id,
			'name'       => get_the_title( $id ),
			'start'      => (string) blc_get( $id, 'blc_start', '' ),
			'prereq'     => (string) blc_get( $id, 'blc_prereq', '' ),
			'instructor' => (string) blc_get( $id, 'blc_instructor', '' ),
			'gender'     => (string) blc_get( $id, 'blc_gender', '' ),
			'price'      => (string) blc_get( $id, 'blc_price', '' ),
			'status'     => (string) blc_get( $id, 'blc_status', 'open' ),
			'registered' => (int) blc_get( $id, 'blc_registered', 0 ),
		);
	}
	return rest_ensure_response( $out );
}

function blc_rest_register( WP_REST_Request $req ) {
	// Honeypot.
	if ( '' !== (string) $req->get_param( 'website' ) ) {
		return rest_ensure_response( array( 'ok' => false, 'message' => 'ثبت نام انجام نشد' ) );
	}
	$p = array(
		'course_id'        => $req->get_param( 'course_id' ),
		'full_name'        => $req->get_param( 'full_name' ),
		'phone'            => $req->get_param( 'phone' ),
		'insurance_expiry' => $req->get_param( 'insurance_expiry' ),
		'national_id'      => $req->get_param( 'national_id' ),
	);
	return rest_ensure_response( blc_process_registration( $p, $_FILES ) );
}
