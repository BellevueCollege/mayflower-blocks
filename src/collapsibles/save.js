import { PlainText } from '@wordpress/block-editor';

import {
	ServerSideRender,
	TextControl,
	SelectControl,
	ToggleControl,
	Toolbar,
	SVG,
	Path,
	G,
	PanelBody,
	PanelRow,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	BlockControls,
	InspectorControls,
	AlignmentToolbar,
	InnerBlocks,
} from '@wordpress/block-editor';

export default function save( props ) {
	const { attributes: {
		currentBlockClientId,
	} } = props;
	const blockProps = useBlockProps.save({
		className: 'accordion',
		id: `accordion_${ currentBlockClientId ? currentBlockClientId : 'undefined'}`
	});
	return (
		<div { ...blockProps }>
			<InnerBlocks.Content />
		</div>
	);
}
