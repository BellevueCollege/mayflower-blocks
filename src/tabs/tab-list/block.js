/**
 * BLOCK: Collapse
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

// Import CSS.
// import './style.scss';
import './editor.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType, getBlockDefaultClassName } = wp.blocks; // Import registerBlockType() from wp.blocks
const { InnerBlocks } = wp.blockEditor;
const { Button, Dashicon } = wp.components;
const { select, dispatch } = wp.data;
const { createBlock } = wp.blocks;

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

registerBlockType( 'mayflower-blocks/tab-list', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Tab List' ), // Block title.
	icon: 'category', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'bootstrap-blocks', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	parent: [ 'mayflower-blocks/tabs' ],

	attributes: {
	},

	edit: function( { clientId, className } ) {
		// Get the current tab-list block with the clientId
		const currentBlockData = select( 'core/block-editor' ).getBlock( clientId );

		/**
		 * Adds a Tab Block (child) as an innerblock to the Tab List Block (parent).
		 *
		 * Also adds a corresponding panel with the tab clientId and updates the tab with it's clientId.
		 */
		const addTab = () => {
			const currentBlockDataInnerBlocks = currentBlockData.innerBlocks.length;
			// Create a tab to put into tab list
			const tabBlock = createBlock( 'mayflower-blocks/tab-list-tab', { tabActive: currentBlockDataInnerBlocks === 0 ? true : false, tabDefault: currentBlockDataInnerBlocks === 0 ? true : false }, [] );
			// Add new tab into tab list
			dispatch( 'core/block-editor' ).insertBlock( tabBlock, currentBlockData.innerBlocks.length, clientId );
			// Add new panel and update the panel and tab with the clientId of that tab so that they connect to each other
			addPanel( tabBlock.clientId );
			updateTab( tabBlock.clientId );

			// Select new block after adding to prevent selecting panel block
			dispatch( 'core/block-editor' ).selectBlock( tabBlock.clientId );
		};

		/**
		 * Updates the Tab's attribute 'tabId' with it's clientId.
		 *
		 * Ensures that the Tab keeps a persistent id between refreshes.
		 * @param {string} tabClientId Client ID of the tab
		 */
		const updateTab = ( tabClientId ) => {
			dispatch( 'core/block-editor' ).updateBlockAttributes( tabClientId, { tabId: tabClientId } );
		};

		/**
		 * Adds a Panel Block (child) as an innerblock to the Tab Content Block (parent).
		 *
		 * A Panel is only added with a Tab and it's corresponding Tab's tabId.
		 * @param {string} tabClientId Client ID of the tab
		 */
		const addPanel = ( tabClientId ) => {
			// Get the parent block 'Tabs'
			const parentTabsBlock = select( 'core/block-editor' ).getBlock( select( 'core/block-editor' ).getBlockRootClientId( clientId ) );
			// Get the parent block Tabs innerblocks
			const parentTabsInnerBlocks = parentTabsBlock.innerBlocks;
			// Check if parent tab has innerblocks
			if ( Array.isArray( parentTabsInnerBlocks ) ) {
				// Find the tab-content block
				const tabContentBlock = parentTabsInnerBlocks.find( child => {
					return child.name === 'mayflower-blocks/tab-content';
				} );
				if ( tabContentBlock ) {
					// Create a panel body with the tabId to put into tab content list
					const panelBlock = createBlock( 'mayflower-blocks/tab-content-panel', { tabId: tabClientId, tabActive: tabContentBlock.innerBlocks.length === 0 ? true : false, tabDefault: tabContentBlock.innerBlocks.length === 0 ? true : false } );
					// Add new panel body into tab content list
					dispatch( 'core/block-editor' ).insertBlock( panelBlock, tabContentBlock.innerBlocks.length, tabContentBlock.clientId );
				}
			}
		};

		return (
			<ul className={ `${ className } nav nav-tabs` } role="tablist">
				<InnerBlocks allowedBlocks={ [ 'mayflower-blocks/tab-list-tab' ] } />
				<li role="presentation">
					<Button onClick={ addTab } className="add-tab">
						<Dashicon icon="insert" />
						{ currentBlockData.innerBlocks.length === 0 ? <span>Add Tab</span> : '' }
					</Button>
				</li>
			</ul>
		);
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
		const className = getBlockDefaultClassName( 'mayflower-blocks/tab-list' );
		return (
			<div className="card-header">
				<ul className={ `${ className } nav nav-tabs card-header-tabs` } role="tablist">
					<InnerBlocks.Content />
				</ul>
			</div>
		);
	},
	deprecated: [
		{
			save: function() {
				const className = getBlockDefaultClassName( 'mayflower-blocks/tab-list' );
				return (
					<ul className={ `${ className } nav nav-tabs` } role="tablist">
						<InnerBlocks.Content />
					</ul>
				);
			},
		},
	],

} );
