/**
 * BLOCK: Course Information
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { CheckboxControl, Disabled, PanelBody, PanelRow } = wp.components;
const { serverSideRender: ServerSideRender } = wp;
const { InspectorControls } = wp.blockEditor;
const { Fragment } = wp.element;
const { select } = wp.data;

import ClassSubjectSelect from './ClassSubjectSelect';
import ClassItemSelect from './ClassItemSelect';

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

registerBlockType( 'mayflower-blocks/course', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'BC Course' ), // Block title.
	description: __( 'Display basic course information, pulling directly from the Class Schedule so details are always correct' ),
	icon: 'welcome-learn-more', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.

	attributes: {
		subject: {
			type: 'string',
			default: 'select',
		},
		item: {
			type: 'string',
			default: 'select',
		},
		description: {
			type: 'boolean',
		},
	},

	//Existing single course description shortcode transformed into its block counterpart.
	//Allows use of [coursedescription]
	transforms: {
		from: [
			{
				type: 'shortcode',
				tag: 'coursedescription',
				attributes: {
					subject: {
						type: 'string',
						shortcode: ( { named: { subject } } ) => {
							return subject;
						},
					},
					item: {
						type: 'string',
						shortcode: ( { named: { item } } ) => {
							return item;
						},
					},
					description: {
						type: 'boolean',
						shortcode: ( { named: { description } } ) => {
							return description;
						},
					},
				},
			},
		],
	},

	edit: function( { setAttributes, attributes, className, isSelected, clientId } ) {
		// Update attributes from within children components
		const handleSubjectUpdate = ( newSubject ) => {
			setAttributes( { subject: newSubject, item: 'select' } );
		};
		const handleItemUpdate = ( newItem ) => {
			setAttributes( { item: newItem } );
		};

		let selectControls;
		if ( isSelected || ( select( 'core/block-editor' ).isBlockSelected( clientId ) == false && ( attributes.subject == 'select' || attributes.item == 'select' ) ) ) {
			selectControls = (
				<div className="controls">
					<ClassSubjectSelect
						attributes={ attributes }
						onSubjectUpdate={ handleSubjectUpdate }
					/>
					<ClassItemSelect
						attributes={ attributes }
						onItemUpdate={ handleItemUpdate }
					/>
				</div>
			);
		}

		let helpBox;
		if ( isSelected || ( select( 'core/block-editor' ).isBlockSelected( clientId ) == false && ( attributes.subject == 'select' || attributes.item == 'select' ) ) ) {
			if ( attributes.subject == 'select' ) {
				helpBox = (
					<p className="editor-only alert alert-info">
						<strong>Notice:</strong> please select a subject to view courses.
					</p>
				);
			} else if ( attributes.item == 'select' ) {
				helpBox = (
					<p className="editor-only alert alert-info">
						<strong>Notice:</strong> please select a course if there are courses available.
					</p>
				);
			} else {
				helpBox = (
					<span></span>
				);
			}
		}

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title="Display Options">
						<PanelRow>
							<CheckboxControl
								label="Display Course Description"
								checked={ attributes.description }
								onChange={ ( description ) => setAttributes( { description } ) }
							/>
						</PanelRow>
					</PanelBody>
				</InspectorControls>

				<div className={ className }>

					{ helpBox }
					{ selectControls }

					<Disabled>
						<ServerSideRender
							block="mayflower-blocks/course"
							attributes={ attributes }
						/>
					</Disabled>
				</div>
			</Fragment>
		);
	},

	save() {
		// Rendering in PHP
		return null;
	},
	example: {
		attributes: {
			subject: 'ENGL&',
			item: '101',
			description: true,
		},
	},
} );
