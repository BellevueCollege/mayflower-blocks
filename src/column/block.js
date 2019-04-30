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
const { InspectorControls, InnerBlocks } = wp.editor;
const { SelectControl, Button, Disabled } = wp.components;
const { select, dispatch } = wp.data;
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
const { createHigherOrderComponent } = wp.compose;

// Creates a higher order component(HOC) to properly wrap the column block with the
// corresponding bootstrap and CSS classes and prevent block stacking
const mayflowerBlocksColumn = createHigherOrderComponent( ( BlockListBlock ) => {
	return ( props ) => {
		if (props.attributes.gridColumnClass && props.attributes.gridColumnSize){
			return <BlockListBlock { ...props } className={`col-${props.attributes.gridColumnClass}-${props.attributes.gridColumnSize} ${props.attributes.selected == true && 'mfbc-is-selected'}`}/>;
		} else {
			return <BlockListBlock { ...props } />
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
		selected: {
			type: 'boolean',
			default: false
		},
		visible: {
			type: 'boolean',
			default: true
		},
		siblingColumns: {
			type: 'number',
			default: 0
		}
	},

	edit: function ({ className, attributes, setAttributes, isSelected }, props) {

		//Instantiate Column Data
		const currentBlockClientId = select('core/editor').getSelectedBlockClientId(); // return this block's client id
		const parentBlockClientId = select('core/editor').getBlockRootClientId(currentBlockClientId); //get parent's client id
		const parentBlockData = select('core/editor').getBlock(parentBlockClientId); // get parent's data; includes children and attributes
		let parentBlockChildren;

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
					case 7:
						gridColumnSize = 6;
						break;
					case 8:
						gridColumnSize = 5;
						break;
					case 9:
						gridColumnSize = 4;
						break;
					case 10:
						gridColumnSize = 3;
						break;
					case 11:
						gridColumnSize = 2;
						break;
					case 12:
						gridColumnSize = 1;
						break;
					default:
						gridColumnSize = 4;
						break;
				}

				//Performs a check on all siblings to see how many columns there are and sets the sibling columns size to adjust to the newly removed column
				parentBlockChildren.forEach(sibling => {
					//update all siblings that a sibling has been removed
					dispatch('core/editor').updateBlockAttributes(sibling.clientId, { siblingColumns: attributes.siblingColumns - 1 });

					if ((attributes.siblingColumns - 1) >= 7) {
						dispatch('core/editor').updateBlockAttributes(sibling.clientId, { gridColumnSize: 1 });
						//if a sibling is the last index after the column is removed, then update the attributes to the new gridColumnSize
						if (sibling.clientId == parentBlockChildren[attributes.siblingColumns - 2].clientId) {
							dispatch('core/editor').updateBlockAttributes(parentBlockChildren[attributes.siblingColumns - 2].clientId, { gridColumnSize: gridColumnSize });
						}
					} else {
						dispatch('core/editor').updateBlockAttributes(sibling.clientId, { gridColumnSize: gridColumnSize });

						if ((attributes.siblingColumns - 1) == 5) {
							//keep the sibling size the same
							dispatch('core/editor').updateBlockAttributes(sibling.clientId, { gridColumnSize: sibling.attributes.gridColumnSize }); 
							//if a sibling is the last index after the column is removed, then update the attributes to the new gridColumnSize
							if (sibling.clientId == parentBlockChildren[attributes.siblingColumns - 2].clientId) {
								dispatch('core/editor').updateBlockAttributes(parentBlockChildren[attributes.siblingColumns - 2].clientId, { gridColumnSize: gridColumnSize });
							}
						}
					}
				});
			}

			//If a column is removed while selected, also close the column
			if (attributes.selected == true) {
				handleCloseColumnBlock();
			}
		}

		/**
		 * Selects a column block
		 *
		 * When a column block gets selected, the function hides all sibling columns
		 * On click it will render the column to full-width
		 */
		const handleSelectColumnBlock = () => {
			console.log('%cSelected', 'color:purple');
			//setAttributes({ selected: true });
			dispatch('core/editor').updateBlockAttributes(currentBlockClientId, { selected: true });
			
			parentBlockChildren = parentBlockData.innerBlocks;

			if (Array.isArray(parentBlockChildren)) {
				// If each sibling is not the current child, then set visibility to false
				parentBlockChildren.forEach(sibling => {
					if (sibling.clientId != currentBlockClientId) {
						dispatch('core/editor').updateBlockAttributes(sibling.clientId, { visible: false });
					}
				});
			}

			// Tell parent a child is selected
			dispatch('core/editor').updateBlockAttributes(parentBlockClientId, { childIsSelected: true });
		};

		/**
		 * Closes a column block when a column block is selected
		 *
		 * Checks for a selected column block from the row block's innerblocks. If a column(child) was not selected, it updates the column block's attributes
		 * to visible and if selected it updates selected to false.
		 */
		const handleCloseColumnBlock = () => {
			setAttributes({ selected: false });

			parentBlockChildren = parentBlockData.innerBlocks;

			if (Array.isArray(parentBlockChildren)) {
				// If each sibling is not the current child, then set visibility to true
				parentBlockChildren.forEach(sibling => {
					if (sibling.clientId != currentBlockClientId) {
						dispatch('core/editor').updateBlockAttributes(sibling.clientId, { visible: true });
					}
				});
			}

			// tell parent child is no longer selected
			dispatch('core/editor').updateBlockAttributes(parentBlockClientId, { childIsSelected: false });
		}

		return [
			<InspectorControls>
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
				{attributes.selected == true ?
					<Button isDefault onClick={handleCloseColumnBlock}>
						Save &amp; Close Column
					</Button>
					:
					<Button isDefault onClick={handleSelectColumnBlock}>
						Edit Column
					</Button>
				}
				<Button isDefault onClick={handleRemoveColumnBlock}>
					Remove Column
				</Button>
			</InspectorControls>
			,
			<div className={className}>
				{ attributes.gridColumnClass &&
					<div class={`column ${attributes.visible == true ? 'visible' : 'invisible'}`}>
						{attributes.selected !== true ?
							<Disabled>
								<InnerBlocks />
							</Disabled>
							: <InnerBlocks />}
						<div class="rollover-column">
							<div class="rollover-menu">
								<Button isDefault onClick={handleSelectColumnBlock}>
									<span class="dashicons dashicons-edit"></span> <span class={`${attributes.gridColumnSize == 1 && attributes.gridColumnSize !== 12 && 'rollover-menu-text-hidden'}`}>Edit Column</span>
								</Button>
								<Button isDefault onClick={handleRemoveColumnBlock}>
									<span class="dashicons dashicons-trash"></span> <span class={`${attributes.gridColumnSize == 1 && attributes.gridColumnSize !== 12 && 'rollover-menu-text-hidden'}`}>Remove Column</span>
								</Button>
							</div>
						</div>
					</div>
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

