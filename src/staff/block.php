<?php

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function mayflower_blocks_render_block_staff_list( $attributes, $content ) {
	if ( file_exists( get_template_directory() . '/inc/mayflower-staff/output.php' ) ) {

		ob_start();
		
		$mayflower_options = mayflower_get_options();

		$mayflower_options['staff_layout'] = isset( $attributes['staffLayout']) ? $attributes['staffLayout'] : $mayflower_options['staff_layout'];
		$mayflower_options['staff_picture_toggle'] = isset( $attributes['staffPictureToggle']) ? $attributes['staffPictureToggle'] : $mayflower_options['staff_picture_toggle'];
		$mayflower_options['staff_phone_toggle']   = isset( $attributes['staffPhoneToggle']) ? $attributes['staffPhoneToggle'] : $mayflower_options['staff_phone_toggle'];
		$mayflower_options['staff_location_toggle']   = isset( $attributes['staffLocationToggle']) ? $attributes['staffLocationToggle'] : $mayflower_options['staff_location_toggle'];
		$mayflower_options['staff_hours_toggle']   = isset( $attributes['staffHoursToggle']) ? $attributes['staffHoursToggle'] : $mayflower_options['staff_hours_toggle'];
		$mayflower_options['staff_bio_toggle']   = isset( $attributes['staffBioToggle']) ? $attributes['staffBioToggle'] : $mayflower_options['staff_bio_toggle'];
		$mayflower_options['staff_more_toggle']   = isset( $attributes['staffMoreToggle']) ? $attributes['staffMoreToggle'] : $mayflower_options['staff_more_toggle'];

		require get_template_directory() . '/inc/mayflower-staff/output.php';

		return ob_get_clean();
	} else {
		return '<p class="alert alert-danger">This block is not currently supported by your theme.</p>';
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
		'staffLocationToggle'    => array(
			'type'    => 'boolean'
		),
		'staffHoursToggle'    => array(
			'type'    => 'boolean'
		),
		'staffBioToggle'    => array(
			'type'    => 'boolean'
		),
		'staffMoreToggle'    => array(
			'type'    => 'boolean'
		),
	),
	'render_callback' => 'mayflower_blocks_render_block_staff_list',
) );
