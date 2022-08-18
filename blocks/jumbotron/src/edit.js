/**
 * Block: Jumbotron (Deprecated)
 */

import { __ } from '@wordpress/i18n';

import { Component } from '@wordpress/element';
import { select, dispatch } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';


const { insertBlock, removeBlock } = dispatch( 'core/block-editor' );
const { getBlock, getBlockIndex } = select( 'core/block-editor' );

export default class Edit extends Component {

	constructor( props ) {
		super( ...arguments );
		this.props = props;
	}
	componentDidMount() {
		// On component mount, fire so each Well converts into a Card automatically
		this.handleConvertToCover();
	}

	handleConvertToCover = () => {
		const currentBlockClientId = this.props.clientId;
		const jumbotronBlockInnerBlocks = getBlock( currentBlockClientId ).innerBlocks;
		const newHeaderBlock = createBlock( 'core/heading', {
			content: this.props.attributes.jumbotronTitle,
			level: 2
		});
		const innerBlocks = [ newHeaderBlock, ...jumbotronBlockInnerBlocks ];
		if ( Array.isArray( jumbotronBlockInnerBlocks ) ) {
			const coverBlock = createBlock(
				'core/cover', {
					overlayColor: 'bc-silver',
					isDark: false,
				}, innerBlocks );
			const currentIndex = getBlockIndex( currentBlockClientId );
			console.log( 'Jumbotron Block is no longer available. Converting to Cover Block.' );
			removeBlock( currentBlockClientId, false );
			insertBlock( coverBlock, currentIndex );
		}
	};
	render() {
		// Return true because we are not rendering anything new
		return true;
	}

}
