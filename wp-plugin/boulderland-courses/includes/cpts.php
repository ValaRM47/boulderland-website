<?php
/**
 * Custom post types: Courses and Registrations (signups).
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action( 'init', 'blc_register_cpts' );

function blc_register_cpts() {

	// ---- Courses (managed by the admin, fields via ACF) ----
	register_post_type(
		'blc_course',
		array(
			'labels'       => array(
				'name'          => 'دوره‌ها',
				'singular_name' => 'دوره',
				'menu_name'     => 'دوره‌ها',
				'add_new'       => 'دوره جدید',
				'add_new_item'  => 'افزودن دوره',
				'edit_item'     => 'ویرایش دوره',
				'new_item'      => 'دوره جدید',
				'view_item'     => 'نمایش دوره',
				'all_items'     => 'همه‌ی دوره‌ها',
				'search_items'  => 'جستجوی دوره',
				'not_found'     => 'دوره‌ای یافت نشد',
			),
			'public'       => true,
			'show_in_rest' => true,
			'has_archive'  => false,
			'menu_icon'    => 'dashicons-welcome-learn-more',
			'menu_position'=> 26,
			'supports'     => array( 'title', 'page-attributes' ), // title = نام دوره; menu_order = ترتیب نمایش
			'rewrite'      => array( 'slug' => 'course' ),
		)
	);

	// ---- Registrations / form submissions ----
	register_post_type(
		'blc_signup',
		array(
			'labels'          => array(
				'name'          => 'ثبت‌نام دوره‌ها',
				'singular_name' => 'ثبت‌نام',
				'menu_name'     => 'ثبت‌نام دوره‌ها',
				'all_items'     => 'همه‌ی ثبت‌نام‌ها',
				'edit_item'     => 'مشاهده‌ی ثبت‌نام',
				'view_item'     => 'مشاهده‌ی ثبت‌نام',
				'search_items'  => 'جستجوی ثبت‌نام',
				'not_found'     => 'ثبت‌نامی یافت نشد',
			),
			'public'          => false,
			'show_ui'         => true,
			'show_in_menu'    => true,
			'menu_icon'       => 'dashicons-id-alt',
			'menu_position'   => 27,
			'capability_type' => 'post',
			'map_meta_cap'    => true,
			// Submissions are only created through the front-end form, never by hand.
			'capabilities'    => array( 'create_posts' => 'do_not_allow' ),
			'supports'        => array( 'title' ),
		)
	);
}
