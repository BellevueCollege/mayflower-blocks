import { createBlock } from '@wordpress/blocks';
const transforms = {
	from: [
		{
			type: 'shortcode',
			tag: 'table',
			attributes: {
				tableId: {
					type: 'string',
					shortcode: ( { named: { id } } ) => {
						return id;
					},
				},
			},
		},
	],

	to: [
		{
			type: 'block',
			blocks: [ 'tablepress/table' ],
			transform: ( attributes ) => {
				// If there is a table ID available, use it
				if ( attributes.tableId ) {
					console.log( 'Found table ID in attributes - creating tablepress/table block' );
					return createBlock(
						'tablepress/table',
						{ id: attributes.tableId },
					);
				}
			}


		},
	],
};
export default transforms;
