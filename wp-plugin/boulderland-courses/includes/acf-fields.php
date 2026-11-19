<?php
/**
 * ACF local field group for courses. Registered in code so the fields exist
 * automatically once ACF is active — no manual field building required.
 * Works with the free version of ACF.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

add_action( 'acf/init', 'blc_register_acf_fields' );

function blc_register_acf_fields() {

	if ( ! function_exists( 'acf_add_local_field_group' ) ) {
		return; // ACF not installed/active — course fields fall back to post meta.
	}

	acf_add_local_field_group(
		array(
			'key'                   => 'group_blc_course',
			'title'                 => 'مشخصات دوره',
			'fields'                => array(
				array(
					'key'          => 'field_blc_start',
					'label'        => 'تاریخ شروع',
					'name'         => 'blc_start',
					'type'         => 'text',
					'instructions' => 'مثال: ۱ آذر ۱۴۰۵',
				),
				array(
					'key'           => 'field_blc_prereq',
					'label'         => 'پیش‌نیاز',
					'name'          => 'blc_prereq',
					'type'          => 'text',
					'default_value' => 'ندارد',
				),
				array(
					'key'   => 'field_blc_instructor',
					'label' => 'مدرس',
					'name'  => 'blc_instructor',
					'type'  => 'text',
					'default_value' => '',
				),
				array(
					'key'           => 'field_blc_gender',
					'label'         => 'جنسیت',
					'name'          => 'blc_gender',
					'type'          => 'select',
					'choices'       => array(
						'مردان'      => 'مردان',
						'زنان'       => 'زنان',
						'مردان/زنان' => 'مردان/زنان',
					),
					'default_value' => 'مردان/زنان',
					'allow_null'    => 1,
					'ui'            => 1,
				),
				array(
					'key'          => 'field_blc_price',
					'label'        => 'قیمت (تومان)',
					'name'         => 'blc_price',
					'type'         => 'number',
					'instructions' => 'فقط عدد، به تومان. برای دوره‌ی رایگان خالی بگذارید.',
					'min'          => 0,
				),
				array(
					'key'           => 'field_blc_status',
					'label'         => 'وضعیت دوره',
					'name'          => 'blc_status',
					'type'          => 'select',
					'choices'       => array(
						'open' => 'در حال ثبت‌نام',
						'live' => 'در حال برگزاری',
						'soon' => 'به‌زودی',
						'done' => 'برگزار شده',
					),
					'default_value' => 'open',
					'ui'            => 1,
					'instructions'  => 'فقط دوره‌هایی که «در حال ثبت‌نام» هستند دکمه‌ی ثبت‌نام فعال دارند.',
				),
				array(
					'key'           => 'field_blc_registered',
					'label'         => 'تعداد ثبت‌نام',
					'name'          => 'blc_registered',
					'type'          => 'number',
					'default_value' => 0,
					'instructions'  => 'به‌صورت خودکار با هر ثبت‌نام موفق افزایش می‌یابد. در صورت نیاز می‌توانید دستی تغییر دهید.',
					'min'           => 0,
				),
			),
			'location'              => array(
				array(
					array(
						'param'    => 'post_type',
						'operator' => '==',
						'value'    => 'blc_course',
					),
				),
			),
			'menu_order'            => 0,
			'position'              => 'normal',
			'style'                 => 'default',
			'label_placement'       => 'top',
			'hide_on_screen'        => array( 'the_content' ),
			'active'                => true,
			'description'           => 'فیلدهای دوره‌ی بلدرلند (افزونه‌ی دوره‌ها).',
		)
	);
}
