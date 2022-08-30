import {
	useBlockProps,
	InnerBlocks
} from '@wordpress/block-editor';

export default function save( props ) {
	const { attributes: {
		tabId,
		tabDefault
	} } = props;
	const blockProps = useBlockProps.save({
		role: 'tabpanel',
		'aria-labelledby': `tab_link_${ tabId }`,
		className: `tab-pane${ tabDefault === true ? ' active' : '' }`,
		id: `tab_${ tabId }`
	});
	return (
		<div { ...blockProps }>
			<InnerBlocks.Content />
		</div>
);
}
