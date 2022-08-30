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
		collapseHeadingText,
		collapseText,
		collapseClass,
		currentBlockClientId,
		expanded,
		parentBlockClientId,
		collapseLightBg,
		headingTag,
	} } = props;
	const HeadingTag = headingTag;
	return (
		<>
		<div className={ 'card bg-' + collapseClass + (
			collapseClass !== 'default' &&
			collapseClass !== 'light' &&
			collapseClass !== 'info' ? ' text-white' : '' ) }>
			<div className="card-header" id={ `heading_${ currentBlockClientId }` }>
				<HeadingTag className="mb-0">
					<button className={ `btn${ ( ! expanded ? ' collapsed' : '' ) }${ (
						collapseClass !== 'default' &&
						collapseClass !== 'light' &&
						collapseClass !== 'info' ? ' text-white' : '' ) }` } type="button" data-toggle="collapse" data-target={ `#collapse_${ currentBlockClientId }` } aria-expanded={ expanded } aria-controls={ `collapse_${ currentBlockClientId }` }>
						<RichText.Content
							value={ collapseHeadingText }
						/>
					</button>
				</HeadingTag>
			</div>

			<div id={ `collapse_${ currentBlockClientId }` } className={ `collapse${ ( expanded ? ' show' : '' ) }` } aria-labelledby={ `heading_${ currentBlockClientId }` } data-parent={ `#accordion_${ parentBlockClientId ? parentBlockClientId : 'undefined'}` }>
				<div className={ 'card-body' + ( collapseLightBg === true ? ' bg-light text-dark' : '' ) }>
					{ collapseText !== null && collapseText !== '' && collapseText !== undefined ?
						<RichText.Content
							tagName="div"
							value={ collapseText }
						/> : '' }
					<InnerBlocks.Content />
				</div>
			</div>

		</div>
	</>
	);
}
