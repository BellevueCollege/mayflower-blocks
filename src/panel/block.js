/**
 * BLOCK: Buttons
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

// Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType, createBlock } = wp.blocks; // Import registerBlockType() from wp.blocks
const { RichText, InspectorControls, InnerBlocks } = wp.blockEditor;
const { SelectControl, ToggleControl, Toolbar, Panel, PanelBody, PanelRow, SVG, Path, G } = wp.components;

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

registerBlockType( 'mayflower-blocks/panel', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Card' ), // Block title.
	icon: 'align-center', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'bootstrap-blocks', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.

	attributes: {
		cardText: {
			type: 'string',
		},
		cardType: {
			type: 'string',
			default: 'default',
		},
		cardHeading: {
			type: 'boolean',
			default: true,
		},
		cardHeadingText: {
			type: 'string',
			source: 'html',
			selector: '.card-header',
		},
		cardHeadingTag: {
			type: 'string',
			default: 'h2',
		},
		activeHeadingClass: {
			type: 'string',
			default: 'h2',
		},
		cardFooter: {
			type: 'boolean',
			default: true,
		},
		cardFooterText: {
			type: 'string',
			source: 'html',
			selector: '.card-footer',
		},
	},

	//Existing bootstrap card shortcode transformed into its block counterpart.
	//Allows use of [panel type="" heading="" footer=""][/panel]
	transforms: {
		from: [
			{
				type: 'shortcode',
				tag: 'panel',
				attributes: {
					// Panel Text
					cardText: {
						type: 'string',
						shortcode: ( attrs, { content } ) => {
							// Content returns the whole shortcode, so we need to match only shortcode content
							const filtered = content.replace( /(\[panel.*?\]\s*)|(\s*\[\/panel\])/gmi, '' );

							// Return filtered content if there was a match, otherwise return blank string
							return filtered ? filtered : '';
						},
					},

					// Panel Type/Bootstrap Class
					cardType: {
						type: 'string',
						shortcode: ( { named: { type } } ) => {
							return type;
						},
					},

					//Panel Header
					cardHeadingText: {
						type: 'string',
						shortcode: ( { named: { heading } } ) => {
							return heading;
						},
					},

					//Panel Footer
					cardFooterText: {
						type: 'string',
						shortcode: ( { named: { footer } } ) => {
							return footer;
						},
					},
				},
			},
			{
				type: 'shortcode',
				tag: 'well',
				attributes: {
					// Well Text
					cardText: {
						type: 'string',
						shortcode: ( attrs, { content } ) => {
							// Content returns the whole shortcode, so we need to match only shortcode content
							const filtered = content.replace( /(\[well.*?\]\s*)|(\s*\[\/well\])/gmi, '' );

							// Return filtered content if there was a match, otherwise return blank string
							return filtered ? filtered : '';
						},
					},
					cardHeading: {
						type: 'boolean',
						default: false,
					},
					cardFooter: {
						type: 'boolean',
						default: false,
					},
					cardType: {
						type: 'string',
						default: 'light',
					},
				},
			},
			{
				type: 'block',
				blocks: [ 'core/paragraph' ],
				transform: ( attributes, innerBlocks, content ) => {
					const paragraphBlock = createBlock( 'core/paragraph', { content: content } );
					//return createBlock( 'mayflower-blocks/panel', attributes, [paragraphBlock]);
					return createBlock( 'mayflower-blocks/panel', { cardHeading: false, cardFooter: false, cardType: 'light' }, );
				},
			},

		],
		to: [
			{

			},
		],
	},

	edit: function( { className, attributes, setAttributes } ) {
		/**
		 * HeadingStyleControl returns a Toolbar component with heading levels that changes via on click and updates the card block's heading.
		 * Will only show if a card heading is toggled on.
		 *
		 * @return Toolbar component with heading levels 2-6 and paragraph
		 * */
		const HeadingStyleControl = () => {
			function createClassControl( headingStyle ) {
				// get the Toolbar control style name and output the corresponding HTML tag
				const style = ( headingStyle == 'Paragraph' ? 'p' : 'h' + headingStyle[ headingStyle.length - 1 ] );

				// save the SVGs
				const svgHeading = <SVG xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><Path d="M12.5 4v5.2h-5V4H5v13h2.5v-5.2h5V17H15V4"></Path></SVG>;
				const svgParagraph = <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><rect x="0" fill="none" width="20" height="20" /><G><Path d="M15 2H7.54c-.83 0-1.59.2-2.28.6-.7.41-1.25.96-1.65 1.65C3.2 4.94 3 5.7 3 6.52s.2 1.58.61 2.27c.4.69.95 1.24 1.65 1.64.69.41 1.45.61 2.28.61h.43V17c0 .27.1.51.29.71.2.19.44.29.71.29.28 0 .51-.1.71-.29.2-.2.3-.44.3-.71V5c0-.27.09-.51.29-.71.2-.19.44-.29.71-.29s.51.1.71.29c.19.2.29.44.29.71v12c0 .27.1.51.3.71.2.19.43.29.71.29.27 0 .51-.1.71-.29.19-.2.29-.44.29-.71V4H15c.27 0 .5-.1.7-.3.2-.19.3-.43.3-.7s-.1-.51-.3-.71C15.5 2.1 15.27 2 15 2z" /></G></SVG>;

				// check if the heading style is Paragraph or a Heading, and return the corresponding toolbar object
				if ( headingStyle == 'Paragraph' ) {
					return {
						icon: svgParagraph,
						title: headingStyle,
						isActive: attributes.cardHeadingTag === style,
						onClick: () => setAttributes( { cardHeadingTag: style, activeHeadingClass: style } ),
					};
				}
				return {
					subscript: style.charAt( 1 ),
					icon: svgHeading,
					title: headingStyle,
					isActive: attributes.cardHeadingTag === style,
					onClick: () => setAttributes( { cardHeadingTag: style, activeHeadingClass: style } ),
				};
			}

			return (
				<Toolbar controls={ [ 'Heading 2', 'Heading 3', 'Heading 4', 'Heading 5', 'Heading 6', 'Paragraph' ].map( createClassControl ) } />
			);
		};

		return [
			<InspectorControls>
				<Panel>
					<PanelBody
						title="Card Style"
						initialOpen={ true }
					>
						<PanelRow>
							<SelectControl
								label="Theme Style"
								value={ attributes.cardType }
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
								onChange={ ( cardType ) => {
									setAttributes( { cardType } );
								} }
							/>
						</PanelRow>
						<PanelRow>
							<ToggleControl
								label="Toggle Panel Heading"
								checked={ attributes.cardHeading }
								onChange={ ( cardHeading ) => setAttributes( { cardHeading } ) }
							/>
						</PanelRow>
						<PanelRow>
							<ToggleControl
								label="Toggle Panel Footer"
								checked={ attributes.cardFooter }
								onChange={ ( cardFooter ) => setAttributes( { cardFooter } ) }
							/>
						</PanelRow>
					</PanelBody>
				</Panel>

				{ attributes.cardHeading == true ?
					<Panel>
						<PanelBody
							title="Heading Style"
							initialOpen={ true }
						>
							<PanelRow>
								<HeadingStyleControl />
							</PanelRow>
						</PanelBody>
					</Panel> :
					'' }
			</InspectorControls>,
			<div className={ className }>
				<div className={ 'card bg-' + attributes.cardType + (
					attributes.cardType !== 'default' &&
					attributes.cardType !== 'light' &&
					attributes.cardType !== 'info' ?
						' text-white' : '' ) }>

					{ attributes.cardHeading == true ?
						<RichText
							tagName={ attributes.cardHeadingTag }
							className="card-header"
							allowedFormats={ [ 'bold', 'italic', 'link' ] }
							placeholder="Enter heading text..."
							keepPlaceholderOnFocus="true"
							value={ attributes.cardHeadingText }
							onChange={ ( cardHeadingText ) => setAttributes( { cardHeadingText } ) }
						/> :
						'' }

					<div className="card-body">
						{ attributes.cardText !== null && attributes.cardText !== '' && attributes.cardText !== undefined ?
							<RichText
								tagName="div"
								allowedFormats={ [ 'bold', 'italic', 'link' ] }
								placeholder="Enter text..."
								keepPlaceholderOnFocus="true"
								value={ attributes.cardText }
								onChange={ ( cardText ) => setAttributes( { cardText } ) }
							/> :
							'' }
						<InnerBlocks />
					</div>

					{ attributes.cardFooter == true ?
						<div className="card-footer">
							<RichText
								tagName="div"
								allowedFormats={ [ 'bold', 'italic', 'link' ] }
								placeholder="Enter footer text..."
								keepPlaceholderOnFocus="true"
								value={ attributes.cardFooterText }
								onChange={ ( cardFooterText ) => setAttributes( { cardFooterText } ) }
							/>
						</div> :
						'' }

				</div>
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
			<div className={ 'card bg-' + attributes.cardType + (
				attributes.cardType !== 'default' &&
				attributes.cardType !== 'light' &&
				attributes.cardType !== 'info' ?
					' text-white' : '' ) }>

				{ attributes.cardHeading == true ?
					attributes.cardHeadingText == null || attributes.cardHeadingText == '' ? '' :
					<RichText.Content
							tagName={ attributes.cardHeadingTag }
							value={ attributes.cardHeadingText }
							className="card-header"
						/> :
					'' }

				<div className="card-body">
					{ attributes.cardText !== null && attributes.cardText !== '' && attributes.cardText !== undefined ?
						<RichText.Content
							tagName="div"
							value={ attributes.cardText }
						/> :
						'' }
					<InnerBlocks.Content />
				</div>

				{ attributes.cardFooter == true ?
					attributes.cardFooterText == null || attributes.cardFooterText == '' ? '' :
					<RichText.Content
							tagName="div"
							className="card-footer"
							value={ attributes.cardFooterText }
						/> :
					'' }

			</div>
		);
	},

	deprecated: [
		{
			attributes: {
				panelText: {
					type: 'string',
				},
				panelType: {
					type: 'string',
					default: 'default',
				},
				panelHeading: {
					type: 'boolean',
					default: true,
				},
				panelHeadingText: {
					type: 'string',
				},
				panelHeadingClass: {
					type: 'string',
					default: 'h2',
				},
				activeHeadingClass: {
					type: 'string',
					default: 'h2',
				},
				panelFooter: {
					type: 'boolean',
					default: true,
				},
				panelFooterText: {
					type: 'string',
				},
			},
			migrate( {
				panelText,
				panelType,
				panelHeading,
				panelHeadingText,
				panelHeadingClass,
				activeHeadingClass,
				panelFooter,
				panelFooterText,
			 } ) {
				return {
					cardText: panelText,
					cardType: panelType,
					cardHeading: panelHeading,
					cardHeadingText: panelHeadingText,
					cardHeadingTag: panelHeadingClass,
					activeHeadingClass: activeHeadingClass,
					cardFooter: panelFooter,
					cardFooterText: panelFooterText,
				};
			},

			save: function( { attributes } ) {
				return (
					<div className={ `panel panel-${ attributes.panelType }` }>

						{ attributes.panelHeading == true ?
							attributes.panelHeadingText == null || attributes.panelHeadingText == '' ? '' :
							<div className="panel-heading">
									<RichText.Content
									tagName={ attributes.panelHeadingClass }
									style={ { margin: '0' } }
									value={ attributes.panelHeadingText }
									/>
								</div> :
							'' }

						<div className="panel-body">
							{ attributes.panelText !== null && attributes.panelText !== '' && attributes.panelText !== undefined ?
								<RichText.Content
									tagName="div"
									value={ attributes.panelText }
								/> :
								'' }
							<InnerBlocks.Content />
						</div>

						{ attributes.panelFooter == true ?
							attributes.panelFooterText == null || attributes.panelFooterText == '' ? '' :
							<div className="panel-footer">
									<RichText.Content
									tagName="div"
									value={ attributes.panelFooterText }
									/>
								</div> :
							'' }

					</div>
				);
			},
		},
	],
} );
