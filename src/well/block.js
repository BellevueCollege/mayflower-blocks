/**
 * BLOCK: Well
 *
 * The Well block allows a Bootstrap 3 well. This has been removed
 * with Globals/Bootstrap 4.
 */

// Import CSS.
// import './style.scss';
import './editor.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType, createBlock } = wp.blocks;
const { RichText, InnerBlocks } = wp.blockEditor;
const { Component } = wp.element;
const { select, dispatch } = wp.data;
const { insertBlock, insertBlocks, removeBlock } = dispatch( 'core/block-editor' );
const { getBlock, getBlockIndex, getSelectedBlock } = select( 'core/block-editor' );

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
	supports: {
		inserter: false,
	},
	attributes: {
		wellText: {
			type: 'string',
			default: '',
		},
		wellSize: {
			type: 'string',
			default: '',
		},
		activeWell: {
			type: 'string',
			default: '',
		},
	},

	//Existing bootstrap well shortcode transformed into its block counterpart.
	//Allows use of [well size=""][/well]
	transforms: {
		to: [
			{
				type: 'block',
				blocks: [ 'mayflower-blocks/panel' ],
				transform: ( innerBlocks ) => {
					return createBlock( 'mayflower-blocks/panel', { cardHeading: false, cardFooter: false, cardType: 'light' }, innerBlocks );
				},
			},
			{
				type: 'block',
				blocks: [ 'mayflower-blocks/lead' ],
				isMatch: ( { wellText } ) => { //Perform a match to see if a well can be transformed to a lead block
					const wellBlock = getSelectedBlock();
					const wellBlockInnerBlocks = wellBlock.innerBlocks;
					if ( ( wellText && wellBlockInnerBlocks.length === 0 ) || ( wellText && wellBlockInnerBlocks.length === 1 && wellBlockInnerBlocks[ 0 ].attributes.content === '' ) ) {
						return true;
					}
					if ( wellText === '' && wellBlockInnerBlocks.length === 1 ) { //Return true if well only has 1 innerblock and it is a paragraph block
						return wellBlockInnerBlocks[ 0 ].name === 'core/paragraph';
					}
				},
				transform: ( { wellText } ) => {
					const wellBlock = getSelectedBlock();
					if ( wellText ) {
						return createBlock( 'mayflower-blocks/lead', { leadText: wellText } );
					}
					return createBlock( 'mayflower-blocks/lead', { leadText: wellBlock.innerBlocks[ 0 ].attributes.content } );
				},
			},
			{
				type: 'block',
				blocks: [ 'mayflower-blocks/alert' ],
				transform: ( attributes ) => {
					const wellBlockInnerBlocks = getSelectedBlock().innerBlocks;
					return createBlock( 'mayflower-blocks/alert', { alertText: attributes.wellText }, wellBlockInnerBlocks );
				},
			},
			{
				type: 'block',
				blocks: [ 'core/paragraph' ],
				isMatch: ( { wellText } ) => { //Perform a match to see if a well can be transformed to a paragraph block
					const wellBlock = getSelectedBlock();
					const wellBlockInnerBlocks = wellBlock.innerBlocks;
					if ( wellText ) {
						return true;
					}
					if ( wellBlockInnerBlocks.length >= 1 ) { //Return true if first innerblock is a paragraph
						return wellBlockInnerBlocks[ 0 ].name === 'core/paragraph';
					}
				},
				transform: ( attributes ) => {
					const wellBlock = getSelectedBlock();
					const wellBlockIndex = getBlockIndex( wellBlock.clientId );
					const wellBlockInnerBlocks = wellBlock.innerBlocks;
					//if shortcode wellText exists, return paragraph transform and any innerblocks after shortcode paragraph content
					if ( attributes.wellText ) {
						if ( wellBlockInnerBlocks.length >= 1 ) {
							insertBlocks( wellBlockInnerBlocks, wellBlockIndex + 1 );
						}
						return createBlock( 'core/paragraph', { content: attributes.wellText } );
					} //if no shortcode wellText, return innerblocks
					if ( wellBlockInnerBlocks.length > 1 ) { //if more than 1 innerblock, dispatch remaining innerblocks to appear after first innerblock
						insertBlocks( wellBlockInnerBlocks.slice( 1 ), wellBlockIndex + 1 );
					}
					return wellBlockInnerBlocks[ 0 ];
				},
			},
		],
	},

	edit: class extends Component {
		constructor( props ) {
			super( ...arguments );
			this.props = props;
		}

		componentDidMount() {
			// On component mount, fire so each Well converts into a Card automatically
			this.handleConvertToCard();
		}

		/**
		 * Handles converting Wells into Card blocks
		 *
		 * Gets the current Well block clientId and takes it's innerblocks to create a new Card block, then removes the old Well block, and inserts the new Card block
		 */
		handleConvertToCard = () => {
			const currentBlockClientId = this.props.clientId;
			const wellBlockInnerBlocks = getBlock( currentBlockClientId ).innerBlocks;
			if ( Array.isArray( wellBlockInnerBlocks ) ) {
				const cardBlock = createBlock( 'mayflower-blocks/panel', { cardHeading: false, cardFooter: false, cardType: 'light' }, wellBlockInnerBlocks );
				const currentIndex = getBlockIndex( currentBlockClientId );
				removeBlock( currentBlockClientId, false );
				insertBlock( cardBlock, currentIndex );
			}
		};

		render() {
			// Return true because we are not rendering anything new
			return true;
		}
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */

	save: ( { attributes } ) => {
		return (
			<div className={ `well ${ attributes.wellSize }` }>
				{ attributes.wellText !== null && attributes.wellText !== '' && attributes.wellText !== undefined ?
					<RichText.Content
						tagName="div"
						value={ attributes.wellText }
					/> : '' }
				<InnerBlocks.Content />
			</div>
		);
	},
} );
