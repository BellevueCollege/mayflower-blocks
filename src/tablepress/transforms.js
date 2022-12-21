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
};
export default transforms;
