/**
 * BLOCK: Buttons
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

// Import CSS.
// import './style.scss';
import './editor.scss';



const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType, PlainText } = wp.blocks; // Import registerBlockType() from wp.blocks
const { RichText, InspectorControls, AlignmentToolbar } = wp.editor;
const { ServerSideRender, TextControl, SelectControl, ToggleControl } = wp.components;



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


registerBlockType( 'mayflower-blocks/alert', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Alert' ), // Block title.
	icon: 'warning', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'bootstrap-blocks', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.

	attributes: {
		alertText: {
			type: 'string',
		},
		alertClass: {
			type: 'string',
			default: 'info'
		}
	},
	
	//Existing bootstrap alert shortcode transformed into its block counterpart.
	//Allows use of [alert type=""]
	transforms: { //fix shortcode
		from: [
			{
				type: 'shortcode',
				tag: 'alert',
				attributes: {
					// alertText: {
					// 	type: 'string',
					// 	selector: '.alert',
					// },
					alertClass: {
						type: 'string',
						shortcode: ({ named: { type } }) => {
							return type;
						},
					},
				},
			}
		]
	},

	edit: function ({ className, attributes, setAttributes, isSelected }) {

		return [
			<InspectorControls>
				<SelectControl
					label="Alert Style"
					value={attributes.alertClass}
					options={[
						{ label: 'Info (Light Blue)', value: 'info' },
						{ label: 'Success (Green)', value: 'success' },
						{ label: 'Warning (Yellow)', value: 'warning' },
						{ label: 'Danger (Red)', value: 'danger' },
					]}
					onChange={(alertClass) => { 
						setAttributes({ alertClass });
					}}
				/>
			</InspectorControls>
			,
			<div className={className}>
				<RichText
					tagName = "div"
					className = {`alert alert-${attributes.alertClass}`}
					formattingControls = {['bold', 'italic', 'link']}
					placeholder = "Enter text, links or blocks for the alert..."
					keepPlaceholderOnFocus = "true"
					value = {attributes.alertText}
					onChange = {(alertText) => setAttributes({ alertText })}
				/>
			</div>
		]
	},


	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */

	save: function( {attributes} ) {
		return (
			<RichText.Content
				tagName = "div"
				className = {`alert alert-${attributes.alertClass}`}
				value = {attributes.alertText}
			/>
		);
	},
} );
