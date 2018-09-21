<?php

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function mayflower_blocks_render_block_child_pages( $attributes, $content ) {
	$recent_posts = wp_get_recent_posts( array(
		'numberposts' => 1,
		'post_status' => 'publish',
	) );
	if ( count( $recent_posts ) === 0 ) {
		return 'No posts';
	}
	$post = $recent_posts[ 0 ];
	$post_id = $post['ID'];
	return 'attributes: ' . print_r($attributes, true) . '  |  '. get_the_ID();
}

register_block_type( 'mayflower-blocks/child-pages', array(
	'attributes'      => array(
		'pageID'    => array(
			'type'    => 'number'
		),
	),
	'render_callback' => 'mayflower_blocks_render_block_child_pages',
) );