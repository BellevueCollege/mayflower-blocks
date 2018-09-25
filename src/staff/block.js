/**
 * BLOCK: Child Pages
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';



const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { InspectorControls } = wp.editor;
const { ServerSideRender, SelectControl, CheckboxControl } = wp.components;



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


registerBlockType( 'mayflower-blocks/staff-list', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Staff List' ), // Block title.
	icon: 'admin-users', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.

	attributes: {
		staffLayout: {
			type: 'string'
		},
		staffPictureToggle: {
			type: 'boolean'
		},
		staffPhoneToggle: {
			type: 'boolean'
		},
		staffLocationToggle: {
			type: 'boolean'
		},
		staffHoursToggle: {
			type: 'boolean'
		},
		staffBioToggle: {
			type: 'boolean'
		},
		staffMoreToggle: {
			type: 'boolean'
		}
	},


	edit: function ({setAttributes, attributes, className}) {
		// ensure the block attributes matches this plugin's name

		// Selective display of options
		let listElements, moreLink;

		// Options specific to List View
		if ( attributes.staffLayout === 'list-view' ) {
			listElements = (
				<div>
					<CheckboxControl
						label="Phone Number (List View)"
						checked={attributes.staffPhoneToggle}
						onChange={(staffPhoneToggle) => setAttributes({ staffPhoneToggle })}
					/>
					<CheckboxControl
						label="Office Location (List View)"
						checked={attributes.staffLocationToggle}
						onChange={(staffLocationToggle) => setAttributes({ staffLocationToggle })}
					/>
					<CheckboxControl
						label="Office Hours (List View)"
						checked={attributes.staffHoursToggle}
						onChange={(staffHoursToggle) => setAttributes({ staffHoursToggle })}
					/>
					<CheckboxControl
						label="Biography (List View)"
						checked={attributes.staffBioToggle}
						onChange={(staffBioToggle) => setAttributes({ staffBioToggle })}
					/>
				</div>
			);
		}

		// Display More Link in Grid View or when Bio is unchecked
		if (!attributes.staffBioToggle || attributes.staffLayout === 'grid-view') {
			moreLink = (
				<CheckboxControl
					label="'More' Link"
					checked={attributes.staffMoreToggle}
					onChange={(staffMoreToggle) => setAttributes({ staffMoreToggle })}
				/>
			);
		}
		
		// Build return
		return [
			<InspectorControls>
				<SelectControl
					label="Staff Layout"
					value={attributes.staffLayout}
					options={[
						{ label: 'Use Customizer Setting', value: '' },
						{ label: 'List Layout', value: 'list-view' },
						{ label: 'Grid Layout', value: 'grid-view' }
					]}
					onChange={(staffLayout) => setAttributes({ staffLayout })}
				/>
				<fieldset>
					<legend>Elements to Display</legend>
					<CheckboxControl
						label="Staff Photos"
						checked={attributes.staffPictureToggle}
						onChange={(staffPictureToggle) => setAttributes({ staffPictureToggle })}
					/>
					{listElements}
					{moreLink}
				</fieldset>
			</InspectorControls>
			,
			<div class={className}>
				<ServerSideRender
					block="mayflower-blocks/staff-list"
					attributes= { attributes }
				/>
			</div>
		]
	},

	save() {
		// Rendering in block.php
		return null;
	},
} );
