import Edit from './edit';
import deprecated from './deprecated';
//import transforms from './transforms';
import save from './save';

import { registerBlockType } from '@wordpress/blocks'; // Import registerBlockType() from wp.blocks

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'mayflower-blocks/tab-content', {
	edit: Edit,
	deprecated,
	save,
} );
