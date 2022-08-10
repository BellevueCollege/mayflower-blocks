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

$theme = wp_get_theme(); // gets the current theme
if ( 'Mayflower G4' === $theme->name || 'Mayflower G4' === $theme->parent_theme ) {
	/**
	 * Block Initializer.
	 */
	add_action( 'init', 'mayflower_g4_blocks_init' );
}

function mayflower_g4_blocks_init() {
	/** List of blocks - should match folder names */
	$blocks = array(
		'alert',
		'button',
		'panel',
		'jumbotron',
	);
	foreach ( $blocks as $block ) {
		register_block_type( dirname( __FILE__ ) . "/$block/build/block.json" );
	}
}

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
add_filter( 'block_categories_all', 'mayflower_block_categories', 10, 2 );
