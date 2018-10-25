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
const { ServerSideRender, TextControl, CheckboxControl, Disabled, SelectControl } = wp.components;
const { InspectorControls } = wp.editor;
const { Fragment, Component } = wp.element;

import ClassSubjectSelect from './ClassSubjectSelect';
import ClassItemSelect from './ClassItemSelect';

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
		description: {
			type: 'boolean',
		},
	},

	//Existing single course description shortcode transformed into its block counterpart.
	//Allows use of [coursedescription]
	transforms: {
		from: [
			{
				type: 'shortcode',
				tag: 'coursedescription',
				attributes: {
					subject: {
						type: 'string',
						shortcode: ( { named: { subject } } ) => {
							return subject;
						},
					},
					item: {
						type: 'string',
						shortcode: ( { named: { item } } ) => {
							return item;
						},
					},
					description: {
						type: 'boolean',
						shortcode: ( { named: { description } } ) => {
							return description;
						},
					}
				},
			},
		]
	},
	
	edit: function ({setAttributes, attributes, className, isSelected}) {
		
		// Update attributes from within children components
		const handleSubjectUpdate = (newSubject) => {
			setAttributes({subject: newSubject});
		}
		const handleItemUpdate = (newItem) => {
			setAttributes({item: newItem});
		}

		let selectControls;
		if (isSelected) {
			selectControls = (
			<div class="controls">
				<ClassSubjectSelect
					attributes = {attributes}
					onSubjectUpdate = {handleSubjectUpdate}
				/>
				<ClassItemSelect
					attributes = {attributes}
					onItemUpdate = {handleItemUpdate}
				/>
			</div>
			)
		}

		return (
			<Fragment>
				<InspectorControls>
					<CheckboxControl
						label="Display Course Description"
						checked={attributes.description}
						onChange={(description) => setAttributes({ description })}
					/>
				</InspectorControls>

				<div class={className}>

					{ selectControls }
					
					<Disabled>
						<ServerSideRender
							block="mayflower-blocks/course"
							attributes= { attributes }
						/>
					</Disabled>
				</div>
			</Fragment>
		);
	},

	save() {
		// Rendering in PHP
		return null;
	},
} );
