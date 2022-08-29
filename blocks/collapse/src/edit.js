/**
 * Block: Collapse (Parent block of Collapsibles)
 */

import { __ } from '@wordpress/i18n';

import {
	SelectControl,
	ToggleControl,
	Toolbar,
	ToolbarDropdownMenu,
	ToolbarButton,
	SVG,
	Path,
	G,
	PanelBody,
	PanelRow,
	Tooltip
} from '@wordpress/components';

import {
	useBlockProps,
	RichText,
	BlockControls,
	InspectorControls,
	InnerBlocks,
} from '@wordpress/block-editor';

import {select,} from '@wordpress/data';

import {
	ToolbarBootstrapColorSelector,
	ToolbarBootstrapHeadingLevelSelector,
} from 'shared-elements/toolbar';


import './editor.scss';
import './style.scss';


export default function Edit( props ) {
	const { attributes: {
		collapseHeadingText,
		collapseText,
		collapseClass,
		currentBlockClientId,
		expanded,
		parentBlockClientId,
		collapseLightBg,
		headingTag,
	}, setAttributes, isSelected, clientId } = props;

	const blockProps = useBlockProps({
		className: 'card bg-' + collapseClass + (
			collapseClass !== 'default' &&
			collapseClass !== 'light' &&
			collapseClass !== 'info' ? ' text-white' : '' )
	});

	const parentClientId = select('core/block-editor').getBlockRootClientId( clientId );
	// set the clientId attributes so save() can access the clientId and parent clientId
	setAttributes( { currentBlockClientId: clientId } );
	setAttributes( { parentBlockClientId: parentClientId } );
	const HeadingTag = headingTag;

	/**
	 * Check if ANY child block is currently selected
	 *
	 * Credit: https://stackoverflow.com/a/55955285
	 */
	function hasSelectedChild(props) {
		const select = wp.data.select('core/block-editor');
		const selected = select.getBlockSelectionStart();
		const inner = select.getBlock(props.clientId).innerBlocks;
		for (let i = 0; i < inner.length; i++) {
			if (inner[i].clientId === selected || inner[i].innerBlocks.length && hasSelectedChild(inner[i])) {
				return true;
			}
		}
		return false;
	};
	return (
		<>
			<BlockControls>
				<ToolbarBootstrapHeadingLevelSelector
					values = { [ 'Heading 2', 'Heading 3', 'Heading 4', 'Heading 5', 'Heading 6' ] }
					active = { headingTag }
					onClick = { ( tag ) => setAttributes( { headingTag: tag } ) }

				/>
				<ToolbarBootstrapColorSelector
					values = { [ 'default', 'primary', 'secondary', 'info', 'success', 'warning', 'danger', 'light', 'dark' ] }
					active = { collapseClass }
					onClick = { ( color ) => setAttributes( { collapseClass: color } ) }
				/>
				<ToolbarButton
					icon="lightbulb"
					label="Light Background"
					onClick={ () => setAttributes( { collapseLightBg: ! collapseLightBg } ) }
					isActive={ collapseLightBg }
				/>
				<ToolbarButton
					icon="editor-expand"
					label="Start Expanded"
					onClick={ () => setAttributes( { expanded: ! expanded } ) }
					isActive={ expanded }
				/>
			</BlockControls>
			<InspectorControls>
				<PanelBody
					title="Card Style"
					initialOpen={ false }
				>
					<PanelRow>
						<SelectControl
							label="Color"
							value={ collapseClass }
							options={ [
								{ label: 'Default', value: 'default' },
								{ label: 'Primary (BC Blue)', value: 'primary' },
								{ label: 'Secondary (Gray)', value: 'secondary' },
								{ label: 'Info (Light Blue)', value: 'info' },
								{ label: 'Success (Green)', value: 'success' },
								{ label: 'Warning (Yellow)', value: 'warning' },
								{ label: 'Danger (Red)', value: 'danger' },
								{ label: 'Light', value: 'light' },
								{ label: 'Dark', value: 'dark' },
							] }
							onChange={ ( collapseClass ) => {
								setAttributes( { collapseClass } );
							} }
						/>
					</PanelRow>
					<PanelRow>
						<ToggleControl
							label="Use Light Background for Card Body"
							checked={ collapseLightBg }
							onChange={ ( collapseLightBg ) => setAttributes( { collapseLightBg } ) }
						/>
					</PanelRow>
					<PanelRow>
						<ToggleControl
							label="Start Expanded"
							help={ expanded ? 'Module will start out in an expanded state' : 'Module will start out in a collapsed state' }
							checked={ expanded }
							onChange={ ( expanded ) => {
								setAttributes( { expanded } );
							} }
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<div className="card-header" id={ `heading_${ currentBlockClientId }` }>
					<HeadingTag className="mb-0 h6">
						<RichText
							tagName="span"
							allowedFormats={ [ 'bold', 'italic', 'link' ] }
							placeholder="Enter header text..."
							keepPlaceholderOnFocus="true"
							value={ collapseHeadingText }
							onChange={ ( collapseHeadingText ) => setAttributes( { collapseHeadingText } ) }
						/>
						<Tooltip
							text={ __( "The heading level of this collapse. Doesn't show on the front-end." ) }
						>
							<span className="badge badge-info float-right">{ headingTag.toUpperCase() }</span>
						</Tooltip>
					</HeadingTag>
				</div>
				<div
					id={ `collapse_${ currentBlockClientId }` }
					className={ `collapse ${ expanded || isSelected || hasSelectedChild( props ) ? 'show' : '' }` }
					aria-labelledby={ `heading_${ currentBlockClientId }` }
					data-parent={ `#accordion_${ parentClientId }` }
				>
					<div className={ 'card-body' + ( collapseLightBg === true ? ' bg-light text-dark' : '' ) }>
						<InnerBlocks />
					</div>
				</div>
			</div>
		</>
	);

}
