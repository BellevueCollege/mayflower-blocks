/**
 * Block: Card (used to be called Panel)
 */

import { __ } from '@wordpress/i18n';

import { Fragment } from '@wordpress/element';

import { createHigherOrderComponent } from '@wordpress/compose';


import {
	useBlockProps,
	InnerBlocks
} from '@wordpress/block-editor';


// Creates a higher order component(HOC) to properly wrap the tab content panel block with the
// corresponding bootstrap and CSS classes and prevent block stacking
const mayflowerBlocksPanel = createHigherOrderComponent( ( BlockListBlock ) => {
	return ( props ) => {
		if ( props.attributes.tabId && props.name === 'mayflower-blocks/tab-content-panel' ) {
			return <div role="tabpanel" className={ `tab-pane ${ props.attributes.tabActive ? 'active' : '' }` } id={ props.attributes.tabId }><BlockListBlock { ...props } /></div>;
		}
		return <BlockListBlock { ...props } />;
	};
}, 'mayflowerBlocksPanel' );

// Hook the HOC to replace the wrapping div for tab content panel blocks
wp.hooks.addFilter( 'editor.BlockListBlock', 'mayflower-blocks/tab-content-panel', mayflowerBlocksPanel );


export default function Edit( props ) {
	const blockProps = useBlockProps();
	const { attributes: {

	}, isSelected, clientId } = props;


	return (
		<InnerBlocks
			templateLock={ false }
			template={ [[ 'core/paragraph', {} ] ] }
			renderAppender={ InnerBlocks.DefaultBlockAppender }
			placeholder={ <p>Click the + icon to add a block</p> }
		/>
	);

}
