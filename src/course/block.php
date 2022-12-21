<?php

function mbg4_course_callback( $attributes ) {
	require_once dirname( __FILE__ ) . '/class-course.php';

	$course = new Mayflower_Blocks_Course(
		$attributes['subject'] ? wp_specialchars_decode( $attributes['subject'] ) : null,
		$attributes['item'] ?? null,
		$attributes['description'] ?? null,
		$attributes['headingTag'] ?? 'h2',
	);
	return $course->output();
}
