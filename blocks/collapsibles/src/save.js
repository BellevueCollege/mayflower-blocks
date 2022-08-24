const { registerBlockType, PlainText } = wp.blocks; // Import registerBlockType() from wp.blocks
// const { RichText, BlockControls, InspectorControls, AlignmentToolbar } = wp.blockEditor;

const { getCurrentPostId } = wp.data;
const { ServerSideRender, TextControl, SelectControl, ToggleControl, Toolbar, SVG, Path, G, PanelBody, PanelRow } = wp.components;
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
	return (
		<div className="accordion" id={ `accordion_${ currentBlockClientId ? currentBlockClientId : 'undefined'}` }>
			<InnerBlocks.Content />
		</div>
	);
}
