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
const { BlockControls, RichText, InspectorControls, InnerBlocks } = wp.blockEditor;
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
		cardLightBg: {
			type: 'boolean',
			default: false,
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
				const levelToPath = {
					1: <SVG xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><Path d="M9 5h2v10H9v-4H5v4H3V5h2v4h4V5zm6.6 0c-.6.9-1.5 1.7-2.6 2v1h2v7h2V5h-1.4z"></Path></SVG>,
					2: <SVG xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><Path d="M7 5h2v10H7v-4H3v4H1V5h2v4h4V5zm8 8c.5-.4.6-.6 1.1-1.1.4-.4.8-.8 1.2-1.3.3-.4.6-.8.9-1.3.2-.4.3-.8.3-1.3 0-.4-.1-.9-.3-1.3-.2-.4-.4-.7-.8-1-.3-.3-.7-.5-1.2-.6-.5-.2-1-.2-1.5-.2-.4 0-.7 0-1.1.1-.3.1-.7.2-1 .3-.3.1-.6.3-.9.5-.3.2-.6.4-.8.7l1.2 1.2c.3-.3.6-.5 1-.7.4-.2.7-.3 1.2-.3s.9.1 1.3.4c.3.3.5.7.5 1.1 0 .4-.1.8-.4 1.1-.3.5-.6.9-1 1.2-.4.4-1 .9-1.6 1.4-.6.5-1.4 1.1-2.2 1.6V15h8v-2H15z"></Path></SVG>,
					3: <SVG xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><Path d="M12.1 12.2c.4.3.8.5 1.2.7.4.2.9.3 1.4.3.5 0 1-.1 1.4-.3.3-.1.5-.5.5-.8 0-.2 0-.4-.1-.6-.1-.2-.3-.3-.5-.4-.3-.1-.7-.2-1-.3-.5-.1-1-.1-1.5-.1V9.1c.7.1 1.5-.1 2.2-.4.4-.2.6-.5.6-.9 0-.3-.1-.6-.4-.8-.3-.2-.7-.3-1.1-.3-.4 0-.8.1-1.1.3-.4.2-.7.4-1.1.6l-1.2-1.4c.5-.4 1.1-.7 1.6-.9.5-.2 1.2-.3 1.8-.3.5 0 1 .1 1.6.2.4.1.8.3 1.2.5.3.2.6.5.8.8.2.3.3.7.3 1.1 0 .5-.2.9-.5 1.3-.4.4-.9.7-1.5.9v.1c.6.1 1.2.4 1.6.8.4.4.7.9.7 1.5 0 .4-.1.8-.3 1.2-.2.4-.5.7-.9.9-.4.3-.9.4-1.3.5-.5.1-1 .2-1.6.2-.8 0-1.6-.1-2.3-.4-.6-.2-1.1-.6-1.6-1l1.1-1.4zM7 9H3V5H1v10h2v-4h4v4h2V5H7v4z"></Path></SVG>,
					4: <SVG xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><Path d="M9 15H7v-4H3v4H1V5h2v4h4V5h2v10zm10-2h-1v2h-2v-2h-5v-2l4-6h3v6h1v2zm-3-2V7l-2.8 4H16z"></Path></SVG>,
					5: <SVG xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><Path d="M12.1 12.2c.4.3.7.5 1.1.7.4.2.9.3 1.3.3.5 0 1-.1 1.4-.4.4-.3.6-.7.6-1.1 0-.4-.2-.9-.6-1.1-.4-.3-.9-.4-1.4-.4H14c-.1 0-.3 0-.4.1l-.4.1-.5.2-1-.6.3-5h6.4v1.9h-4.3L14 8.8c.2-.1.5-.1.7-.2.2 0 .5-.1.7-.1.5 0 .9.1 1.4.2.4.1.8.3 1.1.6.3.2.6.6.8.9.2.4.3.9.3 1.4 0 .5-.1 1-.3 1.4-.2.4-.5.8-.9 1.1-.4.3-.8.5-1.3.7-.5.2-1 .3-1.5.3-.8 0-1.6-.1-2.3-.4-.6-.2-1.1-.6-1.6-1-.1-.1 1-1.5 1-1.5zM9 15H7v-4H3v4H1V5h2v4h4V5h2v10z"></Path></SVG>,
					6: <SVG xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><Path d="M9 15H7v-4H3v4H1V5h2v4h4V5h2v10zm8.6-7.5c-.2-.2-.5-.4-.8-.5-.6-.2-1.3-.2-1.9 0-.3.1-.6.3-.8.5l-.6.9c-.2.5-.2.9-.2 1.4.4-.3.8-.6 1.2-.8.4-.2.8-.3 1.3-.3.4 0 .8 0 1.2.2.4.1.7.3 1 .6.3.3.5.6.7.9.2.4.3.8.3 1.3s-.1.9-.3 1.4c-.2.4-.5.7-.8 1-.4.3-.8.5-1.2.6-1 .3-2 .3-3 0-.5-.2-1-.5-1.4-.9-.4-.4-.8-.9-1-1.5-.2-.6-.3-1.3-.3-2.1s.1-1.6.4-2.3c.2-.6.6-1.2 1-1.6.4-.4.9-.7 1.4-.9.6-.3 1.1-.4 1.7-.4.7 0 1.4.1 2 .3.5.2 1 .5 1.4.8 0 .1-1.3 1.4-1.3 1.4zm-2.4 5.8c.2 0 .4 0 .6-.1.2 0 .4-.1.5-.2.1-.1.3-.3.4-.5.1-.2.1-.5.1-.7 0-.4-.1-.8-.4-1.1-.3-.2-.7-.3-1.1-.3-.3 0-.7.1-1 .2-.4.2-.7.4-1 .7 0 .3.1.7.3 1 .1.2.3.4.4.6.2.1.3.3.5.3.2.1.5.2.7.1z"></Path></SVG>,
				};
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
					icon: levelToPath[ style.charAt( 1 ) ],
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
			<BlockControls>
				{ attributes.cardHeading == true ?
					<HeadingStyleControl /> :
				'' }

			</BlockControls>,
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
								label="Use Light Background for Card Body"
								checked={ attributes.cardLightBg }
								onChange={ ( cardLightBg ) => setAttributes( { cardLightBg } ) }
							/>
						</PanelRow>
						<PanelRow>
							<ToggleControl
								label="Show Card Header"
								checked={ attributes.cardHeading }
								onChange={ ( cardHeading ) => setAttributes( { cardHeading } ) }
							/>
						</PanelRow>
						<PanelRow>
							<ToggleControl
								label="Show Card Footer"
								checked={ attributes.cardFooter }
								onChange={ ( cardFooter ) => setAttributes( { cardFooter } ) }
							/>
						</PanelRow>
					</PanelBody>
				</Panel>
			</InspectorControls>,
			<div className={ className }>
				<div className={ 'card bg-' + attributes.cardType + (
					attributes.cardType !== 'default' &&
					attributes.cardType !== 'light' &&
					attributes.cardType !== 'info' &&
					attributes.cardType !== 'warning' ?
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

					<div className={ 'card-body' + ( attributes.cardLightBg === true ? ' bg-light text-dark' : '' ) }>
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
				attributes.cardType !== 'info' &&
				attributes.cardType !== 'warning' ?
					' text-white' : '' ) }>

				{ attributes.cardHeading == true ?
					attributes.cardHeadingText == null || attributes.cardHeadingText == '' ? '' :
					<RichText.Content
							tagName={ attributes.cardHeadingTag }
							value={ attributes.cardHeadingText }
							className="card-header"
						/> :
					'' }

				<div className={ 'card-body' + ( attributes.cardLightBg === true ? ' bg-light text-dark' : '' ) }>
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
