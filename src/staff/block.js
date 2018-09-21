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
const { registerBlockType, PlainText } = wp.blocks; // Import registerBlockType() from wp.blocks
const { RichText, InspectorControls } = wp.editor;
const { getCurrentPostId } = wp.data;
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
		}
	},


	edit: function ({setAttributes, attributes, className}) {
		// ensure the block attributes matches this plugin's name
		return [
			<InspectorControls> {/* Whatever is inside this block will be displayed on the sidebar */}
				<div>
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
					<CheckboxControl
						label="Display Photos"
						checked={attributes.staffPictureToggle}
						onChange={(staffPictureToggle) => setAttributes({ staffPictureToggle })}
					/>
					<CheckboxControl
						label="Display Phone Number"
						checked={attributes.staffPhoneToggle}
						onChange={(staffPhoneToggle) => setAttributes({ staffPhoneToggle })}
					/>

				</div>
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
		// Rendering in PHP
		return null;
	},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */

	 /*
	attributes: {
		content: {
			type: 'string',
			selector: 'div.content p',
		},
	},

	edit: function ({ className, attributes, setAttributes } ) {
		// Creates a <p class='wp-block-cgb-block-mayflower-blocks'></p>.
		return (
			<div className={ className }>
				<p>— Hello from the backend.</p>
				<p>
					CGB BLOCK: <code>mayflower-blocks</code> is a new Gutenberg block
				</p>
				<p>
					<RichText
						tagName="p"
						className={className}
						value={attributes.content}
						onChange={(content) => setAttributes({ content })}
					/>
				</p>
			</div>
		);
	},
	
	*/

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */

	 /*
	save: function( {attributes} ) {
		return (
			<div>
				<p>Welcome! This is preset text</p>
				<div className="content">
					<RichText.Content tagName="p" value={attributes.content} />
				</div>
			</div>
		);
	},

	*/
	/*
	attributes: {
		content: {
			type: 'string',
		},
	},

	edit({ className, attributes, setAttributes }) {
		return (
			<PlainText
				className={className}
				value={attributes.content}
				onChange={(content) => setAttributes({ content })}
			/>
		);
	},
	save: props => (
		<p>
			{props.attributes.content}
		</p>
	),*/
} );
