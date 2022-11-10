const { registerBlockType, PlainText } = wp.blocks; // Import registerBlockType() from wp.blocks
// const { RichText, BlockControls, InspectorControls, AlignmentToolbar } = wp.blockEditor;

const { getCurrentPostId } = wp.data;
import { useSelect, select } from '@wordpress/data';
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
		isBootstrap5,
	} } = props;
	const HeadingTag = headingTag;



	const colorClass = 'bg-' + collapseClass + (
		collapseClass !== 'default' &&
		collapseClass !== 'light' &&
		collapseClass !== 'warning' &&
		collapseClass !== 'info' ? ' text-white' : '' );

	// Block Classes for Bootstrap 5 and Non-Bootstrap 5 versions
	const blockClasses = {
		'container': isBootstrap5 ? 'accordion-item' : 'card',
		'heading': isBootstrap5 ? 'accordion-header' : 'card-header',
		'headingButton': isBootstrap5 ? `accordion-button ${ colorClass }` : 'btn btn-link',
		'collapse': isBootstrap5 ? 'accordion-collapse collapse' : 'collapse',
		'body': ( isBootstrap5 ? 'accordion-body' : 'card-body' ) + ( !collapseLightBg ? ` ${ colorClass }` : '' ),
	}

	const blockProps = useBlockProps.save({
		className: blockClasses.container,
	});

	return (
		<>
			<div  {...blockProps }>
				{ isBootstrap5 ? (
					<HeadingTag className={ blockClasses.heading } id={ `heading_${ currentBlockClientId }` }>
						<button
							className={ `${ blockClasses.headingButton } ${ ( ! expanded ? 'collapsed' : '' ) }` }
							type="button"
							data-bs-toggle="collapse"
							data-bs-target={ `#collapse_${ currentBlockClientId }` }
							aria-expanded={ expanded }
							aria-controls={ `collapse_${ currentBlockClientId }` }
						>
							<RichText.Content
								value={ collapseHeadingText }
							/>
						</button>
					</HeadingTag>
				) : (
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
				) }

				<div
					id={ `collapse_${ currentBlockClientId }` }
					className={ `${ blockClasses.collapse } ${ ( expanded ? 'show' : '' ) }` }
					aria-labelledby={ `heading_${ currentBlockClientId }` }
					data-parent={ `#accordion_${ parentBlockClientId ? parentBlockClientId : 'undefined'}` }
					data-bs-parent={ `#accordion_${ parentBlockClientId ? parentBlockClientId : 'undefined'}` }
				>
					<div className={ blockClasses.body }>
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
