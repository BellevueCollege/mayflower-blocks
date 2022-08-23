
import {
	InnerBlocks
} from '@wordpress/block-editor';

import { __ } from '@wordpress/i18n';

import { getBlockDefaultClassName } from '@wordpress/blocks';

const deprecated = [
	{
		save: function( { attributes } ) {
			const className = getBlockDefaultClassName( 'mayflower-blocks/tab-content-panel' );
			return (
				<div role="tabpanel" aria-labelledby={ `tab_link_${ attributes.tabId }` } className={ `${ className } tab-pane${ attributes.tabDefault === true ? ' active' : '' }` } id={ `tab_${ attributes.tabId }` }>
					<InnerBlocks.Content />
				</div>
			);
		}
	},
	{
		attributes: {
			tabActive: {
				type: 'boolean',
				default: false,
			},
			tabDefault: {
				type: 'boolean',
				default: false,
			},
			tabId: {
				type: 'string',
				default: '',
			},
		},

		save: function( { attributes } ) {
			const className = getBlockDefaultClassName( 'mayflower-blocks/tab-content-panel' );
			return (
				<div role="tabpanel" className={ `${ className } tab-pane${ attributes.tabDefault === true ? ' active' : '' }` } id={ `${ attributes.tabId }` }>
					<InnerBlocks.Content />
				</div>
			);
		},
	},

]
export default deprecated;
