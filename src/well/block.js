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
const { RichText, InspectorControls, InnerBlocks, BlockControls } = wp.editor;
const { SelectControl, Toolbar, SVG, Path, G } = wp.components;
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
		},
		activeWell: {
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
						shortcode: ({ named: { size = '' } }) => {
							if (size) {
								return 'well-' + size;
							} else {
								return '';
							}
						},
					},

					//Active Well Size
					activeWell: {
						type: 'string',
						shortcode: ({ named: { size = '' } }) => {
							if (size) {
								return 'well-' + size;
							} else {
								return '';
							}
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

		/**
		 * WellSizeControl returns a Toolbar component with well sizes that changes via on click and updates the well's size.
		 *
		 * @return Toolbar component with well sizes
		 * */
		const WellSizeControl = () => {
			function createClassControl ( wellSize ) {

				//Switch checks the size control wellSize and returns the corresponding size
				let size = '';
				switch (wellSize) {
					case 'default':
						break;
					case 'small':
						size = 'well-sm';
						break;
					case 'large':
						size = 'well-lg';
						break;
					default:
						break;
				}

				const svgSmall = <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><rect x="0" fill="none"/><G><Path d="M15.75 6.75L18 3v14l-2.25-3.75L17 12h-4v4l1.25-1.25L18 17H2l3.75-2.25L7 16v-4H3l1.25 1.25L2 17V3l2.25 3.75L3 8h4V4L5.75 5.25 2 3h16l-3.75 2.25L13 4v4h4z"/></G></SVG>;
				const svgLarge= <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><rect x="0" fill="none"/><G><Path d="M7 8h6v4H7zm-5 5v4h4l-1.2-1.2L7 12l-3.8 2.2M14 17h4v-4l-1.2 1.2L13 12l2.2 3.8M14 3l1.3 1.3L13 8l3.8-2.2L18 7V3M6 3H2v4l1.2-1.2L7 8 4.7 4.3"/></G></SVG>;
				const svgDefault = <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><rect x="0" fill="none"/><G><Path d="M18 3v2H2V3h16zm-6 4v2H2V7h10zm6 0v2h-4V7h4zM8 11v2H2v-2h6zm10 0v2h-8v-2h8zm-4 4v2H2v-2h12z"/></G></SVG>;

				return {
					icon: wellSize == 'small' ? svgSmall : wellSize == 'large' ? svgLarge : svgDefault,
					title: wellSize.charAt(0).toUpperCase() + wellSize.slice(1),
					isActive: attributes.wellSize === size,
					onClick: () => setAttributes( { wellSize: size, activeWell: size } ),
				};
			};

			return(
				<Toolbar controls={ [ 'default', 'small', 'large' ].map( createClassControl ) } />
			);
		}

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
			<BlockControls>
				<WellSizeControl/>
			</BlockControls>
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
