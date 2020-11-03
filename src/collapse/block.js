/**
 * BLOCK: Collapse
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

// Import CSS.
import './style.scss';
import './editor.scss';
import React from 'react';
const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { RichText, InspectorControls, InnerBlocks } = wp.blockEditor;
const { SelectControl, ToggleControl, PanelBody, PanelRow } = wp.components;
const { select } = wp.data;
const { getBlockRootClientId, hasSelectedInnerBlock } = select( 'core/block-editor' );
const { omit } = lodash;

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */

registerBlockType( 'mayflower-blocks/collapse', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Collapse' ), // Block title.
	icon: 'editor-contract', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'bootstrap-blocks', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	description: 'Individual collapse elements.',
	parent: [ 'mayflower-blocks/collapsibles' ],

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
		/* Deprecated Atts */
		collapseIn: {
			type: 'string',
			default: '',
		},

	},

	edit: function( { attributes, setAttributes, clientId, isSelected } ) {
		const parentClientId = getBlockRootClientId( clientId );
		// set the clientId attributes so save() can access the clientId and parent clientId
		setAttributes( { currentBlockClientId: clientId } );
		setAttributes( { parentBlockClientId: parentClientId } );

		return [
			<InspectorControls>
				<PanelBody
					title="Card Style"
					initialOpen={ true }
				>
					<PanelRow>
						<SelectControl
							label="Collapse Style"
							value={ attributes.collapseClass }
							options={ [
								{ label: 'Default', value: 'default' },
								{ label: 'Primary (BC Blue)', value: 'primary' },
								{ label: 'Secondary (Gray)', value: 'secondary' },
								{ label: 'Info (Light Blue)', value: 'info' },
								{ label: 'Success (Green)', value: 'success' },
								{ label: 'Warning (Yellow)', value: 'warning' },
								{ label: 'Danger (Red)', value: 'danger' },
								{ label: 'Light', value: 'light' },
								{ label: 'Dark', value: 'dark' },
							] }
							onChange={ ( collapseClass ) => {
								setAttributes( { collapseClass } );
							} }
						/>
					</PanelRow>
					<PanelRow>
						<ToggleControl
							label="Use Light Background for Card Body"
							checked={ attributes.collapseLightBg }
							onChange={ ( collapseLightBg ) => setAttributes( { collapseLightBg } ) }
						/>
					</PanelRow>
					<PanelRow>
						<ToggleControl
							label="Start Expanded"
							help={ attributes.expanded ? 'Module will start out in an expanded state' : 'Module will start out in a collapsed state' }
							checked={ attributes.expanded }
							onChange={ ( expanded ) => {
								setAttributes( { expanded } );
							} }
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>,
			<div className={ 'card bg-' + attributes.collapseClass + (
				attributes.collapseClass !== 'default' &&
				attributes.collapseClass !== 'light' &&
				attributes.collapseClass !== 'info' ? ' text-white' : '' ) }>
				<div className="card-header" id={ `heading_${ attributes.currentBlockClientId }` }>
					<h3 className="mb-0">
						<RichText
							tagName="span"
							allowedFormats={ [ 'bold', 'italic', 'link' ] }
							placeholder="Enter header text..."
							keepPlaceholderOnFocus="true"
							value={ attributes.collapseHeadingText }
							onChange={ ( collapseHeadingText ) => setAttributes( { collapseHeadingText } ) }
						/>
					</h3>
				</div>
				{ ( isSelected || hasSelectedInnerBlock( attributes.currentBlockClientId ) === true || attributes.expanded ) &&
				<div id={ `collapse_${ attributes.currentBlockClientId }` } className="collapse show" aria-labelledby={ `heading_${ attributes.currentBlockClientId }` } data-parent={ `#accordion_${ parentClientId }` }>
					<div className={ 'card-body' + ( attributes.collapseLightBg === true ? ' bg-light text-dark' : '' ) }>
						{ attributes.collapseText !== null && attributes.collapseText !== '' && attributes.collapseText !== undefined ?
							<RichText
								tagName="div"
								formattingControls={ [ 'bold', 'italic', 'link' ] }
								placeholder="Enter text or add blocks below..."
								keepPlaceholderOnFocus="true"
								value={ attributes.collapseText }
								onChange={ ( collapseText ) => setAttributes( { collapseText } ) }
							/> : '' }
						<InnerBlocks />
					</div>
				</div>
				}
			</div>,
		];
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */

	save: function( { attributes } ) {
		return (
			<React.Fragment>
				<div className={ 'card bg-' + attributes.collapseClass + (
					attributes.collapseClass !== 'default' &&
					attributes.collapseClass !== 'light' &&
					attributes.collapseClass !== 'info' ? ' text-white' : '' ) }>
					<div className="card-header" id={ `heading_${ attributes.currentBlockClientId }` }>
						<h3 className="mb-0">
							<button className={ `btn${ ( ! attributes.expanded ? ' collapsed' : '' ) }${ (
								attributes.collapseClass !== 'default' &&
								attributes.collapseClass !== 'light' &&
								attributes.collapseClass !== 'info' ? ' text-white' : '' ) }` } type="button" data-toggle="collapse" data-target={ `#collapse_${ attributes.currentBlockClientId }` } aria-expanded={ attributes.expanded } aria-controls={ `collapse_${ attributes.currentBlockClientId }` }>
								<RichText.Content
									value={ attributes.collapseHeadingText }
								/>
							</button>
						</h3>
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

	/*
		Conversions from old versions of attributes
	*/
	deprecated: [
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
			save( { attributes } ) {
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
			save( { attributes } ) {
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
		},
	],

	//Existing bootstrap collapse shortcode transformed into its block counterpart.
	//Allows use of [collapse title="" type="" active=""][/collapse]
	transforms: {
		from: [
			{
				type: 'shortcode',
				tag: 'collapse',
				attributes: {
					// collapse Text
					collapseText: {
						type: 'string',
						shortcode: ( attrs, { content } ) => {
							// Content returns the whole shortcode, so we need to match only shortcode content
							const filtered = content.replace( /(\[collapse.*?\]\s*)|(\s*\[\/collapse\])/gmi, '' );

							// Return filtered content if there was a match, otherwise return blank string
							return filtered ? filtered : '';
						},
					},

					// Collapse Type/Bootstrap Class
					collapseClass: {
						type: 'string',
						shortcode: ( { named: { type = 'type' } } ) => {
							return type;
						},
					},

					// Collapse Heading
					collapseHeadingText: {
						type: 'string',
						shortcode: ( { named: { title = 'title' } } ) => {
							return title;
						},
					},

					// Collapse Active
					collapseIn: {
						type: 'string',
						shortcode: ( { named: { active = 'active' } } ) => {
							if ( active === 'true' ) {
								return 'in';
							}
							return '';
						},
					},
				},
			},
		],
	},
} );
