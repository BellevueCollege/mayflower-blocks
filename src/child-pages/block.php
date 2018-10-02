<?php
// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function mayflower_blocks_render_block_child_pages( $attributes, $content ) {
	$attributes['pageID'] = empty( $attributes['pageID'] ) ? get_the_ID() : $attributes['pageID'];
	
	ob_start(); ?>
	<?php if ( ! empty( $attributes['pageID'] ) ) : 
		switch ( $attributes['template'] ) {
			case 'list':
				require get_template_directory() . '/inc/nav-page/list.php';
				break;
			case 'grid':
				require get_template_directory() . '/inc/nav-page/grid.php';
				break;
			case 'fluid-grid':
				require get_template_directory() . '/inc/nav-page/fluid-grid.php';
				break;
		}
		
	else: 
		echo '<div class="loading-msg"><img src="/wp-admin/images/loading.gif" alt="Loading Icon" /> Loading preview...</div>';
	endif;
	return ob_get_clean();
}

register_block_type( 'mayflower-blocks/child-pages', array(
	'attributes'      => array(
		'pageID'    => array(
			'type'    => 'string'
		),
		'template'  => array(
			'type' => 'string',
			'default' => 'list',
		),
	),
	'render_callback' => 'mayflower_blocks_render_block_child_pages',
) );

add_action( 'enqueue_block_assets', 'mayflower_blocks_enqueue_script_child_pages' );

function mayflower_blocks_enqueue_script_child_pages () {
	wp_enqueue_script( 'wp-api' );
	// wp_enqueue_script( 'imagesloaded' );
	// wp_enqueue_script( 'masonry' );
	// wp_enqueue_script( 'page-nav-page-fluid-grid', get_template_directory_uri() . '/js/page-nav-page-fluid-grid.js', array( 'wp-blocks', 'wp-element','imagesloaded', 'masonry' ), '', true );
}
