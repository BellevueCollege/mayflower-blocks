/**
 * Block: Well (being converted to Panel)
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
		// On component mount, fire so each Well converts into a Card/Panel automatically
		this.handleConvertToPanel();
	}

	handleConvertToPanel = () => {
		const currentBlockClientId = this.props.clientId;
		const wellBlockInnerBlocks = getBlock( currentBlockClientId ).innerBlocks;
		const newHeaderBlock = createBlock( 'core/heading', {
			content: this.props.attributes.wellTitle,
			level: 2
		});
		const innerBlocks = [ newHeaderBlock, ...wellBlockInnerBlocks ];
		if ( Array.isArray( wellBlockInnerBlocks ) ) {
			const panelBlock = createBlock(
				'mayflower-blocks/panel', {
					overlayColor: 'bc-silver',
					isDark: false,
				}, innerBlocks );
			const currentIndex = getBlockIndex( currentBlockClientId );
			console.log( 'Well Block is no longer available. Converting to Panel Block.' );
			removeBlock( currentBlockClientId, false );
			insertBlock( panelBlock, currentIndex );
		}
	};
	render() {
		// Return true because we are not rendering anything new
		return true;
	}

 }
