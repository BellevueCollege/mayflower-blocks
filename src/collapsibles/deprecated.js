
import {
	RichText,
	useBlockProps,
	InnerBlocks,
} from '@wordpress/block-editor';

import { __ } from '@wordpress/i18n';

const deprecated = [
	{
		attributes: {},
		save: function( { attributes } ) {
			return (
				<div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
					<InnerBlocks.Content />
				</div>
			);
		},
	},
	
]
export default deprecated;
