<?php
/**
 * Plugin Name: Mayflower Blocks (G4)
 * Plugin URI: https://github.com/bellevuecollege/mayflower-blocks
 * Description: Companion Gutenberg Blocks for BC Mayflower Theme
 * Author: BC Integration (Taija, Angela, Elizabeth)
 * Author URI: https://www.bellevuecollege.edu
 * Version: 3.2.0-dev1 #{versionStamp}#
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
$theme = wp_get_theme(); // gets the current theme!
if (
	'Mayflower G4' === $theme->name ||
	'Mayflower G4' === $theme->parent_theme ||
	'Mayflower G5' === $theme->name ||
	'Mayflower G5' === $theme->parent_theme ||
	'Bellevue 2022' === $theme->name ||
	'Bellevue 2022' === $theme->parent_theme
	) {
	/**
	 * Block Initializer.
	 */
	add_action( 'init', 'mg4_blocks_init' );
	add_filter( 'block_categories_all', 'mbg4_block_categories', 10, 2 );
}

/**
 * Load the blocks!
 *
 * Note- all blocks must be registered here.
 *
 * @return void
 */
function mg4_blocks_init() {
	/** List of blocks - should match folder names */

	// Dynamic Blocks.
	mbg4_register_block( 'child-pages', true );
	mbg4_register_block( 'course', true );

	// Static Blocks.
	mbg4_register_block( 'alert' );
	mbg4_register_block( 'button' );
	mbg4_register_block( 'panel' );
	mbg4_register_block( 'jumbotron' );
	mbg4_register_block( 'lead' );
	mbg4_register_block( 'well' );

	// Multi-Block Structures
	// Blocks for Row/Columns.
	mbg4_register_block( 'row' );
	mbg4_register_block( 'column' );

	// All the blocks for the Tab block.
	mbg4_register_block( 'tab-content-panel' );
	mbg4_register_block( 'tab-content' );
	mbg4_register_block( 'tab-list-tab' );
	mbg4_register_block( 'tab-list' );
	mbg4_register_block( 'tabs' );

	// Blocks for the Collapse block.
	mbg4_register_block( 'collapse' );
	mbg4_register_block( 'collapsibles' );

	// Specialized Blocks.

	/**
	 * Register Staff List block if Mayflower is active and Staff List is enabled.
	 */
	if ( function_exists( 'mayflower_get_option' ) && true === mayflower_get_option( 'staff_toggle' ) ) {
		mbg4_register_block( 'staff-list', true );
	}

	/**
	 * Only Register TablePress block if TablePress is active.
	 */
	if ( ! function_exists( 'is_plugin_active' ) ) {
		include_once ABSPATH . 'wp-admin/includes/plugin.php';
	}

	if ( is_plugin_active( 'tablepress/tablepress.php' ) ) {
		mbg4_register_block( 'tablepress', true );
	}

}

/**
 * Register blocks
 *
 * @param string  $block_name Name of the block.
 * @param boolean $dynamic Is the block dynamic?
 * @return void
 *
 * Registers static and dynamic blocks
 */
function mbg4_register_block( $block_name, $dynamic = false ) {
	$path = dirname( __FILE__ ) . "/blocks/$block_name";
	if ( $dynamic ) {
		require "$path/src/block.php";
		register_block_type(
			"$path/build/block.json",
			array(
				'render_callback' => 'mbg4_' . str_replace( '-', '_', $block_name ) . '_callback',
			)
		);
	} else {
		register_block_type( "$path/build/block.json" );
	}
}


/**
 * Create a 'Bootstrap Blocks' category
 *
 * @param array  $categories Array of categories.
 * @param object $post Post object.
 * @return string
 */
function mbg4_block_categories( $categories, $post ) {
	return array_merge(
		$categories,
		array(
			array(
				'slug'  => 'bootstrap-blocks',
				'title' => __( 'Bootstrap Blocks', 'bootstrap-blocks' ),
				'icon'  => 'editor-bold',
			),
		)
	);
}
