
import {
	RichText
} from '@wordpress/block-editor';

import { __ } from '@wordpress/i18n';

import { getBlockDefaultClassName } from '@wordpress/blocks';

const deprecated = [
	{
		save: function( { attributes } ) {
			const className = getBlockDefaultClassName( 'mayflower-blocks/tab-list-tab' );
			return (
				<li role="presentation" className={ `${ className } nav-item` }>
					<a className={ `nav-link ${ attributes.tabDefault ? ' active' : '' }` } id={ `tab_link_${ attributes.tabId }` } href={ `#tab_${ attributes.tabId }` } aria-controls={ `tab_${ attributes.tabId }` } role="tab" data-toggle="tab">
						<RichText.Content
							value={ attributes.tabTitle }
						/>
					</a>
				</li>
			);
		}
	},
	{
		attributes: {
			tabActive: {
				type: 'boolean',
				default: false,
			},
			tabId: {
				type: 'string',
			},
			tabTitle: {
				type: 'string',
				default: '',
			},
			tabDefault: {
				type: 'boolean',
				default: false,
			},
		},

		save: function( { attributes } ) {
			const className = getBlockDefaultClassName( 'mayflower-blocks/tab-list-tab' );
			return (
				<li role="presentation" className={ `${ className } ${ attributes.tabDefault ? ' active' : '' }` }>
					<a href={ `#${ attributes.tabId }` } aria-controls={ `#${ attributes.tabId }` } role="tab" data-toggle="tab">
						<RichText.Content
							value={ attributes.tabTitle }
						/>
					</a>
				</li>
			);
		},
	},

]
export default deprecated;
