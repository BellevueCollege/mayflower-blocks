/**
 * Block: Card (used to be called Panel)
 */

import { __ } from '@wordpress/i18n';


import {
	useBlockProps,
	RichText,
	InnerBlocks,
} from '@wordpress/block-editor';

import { registerBlockType, createBlock } from '@wordpress/blocks';

import './editor.scss';

export default function Edit( props ) {
	const blockProps = useBlockProps();
	const { attributes: {
		jumbotronText,
		jumbotronTitle,
	}, setAttributes, isSelected } = props;

	return (
		<div {...blockProps } >
			<div className="jumbotron">
				<RichText
					tagName="h1"
					allowedFormats={ [ 'bold', 'italic', 'link' ] }
					placeholder="Enter a headline..."
					keepPlaceholderOnFocus="true"
					value={ jumbotronTitle }
					onChange={ ( jumbotronTitle ) => setAttributes( { jumbotronTitle } ) }
				/>
				{ jumbotronText !== null && jumbotronText !== '' && jumbotronText !== undefined ?
					<RichText
						tagName="p"
						allowedFormats={ [ 'bold', 'italic', 'link' ] }
						placeholder="Enter text or add blocks below..."
						keepPlaceholderOnFocus="true"
						value={ jumbotronText }
						onChange={ ( jumbotronText ) => setAttributes( { jumbotronText } ) }
					/> :
					'' }
				<InnerBlocks allowedBlocks={ [ 'core/paragraph', 'mayflower-blocks/button', 'core/heading', 'core/list' ] } />
			</div>
		</div>
	);

}
