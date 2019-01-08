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


registerBlockType( 'mayflower-blocks/column', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Column' ), // Block title.
	icon: 'schedule', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'bootstrap-blocks', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	//parent: ['mayflower-blocks/row'], //Parent Block — Sets the parent block so this block only shows when the parent is being used.
	//NOTE ^^^^ commenting this out for now to test columns outside of parent block

	attributes: {
		gridColumnText: {
			type: 'string',
			default: ''
		},
		gridColumnClass: {
			type: 'string',
			default: 'md'
		},
		gridColumnSize: {
			type: 'string',
			default: '4'
		},
		selected: {
			type: 'boolean',
			default: false
		}
	},
	
	edit: function ({ className, attributes, setAttributes, isSelected }, props) {

		//Function for button in sidebar to remove the currently selected block
		const handleRemoveColumnBlock = () => {
			console.log('%c[Column] Removed Column', 'color: green');

			// Grab this selected block which is the child of the Row parent block
			let childBlock = select('core/editor').getSelectedBlock(); //get block object
			let childClientId = childBlock.clientId; // returns this selected block id
			let parentClientId = select('core/editor').getBlockRootClientId(childClientId); //get the parent id of the child
			let parentData = select('core/editor').getBlocksByClientId(parentClientId)[0]; //get parent data
			let columns = parentData.attributes.columns;

			// Update the attributes in the parent
			const updatedColumns = columns.filter(columnBlock =>  //returns an array removing matching child block
				columnBlock.clientId !== childBlock.clientId
			);

			console.log('%c[Column] handleRemoveColumnBlock: Updated Parent Columns Attribute from child:', 'color: green');
			console.log(updatedColumns);
	
			//make change to parent
			dispatch('core/editor').updateBlockAttributes(parentClientId, {columns: updatedColumns});

			// Remove the block
			dispatch('core/editor').removeBlock(childClientId, false);
		}

		let selectedRow;
		let notSelected;

		//TEST Finicky here mostly for testing
		//when this block is selected, it goes full width
		if (isSelected) {
			// setAttributes({selected: true});
			// console.log('%cChild: Selected', 'color: green');
				
			selectedRow = (
				<span>
						{attributes.gridColumnClass ? 
							<div class={`col-${attributes.gridColumnClass}-${attributes.gridColumnSize}`} style={{width: '100%', float:'left', backgroundColor:'#eee'}}>
							<RichText
									tagName = "p"
									formattingControls = {['bold', 'italic', 'link']}
									placeholder = "Enter column text or add blocks below..."
									keepPlaceholderOnFocus = "true"
									value = {attributes.gridColumnText}
									onChange = {(gridColumnText) => setAttributes({ gridColumnText })}
								/>
							</div>
						: '' }
						{/* <div class="clearfix"></div> //TEST */}
				</span>
			);
		} else {
			// console.log('%cChild: Not selected', 'color: green');
			// setAttributes({selected: false});

			notSelected = (
				<span>
					{attributes.gridColumnClass ? 
						<div class={`col-${attributes.gridColumnClass}-${attributes.gridColumnSize}`}>
						<RichText
								tagName = "p"
								formattingControls = {['bold', 'italic', 'link']}
								placeholder = "Enter column text or add blocks below..."
								keepPlaceholderOnFocus = "true"
								value = {attributes.gridColumnText}
								onChange = {(gridColumnText) => setAttributes({ gridColumnText })}
							/>
						</div>
					: '' }
				</span>
			);
		}

		// console.log('COLUMN TEXT: ' + attributes.gridColumnText);
		// console.log('COLUMN CLASS: ' + attributes.gridColumnClass);
		// console.log('COLUMN SIZE: ' + attributes.gridColumnSize);
		
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
						{ label: '1', value: '1' },
						{ label: '2', value: '2' },
						{ label: '3', value: '3' },
						{ label: '4', value: '4' },
						{ label: '5', value: '5' },
						{ label: '6', value: '6' },
						{ label: '7', value: '7' },
						{ label: '8', value: '8' },
						{ label: '9', value: '9' },
						{ label: '10', value: '10' },
						{ label: '11', value: '11' },
						{ label: '12', value: '12' },
					]}
					onChange={(gridColumnSize) => { 
						setAttributes({ gridColumnSize });
					}}
				/>
				<Button isDefault onClick={handleRemoveColumnBlock}>
					Remove Column
				</Button>
			</InspectorControls>
			,
			<span>

			{selectedRow}
			{notSelected}
			</span>		
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

	save: function( {attributes} ) { //TODO ERROR won't preview properly, but updates from the editor shows when the post is published

		return (
			<div class={`col-${attributes.gridColumnClass}-${attributes.gridColumnSize}`}>
				<RichText.Content
					tagName = "p"
					value = {attributes.gridColumnText}
				/>
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
							console.log(content);
							let rx = /(?<=\[\s*\s*column.*\])(.*)(?=\[\s*\/\s*column\s*\])/gmi;
							let filtered = content.match(rx);

							console.log('gridColumnText');
							console.log(filtered);

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
							console.log('gridColumnClass');
							console.log(filtered);

							return Array.isArray(filtered) ? filtered[0] : '';
						},
					},

					gridColumnSize: {
						type: 'string',
						shortcode: ({ named: { xs, sm, md, lg  } }) => {
							if (xs) {
								return xs;
							} else if ( sm ) {
								return sm;
							} else if ( md ) {
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
} );
