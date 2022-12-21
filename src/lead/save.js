const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType, PlainText } = wp.blocks; // Import registerBlockType() from wp.blocks
// const { RichText, BlockControls, InspectorControls, AlignmentToolbar } = wp.blockEditor;

const { getCurrentPostId } = wp.data;
const { ServerSideRender, TextControl, SelectControl, ToggleControl, Toolbar, SVG, Path, G, PanelBody, PanelRow } = wp.components;

import {
	useBlockProps,
	RichText
} from '@wordpress/block-editor';

export default function save( props ) {
	const { attributes: {
		leadText
	} } = props;
	const blockProps = useBlockProps.save({
		className: 'lead'
	});
	return (
		<RichText.Content
			tagName="div"
			value={ leadText }
			{ ...blockProps }
		/>
	);
}
