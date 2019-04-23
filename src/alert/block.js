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

registerBlockType( 'mayflower-blocks/alert', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Alert' ), // Block title.
	icon: 'warning', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'bootstrap-blocks', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.

	attributes: {
		alertText: {
			type: 'string',
			default: ''
		},
		alertClass: {
			type: 'string',
			default: 'info'
		},
		activeAlert: {
			type: 'string',
			default: 'info'
		}
	},
	
	//Existing bootstrap alert shortcode transformed into its block counterpart.
	//Allows use of [alert type=""][/alert]
	transforms: {
		from: [
			{
				type: 'shortcode',
				tag: 'alert',
				attributes: {
					// Alert Text
					alertText: {
						type: 'string',
						shortcode: (attrs, { content }) => {
							// Content returns the whole shortcode, so we need to match only shortcode content
							let rx = /(?<=\[\s*\s*alert.*\])((.|\s)*\S(.|\s)*)(?=\[\s*\/\s*alert\s*\])/gmi;
							let filtered = content.match(rx);
							
							// Return content at array[0] if there was a match, otherwise return blank string
							return Array.isArray(filtered) ? filtered[0] : '';
						},
					},

					// Alert Type/Bootstrap Class
					alertClass: {
						type: 'string',
						shortcode: ({ named: { type = 'type' } }) => {
							return type;
						},
					},

					//Active Alert Class
					activeAlert: {
						type: 'string',
						shortcode: ({ named: { type = 'type' } }) => {
							return type;
						},
					},
				},
			},
			{
				type: 'block',
				blocks: [ 'core/paragraph' ],
				transform: ( attributes ) => {
					const paragraphBlock = createBlock( 'core/paragraph', {content: attributes.content} );
					return createBlock( 'mayflower-blocks/alert', attributes, [paragraphBlock]);
				},
			},
		],
		to: [
			{
				type: 'block',
				blocks: [ 'mayflower-blocks/lead' ],
				isMatch: ( {alertText} ) => { //Perform a match to see if an alert can be transformed to a lead block
					const alertBlock = select('core/editor').getSelectedBlock();
					const alertBlockInnerBlocks = alertBlock.innerBlocks;
					if ((alertText && alertBlockInnerBlocks.length == 0) || (alertText && alertBlockInnerBlocks.length == 1 && alertBlockInnerBlocks[0].attributes.content == '')) {
						return true;
					}
					if (alertText == '' && alertBlockInnerBlocks.length == 1){ //Return true if alert only has 1 innerblock and it is a paragraph block
						return alertBlockInnerBlocks[0].name == 'core/paragraph';
					}
					
				},
				transform: ( {alertText} ) => {
					const alertBlock = select('core/editor').getSelectedBlock();
					if (alertText){
						return createBlock( 'mayflower-blocks/lead', {leadText: alertText});
					} else {
						return createBlock( 'mayflower-blocks/lead', {leadText: alertBlock.innerBlocks[0].attributes.content});
					}
					
				},
			},
			{
				type: 'block',
				blocks: [ 'mayflower-blocks/well' ],
				transform: ( attributes ) => {
					const alertBlockInnerBlocks = select('core/editor').getSelectedBlock().innerBlocks;
					return createBlock( 'mayflower-blocks/well', {wellText: attributes.alertText}, alertBlockInnerBlocks);
				},
			},
			{
				type: 'block',
				blocks: [ 'core/paragraph' ],
				isMatch: ( {alertText} ) => { //Perform a match to see if an alert can be transformed to a paragraph block
					const alertBlock = select('core/editor').getSelectedBlock();
					const alertBlockInnerBlocks = alertBlock.innerBlocks;
					if (alertText) {
						return true;
					} else {
						if (alertBlockInnerBlocks.length >= 1){ //Return true if first innerblock is a paragraph
							return alertBlockInnerBlocks[0].name == 'core/paragraph';
						}
					}
				},
				transform: ( attributes ) => {
					const alertBlock = select('core/editor').getSelectedBlock();
					const alertBlockIndex = select('core/editor').getBlockIndex(alertBlock.clientId);
					const alertBlockInnerBlocks = alertBlock.innerBlocks;
					
					//if shortcode alertText exists, return paragraph transform and any innerblocks after shortcode paragraph content
					if (attributes.alertText){
						if (alertBlockInnerBlocks.length >= 1){
							dispatch('core/editor').insertBlocks(alertBlockInnerBlocks, alertBlockIndex + 1);
						}
						return createBlock( 'core/paragraph', {content: attributes.alertText});
					} else { //if no shortcode alertText, return innerblocks
						if (alertBlockInnerBlocks.length > 1) { //if more than 1 innerblock, dispatch remaining innerblocks to appear after first innerblock
							dispatch('core/editor').insertBlocks(alertBlockInnerBlocks.slice(1), alertBlockIndex + 1);
						}
						return alertBlockInnerBlocks[0];
					}
				},
			},
		],
	},

	edit: function ({ className, attributes, setAttributes }) {

		/**
		 * AlertClassControl returns a Toolbar component with alert classes that changes via on click and updates the alert block's style.
		 *
		 * @return Toolbar component with alert classes
		 * */
		const AlertClassControl = () => {
			function createClassControl ( alertClass ) {

				//Switch checks the class control alertClass and returns the corresponding colorClass to update the SVG icon
				let colorClass = '';
				switch (alertClass) {
					case 'info':
						colorClass = '#31708f';
						break;
					case 'success':
						colorClass = '#3c763d';
						break;
					case 'warning':
						colorClass = '#8a6d3b';
						break;
					case 'danger':
						colorClass = '#a94442';
						break;
					default:
						colorClass = '#31708f';
						break;
				}

				return {
					icon: <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
							<circle fill="white" cx="10" cy="10" r="10"/>
							<G>
								<Path fill={colorClass} d="M10 2c4.42 0 8 3.58 8 8s-3.58 8-8 8-8-3.58-8-8 3.58-8 8-8zm1.13 9.38l.35-6.46H8.52l.35 6.46h2.26zm-.09 3.36c.24-.23.37-.55.37-.96 0-.42-.12-.74-.36-.97s-.59-.35-1.06-.35-.82.12-1.07.35-.37.55-.37.97c0 .41.13.73.38.96.26.23.61.34 1.06.34s.8-.11 1.05-.34z"/>
							</G>
							</SVG>,
					title: alertClass.charAt(0).toUpperCase() + alertClass.slice(1),
					isActive: attributes.activeAlert === alertClass,
					onClick: () => setAttributes( { alertClass: alertClass, activeAlert: alertClass } ),
				};
			};

			return(
				<Toolbar controls={ [ 'info', 'success', 'warning', 'danger' ].map( createClassControl ) } />
			);
		}

		return [
			<InspectorControls>
				<SelectControl
					label="Alert Style"
					value={attributes.alertClass}
					options={[
						{ label: 'Info (Light Blue)', value: 'info' },
						{ label: 'Success (Green)', value: 'success' },
						{ label: 'Warning (Yellow)', value: 'warning' },
						{ label: 'Danger (Red)', value: 'danger' },
					]}
					onChange={(alertClass) => { 
						setAttributes({ alertClass: alertClass, activeAlert: alertClass });
					}}
				/>
			</InspectorControls>
			,
			<BlockControls>
				<AlertClassControl/>
			</BlockControls>
			,
			<div className={className}>
				<div className = {`alert alert-${attributes.alertClass}`}>

				{attributes.alertText !== null && attributes.alertText !== '' && attributes.alertText !== undefined ? 
					<RichText
						tagName = "div"
						formattingControls = {['bold', 'italic', 'link']}
						placeholder = "Enter text or add blocks below..."
						keepPlaceholderOnFocus = "true"
						value = {attributes.alertText}
						onChange = {(alertText) => setAttributes({ alertText })}
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
			<div className = {`alert alert-${attributes.alertClass}`}>
				{attributes.alertText !== null && attributes.alertText !== '' && attributes.alertText !== undefined ? 
					<RichText.Content
						tagName = "div"
						value = {attributes.alertText}
					/>
				: '' }
				<InnerBlocks.Content />
			</div>
		);
	},
} );
