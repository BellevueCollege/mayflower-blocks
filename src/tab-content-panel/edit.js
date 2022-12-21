/**
 * Block: Card (used to be called Panel)
 */

import { __ } from '@wordpress/i18n';

import {
	useBlockProps,
	InnerBlocks
} from '@wordpress/block-editor';

export default function Edit( props ) {
	const blockProps = useBlockProps(
		{
			role: 'tabpanel',
			className: `tab-pane ${ props.attributes.tabActive ? 'active' : '' }`,
			id: props.attributes.tabId
		}
	);
	const { attributes: {

	}, isSelected, clientId } = props;


	return (
		<div { ...blockProps }>
			<InnerBlocks
				templateLock={ false }
				template={ [[ 'core/paragraph', {} ] ] }
				renderAppender={ InnerBlocks.DefaultBlockAppender }
				placeholder={ <p>Click the + icon to add a block</p> }
			/>
		</div>
	);

}
