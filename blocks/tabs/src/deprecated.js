
import {
	InnerBlocks

} from '@wordpress/block-editor';

import { __ } from '@wordpress/i18n';

const deprecated = [
	{
		save: function() {
			return (
				<div>
					<InnerBlocks.Content />
				</div>
			);
		},
	},

]
export default deprecated;
