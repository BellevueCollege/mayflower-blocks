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
	return (
		<div className={ `alert alert-${ alertClass }` }>
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
