/**
 * Block: Collapisbles (Child of Collapse)
 */

import { __ } from '@wordpress/i18n';

import { useSelect } from '@wordpress/data';

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
	PanelRow,
	Spinner
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
	const { attributes: {
		currentBlockClientId,
	}, setAttributes, isSelected, clientId } = props;
	setAttributes( { currentBlockClientId: clientId } );

	const blockProps = useBlockProps({
		className: 'accordion',
		id: `accordion_${ clientId }`

	});


	const theme = useSelect( ( select ) => {
		return select( 'core' ).getCurrentTheme();
	}, [] );

	// Set bootstrap version flag
	const isBootstrap5 = ( t ) => {
		if ( theme && 'Mayflower G4' !== theme.name.rendered ) {
			return true;
		}
		return false;
	}

	// Only display the block if the theme has been detected.
	if ( theme ) {

		setAttributes( { isBootstrap5: isBootstrap5( theme ) } );

		return (
			<>
				<div {...blockProps}>
					<InnerBlocks
						allowedBlocks={ [ 'mayflower-blocks/collapse' ] }
						renderAppender={ InnerBlocks.ButtonBlockAppender  }
						placeholder={ <p className="placeholder">Click the + to add as many Collapse elements as you want to this Collapsibles block.</p> }
					/>
				</div>
			</>
		);
	} else {
		// If theme hasn't returned yet, return a spinner
		return (
			<div {...blockProps}>
				<Spinner /> Determining the current theme...
			</div>
		);

	}

}
