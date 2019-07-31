/**
 * BLOCK: Collapse
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

// Import CSS.
// import './style.scss';
// import './editor.scss';



const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { RichText, InspectorControls, InnerBlocks } = wp.editor;
const { SelectControl, ToggleControl } = wp.components;
const { select } = wp.data;
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
	parent: ['mayflower-blocks/collapsibles'],

	attributes: {
		collapseText: {
			type: 'string',
		},
		collapseHeadingText: {
			type: 'string',
			source: 'html',
			selector: 'a'
		},
		collapseClass: {
			type: 'string',
			default: 'default'
		},
		expanded: {
			type: 'boolean',
			default: false
		},
		currentBlockClientId: {
			type: 'string',
			default: ''
		},
		/* Deprecated Atts */
		collapseIn: {
			type: 'string',
			default: ''
		}
			
	},
	
	edit: function ({ className, attributes, setAttributes, clientId, isSelected}) {

		// set the clientId to the currentBlockClientId attribute so save() can access the clientId
		setAttributes({currentBlockClientId: clientId});

		return [
			<InspectorControls>
				<hr />
				<SelectControl
					label="Collapse Style"
					value={attributes.collapseClass}
					options={[
						{ label: 'Standard', value: 'default' },
						{ label: 'Info (Light Blue)', value: 'info' },
						{ label: 'Success (Green)', value: 'success' },
						{ label: 'Warning (Yellow)', value: 'warning' },
						{ label: 'Danger (Red)', value: 'danger' },
					]}
					onChange={(collapseClass) => { 
						setAttributes({ collapseClass });
					}}
				/>
				<hr />
				<ToggleControl
					label="Start Expanded"
					help={ attributes.expanded ? 'Module will start out in an expanded state' : 'Module will start out in a collapsed state' }
					checked={ attributes.expanded }
					onChange={(expanded) => { 
						setAttributes({ expanded });
					}}
				/>
			</InspectorControls>
			,
			<div className = {`panel panel-${attributes.collapseClass}`}>
				<div class="panel-heading" role="tab" id={`heading-${attributes.currentBlockClientId}`}>
					<h4 class="panel-title">
						<RichText
							tagName = "div"
							formattingControls = {['bold', 'italic', 'link']}
							placeholder = "Enter header text..."
							keepPlaceholderOnFocus = "true"
							value = {attributes.collapseHeadingText}
							onChange = {(collapseHeadingText) => setAttributes({ collapseHeadingText })}
						/>
					</h4>
				</div>
				{(isSelected || select('core/editor').hasSelectedInnerBlock(attributes.currentBlockClientId) == true || attributes.expanded) && 
					<div id={`collapse-${attributes.currentBlockClientId}`} class={'panel-collapse collapse in'} role="tabpanel" aria-labelledby={`heading-${attributes.currentBlockClientId}`}>
						<div class="panel-body">
							{attributes.collapseText !== null && attributes.collapseText !== '' && attributes.collapseText !== undefined ? 
								<RichText
									tagName = "div"
									formattingControls = {['bold', 'italic', 'link']}
									placeholder = "Enter text or add blocks below..."
									keepPlaceholderOnFocus = "true"
									value = {attributes.collapseText}
									onChange = {(collapseText) => setAttributes({ collapseText })}
								/>
							: '' }
							<InnerBlocks/>
						</div>
					</div>
				}
			</div>
		]
	},


	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */

	save: function( {attributes } ) {

		return (
			<div className = {`panel panel-${attributes.collapseClass}`}>
				<div class="panel-heading" role="tab" id={`heading-${attributes.currentBlockClientId}`}>
					<h4 class="panel-title">
						<a role="button" data-toggle="collapse" data-parent="#accordion" href={`#collapse-${attributes.currentBlockClientId}`} aria-expanded="true" aria-controls={`collapse-${attributes.currentBlockClientId}`}>
							<RichText.Content
								value = {attributes.collapseHeadingText}
							/>
						</a>
					</h4>
				</div>
				<div id={`collapse-${attributes.currentBlockClientId}`} class={ ( attributes.expanded ? 'panel-collapse collapse in' : 'panel-collapse collapse' ) } role="tabpanel" aria-labelledby={`heading-${attributes.currentBlockClientId}`}>
					<div class="panel-body">
						{attributes.collapseText !== null && attributes.collapseText !== '' && attributes.collapseText !== undefined ? 
							<RichText.Content
								tagName = "div"
								value = {attributes.collapseText}
							/>
						: '' }
						<InnerBlocks.Content/>
					</div>
				</div>
			</div>
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
					default: 'default'
				},
				collapseIn: {
					type: 'string',
					default: ''
				},
				currentBlockClientId: {
					type: 'string',
					default: ''
				}
			},

			save( { attributes } ) {

				return (
					<div className = {`panel panel-${attributes.collapseClass}`}>
						<div class="panel-heading" role="tab" id={`heading-${attributes.currentBlockClientId}`}>
							<h4 class="panel-title">
								<a role="button" data-toggle="collapse" data-parent="#accordion" href={`#collapse-${attributes.currentBlockClientId}`} aria-expanded="true" aria-controls={`collapse-${attributes.currentBlockClientId}`}>
									<RichText.Content
										value = {attributes.collapseHeadingText}
									/>
								 </a>
							</h4>
						</div>
						<div id={`collapse-${attributes.currentBlockClientId}`} class={ 'in' === attributes.collapseIn ? 'panel-collapse collapse in' : 'panel-collapse collapse' } role="tabpanel" aria-labelledby={`heading-${attributes.currentBlockClientId}`}>
							<div class="panel-body">
								<RichText.Content
									value = {attributes.collapseText}
								/>
								<InnerBlocks.Content/>
							</div>
						</div>
					</div>
				);
			},
			migrate( attributes ) {
				return {
					...omit( attributes,['collapseIn'] ),
					expanded: 'in' == attributes.collapseIn ? true : false,
				};
			},
		}
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
						shortcode: (attrs, { content }) => {
							// Content returns the whole shortcode, so we need to match only shortcode content
							let filtered = content.replace(/(\[collapse.*?\]\s*)|(\s*\[\/collapse\])/gmi, '');
							
							// Return filtered content if there was a match, otherwise return blank string
							return filtered ? filtered : '';
						},
					},

					// Collapse Type/Bootstrap Class
					collapseClass: {
						type: 'string',
						shortcode: ({ named: { type = 'type' } }) => {
							return type;
						},
					},

					// Collapse Heading
					collapseHeadingText: {
						type: 'string',
						shortcode: ({ named: { title = 'title' } }) => {
							return title;
						},
					},

					// Collapse Active
					collapseIn: {
						type: 'string',
						shortcode: ({ named: { active = 'active' } }) => {
							if (active == 'true') {
								return 'in';
							} else {
								return '';
							}
						},
					},
				},
			}
		]
	}
} );
