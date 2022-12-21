
import {
	InnerBlocks
} from '@wordpress/block-editor';

import { __ } from '@wordpress/i18n';

import { getBlockDefaultClassName } from '@wordpress/blocks';

const deprecated = [
	{
		save: function() {
			const className = getBlockDefaultClassName( 'mayflower-blocks/tab-list' );
			return (
				<div className={ `${ className } card-header` }>
					<ul className={ `${ className } nav nav-tabs card-header-tabs` } role="tablist">
						<InnerBlocks.Content />
					</ul>
				</div>
			);
		}
	},
	{
		save: function() {
			const className = getBlockDefaultClassName( 'mayflower-blocks/tab-list' );
			return (
				<div className="card-header">
					<ul className={ `${ className } nav nav-tabs card-header-tabs` } role="tablist">
						<InnerBlocks.Content />
					</ul>
				</div>
			);
		}
	},
	{
		save: function() {
			const className = getBlockDefaultClassName( 'mayflower-blocks/tab-list' );
			return (
				<ul className={ `${ className } nav nav-tabs` } role="tablist">
					<InnerBlocks.Content />
				</ul>
			);
		},
	},
]
export default deprecated;
