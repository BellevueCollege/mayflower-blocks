const transforms = {
	from: [
		{
			type: 'shortcode',
			tag: 'coursedescription',
			attributes: {
				subject: {
					type: 'string',
					shortcode: ( { named: { subject } } ) => {
						return subject;
					},
				},
				item: {
					type: 'string',
					shortcode: ( { named: { item } } ) => {
						return item;
					},
				},
				description: {
					type: 'boolean',
					shortcode: ( { named: { description } } ) => {
						return description;
					},
				},
				headingTag: {
					type: 'string',
					default: 'h2',
				},
			},
		},
	],
}
export default transforms;
