<?php
// if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Get table data from WP options and match the tables against passed attributes
function mbg4_tablepress_callback( $attributes ) {
	if ( isset( $attributes['postId'] ) || isset( $attributes['tableId'] ) ) {
		$tablepress_options     = json_decode( get_option( 'tablepress_tables' ) );
		$tablepress_table_posts = $tablepress_options->table_post;
		$tables_array           = get_object_vars( $tablepress_table_posts );

		if ( 'select' !== $attributes['postId'] ) {
				$table_id = array_search( $attributes['postId'], $tables_array );
				return do_shortcode( '[table id=' .  $table_id . '/]' );
		} elseif ( isset( $attributes['tableId'] ) ) {
			return do_shortcode( '[table id=' . $attributes['tableId'] . '/]' );
		}
	}
}

/**
 * Add REST API support to TablePress to query through all tables in editor
 */
add_filter( 'register_post_type_args', 'register_tablepress_table', 10, 2 );

function register_tablepress_table( $args, $post_type ) {
	if ( 'tablepress_table' === $post_type ) {
		$args['show_in_rest'] = true;
	}
	return $args;
}

