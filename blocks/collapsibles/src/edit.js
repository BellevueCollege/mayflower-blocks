/**
 * Block: Collapisbles (Child of Collapse)
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
	 InnerBlocks,
	 __experimentalLinkControl as LinkControl,
	 __experimentalGetElementClassName,
 } from '@wordpress/block-editor';


 import './editor.scss';
 import './style.scss';

 export default function Edit( props ) {
	 const blockProps = useBlockProps();
	 const { attributes: {
		currentBlockClientId,
	 }, setAttributes, isSelected, clientId } = props;
	 setAttributes( { currentBlockClientId: clientId } );
	 return (
		// fix div wrappers during clean-up
		 <>
			<div {...blockProps}>
				<div className="accordion" id={ `accordion_${ clientId }` }> 
					<InnerBlocks
						allowedBlocks={ [ 'mayflower-blocks/collapse' ] }
						renderAppender={ InnerBlocks.ButtonBlockAppender  }
						placeholder={ <p className="placeholder">Click the + to add as many Collapse elements as you want to this Collapsibles block.</p> }
					/>
				</div>
			</div>
		 </>
	 );

 }
