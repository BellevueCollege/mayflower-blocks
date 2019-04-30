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
const { InspectorControls, InnerBlocks } = wp.editor;
const { Button } = wp.components;
const { select, dispatch } = wp.data;
const { createBlock } = wp.blocks;
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


registerBlockType('mayflower-blocks/row', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __('Row'), // Block title.
	icon: 'schedule', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'bootstrap-blocks', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.

	attributes: {
		childIsSelected: {
			type: 'boolean',
			default: false,
		},
		childColumns: {
			type: 'number',
			default: 0
		}
	},


	edit: function ({ className, attributes, setAttributes, isSelected }) {

		//Instantiate Row Data
		const currentBlockClientId = select('core/editor').getSelectedBlockClientId(); // returns this block's client id
		const currentBlockData = select('core/editor').getBlock(currentBlockClientId); // returns this block's data; includes children and attributes
		let currentBlockChildren;

		/**
		 * Adds a Column Block (child) as an innerblock to the Row Block (parent)
		 *
		 * When a column block gets added, the function also adjusts the width of each column block under the row block to fit each new column
		 */
		const handleAddColumnBlock = () => {
			setAttributes({ childColumns: attributes.childColumns + 1 }); //up the childColumns attribute as each new column block is added
			currentBlockChildren = currentBlockData.innerBlocks;

			let gridColumnSize = '';
			if (Array.isArray(currentBlockChildren)) {
				if (attributes.childColumns >= 0 && attributes.childColumns < 12) {
					//Return a grid column size depending on how many child columns there are
					//Ex: If there are 6 columns already, the leftover space to add a column is 2
					switch (attributes.childColumns + 1) {
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

				//Creates a new block and saves a block object to columnBlock
				//const paragraphBlock = createBlock('core/paragraph', { content: `Child: ${attributes.childColumns + 1}` });
				const columnBlock = createBlock('mayflower-blocks/column', { gridColumnClass: 'md', gridColumnSize: gridColumnSize, selected: false, siblingColumns: attributes.childColumns + 1 });

				// Insert columnBlock to the row block appending to the last index of columns
				dispatch('core/editor').insertBlock(columnBlock, currentBlockData.innerBlocks.length, currentBlockClientId);

				//Performs a check on all children to see how many columns there are and sets the sibling columns size to adjust to the newly added column
				currentBlockChildren.forEach(child => {
					//update all siblings that a sibling has been added
					dispatch('core/editor').updateBlockAttributes(child.clientId, { siblingColumns: attributes.childColumns + 1});
					
					if ((attributes.childColumns + 1) >= 7 && child.clientId !== columnBlock.clientId) {
						dispatch('core/editor').updateBlockAttributes(child.clientId, { gridColumnSize: 1 });
					} else {
						dispatch('core/editor').updateBlockAttributes(child.clientId, { gridColumnSize: gridColumnSize });
						if ((attributes.childColumns + 1) == 5 && child.clientId !== columnBlock.clientId) {
							dispatch('core/editor').updateBlockAttributes(child.clientId, { gridColumnSize: child.attributes.gridColumnSize - 1 });
						}
					}
				});

				}
			}
			//After a column block is created, continue to select the Row block to allow continuous addition/removal of column or row blocks
			wp.data.dispatch('core/editor').selectBlock(currentBlockClientId);
		}

		/**
		 * Closes a column block when a column block is selected
		 *
		 * Checks for a selected column block from the row block's innerblocks. If a column(child) was not selected, it updates the column block's attributes
		 * to visible and if selected it updates the attributes width to null and selected to false.
		 */
		const handleCloseColumnBlock = () => {

			currentBlockChildren = currentBlockData.innerBlocks;

			if (Array.isArray(currentBlockChildren)) {
				// If a child is the currently selected child, then set visibility to true,
				// else set selected to false
				currentBlockChildren.forEach(child => {
					if (child.attributes.selected == false) {
						dispatch('core/editor').updateBlockAttributes(child.clientId, { visible: true });
					} else {
						dispatch('core/editor').updateBlockAttributes(child.clientId, { selected: false });
						setAttributes({ childIsSelected: false });
					}
				});
			}
		}

		/**
		 * Creates a new row block
		 *
		 * Creates a new row block, finds the index of the current block, and inserts the new row block after the current block
		 */
		const handleAddRowBlock = () => {
			const rowBlock = createBlock('mayflower-blocks/row');
			const rowIndex = select('core/editor').getBlockIndex(currentBlockClientId);
			// Insert New Block to the current block appending to the the previous row block
			dispatch('core/editor').insertBlock(rowBlock, rowIndex + 1);

		}

		/**
		 * Removes the current row block
		 */
		const handleRemoveRowBlock = () => {
			dispatch('core/editor').removeBlock(currentBlockClientId, false);
		}

		/**
		 * Row menu to show buttons for adding a column and row and removing a row
		 */
		const RowMenu = (
			<div class="row-menu">
				{attributes.childColumns < 12 ?
					<Button className="row-menu-button" onClick={handleAddColumnBlock}>
						<svg aria-hidden="true" role="img" focusable="false" class="dashicon dashicons-insert" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path d="M10 1c-5 0-9 4-9 9s4 9 9 9 9-4 9-9-4-9-9-9zm0 16c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7zm1-11H9v3H6v2h3v3h2v-3h3V9h-3V6z"></path></svg>
						<span>Add Column</span>
					</Button>
					: ''}
				<Button className="row-menu-button" onClick={handleAddRowBlock}>
					<svg aria-hidden="true" role="img" focusable="false" class="dashicon dashicons-insert" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path d="M10 1c-5 0-9 4-9 9s4 9 9 9 9-4 9-9-4-9-9-9zm0 16c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7zm1-11H9v3H6v2h3v3h2v-3h3V9h-3V6z"></path></svg>
					<span>Add Row</span>
				</Button>
				<Button className="row-menu-button" onClick={handleRemoveRowBlock}>
					<span class="dashicons dashicons-trash"></span>
					<span>Remove Row</span>
				</Button>
			</div>
		);

		return [
			<InspectorControls>
				{attributes.childIsSelected == false ?
					<Fragment>
						<Button isDefault onClick={handleAddColumnBlock}>
							Add Column
						</Button>
						<Button isDefault onClick={handleAddRowBlock}>
							Add Row
						</Button>
						<Button isDefault onClick={handleRemoveRowBlock}>
							Remove Row
						</Button>
					</Fragment>
				: ''}
			</InspectorControls>
			,
			<div className={className}>
				<div className="row">
					<InnerBlocks
						allowedBlocks={['mayflower-blocks/column']}
					/>
				</div>
				{/* <div className="clearfix"></div> */}

				{isSelected && attributes.childIsSelected == false ? // If row block is selected and a child is not selected, show RowMenu
					RowMenu
				: // Else, always show RowMenu if the row block is not selected and there are no child columns
					attributes.childColumns == 0 && RowMenu
				}

				{attributes.childIsSelected == true ? // If a child is selected, show the Save & Close Button
					<div class="row-menu">
						<Button className="row-menu-button" onClick={handleCloseColumnBlock}>
							<span class="dashicons dashicons-dismiss"></span>
							<span>Save &amp; Close Column</span>
						</Button>
					</div>
				: ''}
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
			<div class="row">
				<InnerBlocks.Content />
			</div>
		);
	},

	transforms: {
		from: [
			{
				type: 'shortcode',
				tag: 'row',
			}
		]
	},
});

