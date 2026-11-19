<?php
/**
 * Registers the full-page «دوره‌های بلدرلند» template so it can be chosen from
 * Page → Attributes → Template — no theme editing required.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

const BLC_PAGE_TEMPLATE = 'blc-full-page';

// Show it in the Page Attributes → Template dropdown.
add_filter(
	'theme_page_templates',
	function ( $templates ) {
		$templates[ BLC_PAGE_TEMPLATE ] = 'دوره‌های بلدرلند (تمام‌صفحه)';
		return $templates;
	}
);

// Load our template file when the page uses it.
add_filter(
	'template_include',
	function ( $template ) {
		if ( is_page() && BLC_PAGE_TEMPLATE === get_page_template_slug( get_queried_object_id() ) ) {
			$file = BLC_DIR . 'templates/page-boulderland-courses.php';
			if ( file_exists( $file ) ) {
				return $file;
			}
		}
		return $template;
	}
);
