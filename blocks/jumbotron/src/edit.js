/**
 * Block: Card (used to be called Panel)
 */

import { __ } from '@wordpress/i18n';

const { RichText, InnerBlocks } = wp.blockEditor;
const { Component } = wp.element;
const { select, dispatch } = wp.data;
const { insertBlock, insertBlocks, removeBlock } = dispatch( 'core/block-editor' );
const { getBlock, getBlockIndex, getSelectedBlock } = select( 'core/block-editor' );

import { registerBlockType, createBlock } from '@wordpress/blocks';

import './editor.scss';

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
