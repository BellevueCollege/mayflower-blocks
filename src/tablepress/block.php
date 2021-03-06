<?php
// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Get table data from WP options and match the tables against passed attributes
function mayflower_blocks_render_block_tablepress( $attributes ) {
    $tablepress_options = json_decode(get_option('tablepress_tables'));
    $tablepress_table_posts = $tablepress_options->table_post;
    $tables_array = get_object_vars($tablepress_table_posts);

    if ($attributes['postId'] && $attributes['postId'] !== 'select') {
            $table_id = array_search($attributes['postId'], $tables_array);
            return do_shortcode('[table id=' .  $table_id . '/]');
    } else if ($attributes['tableId']) {
        return do_shortcode('[table id=' .  $attributes['tableId'] . '/]');
    } else {
        return '<!-- Notice: Tablepress tables are available -->';
    }
}

register_block_type( 'mayflower-blocks/tablepress', 
    array( 
        'attributes'      => array(
            'postId'      => array(
                'type'    => 'string'
            ),
            'tableId'      => array(
                'type'    => 'string'
            ),
            'select'      => array(
                'type'    => 'boolean'
            ),
        ),
	'render_callback' => 'mayflower_blocks_render_block_tablepress',
) );

/**
 * Add REST API support to TablePress to query through all tables in editor
 */
add_filter( 'register_post_type_args', 'my_post_type_args', 10, 2 );
 
function my_post_type_args( $args, $post_type ) {
    if ( 'tablepress_table' === $post_type ) {
        $args['show_in_rest'] = true;
    }
    return $args;
}