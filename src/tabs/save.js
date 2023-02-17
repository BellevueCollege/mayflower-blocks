import {__} from '@wordpress/i18n';
import {
	useBlockProps,
	InnerBlocks,
} from '@wordpress/block-editor';

export default function save( props ) {
	const { attributes: {
	} } = props;

	const blockProps = useBlockProps.save({
		className: 'card',
	});
	return (
		<div {...blockProps }>
			<InnerBlocks.Content />
		</div>
	);
}
