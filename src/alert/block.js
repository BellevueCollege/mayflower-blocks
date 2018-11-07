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
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { RichText, InspectorControls, InnerBlocks } = wp.editor;
const { SelectControl } = wp.components;



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
	//Allows use of [alert type=""][/alert]
	transforms: {
		from: [
			{
				type: 'shortcode',
				tag: 'alert',
				attributes: {
					// Alert Text
					alertText: {
						type: 'string',
						shortcode: (attrs, { content }) => {
							// Content returns the whole shortcode, so we need to match only shortcode content
							let rx = /(?<=\[\s*\s*alert.*\])(.*)(?=\[\s*\/\s*alert\s*\])/gmi;
							let filtered = content.match(rx);

							// Return content at array[0] if there was a match, otherwise return blank string
							return Array.isArray(filtered) ? filtered[0] : '';
						},
					},

					// Alert Type/Bootstrap Class
					alertClass: {
						type: 'string',
						shortcode: ({ named: { type = 'type' } }) => {
							return type;
						},
					},
				},
			}
		]
	},

	edit: function ({ className, attributes, setAttributes }) {

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
				<div className = {`alert alert-${attributes.alertClass}`}>
					<RichText
						tagName = "div"
						formattingControls = {['bold', 'italic', 'link']}
						placeholder = "Enter text or add blocks below..."
						keepPlaceholderOnFocus = "true"
						value = {attributes.alertText}
						onChange = {(alertText) => setAttributes({ alertText })}
					/>
					<InnerBlocks />
				</div>
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
			<div className = {`alert alert-${attributes.alertClass}`}>
				<RichText.Content
					tagName = "div"
					value = {attributes.alertText}
				/>
				<InnerBlocks.Content />
			</div>
		);
	},
} );
