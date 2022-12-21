/**
 * Block: Tabs
 */

import { __ } from '@wordpress/i18n';

import {
	useBlockProps,
	InnerBlocks
} from '@wordpress/block-editor';


import './editor.scss';

export default function Edit( props ) {
	const blockProps = useBlockProps();
	const { attributes: {
	} } = props;

	const TEMPLATE = [
		[ 'mayflower-blocks/tab-list', {}, [] ],
		[ 'mayflower-blocks/tab-content', {}, [] ],
	];

	return (
		<div { ...blockProps }>
			<InnerBlocks
				template={ TEMPLATE }
				templateLock={ 'insert' }
				allowedBlocks={ [ 'mayflower-blocks/tab-list', 'mayflower-blocks/tab-content'] }
				renderAppender={ false }
			/>
		</div>
	);

}
