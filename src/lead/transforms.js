


const transforms = {
	from: [
		{
			type: 'block',
			blocks: [ 'core/paragraph' ],
			transform: ( { content } ) => {
				return createBlock( 'mayflower-blocks/lead', {
					leadText: content,
				} );
			},
		},
	],
	to: [
		{
			type: 'block',
			blocks: [ 'core/paragraph' ],
			transform: function( attributes ) {
				return createBlock( 'core/paragraph', {
					content: attributes.leadText,
				} );
			},
		},
		{
			type: 'block',
			blocks: [ 'mayflower-blocks/alert' ],
			transform: function( attributes ) {
				const paragraphBlock = createBlock( 'core/paragraph', { content: attributes.leadText } );
				return createBlock( 'mayflower-blocks/alert', attributes, [ paragraphBlock ] );
			},
		},
	],
}
