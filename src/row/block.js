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
const { RichText, InspectorControls, InnerBlocks } = wp.editor;
const { SelectControl, Button } = wp.components;
const { withSelect, select, dispatch } = wp.data;
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


registerBlockType( 'mayflower-blocks/row', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Row' ), // Block title.
	icon: 'schedule', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'bootstrap-blocks', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.

	attributes: {
		selected: {
			type: 'boolean',
			default: false,
		},
		columns: {
			type: 'array',
			default: []
		}
	},
	

	edit: function ({ className, attributes, setAttributes, isSelected }) {

		//Function for button in sidebar to add a column block
		const handleAddColumnBlock = () => {
			console.log('%c[Row] Added Column', 'color:lightblue');

			// Create New Column Block
			const columnBlock = createBlock('mayflower-blocks/column', {gridColumnText: 'test', gridColumnClass: 'md', gridColumnSize: '4', selected: false});

			const currentBlockClientId = select('core/editor').getSelectedBlockClientId(); // returns this block client id (Row block)

			// Insert New Block to the current block appending to the last index of columns
			dispatch('core/editor').insertBlock(columnBlock, attributes.columns.length, currentBlockClientId);

			// Update the columns attribute
			setAttributes({
				columns: attributes.columns.concat(columnBlock),
			});
		}

		console.log('%c[Row] Columns Attribute:', 'color: lightblue');
		console.log(attributes.columns)

		// const handleMoveColumnBlock = () => {
		// 	console.log('Moved Column');
		// }

		//Check if parent is selected
		// if (isSelected) {
		// 	console.log('%cparent selected: true', 'color:lightblue');
		// 	setAttributes({selected: true});
		// } else {
		// 	console.log('%cparent selected: false', 'color:lightblue');
		// 	setAttributes({selected: false});
		// }

		return [
			<InspectorControls>
				<Button isDefault onClick={handleAddColumnBlock}>
					Add Column
				</Button>
			</InspectorControls>
			,
			<div className={className}>
				<div className="row">
					{/* NOTE InnerBlocks stay because we are INSERTING inner blocks */}
					<InnerBlocks 
						allowedBlocks={['mayflower-blocks/column','core/paragraph']}
					/>
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
} );
