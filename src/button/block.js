/**
 * BLOCK: Buttons
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
// import './style.scss';
import './editor.scss';



const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType, PlainText } = wp.blocks; // Import registerBlockType() from wp.blocks
const { RichText, InspectorControls, AlignmentToolbar } = wp.editor;
const { getCurrentPostId } = wp.data;
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


registerBlockType( 'mayflower-blocks/button', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Button' ), // Block title.
	icon: 'shield', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.

	attributes: {
		buttonText: {
			type: 'string',
			selector: 'a'
		},
		buttonLink: {
			type: 'string',
			source: 'attribute',
			selector: 'a',
			attribute: 'href'
		},
		buttonType: {
			type: 'string',
			default: 'default'
		},
		buttonAlign: {
			type: 'string'
		},
		buttonBlock: {
			type: 'boolean',
			default: false
		},
		buttonSize: {
			type: 'string'
		}
	},

	edit: function ({ className, attributes, setAttributes, isSelected }) {
		// Creates a <p class='wp-block-cgb-block-mayflower-blocks'></p>.
		let linkEditor;
		if ( isSelected ) {
			linkEditor = (
				<div className="set-link-href">
					<TextControl
						label="Target Link"
						value={attributes.buttonLink}
						type="url"
						pattern="https://.*"
						help="Please type in a valid URL, starting with https://"
						onChange={(buttonLink) => setAttributes({ buttonLink })}
					/>
				</div>
			);
		}
		return [
			<InspectorControls>
				<SelectControl
					label="Button Style"
					value={attributes.buttonType}
					options={[
						{ label: 'Standard', value: 'default' },
						{ label: 'Primary (BC Blue)', value: 'primary' },
						{ label: 'Info (Light Blue)', value: 'info' },
						{ label: 'Success (Green)', value: 'success' },
						{ label: 'Warning (Orange)', value: 'warning' },
						{ label: 'Danger (Red)', value: 'danger' },
					]}
					onChange={(buttonType) => { 
						setAttributes({ buttonType });
					}}
				/>

				<SelectControl
					label="Button Size"
					value={attributes.buttonSize}
					options={[
						{ label: 'Extra Small', value: 'btn-xs' },
						{ label: 'Small', value: 'btn-sm' },
						{ label: 'Standard', value: '' },
						{ label: 'Large', value: 'btn-lg' },
					]}
					onChange={(buttonSize) => {
						setAttributes({ buttonSize });
					}}
				/>
				
				<ToggleControl
					label="Display as Block (Full-Width)"
					checked={attributes.buttonBlock}
					onChange={(buttonBlock) => setAttributes({ buttonBlock })}
				/>
			</InspectorControls>
			,
			<div className={className}>
				<RichText
					tagName="span"
					className={`btn btn-${attributes.buttonType} ${attributes.buttonBlock ? 'btn-block' : ''} ${attributes.buttonSize}`}
					formattingControls={['bold', 'italic']}
					value={attributes.buttonText}
					onChange={(buttonText) => setAttributes({ buttonText })}
				/>
				{linkEditor}
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
				tagName="a" 
				className={`btn btn-${attributes.buttonType} ${attributes.buttonBlock ? 'btn-block' : ''} ${attributes.buttonSize}`}
				href={attributes.buttonLink}
				value={attributes.buttonText}
			/>
		);
	},

	transforms: {
		from: [
			{
				type: 'shortcode',
				tag: 'button',
				attributes: {
					buttonText: {
						type: 'string',
						shortcode: (attrs, { content }) => {
							let rx = /(?<=\[\s*\s*button.*\])(.*)(?=\[\s*\/\s*button\s*\])/gmi;
							let filtered = content.match(rx);
							return filtered[0];
						},
					},
					buttonLink: {
						type: 'string',
						shortcode: ({ named: { link = 'link' } }) => {
							return link;
						},
					},
					buttonType: {
						type: 'string',
						shortcode: ({ named: { type = 'type' } }) => {
							return type;
						},
					},
					buttonBlock: {
						type: 'boolean',
						shortcode: ({ named: { block = 'block' } }) => {
							if ( true === block || 'true' === block ) {
								return true;
							}
							return false;
						},
					},
					buttonSize: {
						type: 'string',
						shortcode: ({ named: { size = 'size' } }) => {
							return `btn-${size}`;
						},
					}
				},
			}
		]
	}
} );
