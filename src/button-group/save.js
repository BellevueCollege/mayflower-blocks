const { __ } = wp.i18n; // Import __() from wp.i18n

import {
	InnerBlocks,
	useBlockProps,

} from '@wordpress/block-editor';

export default function save( props ) {
	const { attributes: {
	} } = props;

	const blockProps = useBlockProps.save({
		className: 'btn-group'
	});

	return (
		<div { ...blockProps }>
			<InnerBlocks.Content />
		</div>
	);
}
