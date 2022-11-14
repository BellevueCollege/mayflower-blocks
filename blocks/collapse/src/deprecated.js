
import {
	RichText,
	useBlockProps,
	InnerBlocks,
} from '@wordpress/block-editor';

import React from 'react';
import { select } from '@wordpress/data';
import {omit} from 'lodash';

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
			collapseLightBg: {
				type: 'boolean',
				default: false,
			},
			expanded: {
				type: 'boolean',
				default: false,
			},
			currentBlockClientId: {
				type: 'string',
				default: '',
			},
			parentBlockClientId: {
				type: 'string',
				default: '',
			},
			headingTag: {
				type: 'string',
				default: 'h3',
			},
			collapseIn: {
				type: 'string',
				default: '',
			},


		},
		save: function( props ) {
			const { attributes: {
				collapseHeadingText,
				collapseText,
				collapseClass,
				currentBlockClientId,
				expanded,
				parentBlockClientId,
				collapseLightBg,
				headingTag,
			} } = props;
			const HeadingTag = headingTag;
			return (
				<>
					<div className={ 'card bg-' + collapseClass + (
						collapseClass !== 'default' &&
						collapseClass !== 'light' &&
						collapseClass !== 'info' ? ' text-white' : '' ) }>
						<div className="card-header" id={ `heading_${ currentBlockClientId }` }>
							<HeadingTag className="mb-0">
								<button className={ `btn${ ( ! expanded ? ' collapsed' : '' ) }${ (
									collapseClass !== 'default' &&
									collapseClass !== 'light' &&
									collapseClass !== 'info' ? ' text-white' : '' ) }` } type="button" data-toggle="collapse" data-target={ `#collapse_${ currentBlockClientId }` } aria-expanded={ expanded } aria-controls={ `collapse_${ currentBlockClientId }` }>
									<RichText.Content
										value={ collapseHeadingText }
									/>
								</button>
							</HeadingTag>
						</div>

						<div id={ `collapse_${ currentBlockClientId }` } className={ `collapse${ ( expanded ? ' show' : '' ) }` } aria-labelledby={ `heading_${ currentBlockClientId }` } data-parent={ `#accordion_${ parentBlockClientId ? parentBlockClientId : 'undefined'}` }>
							<div className={ 'card-body' + ( collapseLightBg === true ? ' bg-light text-dark' : '' ) }>
								{ collapseText !== null && collapseText !== '' && collapseText !== undefined ?
									<RichText.Content
										tagName="div"
										value={ collapseText }
									/> : '' }
								<InnerBlocks.Content />
							</div>
						</div>

					</div>
				</>
			);
		}
	},
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
	{
		attributes: {
			collapseText: {
				type: 'string',
			},
			collapseHeadingText: {
				type: 'string',
				source: 'html',
				selector: 'button',
			},
			collapseClass: {
				type: 'string',
				default: 'default',
			},
			collapseLightBg: {
				type: 'boolean',
				default: false,
			},
			expanded: {
				type: 'boolean',
				default: false,
			},
			currentBlockClientId: {
				type: 'string',
				default: '',
			},
			parentBlockClientId: {
				type: 'string',
				default: '',
			},
			headingTag: {
				type: 'string',
				default: 'h3',
			},
			/* Deprecated Atts */
			collapseIn: {
				type: 'string',
				default: '',
			},

		},
		save: function( { attributes } ) {
			const HeadingTag = attributes.headingTag;
			return (
				<React.Fragment>
					<div className={ 'card bg-' + attributes.collapseClass + (
						attributes.collapseClass !== 'default' &&
						attributes.collapseClass !== 'light' &&
						attributes.collapseClass !== 'info' ? ' text-white' : '' ) }>
						<div className="card-header" id={ `heading_${ attributes.currentBlockClientId }` }>
							<HeadingTag className="mb-0">
								<button className={ `btn${ ( ! attributes.expanded ? ' collapsed' : '' ) }${ (
									attributes.collapseClass !== 'default' &&
									attributes.collapseClass !== 'light' &&
									attributes.collapseClass !== 'info' ? ' text-white' : '' ) }` } type="button" data-toggle="collapse" data-target={ `#collapse_${ attributes.currentBlockClientId }` } aria-expanded={ attributes.expanded } aria-controls={ `collapse_${ attributes.currentBlockClientId }` }>
									<RichText.Content
										value={ attributes.collapseHeadingText }
									/>
								</button>
							</HeadingTag>
						</div>

						<div id={ `collapse_${ attributes.currentBlockClientId }` } className={ `collapse${ ( attributes.expanded ? ' show' : '' ) }` } aria-labelledby={ `heading_${ attributes.currentBlockClientId }` } data-parent={ `#accordion_${ attributes.parentBlockClientId }` }>
							<div className={ 'card-body' + ( attributes.collapseLightBg === true ? ' bg-light text-dark' : '' ) }>
								{ attributes.collapseText !== null && attributes.collapseText !== '' && attributes.collapseText !== undefined ?
									<RichText.Content
										tagName="div"
										value={ attributes.collapseText }
									/> : '' }
								<InnerBlocks.Content />
							</div>
						</div>

					</div>
				</React.Fragment>
			);
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
				selector: 'button',
			},
			collapseClass: {
				type: 'string',
				default: 'default',
			},
			collapseLightBg: {
				type: 'boolean',
				default: false,
			},
			expanded: {
				type: 'boolean',
				default: false,
			},
			currentBlockClientId: {
				type: 'string',
				default: '',
			},
			parentBlockClientId: {
				type: 'string',
				default: '',
			},
			headingTag: {
				type: 'string',
				default: 'h3',
			},
			/* Deprecated Atts */
			collapseIn: {
				type: 'string',
				default: '',
			},

		},
		save: function( { attributes } ) {
			const HeadingTag = attributes.headingTag;
			return (
				<React.Fragment>
					<div className={ 'card bg-' + attributes.collapseClass + (
						attributes.collapseClass !== 'default' &&
						attributes.collapseClass !== 'light' &&
						attributes.collapseClass !== 'info' ? ' text-white' : '' ) }>
						<div className="card-header" id={ `heading_${ attributes.currentBlockClientId }` }>
							<HeadingTag className="mb-0">
								<button className={ `btn${ ( ! attributes.expanded ? ' collapsed' : '' ) }${ (
									attributes.collapseClass !== 'default' &&
									attributes.collapseClass !== 'light' &&
									attributes.collapseClass !== 'info' ? ' text-white' : '' ) }` } type="button" data-toggle="collapse" data-target={ `#collapse_${ attributes.currentBlockClientId }` }>
									<RichText.Content
										value={ attributes.collapseHeadingText }
									/>
								</button>
							</HeadingTag>
						</div>

						<div id={ `collapse_${ attributes.currentBlockClientId }` } className={ `collapse${ ( attributes.expanded ? ' show' : '' ) }` } aria-labelledby={ `heading_${ attributes.currentBlockClientId }` } data-parent={ `#accordion_${ attributes.parentBlockClientId }` }>
							<div className={ 'card-body' + ( attributes.collapseLightBg === true ? ' bg-light text-dark' : '' ) }>
								{ attributes.collapseText !== null && attributes.collapseText !== '' && attributes.collapseText !== undefined ?
									<RichText.Content
										tagName="div"
										value={ attributes.collapseText }
									/> : '' }
								<InnerBlocks.Content />
							</div>
						</div>

					</div>
				</React.Fragment>
			);
		},
	}

]
export default deprecated;
