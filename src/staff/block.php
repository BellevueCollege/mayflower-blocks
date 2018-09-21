<?php

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function mayflower_blocks_render_block_staff_list( $attributes, $content ) {

	ob_start();

	if ( file_exists( get_template_directory() . '/inc/mayflower-staff/output.php' ) ) {
		$mayflower_options = mayflower_get_options();
		if ( 'grid-view' === $attributes['staffLayout'] || 'list-view' === $attributes['staffLayout'] ) {
			$mayflower_options['staff_layout'] = $attributes['staffLayout'];
		}
		$mayflower_options['staff_picture_toggle'] = isset( $attributes['staffPictureToggle']) ? $attributes['staffPictureToggle'] : $mayflower_options['staff_picture_toggle'];
		$mayflower_options['staff_phone_toggle'] = $attributes['staffPhoneToggle'];

		require get_template_directory() . '/inc/mayflower-staff/output.php';
	}
	try {
		return ob_get_contents();
	} finally {
		ob_end_clean();
	}
}

register_block_type( 'mayflower-blocks/staff-list', array(
	'attributes'      => array(
		'staffLayout'    => array(
			'type'    => 'string'
		),
		'staffPictureToggle'    => array(
			'type'    => 'boolean'
		),
		'staffPhoneToggle'    => array(
			'type'    => 'boolean'
		),
	),
	'render_callback' => 'mayflower_blocks_render_block_staff_list',
) );