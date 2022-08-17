<?php
// Exit if accessed directly.
// if ( ! defined( 'ABSPATH' ) ) {
// 	exit;
// }

function mbg4_child_pages_callback( $attributes ) {
	echo 'I ran!';
	die();

	// Fill in pageID if not set
	$attributes['pageID'] = empty( $attributes['pageID'] ) ? get_the_ID() : $attributes['pageID'];

	ob_start();
	if ( ! empty( $attributes['pageID'] ) ) :
		switch ( $attributes['template'] ) {
			case 'list':
				require get_template_directory() . '/inc/nav-page/list.php';
				break;
			case 'grid':
				require get_template_directory() . '/inc/nav-page/grid.php';
				break;
			case 'fluid-grid':
				require get_template_directory() . '/inc/nav-page/fluid-grid.php';
				//Enqueue scripts directly here when fluid-grid is chosen, so masonry scripts do not error out on other blocks and template options
				wp_enqueue_script( 'imagesloaded' );
				wp_enqueue_script( 'masonry' );
				wp_enqueue_script( 'page-nav-page-fluid-grid', get_template_directory_uri() . '/js/page-nav-page-fluid-grid.js', array( 'wp-blocks', 'wp-element','imagesloaded', 'masonry' ), '', true );
				break;
		}

	else :
		echo '<div class="loading-msg"><img src="/wp-admin/images/loading.gif" alt="Loading Icon" /> Loading preview...</div>';
	endif;
	return ob_get_clean();
}
