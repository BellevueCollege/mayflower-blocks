/**
 * Block: Collapisbles (Child of Collapse)
 */

import { __ } from '@wordpress/i18n';

import { useSelect, select, dispatch } from '@wordpress/data';

import { useState } from '@wordpress/element';

import {
	Spinner
} from '@wordpress/components';

import {
	useBlockProps,
	BlockControls,
	InnerBlocks,

} from '@wordpress/block-editor';

import {
	ToolbarButton,
	ToolbarGroup,
	ToolbarItem,
} from '@wordpress/components';

import {
	ToolbarBootstrapColorSelector,
	ToolbarBootstrapHeadingLevelSelector,
} from 'shared-elements/toolbar';


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

	const getAttributeFromFirstChild = ( attribute, fallback ) => {
		const firstChild = select( 'core/block-editor' ).getBlock( clientId ).innerBlocks[0];
		if ( firstChild ) {
			return firstChild.attributes[ attribute ];
		}
		return fallback;
	}

	const broadcastToChildren = ( attribute, value ) => {
		const children =  select( 'core/block-editor' ).getBlock( clientId ).innerBlocks;
		const childIds = children.map( child => child.clientId );

		dispatch( 'core/block-editor' ).updateBlockAttributes( childIds, { [attribute]: value } );

		return null;

	};


	const theme = useSelect( ( select ) => {
		return select( 'core' ).getCurrentTheme();
	}, [] );

	// Set bootstrap version flag
	const isBootstrap5 = ( t ) => {
		if ( theme && (
				'Mayflower G4' !== theme.name.rendered ||
				'BC "Douglas Fir" Theme' !== theme.name.rendered
			)) {
			return true;
		}
		return false;
	}

	// Only display the block if the theme has been detected.
	if ( theme ) {

		setAttributes( { isBootstrap5: isBootstrap5( theme ) } );

		return (
			<>
				<BlockControls>
					<ToolbarGroup>
						<ToolbarBootstrapHeadingLevelSelector
							values = { [ 'Heading 2', 'Heading 3', 'Heading 4', 'Heading 5', 'Heading 6' ] }
							active = { getAttributeFromFirstChild( 'headingTag', 'h3' ) }
							onClick = { ( tag ) => broadcastToChildren( 'headingTag', tag ) }

						/>
						<ToolbarBootstrapColorSelector
							values = { [ 'default', 'primary', 'secondary', 'info', 'success', 'warning', 'danger', 'light', 'dark' ] }
							active = { getAttributeFromFirstChild( 'collapseClass', 'default' ) }
							onClick = { ( color ) => broadcastToChildren( 'collapseClass', color ) }
						/>
						<ToolbarButton
							icon="lightbulb"
							label="Light Background"
							onClick={ () => broadcastToChildren( 'collapseLightBg', ! getAttributeFromFirstChild( 'collapseLightBg', false ) ) }
							isActive={ getAttributeFromFirstChild( 'collapseLightBg', false ) }
						/>
					</ToolbarGroup>
				</BlockControls>
				<div {...blockProps}>
					<InnerBlocks
						allowedBlocks={ [ 'mayflower-blocks/collapse' ] }
						renderAppender={ InnerBlocks.ButtonBlockAppender  }
						placeholder={ <p className="placeholder">{ __('Click the + to add as many Collapse elements as you want to this Accordion block.') } </p> }
					/>
				</div>
			</>
		);
	} else {
		// If theme hasn't returned yet, return a spinner
		return (
			<div {...blockProps}>
				<Spinner /> { __( 'Determining the current theme...' ) }
			</div>
		);

	}

}
