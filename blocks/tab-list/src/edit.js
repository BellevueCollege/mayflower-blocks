/**
 * Block: Card (used to be called Panel)
 */

import { __ } from '@wordpress/i18n';


import { useEffect, useState, useRef } from '@wordpress/element';

import { select, dispatch } from '@wordpress/data';

import { createBlock, getBlockDefaultClassName } from '@wordpress/blocks';



import {
	Button,
	Dashicon
} from '@wordpress/components';

import {
	useBlockProps,
	RichText,
	BlockControls,
	InspectorControls,
	AlignmentToolbar,
	InnerBlocks
} from '@wordpress/block-editor';


import './editor.scss';
import './style.scss';

export default function Edit( props ) {
	const blockProps = useBlockProps({
		className: 'nav nav-tabs',
		role: 'tablist',
	});
	const { attributes: {

	}, isSelected, clientId } = props;

	// Get the current tab-list block with the clientId
	const currentBlockData = select( 'core/block-editor' ).getBlock( clientId );

	/**
		 * Adds a Tab Block (child) as an innerblock to the Tab List Block (parent).
		 *
		 * Also adds a corresponding panel with the tab clientId and updates the tab with it's clientId.
		 */
	const addTab = () => {
		const currentBlockDataInnerBlocks = currentBlockData.innerBlocks.length;
		// Create a tab to put into tab list
		const tabBlock = createBlock( 'mayflower-blocks/tab-list-tab', { tabActive: currentBlockDataInnerBlocks === 0 ? true : false, tabDefault: currentBlockDataInnerBlocks === 0 ? true : false }, [] );
		// Add new tab into tab list
		dispatch( 'core/block-editor' ).insertBlock( tabBlock, currentBlockData.innerBlocks.length, clientId );
		// Add new panel and update the panel and tab with the clientId of that tab so that they connect to each other
		addPanel( tabBlock.clientId );
		updateTab( tabBlock.clientId );

		// Select new block after adding to prevent selecting panel block
		dispatch( 'core/block-editor' ).selectBlock( tabBlock.clientId );
	};

	/**
	 * Updates the Tab's attribute 'tabId' with it's clientId.
	 *
	 * Ensures that the Tab keeps a persistent id between refreshes.
	 * @param {string} tabClientId Client ID of the tab
	 */
	const updateTab = ( tabClientId ) => {
		dispatch( 'core/block-editor' ).updateBlockAttributes( tabClientId, { tabId: tabClientId } );
	};

	/**
	 * Adds a Panel Block (child) as an innerblock to the Tab Content Block (parent).
	 *
	 * A Panel is only added with a Tab and it's corresponding Tab's tabId.
	 * @param {string} tabClientId Client ID of the tab
	 */
	const addPanel = ( tabClientId ) => {
		// Get the parent block 'Tabs'
		const parentTabsBlock = select( 'core/block-editor' ).getBlock( select( 'core/block-editor' ).getBlockRootClientId( clientId ) );
		// Get the parent block Tabs innerblocks
		const parentTabsInnerBlocks = parentTabsBlock.innerBlocks;
		// Check if parent tab has innerblocks
		if ( Array.isArray( parentTabsInnerBlocks ) ) {
			// Find the tab-content block
			const tabContentBlock = parentTabsInnerBlocks.find( child => {
				return child.name === 'mayflower-blocks/tab-content';
			} );
			if ( tabContentBlock ) {
				// Create a panel body with the tabId to put into tab content list
				const panelBlock = createBlock( 'mayflower-blocks/tab-content-panel', { tabId: tabClientId, tabActive: tabContentBlock.innerBlocks.length === 0 ? true : false, tabDefault: tabContentBlock.innerBlocks.length === 0 ? true : false }, [] );
				// Add new panel body into tab content list
				dispatch( 'core/block-editor' ).insertBlock( panelBlock, tabContentBlock.innerBlocks.length, tabContentBlock.clientId );
			}
		}
	};



	return (
		<ul {...blockProps } >
			<InnerBlocks
				allowedBlocks={ [ 'mayflower-blocks/tab-list-tab' ] }
				templateLock={ false }
				renderAppender={ false }
				orientation="horizontal"
			/>
			<li role="presentation">
				<Button onClick={ addTab } className="add-tab">
					<Dashicon icon="insert" />
					{ currentBlockData.innerBlocks.length === 0 ? <span>Add Tab</span> : '' }
				</Button>
			</li>
		</ul>
	);

}
