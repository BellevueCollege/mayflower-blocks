/**
 * BLOCK: Buttons
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
// import './style.scss';
import './editor.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType, PlainText } = wp.blocks; // Import registerBlockType() from wp.blocks
const { RichText, BlockControls, InspectorControls, AlignmentToolbar } = wp.blockEditor;
const { getCurrentPostId } = wp.data;
const { ServerSideRender, TextControl, SelectControl, ToggleControl, Toolbar, SVG, Path, G, PanelBody, PanelRow } = wp.components;

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

registerBlockType( 'mayflower-blocks/button', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Button' ), // Block title.
	icon: 'slides', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.

	attributes: {
		buttonText: {
			type: 'string',
			selector: 'a',
		},
		buttonLink: {
			type: 'string',
			source: 'attribute',
			selector: 'a',
			attribute: 'href',
		},
		buttonType: {
			type: 'string',
			default: 'primary',
		},
		activeButtonType: {
			type: 'string',
			default: 'primary',
		},
		buttonAlign: {
			type: 'string',
		},
		buttonBlock: {
			type: 'boolean',
			default: false,
		},
		buttonSize: {
			type: 'string',
			default: '',
		},
	},

	edit: function( { className, attributes, setAttributes, isSelected } ) {
		/**
		 * ButtonClassControl returns a Toolbar component with alert classes that changes via on click and updates the alert block's style.
		 *
		 * @return Toolbar component with alert classes
		 * */
		const ButtonClassControl = () => {
			function createClassControl( buttonClass ) {
				//Switch checks the class control alertClass and returns the corresponding colorClass to update the SVG icon
				let colorClass = '';
				switch ( buttonClass ) {
					case 'primary':
						colorClass = '#003D79';
						break;
					case 'secondary':
						colorClass = '#6c757d';
						break;
					case 'info':
						colorClass = '#afd7ff';
						break;
					case 'success':
						colorClass = '#317131';
						break;
					case 'warning':
						colorClass = '#F2C01E';
						break;
					case 'danger':
						colorClass = '#C4122F';
						break;
					case 'light':
						colorClass = '#f8f9fa';
						break;
					case 'dark':
						colorClass = '#343a40';
						break;
					default:
						colorClass = '#31708f';
						break;
				}

				return {
					icon: <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
						<G>
							<Path fill={ colorClass } d="M21.125,2H4.875C2.182,2,0,4.182,0,6.875v12.25C0,21.818,2.182,24,4.875,24h16.25,C23.818,24,26,21.818,26,19.125V6.875C26,4.182,23.818,2,21.125,2z" />
						</G>
					</SVG>,
					title: buttonClass.charAt( 0 ).toUpperCase() + buttonClass.slice( 1 ),
					isActive: attributes.activeButtonType === buttonClass,
					onClick: () => setAttributes( { buttonType: buttonClass, activeButtonType: buttonClass } ),
				};
			}

			return (
				<Toolbar controls={ [ 'primary', 'secondary', 'info', 'success', 'warning', 'danger', 'light', 'dark' ].map( createClassControl ) } />
			);
		};
		// Creates a <p class='wp-block-cgb-block-mayflower-blocks'></p>.
		let linkEditor;
		if ( isSelected ) {
			linkEditor = (
				<div className="set-link-href">
					<TextControl
						label="Target Link"
						value={ attributes.buttonLink }
						type="url"
						pattern="https://.*"
						help="Please type in a valid URL, starting with https://"
						onChange={ ( buttonLink ) => setAttributes( { buttonLink } ) }
					/>
				</div>
			);
		}
		return [
			<BlockControls>
				<ButtonClassControl />
			</BlockControls>,
			<InspectorControls>
				<PanelBody title="Button Style" >
					<PanelRow>
						<SelectControl
							label="Button Style"
							value={ attributes.buttonType }
							options={ [
								{ label: 'Primary (BC Blue)', value: 'primary' },
								{ label: 'Secondary (Gray)', value: 'secondary' },
								{ label: 'Info (Light Blue)', value: 'info' },
								{ label: 'Success (Green)', value: 'success' },
								{ label: 'Warning (Orange)', value: 'warning' },
								{ label: 'Danger (Red)', value: 'danger' },
								{ label: 'Light', value: 'light' },
								{ label: 'Dark', value: 'dark' },
							] }
							onChange={ ( buttonType ) => {
								setAttributes( { buttonType } );
							} }
						/>
					</PanelRow>
					<PanelRow>
						<SelectControl
							label="Button Size"
							value={ attributes.buttonSize }
							options={ [
								{ label: 'Small', value: 'btn-sm' },
								{ label: 'Standard', value: '' },
								{ label: 'Large', value: 'btn-lg' },
							] }
							onChange={ ( buttonSize ) => {
								setAttributes( { buttonSize } );
							} }
						/>
					</PanelRow>
					<PanelRow>
						<ToggleControl
							label="Display as Block (Full-Width)"
							checked={ attributes.buttonBlock }
							onChange={ ( buttonBlock ) => setAttributes( { buttonBlock } ) }
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>,
			<div className={ className }>
				<RichText
					tagName="span"
					className={ `btn btn-${ attributes.buttonType } ${ attributes.buttonBlock ? 'btn-block' : '' } ${ attributes.buttonSize }` }
					formattingControls={ [ 'bold', 'italic' ] }
					value={ attributes.buttonText }
					onChange={ ( buttonText ) => setAttributes( { buttonText } ) }
				/>
				{ linkEditor }
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
			<RichText.Content
				tagName="a"
				className={ `btn btn-${ attributes.buttonType } ${ attributes.buttonBlock ? 'btn-block' : '' } ${ attributes.buttonSize }` }
				href={ attributes.buttonLink }
				value={ attributes.buttonText }
			/>
		);
	},

	deprecated: [
		/**
		 * Button XS removed, Button Default removed. Catch and replace.
		 */
		{
			attributes: {
				buttonText: {
					type: 'string',
					selector: 'a',
				},
				buttonLink: {
					type: 'string',
					source: 'attribute',
					selector: 'a',
					attribute: 'href',
				},
				buttonType: {
					type: 'string',
					default: 'default',
				},
				buttonAlign: {
					type: 'string',
				},
				buttonBlock: {
					type: 'boolean',
					default: false,
				},
				buttonSize: {
					type: 'string',
					default: '',
				},
			},

			migrate( { buttonText, buttonLink, buttonType, buttonAlign, buttonSize, buttonBlock } ) {
				return {
					buttonType: buttonType = 'default' === buttonType ? 'light' : buttonType,
					buttonSize: buttonSize = 'btn-xs' === buttonType ? 'btn-sm' : buttonSize,
					buttonText: buttonText,
					buttonLink: buttonLink,
					buttonAlign: buttonAlign,
					buttonBlock: buttonBlock,
				};
			},

			isEligible( attributes, innerBlocks ) {
				if ( 'btn-xs' === attributes.buttonSize || 'default' === attributes.buttonType ) {
					return true;
				}
				return false;
			},

			save: function( { attributes } ) {
				return (
					<RichText.Content
						tagName="a"
						className={ `btn btn-${ attributes.buttonType } ${ attributes.buttonBlock ? 'btn-block' : '' } ${ attributes.buttonSize }` }
						href={ attributes.buttonLink }
						value={ attributes.buttonText }
					/>
				);
			},
		},
	],

	// Transform allows original shortcode to be transitioned to button block
	transforms: {
		from: [
			{
				type: 'shortcode',
				tag: 'button',
				attributes: {

					// Button Text
					buttonText: {
						type: 'string',
						shortcode: ( attrs, { content } ) => {
							// Content returns the whole shortcode, so we need to match only shortcode content
							const filtered = content.replace( /(\[button.*?\]\s*)|(\s*\[\/button\])/gmi, '' );

							// Return filtered content if there was a match, otherwise return blank string
							return filtered ? filtered : '';
						},
					},

					// Target Link
					buttonLink: {
						type: 'string',
						shortcode: ( { named: { link = 'link' } } ) => {
							return link;
						},
					},

					// Button Type
					buttonType: {
						type: 'string',
						shortcode: ( { named: { type = 'type' } } ) => {
							return type;
						},
					},

					// Is Button Block formatted?
					buttonBlock: {
						type: 'boolean',
						shortcode: ( { named: { block = 'block' } } ) => {
							if ( true === block || 'true' === block ) {
								return true;
							}
							return false;
						},
					},

					// Button Size
					buttonSize: {
						type: 'string',
						shortcode: ( { named: { size = 'size' } } ) => {
							return `btn-${ size }`;
						},
					},
				},
			},
		],
	},
} );
