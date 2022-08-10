import { registerBlockType, createBlock } from '@wordpress/blocks';
const transforms = {
	from: [
		{
			type: 'block',
			blocks: [ 'core/paragraph' ],
			transform: ( { content } ) => {
				const paragraphBlock = createBlock( 'core/paragraph', { content: content } );
				return createBlock(
					'mayflower-blocks/panel',
					{ cardHeading: false, cardFooter: false, cardType: 'light' },
					[paragraphBlock]
					);
			},
		},
	],
};
export default transforms;
