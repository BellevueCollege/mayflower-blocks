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
	return (
		<RichText.Content
		tagName="div"
		className="lead"
		value={ leadText }
	/>
	);
}
