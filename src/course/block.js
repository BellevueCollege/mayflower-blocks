/**
 * BLOCK: Course Information
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';



const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { ServerSideRender, TextControl } = wp.components;
const { InspectorControls } = wp.editor;

import {Fragment} from 'react';



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


registerBlockType( 'mayflower-blocks/course', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'BC Course' ), // Block title.
	icon: 'welcome-learn-more', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.

	attributes: {
		subject: {
			type: 'string',
		},
		item: {
			type: 'string',
		},
	},

	edit: function ({setAttributes, attributes, className, isSelected}) {
		// ensure the block attributes matches this plugin's name
		let editBlock;
		if ( isSelected ) {
			editBlock = (
				<div class="controls">
					<TextControl
						label="Subject"
						value={attributes.subject}
						onChange={(subject) => setAttributes({ subject })}
					/>
					<TextControl
						label="Item"
						value={attributes.item}
						onChange={(item) => setAttributes({ item })}
					/>
				</div>
			)
		}

		return (
			<Fragment>
				<div class={className}>
					{editBlock}
					<ServerSideRender
						block="mayflower-blocks/course"
						attributes= { attributes }
					/>
				</div>
			</Fragment>
		);
	},

	save() {
		// Rendering in PHP
		return null;
	},
} );
