const { registerBlockType, PlainText } = wp.blocks; // Import registerBlockType() from wp.blocks

const { getCurrentPostId } = wp.data;
const { ServerSideRender, TextControl, SelectControl, ToggleControl, Toolbar, SVG, Path, G, PanelBody, PanelRow } = wp.components;
import { __ } from '@wordpress/i18n';

import {
	wellText,
	wellSize,
	RichText,
	InnerBlocks,
} from '@wordpress/block-editor';

export default function save( props ) {
	const { attributes: {
		wellText
	} } = props;
	return (
	    <div className={ `well-${ wellSize }` }>
			{ wellText !== null && wellText !== '' && wellText !== undefined ?
				<RichText.Content
					tagName="div"
					className="well"
					value={ wellText }
				/> : 
				''}
			<InnerBlocks.Content />
		</div>
	);
}

