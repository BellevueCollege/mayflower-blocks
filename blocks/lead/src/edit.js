/**
 * Block: Lead
 */

 import { __ } from '@wordpress/i18n';


 import { useEffect, useState, useRef } from '@wordpress/element';

 import {
	 TextControl,
	 SelectControl,
	 ToggleControl,
	 ToolbarButton,
	 Popover,
	 ToolbarDropdownMenu,
	 SVG,
	 Path,
	 G,
	 PanelBody,
	 PanelRow
 } from '@wordpress/components';

 import {
	 useBlockProps,
	 RichText,
	 BlockControls,
	 InspectorControls,
	 AlignmentToolbar,
	 __experimentalLinkControl as LinkControl,
	 __experimentalGetElementClassName,
 } from '@wordpress/block-editor';


 import './editor.scss';
 import './style.scss';

 export default function Edit( props ) {
	 const blockProps = useBlockProps();
	 const { attributes: {
		 leadText
	 }, setAttributes, isSelected } = props;
		return [
			<div {...blockProps}>
				<RichText
					tagName="div"
					className="lead"
					allowedFormats={ [ 'bold', 'italic', 'link' ] }
					placeholder="Enter text..."
					keepPlaceholderOnFocus="true"
					value={ leadText }
					onChange={ ( leadText ) => setAttributes( { leadText } ) }
				/>
			</div>,
		]; 
	 return ( // original template return
		 <>

		 </>
	 );

 }
