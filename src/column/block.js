/**
 * BLOCK: Column
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

// Import CSS.
// import './style.scss';
import './editor.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { InspectorControls, InnerBlocks, BlockControls } = wp.editor;
const { SelectControl, Button, Disabled, Toolbar, Panel, PanelBody, PanelRow, SVG, Path, G} = wp.components;
const { select, dispatch } = wp.data;
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

// Creates a higher order component(HOC) to properly wrap the column block with the
// corresponding bootstrap and CSS classes and prevent block stacking
const mayflowerBlocksColumn = createHigherOrderComponent( ( BlockListBlock ) => {
	return ( props ) => {
		if (props.attributes.gridColumnClass && props.attributes.gridColumnSize){
			return <BlockListBlock { ...props } className={`col-${props.attributes.gridColumnClass}-${props.attributes.gridColumnSize} ${props.attributes.isEditing == true ? 'mbcolumn-is-editing' : ''} ${props.attributes.isVisible == false ? 'mbcolumn-is-invisible' : ''}`}/>;
		} else {
			return <BlockListBlock { ...props } />;
		}
	};
}, 'mayflowerBlocksColumn' );

// Hook the HOC to replace the wrapping div for column blocks
wp.hooks.addFilter( 'editor.BlockListBlock', 'mayflower-blocks/column', mayflowerBlocksColumn );

registerBlockType('mayflower-blocks/column', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __('Column'), // Block title.
	icon: 'schedule', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'bootstrap-blocks', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	parent: ['mayflower-blocks/row'], //Parent Block — Sets the parent block so this block only shows when the parent is being used.

	attributes: {
		gridColumnClass: {
			type: 'string',
			default: 'md'
		},
		gridColumnSize: {
			type: 'number',
			default: 4
		},
		isEditing: {
			type: 'boolean',
			default: false
		},
		isVisible: {
			type: 'boolean',
			default: true
		},
		siblingColumns: {
			type: 'number',
			default: 0
		},
	},

	edit: function ({ className, attributes, setAttributes, clientId }) {

		//Instantiate Column Data
		const currentBlockClientId = select('core/editor').getSelectedBlockClientId(); // return this block's client id
		const parentBlockClientId = select('core/editor').getBlockRootClientId(currentBlockClientId); //get parent's client id
		const parentBlockData = select('core/editor').getBlock(parentBlockClientId); // get parent's data; includes children and attributes
		let parentBlockChildren;

		/**
		 * ColumnToolBarControl returns a Toolbar component with edit and remove buttons to edit the column or remove the column.
		 * 
		 * @return Toolbar component with column control buttons
		 * */
		const ColumnToolBarControl = () => {
			const controls = [
				{
					icon: <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><rect x="0" fill="none" width="20" height="20"/><G><Path d="M13.89 3.39l2.71 2.72c.46.46.42 1.24.03 1.64l-8.01 8.02-5.56 1.16 1.16-5.58s7.6-7.63 7.99-8.03c.39-.39 1.22-.39 1.68.07zm-2.73 2.79l-5.59 5.61 1.11 1.11 5.54-5.65zm-2.97 8.23l5.58-5.6-1.07-1.08-5.59 5.6z"/></G></SVG>,
					title: 'Edit',
					onClick: () => handleEditColumnBlock()
				},
				{
					icon: <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><rect x="0" fill="none" width="20" height="20"/><G><Path d="M12 4h3c.6 0 1 .4 1 1v1H3V5c0-.6.5-1 1-1h3c.2-1.1 1.3-2 2.5-2s2.3.9 2.5 2zM8 4h3c-.2-.6-.9-1-1.5-1S8.2 3.4 8 4zM4 7h11l-.9 10.1c0 .5-.5.9-1 .9H5.9c-.5 0-.9-.4-1-.9L4 7z"/></G></SVG>,
					title: 'Remove',
					onClick: () => handleRemoveColumnBlock()
				},
			];

			return(
				<Toolbar controls = { controls } />
			);
		}

		/**
		 * Removes the column block
		 *
		 * When a column block gets removed, the function also adjusts the width of each column block under the row block to fit each new column
		 */
		const handleRemoveColumnBlock = () => {
			dispatch('core/editor').removeBlock(currentBlockClientId, false);
			dispatch('core/editor').updateBlockAttributes(parentBlockClientId, { childColumns: attributes.siblingColumns - 1 }); // Updates the parent

			parentBlockChildren = parentBlockData.innerBlocks;
			let parentBlockChildrenLength = parentBlockChildren.length;

			let gridColumnSize = '';
			if (Array.isArray(parentBlockChildren)) {
				//Return a grid column size depending on how many sibling columns there are
				switch (parentBlockChildrenLength - 1) {
					case 1:
						gridColumnSize = 12;
						break;
					case 2:
						gridColumnSize = 6;
						break;
					case 3:
						gridColumnSize = 4;
						break;
					case 4:
						gridColumnSize = 3;
						break;
					case 5:
						gridColumnSize = 4;
						break;
					case 6:
						gridColumnSize = 2;
						break;
					default:
						gridColumnSize = 4;
						break;
				}

				//Performs a check on all siblings to see how many columns there are and sets the sibling columns size to adjust to the newly removed column
				parentBlockChildren.forEach(sibling => {
					//update all siblings that a sibling has been removed
					dispatch('core/editor').updateBlockAttributes(sibling.clientId, { siblingColumns: attributes.siblingColumns - 1 });
					//update all siblings with the new column size
					dispatch('core/editor').updateBlockAttributes(sibling.clientId, { gridColumnSize: gridColumnSize });

					//do a check on siblingColumns if there are 5 to correctly add the proper sized last column
					if ((attributes.siblingColumns - 1) == 5) {
						//keep the sibling size the same
						dispatch('core/editor').updateBlockAttributes(sibling.clientId, { gridColumnSize: sibling.attributes.gridColumnSize }); 
						//if a sibling is the last index after the column is removed, then update the attributes to the new gridColumnSize
						if (sibling.clientId == parentBlockChildren[attributes.siblingColumns - 2].clientId) {
							dispatch('core/editor').updateBlockAttributes(parentBlockChildren[attributes.siblingColumns - 2].clientId, { gridColumnSize: gridColumnSize });
						}
					}
				});
			}

			//If a column is removed while editing, also close the column
			if (attributes.isEditing == true) {
				handleCloseColumnBlock();
			}
		}

		/**
		 * Selects a column block to edit content
		 *
		 * When a column block gets selected for editing, the function hides all sibling columns.
		 * On click it will render the column to full-width.
		 */
		const handleEditColumnBlock = () => {
			setAttributes({ isEditing: true });
			
			parentBlockChildren = parentBlockData.innerBlocks;

			if (Array.isArray(parentBlockChildren)) {
				// If each sibling is not the current child, then set visibility to false
				parentBlockChildren.forEach(sibling => {
					if (sibling.clientId != currentBlockClientId) {
						dispatch('core/editor').updateBlockAttributes(sibling.clientId, { isVisible: false });
					}
				});
			}

			// Tell parent a child is selected for editing
			dispatch('core/editor').updateBlockAttributes(parentBlockClientId, { childIsEditing: true });
		};

		/**
		 * Closes a column block when a column block is being edited
		 *
		 * Checks for a selected column block from the row block's innerblocks. If a column(child) was not selected, it updates the column block's attributes
		 * isVisible to true and if selected it updates isEditing to false.
		 */
		const handleCloseColumnBlock = () => {
			setAttributes({ isEditing: false });

			parentBlockChildren = parentBlockData.innerBlocks;

			if (Array.isArray(parentBlockChildren)) {
				// If each sibling is not the current child, then set visibility to true
				parentBlockChildren.forEach(sibling => {
					if (sibling.clientId != currentBlockClientId) {
						dispatch('core/editor').updateBlockAttributes(sibling.clientId, { isVisible: true });
					}
				});
			}

			// tell parent child is no longer selected
			dispatch('core/editor').updateBlockAttributes(parentBlockClientId, { childIsEditing: false });
		}

		return [
			<InspectorControls>
				<Panel> 
					<PanelBody
						title="Column Controls"
						opened={ true }
					>
						<SelectControl
							label="Column Class"
							value={attributes.gridColumnClass}
							options={[
								{ label: 'X-Small (XS Mobile)', value: 'xs' },
								{ label: 'Small (Mobile)', value: 'sm' },
								{ label: 'Medium (Tablet)', value: 'md' },
								{ label: 'Large (Desktop)', value: 'lg' },
							]}
							onChange={(gridColumnClass) => {
								setAttributes({ gridColumnClass });
							}}
						/>

						<SelectControl
							label="Column Size"
							value={attributes.gridColumnSize}
							options={[
								{ label: '1', value: 1 },
								{ label: '2', value: 2 },
								{ label: '3', value: 3 },
								{ label: '4', value: 4 },
								{ label: '5', value: 5 },
								{ label: '6', value: 6 },
								{ label: '7', value: 7 },
								{ label: '8', value: 8 },
								{ label: '9', value: 9 },
								{ label: '10', value: 10 },
								{ label: '11', value: 11 },
								{ label: '12', value: 12 },
							]}
							onChange={(gridColumnSize) => {
								setAttributes({ gridColumnSize });
							}}
						/>

						{attributes.isEditing == true ?
							<PanelRow>
								<Button isDefault onClick={handleCloseColumnBlock}>
									Save &amp; Close Column
								</Button>
							</PanelRow>
							:
							<PanelRow>
								<Button isDefault onClick={handleEditColumnBlock}>
									Edit Column
								</Button>
							</PanelRow>
						}
						<PanelRow>
							<Button isDefault onClick={handleRemoveColumnBlock}>
								Remove Column
							</Button>
						</PanelRow>
					</PanelBody>
				</Panel>
			</InspectorControls>
			,
			attributes.isEditing == false ? 
			<BlockControls>
				<ColumnToolBarControl/>
			</BlockControls> : ''
			,
			<div className={className}>
				{ attributes.gridColumnClass &&
					attributes.isEditing !== true ?
						<Disabled>
							<InnerBlocks />
						</Disabled>
					: <InnerBlocks />
				}
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

	save: function ({ attributes }) {

		return (
			<div class={`col-${attributes.gridColumnClass}-${attributes.gridColumnSize}`}>
				<InnerBlocks.Content />
			</div>
		);
	},

	//Existing bootstrap grid shortcode transformed into its block counterpart.
	//Allows use of [column md="6"] test text [/column]
	transforms: {
		from: [
			{
				type: 'shortcode',
				tag: 'column',
				attributes: {
					// Grid Column Text
					gridColumnText: {
						type: 'string',
						shortcode: (attrs, { content }) => {
							let rx = /(?<=\[\s*\s*column.*\])(.*)(?=\[\s*\/\s*column\s*\])/gmi;
							let filtered = content.match(rx);
							// Return content at array[0] if there was a match, otherwise return blank string
							return Array.isArray(filtered) ? filtered[0] : '';
						},
					},

					// Grid Column Class
					gridColumnClass: {
						type: 'string',
						shortcode: (attrs, { content }) => {
							let columnRx = /(\w{2})(?=\s*=)/gmi;
							let filtered = content.match(columnRx);
							return Array.isArray(filtered) ? filtered[0] : '';
						},
					},

					gridColumnSize: {
						type: 'string',
						shortcode: ({ named: { xs, sm, md, lg } }) => {
							if (xs) {
								return xs;
							} else if (sm) {
								return sm;
							} else if (md) {
								return md;
							} else {
								return lg;
							}
						},
					},
				},
			}
		]
	},
});

