const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType, PlainText } = wp.blocks; // Import registerBlockType() from wp.blocks
// const { RichText, BlockControls, InspectorControls, AlignmentToolbar } = wp.blockEditor;

const { getCurrentPostId } = wp.data;
const { ServerSideRender, TextControl, SelectControl, ToggleControl, Toolbar, SVG, Path, G, PanelBody, PanelRow } = wp.components;

import {
	useBlockProps,
	RichText,
	BlockControls,
	InspectorControls,
	AlignmentToolbar,
} from '@wordpress/block-editor';

export default function save( props ) {
	const { attributes: {
		buttonText,
		buttonLink,
		linkTarget,
		rel,
		buttonType,
		activeButtonType,
		buttonAlign,
		buttonBlock,
		buttonSize
	} } = props;
	const disabled = buttonLink === undefined || buttonLink === '' ? true : false;
	return (
		<RichText.Content
			tagName="a"
			className={ `btn btn-${ buttonType } ${ buttonBlock ? 'btn-block' : '' } ${ buttonSize } ${ disabled ? 'disabled' : '' }` }
			target= { linkTarget }
			rel= { rel }
			href={ buttonLink }
			value={ buttonText }
			aria-disabled={ disabled }
		/>
	);
}
