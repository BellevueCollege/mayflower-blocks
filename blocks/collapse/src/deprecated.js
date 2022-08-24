
import {
	RichText,
	useBlockProps,
	InnerBlocks,
} from '@wordpress/block-editor';

import { __ } from '@wordpress/i18n';

const deprecated = [
	{
		attributes: {
			collapseText: {
				type: 'string',
			},
			collapseHeadingText: {
				type: 'string',
			},
			collapseClass: {
				type: 'string',
				default: 'default',
			},
			collapseIn: {
				type: 'string',
				default: '',
			},
			currentBlockClientId: {
				type: 'string',
				default: '',
			},
		},
		save: function( { attributes } ) {
			return (
				<div className={ `panel panel-${ attributes.collapseClass }` }>
					<div className="panel-heading" role="tab" id={ `heading-${ attributes.currentBlockClientId }` }>
						<h4 className="panel-title">
							<a role="button" data-toggle="collapse" data-parent="#accordion" href={ `#collapse-${ attributes.currentBlockClientId }` } aria-expanded="true" aria-controls={ `collapse-${ attributes.currentBlockClientId }` }>
								<RichText.Content
									value={ attributes.collapseHeadingText }
								/>
							</a>
						</h4>
					</div>
					<div id={ `collapse-${ attributes.currentBlockClientId }` } className={ 'in' === attributes.collapseIn ? 'panel-collapse collapse in' : 'panel-collapse collapse' } role="tabpanel" aria-labelledby={ `heading-${ attributes.currentBlockClientId }` }>
						<div className="panel-body">
							<RichText.Content
								value={ attributes.collapseText }
							/>
							<InnerBlocks.Content />
						</div>
					</div>
				</div>
			);
		},
		migrate( attributes ) {
			return {
				...omit( attributes, [ 'collapseIn' ] ),
				expanded: 'in' === attributes.collapseIn ? true : false,
			};
		},
	},
	{
		attributes: {
			collapseText: {
				type: 'string',
			},
			collapseHeadingText: {
				type: 'string',
				source: 'html',
				selector: 'a',
			},
			collapseClass: {
				type: 'string',
				default: 'default',
			},
			expanded: {
				type: 'boolean',
				default: false,
			},
			currentBlockClientId: {
				type: 'string',
				default: '',
			},
			/* Deprecated Atts */
			collapseIn: {
				type: 'string',
				default: '',
			},
		},
		save: function( { attributes } ) {
			return (
				<div className={ `panel panel-${ attributes.collapseClass }` }>
					<div className="panel-heading" role="tab" id={ `heading-${ attributes.currentBlockClientId }` }>
						<h4 className="panel-title">
							<a role="button" data-toggle="collapse" data-parent="#accordion" href={ `#collapse-${ attributes.currentBlockClientId }` } aria-expanded="true" aria-controls={ `collapse-${ attributes.currentBlockClientId }` }>
								<RichText.Content
									value={ attributes.collapseHeadingText }
								/>
							</a>
						</h4>
					</div>
					<div id={ `collapse-${ attributes.currentBlockClientId }` } className={ ( attributes.expanded ? 'panel-collapse collapse in' : 'panel-collapse collapse' ) } role="tabpanel" aria-labelledby={ `heading-${ attributes.currentBlockClientId }` }>
						<div className="panel-body">
							{ attributes.collapseText !== null && attributes.collapseText !== '' && attributes.collapseText !== undefined ?
								<RichText.Content
									tagName="div"
									value={ attributes.collapseText }
								/> : '' }
							<InnerBlocks.Content />
						</div>
					</div>
				</div>
			);
		},
		migrate( attributes ) {
			return {
				...( attributes ),
				headingTag: 'h3',
			};
		},
	},

]
export default deprecated;
