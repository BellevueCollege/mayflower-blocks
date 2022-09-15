
import {
	InnerBlocks
} from '@wordpress/block-editor';

import { __ } from '@wordpress/i18n';

const deprecated = [
	{
		attributes: {
			childIsEditing: {
				type: 'boolean',
				default: false,
			},
			childColumns: {
				type: 'number',
				default: 0,
			}
		},
		save: function( { className } ) {
			return (
				<div className={ className }>
					<div className="row">
						<InnerBlocks.Content />
					</div>
				</div>
			);
		},
	}

]
export default deprecated;
