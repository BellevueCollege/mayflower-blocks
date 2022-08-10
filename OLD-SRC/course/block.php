<?php

require( plugin_dir_path( __FILE__ ) . 'class-course.php');

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function mayflower_blocks_render_block_course( $attributes, $content ) {
	$course = new Mayflower_Blocks_Course( wp_specialchars_decode($attributes['subject']), $attributes['item'], $attributes['description'], $attributes['headingTag'] );
	return $course->output();
}

register_block_type( 'mayflower-blocks/course', array(
	'attributes'      => array(
		'subject'    => array(
			'type'    => 'string'
		),
		'item'    => array(
			'type'    => 'string'
		),
		'description' => array(
			'type' => 'boolean'
		),
		'headingTag' => array(
			'type'    => 'string',
			'default' => 'h2',
		)
	),
	'render_callback' => 'mayflower_blocks_render_block_course',
) );
