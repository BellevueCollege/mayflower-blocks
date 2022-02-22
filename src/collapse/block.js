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
const { RichText, InspectorControls, BlockControls, InnerBlocks } = wp.blockEditor;
const { Toolbar, SelectControl, ToggleControl, PanelBody, PanelRow, SVG, Path, G } = wp.components;
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

	edit: function( { attributes, setAttributes, clientId, isSelected } ) {
		const HeadingStyleControl = () => {
			function createClassControl( headingStyle ) {
				// get the Toolbar control style name and output the corresponding HTML tag
				const style = ( 'h' + headingStyle[ headingStyle.length - 1 ] );

				// save the SVGs
				const levelToPath = {
					1: <SVG xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><Path d="M9 5h2v10H9v-4H5v4H3V5h2v4h4V5zm6.6 0c-.6.9-1.5 1.7-2.6 2v1h2v7h2V5h-1.4z"></Path></SVG>,
					2: <SVG xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><Path d="M7 5h2v10H7v-4H3v4H1V5h2v4h4V5zm8 8c.5-.4.6-.6 1.1-1.1.4-.4.8-.8 1.2-1.3.3-.4.6-.8.9-1.3.2-.4.3-.8.3-1.3 0-.4-.1-.9-.3-1.3-.2-.4-.4-.7-.8-1-.3-.3-.7-.5-1.2-.6-.5-.2-1-.2-1.5-.2-.4 0-.7 0-1.1.1-.3.1-.7.2-1 .3-.3.1-.6.3-.9.5-.3.2-.6.4-.8.7l1.2 1.2c.3-.3.6-.5 1-.7.4-.2.7-.3 1.2-.3s.9.1 1.3.4c.3.3.5.7.5 1.1 0 .4-.1.8-.4 1.1-.3.5-.6.9-1 1.2-.4.4-1 .9-1.6 1.4-.6.5-1.4 1.1-2.2 1.6V15h8v-2H15z"></Path></SVG>,
					3: <SVG xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><Path d="M12.1 12.2c.4.3.8.5 1.2.7.4.2.9.3 1.4.3.5 0 1-.1 1.4-.3.3-.1.5-.5.5-.8 0-.2 0-.4-.1-.6-.1-.2-.3-.3-.5-.4-.3-.1-.7-.2-1-.3-.5-.1-1-.1-1.5-.1V9.1c.7.1 1.5-.1 2.2-.4.4-.2.6-.5.6-.9 0-.3-.1-.6-.4-.8-.3-.2-.7-.3-1.1-.3-.4 0-.8.1-1.1.3-.4.2-.7.4-1.1.6l-1.2-1.4c.5-.4 1.1-.7 1.6-.9.5-.2 1.2-.3 1.8-.3.5 0 1 .1 1.6.2.4.1.8.3 1.2.5.3.2.6.5.8.8.2.3.3.7.3 1.1 0 .5-.2.9-.5 1.3-.4.4-.9.7-1.5.9v.1c.6.1 1.2.4 1.6.8.4.4.7.9.7 1.5 0 .4-.1.8-.3 1.2-.2.4-.5.7-.9.9-.4.3-.9.4-1.3.5-.5.1-1 .2-1.6.2-.8 0-1.6-.1-2.3-.4-.6-.2-1.1-.6-1.6-1l1.1-1.4zM7 9H3V5H1v10h2v-4h4v4h2V5H7v4z"></Path></SVG>,
					4: <SVG xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><Path d="M9 15H7v-4H3v4H1V5h2v4h4V5h2v10zm10-2h-1v2h-2v-2h-5v-2l4-6h3v6h1v2zm-3-2V7l-2.8 4H16z"></Path></SVG>,
					5: <SVG xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><Path d="M12.1 12.2c.4.3.7.5 1.1.7.4.2.9.3 1.3.3.5 0 1-.1 1.4-.4.4-.3.6-.7.6-1.1 0-.4-.2-.9-.6-1.1-.4-.3-.9-.4-1.4-.4H14c-.1 0-.3 0-.4.1l-.4.1-.5.2-1-.6.3-5h6.4v1.9h-4.3L14 8.8c.2-.1.5-.1.7-.2.2 0 .5-.1.7-.1.5 0 .9.1 1.4.2.4.1.8.3 1.1.6.3.2.6.6.8.9.2.4.3.9.3 1.4 0 .5-.1 1-.3 1.4-.2.4-.5.8-.9 1.1-.4.3-.8.5-1.3.7-.5.2-1 .3-1.5.3-.8 0-1.6-.1-2.3-.4-.6-.2-1.1-.6-1.6-1-.1-.1 1-1.5 1-1.5zM9 15H7v-4H3v4H1V5h2v4h4V5h2v10z"></Path></SVG>,
					6: <SVG xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><Path d="M9 15H7v-4H3v4H1V5h2v4h4V5h2v10zm8.6-7.5c-.2-.2-.5-.4-.8-.5-.6-.2-1.3-.2-1.9 0-.3.1-.6.3-.8.5l-.6.9c-.2.5-.2.9-.2 1.4.4-.3.8-.6 1.2-.8.4-.2.8-.3 1.3-.3.4 0 .8 0 1.2.2.4.1.7.3 1 .6.3.3.5.6.7.9.2.4.3.8.3 1.3s-.1.9-.3 1.4c-.2.4-.5.7-.8 1-.4.3-.8.5-1.2.6-1 .3-2 .3-3 0-.5-.2-1-.5-1.4-.9-.4-.4-.8-.9-1-1.5-.2-.6-.3-1.3-.3-2.1s.1-1.6.4-2.3c.2-.6.6-1.2 1-1.6.4-.4.9-.7 1.4-.9.6-.3 1.1-.4 1.7-.4.7 0 1.4.1 2 .3.5.2 1 .5 1.4.8 0 .1-1.3 1.4-1.3 1.4zm-2.4 5.8c.2 0 .4 0 .6-.1.2 0 .4-.1.5-.2.1-.1.3-.3.4-.5.1-.2.1-.5.1-.7 0-.4-.1-.8-.4-1.1-.3-.2-.7-.3-1.1-.3-.3 0-.7.1-1 .2-.4.2-.7.4-1 .7 0 .3.1.7.3 1 .1.2.3.4.4.6.2.1.3.3.5.3.2.1.5.2.7.1z"></Path></SVG>,
				};
				// check if the heading style is Paragraph or a Heading, and return the corresponding toolbar object

				return {
					icon: levelToPath[ style.charAt( 1 ) ],
					title: headingStyle,
					isActive: attributes.headingTag === style,
					onClick: () => setAttributes( { headingTag: style } ),
				};
			}

			return (
				<Toolbar controls={ [ 'Heading 2', 'Heading 3', 'Heading 4', 'Heading 5', 'Heading 6' ].map( createClassControl ) } />
			);
		};
		const parentClientId = getBlockRootClientId( clientId );
		// set the clientId attributes so save() can access the clientId and parent clientId
		setAttributes( { currentBlockClientId: clientId } );
		setAttributes( { parentBlockClientId: parentClientId } );
		const HeadingTag = attributes.headingTag;
		return [
			<BlockControls>
				<HeadingStyleControl />
			</BlockControls>,
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
					<HeadingTag className="mb-0">
						<RichText
							tagName="span"
							allowedFormats={ [ 'bold', 'italic', 'link' ] }
							placeholder="Enter header text..."
							keepPlaceholderOnFocus="true"
							value={ attributes.collapseHeadingText }
							onChange={ ( collapseHeadingText ) => setAttributes( { collapseHeadingText } ) }
						/>
					</HeadingTag>
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
			migrate( attributes ) {
				return {
					...( attributes ),
					headingTag: 'h3',
				};
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
