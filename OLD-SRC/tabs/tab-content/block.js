/**
 * BLOCK: Tab-Panel
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

// Import CSS.
// import './style.scss';
import './editor.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType, getBlockDefaultClassName } = wp.blocks; // Import registerBlockType() from wp.blocks
const { InnerBlocks } = wp.blockEditor;
const { select } = wp.data;

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

registerBlockType( 'mayflower-blocks/tab-content', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Tab Content' ), // Block title.
	icon: 'category', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'bootstrap-blocks', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	parent: [ 'mayflower-blocks/tabs' ],

	attributes: {
	},

	edit: function() {
		// Prevent backspace from removing first paragraph because if it gets removed, the user can't add new paragraphs
		// Credit to https://wordpress.stackexchange.com/a/353496
		document.body.addEventListener( 'keydown', function( event ) {
			if ( ( event.key === 'Backspace' ) ) {
				const selectionStart = select( 'core/block-editor' ).getSelectionStart();

				const notInEditableBlock = ! ( 'offset' in selectionStart );

				const cursorIsAtBeginningOfEditableBlock = notInEditableBlock ? false : selectionStart.offset === 0;

				const currentBlockIsFirstChild = select( 'core/block-editor' ).getPreviousBlockClientId() === null;

				if ( ( notInEditableBlock ) || ( cursorIsAtBeginningOfEditableBlock && currentBlockIsFirstChild ) ) {
					event.preventDefault();
				}
			}
		} );

		return (
			<div className="tab-content">
				<InnerBlocks
					allowedBlocks={ [ 'mayflower-blocks/tab-content-panel' ] }
					renderAppender={ false }
					templateLock={ false }
				/>
			</div>
		);
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */

	save: function( {} ) {
		const className = getBlockDefaultClassName( 'mayflower-blocks/tab-content' );
		return (
			<div className={ `${ className } card-body tab-content` }>
				<InnerBlocks.Content />
			</div>
		);
	},

	deprecated: [
		{
			save: function( {} ) {
				const className = getBlockDefaultClassName( 'mayflower-blocks/tab-content' );
				return (
					<div className={ `${ className } tab-content` }>
						<InnerBlocks.Content />
					</div>
				);
			},
		},
	],
} );
