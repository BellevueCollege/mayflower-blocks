/**
 * BLOCK: Tab-Panel
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

// Import CSS.
// import './style.scss';
import './editor.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType, getBlockDefaultClassName } = wp.blocks; // Import registerBlockType() from wp.blocks
const { InnerBlocks } = wp.editor;
const { Fragment } = wp.element;
const { createHigherOrderComponent } = wp.compose;

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

// Creates a higher order component(HOC) to properly wrap the tab content panel block with the
// corresponding bootstrap and CSS classes and prevent block stacking
const mayflowerBlocksPanel = createHigherOrderComponent( ( BlockListBlock ) => {
	return ( props ) => {
		if (props.attributes.tabId && props.name == 'mayflower-blocks/tab-content-panel'){
			return <div role="tabpanel" className={`tab-pane ${props.attributes.tabActive ? 'active' : ''}`} id={props.attributes.tabId}><BlockListBlock { ...props }/></div>;
		} else {
			return <BlockListBlock { ...props } />;
		}
	};
}, 'mayflowerBlocksPanel' );

// Hook the HOC to replace the wrapping div for tab content panel blocks
wp.hooks.addFilter( 'editor.BlockListBlock', 'mayflower-blocks/tab-content-panel', mayflowerBlocksPanel );

registerBlockType( 'mayflower-blocks/tab-content-panel', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Tab Content Panel' ), // Block title.
	icon: 'category', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'bootstrap-blocks', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	parent: ['mayflower-blocks/tab-content'],

	attributes: {
		tabActive: {
			type: 'boolean',
			default: false
		},
		tabDefault: {
			type: 'boolean',
			default: false
		},
		tabId: {
			type: 'string',
			default: ''
		},
	},
	
	edit: function () {

		return [
			<Fragment>
				<InnerBlocks/>
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

	save: function( { attributes } ) {
		const className = getBlockDefaultClassName('mayflower-blocks/tab-content-panel');
		return (		
			<div role="tabpanel" className={`${className} tab-pane${attributes.tabDefault == true ? ' active' : ''}`} id={attributes.tabId}>
				<InnerBlocks.Content/>
			</div>
		);
	},
} );
