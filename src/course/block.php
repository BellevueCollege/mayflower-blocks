<?php

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
function mfb_get_course( $subject = 'ACCT&', $course = 'ACCT 201' ) {
	
	$base_url = 'http://www.bellevuecollege.edu/classes/All/';


	if ( ! empty( $course ) && ! empty( $subject ) ) {
		//error_log("course :".$course);
		$course_split = explode( ' ', $course );
		$course_id = array_key_exists( 1, $course_split ) ? $course_split[1] : $course;
		$subject = trim( html_entity_decode( $subject ) );
		$url = $base_url . $subject . '/' . $course_id . "?format=json";
		$json = wp_remote_get( $url );

		// Verify components exist
		if ( ! empty( $json ) && ! empty( $json['body'] ) ) {
			//$html = decodejsonClassInfo( $json['body'], $course_id,$description );
			//return $html;
			return json_decode( $json['body'] );
		}
	}
	return null;
}



function mayflower_blocks_render_block_course( $attributes, $content ) {

	$course = mfb_get_course( $attributes['subject'], $attributes['item'] );

	$raw_course_data = print_r($course, true);

	$course_id = $course->Courses[0]->CourseID;
	$course_title = $course->Courses[0]->Title;
	$course_desc = $course->Courses[0]->Descriptions[0]->Description;

	$output = "<h2>$course_id - $course_title</h2> <p>$course_desc</p><hr /><pre>$raw_course_data</pre>";

	return $output;
}

register_block_type( 'mayflower-blocks/course', array(
	'attributes'      => array(
		'subject'    => array(
			'type'    => 'string'
		),
		'item'    => array(
			'type'    => 'string'
		),
	),
	'render_callback' => 'mayflower_blocks_render_block_course',
) );