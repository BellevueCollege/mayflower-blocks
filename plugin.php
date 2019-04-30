<?php
/**
 * Plugin Name: Mayflower Blocks
 * Plugin URI: https://github.com/ahmadawais/create-guten-block/
 * Description: Companion Gutenberg Blocks for BC Mayflower Theme
 * Author: BC Integration (Thanks to mrahmadawais, maedahbatool)
 * Author URI: https://www.bellevuecollege.edu
 * Version: 1.1 #{versionStamp}#
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
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
