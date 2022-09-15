import {
	InnerBlocks,
	useBlockProps,
} from '@wordpress/block-editor';


export default function save( props ) {
	const { attributes: {
	} } = props;
	const blockProps = useBlockProps.save({
		className: 'card-body tab-content',
	});
	return (
		<div {...blockProps }>
			<InnerBlocks.Content />
		</div>
	);
}
