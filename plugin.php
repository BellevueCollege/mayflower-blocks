<?php
/**
 * Plugin Name: Mayflower Blocks (G4)
 * Plugin URI: https://github.com/ahmadawais/create-guten-block/
 * Description: Companion Gutenberg Blocks for BC Mayflower Theme
 * Author: BC Integration (Thanks to mrahmadawais, maedahbatool)
 * Author URI: https://www.bellevuecollege.edu
 * Version: 2.4.2 #{versionStamp}#
 * License: GPL2+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Only load if Mayflower G4 is active.
 */
$theme = wp_get_theme(); // gets the current theme
if ( 'Mayflower G4' === $theme->name || 'Mayflower G4' === $theme->parent_theme ) {
	/**
	 * Block Initializer.
	 */
	add_action( 'init', 'mg4_blocks_init' );
}

/**
 * Load the blocks!
 *
 * Note- all blocks must be registered here.
 */
function mg4_blocks_init() {
	/** List of blocks - should match folder names */
	//mg4_register_block( 'child-pages', true );
	require_once dirname( __FILE__ ) . '/blocks/child-pages/src/block.php';
	register_block_type(
		dirname( __FILE__ ) . '/blocks/child-pages/build/block.json',
		array(
			'render_callback' => 'mbg4_child_pages_callback',
		)
	);
	mg4_register_block( 'alert' );
	mg4_register_block( 'button' );
	mg4_register_block( 'panel' );
	mg4_register_block( 'jumbotron' );
	//mg4_register_block( 'child-pages' );


}

/**
 * Register blocks
 *
 * @param string $block_name
 * @peram boolean $dynamic
 * @return void
 *
 * Registers static and dynamic blocks
 */
function mg4_register_block( $block_name, $dynamic = false ) {
	$path = dirname( __FILE__ ) . "/blocks/$block_name";
	if ( $dynamic ) {
		require "$path/src/block.php";
		register_block_type(
			"$path/build/block.json",
			array(
				'render_callback' => 'mg4_' . str_replace( '-', '_', $block_name ) . '_callback',
			)
		);
	} else {
		register_block_type( "$path/build/block.json" );
	}
}


/**
 * Create a 'Bootstrap Blocks' category
 */
add_filter( 'block_categories_all', 'mayflower_block_categories', 10, 2 );

function mayflower_block_categories( $categories, $post ) {
	return array_merge(
		$categories,
		array(
			array(
				'slug' => 'bootstrap-blocks',
				'title' => __( 'Bootstrap Blocks', 'bootstrap-blocks' ),
				'icon'  => 'editor-bold',
			),
		)
	);
}

