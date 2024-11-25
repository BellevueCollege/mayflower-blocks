import { __ } from '@wordpress/i18n';

import {
	InnerBlocks,
	useBlockProps,

} from '@wordpress/block-editor';


export default function Edit( props ) {

	const { attributes: {
	}, setAttributes, isSelected } = props;

	const blockProps = useBlockProps({
		className: 'btn-group'
	});

	return (
		<div { ...blockProps }>
			<InnerBlocks
				placeholder={ <p className="m-2">{ __('Click the + icon to add Buttons', 'mayflower-blocks') }</p> }
			/>
		</div>

	);

}
