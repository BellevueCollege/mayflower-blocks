import BuildColumnClass from './column-class';
import {
	useBlockProps,
	InnerBlocks
} from '@wordpress/block-editor';

export default function save( props ) {
	const { attributes: {
		enableXs,
		enableSm,
		enableMd,
		enableLg,
		autoXs,
		autoSm,
		autoMd,
		autoLg,
		columnsXs,
		columnsSm,
		columnsMd,
		columnsLg,
	} } = props;


	const blockProps = useBlockProps.save({
		className: BuildColumnClass( props, false ),
	});
	return (
		<div { ...blockProps }>
			<InnerBlocks.Content />
		</div>
	);
}
