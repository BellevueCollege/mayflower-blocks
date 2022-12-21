import { __ } from '@wordpress/i18n';

import {
	useBlockProps,
	RichText,
	InnerBlocks
} from '@wordpress/block-editor';

export default function save( props ) {
	const { attributes: {
		alertText,
		alertClass,
		activeAlert,
	} } = props;
	const blockProps = useBlockProps.save({
		className: `alert alert-${ alertClass }`
	});
	return (
		<div { ...blockProps } >
			{ alertText !== null && alertText !== '' && alertText !== undefined ?
				<RichText.Content
					tagName="div"
					value={ alertText }
				/> :
				'' }
			<InnerBlocks.Content />
		</div>
	);
}
