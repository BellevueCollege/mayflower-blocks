<?php

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}


function mbg4_staff_list_callback( $attributes ) {
	if ( file_exists( get_template_directory() . '/inc/mayflower-staff/output.php' )
		&& function_exists( 'mayflower_get_options' )
	) {
		$output_file_path = get_template_directory() . '/inc/mayflower-staff/output.php';
		$options = mayflower_get_options();
	} else if ( file_exists( get_stylesheet_directory() . '/inc/staff/output.php' )
		&& function_exists( 'bc_douglas_fir_get_options' )
	) {
		$output_file_path = get_stylesheet_directory() . '/inc/staff/output.php';
		$options = bc_douglas_fir_get_options();
	} else {
		return '<p class="alert alert-danger">This block is not currently supported by your theme.</p>';
	}


	ob_start();

	if ( '' === $attributes['staffLayout'] && true === $options['staff_toggle'] ) {
		$options['staff_layout']          = $options['staff_layout'] ?? 'list-view';
		$options['staff_picture_toggle']  = $options['staff_picture_toggle'] ?? true;
		$options['staff_phone_toggle']    = $options['staff_phone_toggle'] ?? true;
		$options['staff_location_toggle'] = $options['staff_location_toggle'] ?? true;
		$options['staff_hours_toggle']    = $options['staff_hours_toggle'] ?? true;
		$options['staff_bio_toggle']      = $options['staff_bio_toggle'] ?? true;
		$options['staff_more_toggle']     = $options['staff_more_toggle'] ?? false;
	} else {
		$options['staff_layout']          = $attributes['staffLayout'];
		$options['staff_picture_toggle']  = $attributes['staffPictureToggle'];
		$options['staff_phone_toggle']    = $attributes['staffPhoneToggle'];
		$options['staff_location_toggle'] = $attributes['staffLocationToggle'];
		$options['staff_hours_toggle']    = $attributes['staffHoursToggle'];
		$options['staff_bio_toggle']      = $attributes['staffBioToggle'];
		$options['staff_more_toggle']     = $attributes['staffMoreToggle'];
	}

	require $output_file_path;

	return ob_get_clean();

}
