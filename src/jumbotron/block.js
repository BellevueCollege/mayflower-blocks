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
const { RichText, InnerBlocks } = wp.editor;



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


registerBlockType( 'mayflower-blocks/jumbotron', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Jumbotron' ), // Block title.
	icon: 'editor-table', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'bootstrap-blocks', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.

	attributes: {
		jumbotronText: {
			type: 'string',
		},
		jumbotronTitle: {
			type: 'string',
		}
	},
	
	//Existing bootstrap jumbotron shortcode transformed into its block counterpart.
	//Allows use of [jumbotron title=""][/jumbotron]
	transforms: {
		from: [
			{
				type: 'shortcode',
				tag: 'jumbotron',
				attributes: {
					// Jumbotron Text
					jumbotronText: {
						type: 'string',
						shortcode: (attrs, { content }) => {
							// Content returns the whole shortcode, so we need to match only shortcode content
							let filtered = content.replace(/(\[jumbotron.*?\]\s*)|(\s*\[\/jumbotron\])/gmi, '');
							
							// Return filtered content if there was a match, otherwise return blank string
							return filtered ? filtered : '';
						},
					},

					// Jumbotron Type/Bootstrap Class
					jumbotronTitle: {
						type: 'string',
						shortcode: ({ named: { title = 'title' } }) => {
							return title;
						},
					},
				},
			}
		]
	},

	edit: function ({ className, attributes, setAttributes }) {

		return [
			<div className={className}>
				<div className = 'jumbotron'>
					<RichText
						tagName = "h1"
						formattingControls = {['bold', 'italic', 'link']}
						placeholder = "Enter a headline..."
						keepPlaceholderOnFocus = "true"
						value = {attributes.jumbotronTitle}
						onChange = {(jumbotronTitle) => setAttributes({ jumbotronTitle })}
					/>
					{attributes.jumbotronText !== null && attributes.jumbotronText !== '' && attributes.jumbotronText !== undefined ? 
						<RichText
							tagName = "p"
							formattingControls = {['bold', 'italic', 'link']}
							placeholder = "Enter text or add blocks below..."
							keepPlaceholderOnFocus = "true"
							value = {attributes.jumbotronText}
							onChange = {(jumbotronText) => setAttributes({ jumbotronText })}
						/>
					: '' }
					<InnerBlocks allowedBlocks = {[ 'core/paragraph', 'mayflower-blocks/button', 'core/heading', 'core/list']}/>
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
			<div className = 'jumbotron'>
				<RichText.Content
					tagName = "h1"
					value = {attributes.jumbotronTitle}
				/>
				<RichText.Content
					tagName = "p"
					value = {attributes.jumbotronText}
				/>
				<InnerBlocks.Content />
			</div>
		);
	},
} );
