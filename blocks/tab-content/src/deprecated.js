
import {
	InnerBlocks

} from '@wordpress/block-editor';

import { __ } from '@wordpress/i18n';

import { getBlockDefaultClassName } from '@wordpress/blocks';

const deprecated = [
	{
		save: function( {} ) {
			const className = getBlockDefaultClassName( 'mayflower-blocks/tab-content' );
			return (
				<div className={ `${ className } card-body tab-content` }>
					<InnerBlocks.Content />
				</div>
			);
		}
	},
	{
		save: function( {} ) {
			const className = getBlockDefaultClassName( 'mayflower-blocks/tab-content' );
			return (
				<div className={ `${ className } tab-content` }>
					<InnerBlocks.Content />
				</div>
			);
		},
	},
]
export default deprecated;
