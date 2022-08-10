/**
 * Block: Card (used to be called Panel)
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
		 buttonText,
		 buttonLink,
		 linkTarget,
		 rel,
		 buttonType,
		 activeButtonType,
		 buttonAlign,
		 buttonBlock,
		 buttonSize
	 }, setAttributes, isSelected } = props;

	 return (
		 <>

		 </>
	 );

 }
