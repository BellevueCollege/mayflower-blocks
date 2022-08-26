<?php

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}


function mbg4_staff_list_callback( $attributes ) {
	if ( file_exists( get_template_directory() . '/inc/mayflower-staff/output.php' )
		&& function_exists( 'mayflower_get_options' )
	) {

		ob_start();

		$mayflower_options = mayflower_get_options();
		if ( '' === $attributes['staffLayout'] && true === $mayflower_options['staff_toggle'] ) {
			$mayflower_options['staff_layout']          = $mayflower_options['staff_layout'] ?? 'list-view';
			$mayflower_options['staff_picture_toggle']  = $mayflower_options['staff_picture_toggle'] ?? true;
			$mayflower_options['staff_phone_toggle']    = $mayflower_options['staff_phone_toggle'] ?? true;
			$mayflower_options['staff_location_toggle'] = $mayflower_options['staff_location_toggle'] ?? true;
			$mayflower_options['staff_hours_toggle']    = $mayflower_options['staff_hours_toggle'] ?? true;
			$mayflower_options['staff_bio_toggle']      = $mayflower_options['staff_bio_toggle'] ?? true;
			$mayflower_options['staff_more_toggle']     = $mayflower_options['staff_more_toggle'] ?? false;
		} else {
			$mayflower_options['staff_layout']          = $attributes['staffLayout'];
			$mayflower_options['staff_picture_toggle']  = $attributes['staffPictureToggle'];
			$mayflower_options['staff_phone_toggle']    = $attributes['staffPhoneToggle'];
			$mayflower_options['staff_location_toggle'] = $attributes['staffLocationToggle'];
			$mayflower_options['staff_hours_toggle']    = $attributes['staffHoursToggle'];
			$mayflower_options['staff_bio_toggle']      = $attributes['staffBioToggle'];
			$mayflower_options['staff_more_toggle']     = $attributes['staffMoreToggle'];
		}

		require get_template_directory() . '/inc/mayflower-staff/output.php';

		return ob_get_clean();
	} else {
		return '<p class="alert alert-danger">This block is not currently supported by your theme.</p>';
	}

}
