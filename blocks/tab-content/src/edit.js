/**
 * Block: Card (used to be called Panel)
 */

import { __ } from '@wordpress/i18n';


import {
	useBlockProps,
	InnerBlocks
} from '@wordpress/block-editor';


import './editor.scss';
import './style.scss';

export default function Edit( props ) {
	const blockProps = useBlockProps({
		className: 'tab-content'
	});
	const { attributes: {
	}, setAttributes, isSelected } = props;

	return (
		<div { ...blockProps }>
			<InnerBlocks
				allowedBlocks={ [ 'mayflower-blocks/tab-content-panel' ] }
				renderAppender={ false }
				templateLock={ false }
			/>
		</div>
	);

}
