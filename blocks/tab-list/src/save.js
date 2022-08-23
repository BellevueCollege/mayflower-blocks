import { InnerBlocks } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';


import {
	useBlockProps,

} from '@wordpress/block-editor';

export default function save( props ) {
	const { attributes: {

	} } = props;
	const blockProps = useBlockProps.save({
		className: 'card-header',
	});
	return (
		<div {...blockProps }>
			<ul className='nav nav-tabs card-header-tabs' role='tablist'>
				<InnerBlocks.Content />
			</ul>
		</div>
	);
}
