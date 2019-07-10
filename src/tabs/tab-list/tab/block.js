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
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { RichText, InspectorControls, BlockControls } = wp.editor;
const { Toolbar, ToggleControl, Panel, PanelBody, PanelRow, Dashicon } = wp.components;
const { select, dispatch } = wp.data;
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

// Creates a higher order component(HOC) to properly wrap the Tab block with the
// corresponding bootstrap and CSS classes and prevent block stacking

const mayflowerBlocksTab = createHigherOrderComponent( ( BlockListBlock ) => {
	return ( props ) => {
		if (props.attributes.tabId && props.name == 'mayflower-blocks/tab-list-tab') {
			return <li role="presentation" class={props.attributes.tabActive ? 'active' : ''}><BlockListBlock { ...props }/></li>;
		} else {
			return <BlockListBlock { ...props } />;
		}
	};
}, 'mayflowerBlocksTab' );

// Hook the HOC to replace the wrapping div for tab blocks
wp.hooks.addFilter( 'editor.BlockListBlock', 'mayflower-blocks/tab-list-tab', mayflowerBlocksTab );

registerBlockType( 'mayflower-blocks/tab-list-tab', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Tab List Tab' ), // Block title.
	icon: 'category', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'bootstrap-blocks', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	parent: ['mayflower-blocks/tab-list'],

	attributes: {
		tabActive: {
			type: 'boolean',
			default: false
		},
		tabId: {
			type: 'string',
		},
		tabTitle: {
			type: 'string',
			default: ''
		},
		tabDefault: {
			type: 'boolean',
			default: false
		},
	},
	
	edit: function ({ className, attributes, setAttributes, clientId, isSelected }) {
		const tabListBlock = select('core/editor').getBlock(select('core/editor').getBlockRootClientId(clientId));
		const parentTabsBlock = select('core/editor').getBlock(select('core/editor').getBlockRootClientId(tabListBlock.clientId));
		const parentTabsInnerBlocks = parentTabsBlock.innerBlocks;
		const tabContentBlock = parentTabsInnerBlocks.find(child => {
			return child.name == 'mayflower-blocks/tab-content';
		});

		/**
		 * Handles updating the default tab.
		 *
		 * When clicked, sets the current tab as default and sets the correct new default tab and tab panel.
		 */
		const handleUpdateDefaultTab = () => {
			// Set current tab as default
			if (attributes.tabDefault == false) {
				setAttributes({tabDefault: true});
			}
			
			// Find other tabs that are set as default and set the tabDefault attribute to false
			tabListBlock.innerBlocks.forEach(tab => {
				if (tab.attributes.tabDefault === true) {
					dispatch('core/editor').updateBlockAttributes(tab.clientId, {tabDefault: false});
				}
			});

			// Set default panel body along with tab
			tabContentBlock.innerBlocks.forEach(panel => {
				// If other panels are default, set to false
				if (panel.attributes.tabDefault === true) {
					dispatch('core/editor').updateBlockAttributes(panel.clientId, {tabDefault: false});
				}
				// Then set default panel if panel tabId matches the default tabId
				if (panel.attributes.tabId == attributes.tabId) {
					dispatch('core/editor').updateBlockAttributes(panel.clientId, {tabDefault: true});
				}
			});
		}

		// Check if tab is selected and set tabActive attributes to true or false
		if (isSelected) {
			setAttributes({tabActive: true});
			if (Array.isArray(parentTabsInnerBlocks)) {
				// Looks for other tabs that were previously active and set it to false
				tabListBlock.innerBlocks.forEach(tab => {
					if (tab.attributes.tabId !== attributes.tabId ) {
						dispatch('core/editor').updateBlockAttributes(tab.clientId, {tabActive: false});
					}
				});
				// Sets new active tab panel then looks for other tabs that were previously active and set it to false
				tabContentBlock.innerBlocks.forEach(panel => {
					if ( panel.attributes.tabId == attributes.tabId) {
						dispatch('core/editor').updateBlockAttributes(panel.clientId, {tabActive: true});
					} else {
						dispatch('core/editor').updateBlockAttributes(panel.clientId, {tabActive: false});
					}
				});
			}
		}

		/**
		 * Handles removing a tab and it's tab panel.
		 */
		const handleRemoveTab = () => {
			// Handles selecting previous or next block when deleting, so the flow of deletion is smoother
			const nextBlockClientId = select('core/editor').getNextBlockClientId(clientId);
			const prevBlockClientId = select('core/editor').getPreviousBlockClientId(clientId);
			if (nextBlockClientId) {
				dispatch('core/editor').selectBlock(nextBlockClientId);
			} else {
				dispatch('core/editor').selectBlock(prevBlockClientId);
			}
			
			// Remove the current tab
			dispatch('core/editor').removeBlock(clientId, false);
			
			// Find the corresponding tab panel and remove it
			const attachedPanel = tabContentBlock.innerBlocks.find( panel => {
					return panel.attributes.tabId == attributes.tabId;
				}
			);
			dispatch('core/editor').removeBlock(attachedPanel.clientId, false);
		}

		/**
		 * TabToolBarControl returns a Toolbar component with set default tab and remove buttons to set or remove the tab and corresponding panel.
		 * 
		 * @return Toolbar component with tab control buttons
		 * */
		const TabToolBarControl = () => {
			const controls = [
				{
					icon: <Dashicon icon="sticky" />,
					title: 'Set Default Tab',
					isActive: attributes.tabDefault,
					onClick: () => handleUpdateDefaultTab()
				},
				{
					icon: <Dashicon icon="trash" />,
					title: 'Remove',
					onClick: () => handleRemoveTab()
				},
			];

			return(
				<Toolbar controls = { controls } />
			);
		}

		return [
			<InspectorControls>
				<Panel>
					<PanelBody
						title="Tab Styles"
						initialOpen={ true }
					>
						<PanelRow>
							<ToggleControl
								label="Set as default active tab?"
								help={ attributes.tabDefault ? 'Is the default tab.' : 'Not the default tab.' }
								checked={ attributes.tabDefault }
								onChange={ (tabDefault) => {
									setAttributes({tabDefault});
									handleUpdateDefaultTab()
								}}
							/>
						</PanelRow>
					</PanelBody>
				</Panel>
			</InspectorControls>
			,
				<BlockControls>
					<TabToolBarControl/>
				</BlockControls>
			,
			<Fragment>
				<a aria-controls={`#${attributes.tabId}`} role="tab" data-toggle="tab"> 
					<RichText
						formattingControls = {['']}
						placeholder = "Enter title..."
						keepPlaceholderOnFocus = "true"
						value = {attributes.tabTitle}
						onChange = {(tabTitle) => setAttributes({ tabTitle })}
					/>
				</a>
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

	save: function( {attributes} ) {
		return (
			<li role="presentation" class={attributes.tabDefault ? 'active' : ''}> 
				<a href={`#${attributes.tabId}`} aria-controls={`#${attributes.tabId}`} role="tab" data-toggle="tab"> 
					<RichText.Content
						value = {attributes.tabTitle}
					/>
				</a>
			</li>
		);
	},
} );
