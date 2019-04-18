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
const { registerBlockType, createBlock } = wp.blocks; // Import registerBlockType() from wp.blocks
const { RichText, InspectorControls, InnerBlocks } = wp.editor;
const { SelectControl } = wp.components;
const { select, dispatch } = wp.data;


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


registerBlockType( 'mayflower-blocks/well', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Well' ), // Block title.
	icon: 'text', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'bootstrap-blocks', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.

	attributes: {
		wellText: {
			type: 'string',
			default: ''
		},
		wellSize: {
			type: 'string',
			default: ''
		}
	},
	
	//Existing bootstrap well shortcode transformed into its block counterpart.
	//Allows use of [well size=""][/well]
	transforms: {
		from: [
			{
				type: 'shortcode',
				tag: 'well',
				attributes: {
					// Well Text
					wellText: {
						type: 'string',
						shortcode: (attrs, { content }) => {
							// Content returns the whole shortcode, so we need to match only shortcode content
							let rx = /(?<=\[\s*\s*well.*\])((.|\s)*\S(.|\s)*)(?=\[\s*\/\s*well\s*\])/gmi;
							let filtered = content.match(rx);

							// Return content at array[0] if there was a match, otherwise return blank string
							return Array.isArray(filtered) ? filtered[0] : '';
						},
					},

					// Well Size
					wellSize: {
						type: 'string',
						shortcode: ({ named: { size = 'size' } }) => {
							return size;
						},
					},
				},
			},
			{
				type: 'block',
				blocks: [ 'core/paragraph' ],
				transform: ( attributes ) => {
					const paragraphBlock = createBlock( 'core/paragraph', {content: attributes.content} );
					return createBlock( 'mayflower-blocks/well', attributes, [paragraphBlock]);
				},
			},
		],
		to: [
			{
				type: 'block',
				blocks: [ 'mayflower-blocks/lead' ],
				isMatch: ( {wellText} ) => { //Perform a match to see if a well can be transformed to a lead block
					const wellBlock = select('core/editor').getSelectedBlock();
					const wellBlockInnerBlocks = wellBlock.innerBlocks;
					if ((wellText && wellBlockInnerBlocks.length == 0) || (wellText && wellBlockInnerBlocks.length == 1 && wellBlockInnerBlocks[0].attributes.content == '')) {
						return true;
					}
					if (wellText == '' && wellBlockInnerBlocks.length == 1){ //Return true if well only has 1 innerblock and it is a paragraph block
						return wellBlockInnerBlocks[0].name == 'core/paragraph';
					}
					
				},
				transform: ( {wellText} ) => {
					const wellBlock = select('core/editor').getSelectedBlock();
					if (wellText){
						return createBlock( 'mayflower-blocks/lead', {leadText: wellText});
					} else {
						return createBlock( 'mayflower-blocks/lead', {leadText: wellBlock.innerBlocks[0].attributes.content});
					}
					
				},
			},
			{
				type: 'block',
				blocks: [ 'mayflower-blocks/alert' ],
				transform: ( attributes ) => {
					const wellBlockInnerBlocks = select('core/editor').getSelectedBlock().innerBlocks;
					return createBlock( 'mayflower-blocks/alert', {alertText: attributes.wellText}, wellBlockInnerBlocks);
				},
			},
			{
				type: 'block',
				blocks: [ 'core/paragraph' ],
				isMatch: ( {wellText} ) => { //Perform a match to see if a well can be transformed to a paragraph block
					const wellBlock = select('core/editor').getSelectedBlock();
					const wellBlockInnerBlocks = wellBlock.innerBlocks;
					if (wellText) {
						return true;
					} else {
						if (wellBlockInnerBlocks.length >= 1){ //Return true if first innerblock is a paragraph
							return wellBlockInnerBlocks[0].name == 'core/paragraph';
						}
					}
				},
				transform: ( attributes ) => {
					const wellBlock = select('core/editor').getSelectedBlock();
					const wellBlockIndex = select('core/editor').getBlockIndex(wellBlock.clientId);
					const wellBlockInnerBlocks = wellBlock.innerBlocks;
					
					//if shortcode wellText exists, return paragraph transform and any innerblocks after shortcode paragraph content
					if (attributes.wellText){
						if (wellBlockInnerBlocks.length >= 1){
							dispatch('core/editor').insertBlocks(wellBlockInnerBlocks, wellBlockIndex + 1);
						}
						return createBlock( 'core/paragraph', {content: attributes.wellText});
					} else { //if no shortcode wellText, return innerblocks
						if (wellBlockInnerBlocks.length > 1) { //if more than 1 innerblock, dispatch remaining innerblocks to appear after first innerblock
							dispatch('core/editor').insertBlocks(wellBlockInnerBlocks.slice(1), wellBlockIndex + 1);
						}
						return wellBlockInnerBlocks[0];
					}
				},
			},
		],
	},

	edit: function ({ className, attributes, setAttributes }) {

		return [
			<InspectorControls>
				<SelectControl
					label="Well Style"
					value={attributes.wellSize}
					options={[
						{ label: 'Default Size', value: '' },
						{ label: 'Small Size', value: 'well-sm' },
						{ label: 'Large Size', value: 'well-lg' },
					]}
					onChange={(wellSize) => { 
						setAttributes({ wellSize });
					}}
				/>
			</InspectorControls>
			,
			<div className={className}>
				<div className = {`well ${attributes.wellSize}`}>
					{attributes.wellText !== null && attributes.wellText !== '' && attributes.wellText !== undefined ? 
						<RichText
							tagName = "div"
							formattingControls = {['bold', 'italic', 'link']}
							placeholder = "Enter text or add blocks below..."
							keepPlaceholderOnFocus = "true"
							value = {attributes.wellText}
							onChange = {(wellText) => setAttributes({ wellText })}
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
			<div className = {`well ${attributes.wellSize}`}>
				{attributes.wellText !== null && attributes.wellText !== '' && attributes.wellText !== undefined ? 
					<RichText.Content
						tagName = "div"
						value = {attributes.wellText}
					/>
				: '' }
				<InnerBlocks.Content />
			</div>
		);
	},
} );
