/**
 * BLOCK: Collapsibles
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
const { Fragment } = wp.element;


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


registerBlockType( 'mayflower-blocks/collapsibles', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Collapsibles' ), // Block title.
	icon: 'editor-contract', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'bootstrap-blocks', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [ 'collapse', 'accordion' ],
	description: 'Create accordion-style collapsing modules in a variety of colors.',
	attributes: {
	},
	
	edit: function ({ className }) {

		return [
			<Fragment>
				<p class="block-name">Collapsibles Block</p>
				<div className={className}>
					<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
						<InnerBlocks allowedBlocks = {['mayflower-blocks/collapse']}/>
					</div>
				</div>
			</Fragment>
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

	save: function() {
		return (
			<div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
				<InnerBlocks.Content/>
			</div>
		);
	},

	//Existing bootstrap collapsibles shortcode transformed into its block counterpart.
	//Allows use of [collapsibles][/collapsibles]
	//TODO needs to nest the collapse block
	transforms: {
		from: [
			{
				type: 'shortcode',
				tag: 'collapsibles',
			}
		]
	},
} );
