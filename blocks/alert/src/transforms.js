import { registerBlockType, createBlock } from '@wordpress/blocks';
import { select, dispatch } from '@wordpress/data';

const transforms = {
	from: [
		{
			type: 'block',
			blocks: [ 'core/paragraph' ],
			transform: ( attributes ) => {
				const paragraphBlock = createBlock( 'core/paragraph', { content: attributes.content } );
				return createBlock( 'mayflower-blocks/alert', attributes, [ paragraphBlock ] );
			},
		},
	],
	to: [
		{
			type: 'block',
			blocks: [ 'mayflower-blocks/lead' ],
			isMatch: ( { alertText } ) => { //Perform a match to see if an alert can be transformed to a lead block
				const alertBlock = select( 'core/block-editor' ).getSelectedBlock();
				const alertBlockInnerBlocks = alertBlock.innerBlocks;
				if ( ( alertText && alertBlockInnerBlocks.length == 0 ) || ( alertText && alertBlockInnerBlocks.length == 1 && alertBlockInnerBlocks[ 0 ].attributes.content == '' ) ) {
					return true;
				}
				if ( alertText == '' && alertBlockInnerBlocks.length == 1 ) { //Return true if alert only has 1 innerblock and it is a paragraph block
					return alertBlockInnerBlocks[ 0 ].name == 'core/paragraph';
				}
			},
			transform: ( { alertText } ) => {
				const alertBlock = select( 'core/block-editor' ).getSelectedBlock();
				if ( alertText ) {
					return createBlock( 'mayflower-blocks/lead', { leadText: alertText } );
				}
				return createBlock( 'mayflower-blocks/lead', { leadText: alertBlock.innerBlocks[ 0 ].attributes.content } );
			},
		},
		{
			type: 'block',
			blocks: [ 'core/paragraph' ],
			isMatch: ( { alertText } ) => { //Perform a match to see if an alert can be transformed to a paragraph block
				const alertBlock = select( 'core/block-editor' ).getSelectedBlock();
				const alertBlockInnerBlocks = alertBlock.innerBlocks;
				if ( alertText ) {
					return true;
				}
				if ( alertBlockInnerBlocks.length >= 1 ) { //Return true if first innerblock is a paragraph
					return alertBlockInnerBlocks[ 0 ].name == 'core/paragraph';
				}
			},
			transform: ( attributes ) => {
				const alertBlock = select( 'core/block-editor' ).getSelectedBlock();
				const alertBlockIndex = select( 'core/block-editor' ).getBlockIndex( alertBlock.clientId );
				const alertBlockInnerBlocks = alertBlock.innerBlocks;

				//if shortcode alertText exists, return paragraph transform and any innerblocks after shortcode paragraph content
				if ( attributes.alertText ) {
					if ( alertBlockInnerBlocks.length >= 1 ) {
						dispatch( 'core/block-editor' ).insertBlocks( alertBlockInnerBlocks, alertBlockIndex + 1 );
					}
					return createBlock( 'core/paragraph', { content: attributes.alertText } );
				} //if no shortcode alertText, return innerblocks
				if ( alertBlockInnerBlocks.length > 1 ) { //if more than 1 innerblock, dispatch remaining innerblocks to appear after first innerblock
					dispatch( 'core/block-editor' ).insertBlocks( alertBlockInnerBlocks.slice( 1 ), alertBlockIndex + 1 );
				}
				return alertBlockInnerBlocks[ 0 ];
			},
		},
	],
}
export default transforms;
