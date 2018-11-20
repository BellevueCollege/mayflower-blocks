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
const { RichText, InspectorControls } = wp.editor;
const { SelectControl, ToggleControl } = wp.components;



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


registerBlockType( 'mayflower-blocks/panel', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Panel' ), // Block title.
	icon: 'align-center', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'bootstrap-blocks', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.

	attributes: {
		panelText: {
			type: 'string',
		},
		panelType: {
			type: 'string',
			default: 'default'
		},
		panelHeading: {
			type: 'boolean',
			default: true
		},
		panelHeadingText: {
			type: 'string'
		},
		panelFooter: {
			type: 'boolean',
			default: true
		},
		panelFooterText: {
			type: 'string'
		}
	},
	
	//Existing bootstrap panel shortcode transformed into its block counterpart.
	//Allows use of [panel type="" heading="" footer=""][/panel]
	transforms: {
		from: [
			{
				type: 'shortcode',
				tag: 'panel',
				attributes: {
					// Panel Text
					panelText: {
						type: 'string',
						shortcode: (attrs, { content }) => {
							// Content returns the whole shortcode, so we need to match only shortcode content
							let rx = /(?<=\[\s*\s*panel.*\])(.*)(?=\[\s*\/\s*panel\s*\])/gmi;
							let filtered = content.match(rx);

							// Return content at array[0] if there was a match, otherwise return blank string
							return Array.isArray(filtered) ? filtered[0] : '';
						},
					},

					// Panel Type/Bootstrap Class
					panelType: {
						type: 'string',
						shortcode: ({ named: { type } }) => {
							return type;
						},
					},

					//Panel Header
					panelHeadingText: {
						type: 'string',
						shortcode: ({ named: { heading } }) => {
							return heading;
						},
					},

					//Panel Footer
					panelFooterText: {
						type: 'string',
						shortcode: ({ named: { footer } }) => {
							return footer;
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
					label="Panel Style"
					value={attributes.panelType}
					options={[
						{ label: 'Standard', value: 'default' },
						{ label: 'Primary (BC Blue)', value: 'primary' },
						{ label: 'Info (Light Blue)', value: 'info' },
						{ label: 'Success (Green)', value: 'success' },
						{ label: 'Warning (Yellow)', value: 'warning' },
						{ label: 'Danger (Red)', value: 'danger' },
					]}
					onChange={(panelType) => { 
						setAttributes({ panelType });
					}}
				/>

				<ToggleControl
					label="Toggle Panel Heading"
					checked={attributes.panelHeading}
					onChange={(panelHeading) => setAttributes({ panelHeading })}
				/>
					
				<ToggleControl
					label="Toggle Panel Footer"
					checked={attributes.panelFooter}
					onChange={(panelFooter) => setAttributes({ panelFooter })}
				/>
			</InspectorControls>
			,
			<div className={className}>
				<div className = {`panel panel-${attributes.panelType}`}>

					{attributes.panelHeading == true ? 
						<div className = "panel-heading">
							<RichText
								tagName = "div"
								formattingControls = {['bold', 'italic', 'link']}
								placeholder = "Enter heading text..."
								keepPlaceholderOnFocus = "true"
								value = {attributes.panelHeadingText}
								onChange = {(panelHeadingText) => setAttributes({ panelHeadingText })}
							/>
						</div>
					: ''}

					<RichText
						tagName = "div"
						className = "panel-body"
						formattingControls = {['bold', 'italic', 'link']}
						placeholder = "Enter text..."
						keepPlaceholderOnFocus = "true"
						value = {attributes.panelText}
						onChange = {(panelText) => setAttributes({ panelText })}
					/>

					{attributes.panelFooter == true ? 
						<div className = "panel-footer">
							<RichText
								tagName = "div"
								formattingControls = {['bold', 'italic', 'link']}
								placeholder = "Enter footer text..."
								keepPlaceholderOnFocus = "true"
								value = {attributes.panelFooterText}
								onChange = {(panelFooterText) => setAttributes({ panelFooterText })}
							/>
						</div>
					: ''}
					
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
			<div className = {`panel panel-${attributes.panelType}`}>

				{attributes.panelHeading == true ? 
					attributes.panelHeadingText == null || attributes.panelHeadingText == '' ? '' :
					<div className = "panel-heading">
						<RichText.Content
							tagName = "div"
							value = {attributes.panelHeadingText}
						/>
					</div>
				: ''}

				<RichText.Content
					tagName = "div"
					className = "panel-body"
					value = {attributes.panelText}
				/>

				{attributes.panelFooter == true ?
					attributes.panelFooterText == null || attributes.panelFooterText == '' ? '' :
					<div className = "panel-footer">
						<RichText.Content
							tagName = "div"
							value = {attributes.panelFooterText}
						/>
					</div>
				: ''}

			</div>
		);
	},
} );
