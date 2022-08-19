const { __ } = wp.i18n; // Import __() from wp.i18n

import {
	useBlockProps,
	InnerBlocks,
} from '@wordpress/block-editor';

export default function save( props ) {

	const blockProps = useBlockProps.save({
		className: 'row'
	});
	return (
		<div { ...blockProps }>
			<InnerBlocks.Content />
		</div>
	);
}
