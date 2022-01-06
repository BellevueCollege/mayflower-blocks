/**
 * BLOCK: TablePress
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
// import './style.scss';
import './editor.scss';

// Import components

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { InspectorControls } = wp.editor;
const { SelectControl, ServerSideRender } = wp.components;
const { Component } = wp.element;
const { apiFetch } = wp;

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

registerBlockType( 'mayflower-blocks/tablepress', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'TablePress' ), // Block title.
	icon: 'media-spreadsheet', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.

	attributes: {
		postId: {
			type: 'string',
			default: 'select',
		},
		tableId: {
			type: 'string',
		},
		select: {
			type: 'boolean',
			default: false,
		},
	},

	edit: class extends Component {
		constructor( props ) {
			super( ...arguments );
			this.props = props;
			this.state = {
				tableList: [],
			};
		}

		componentDidMount() {
			this.handleTableFetch();
		}

		/**
		 * Handle fetching from TablePress REST Data
		 *
		 * Sets tableList with array of tables from API
		 */
		handleTableFetch = () => {
			const tableArray = [ { label: 'Select Table', value: 'select' } ];
			apiFetch( { path: '/wp/v2/tablepress_table?per_page=100' } ).then( table => {
				table.forEach( t => tableArray.push( { label: t.title.rendered, value: t.id } ) );
				this.setState( { tableList: tableArray } );
			} );
		}

		render() {
			const { setAttributes, attributes, className, isSelected } = this.props;
			const { tableList } = this.state;

			/**
			 * Helps handles select control if block was transformed from shortcode
			 *
			 * Sets attributes so select control with tables shows
			 */
			const handleShowSelectControl = () => {
				setAttributes( { select: true } );
				setAttributes( { tableId: '' } );
			};

			// Select control for returned tables from REST API
			let selectControls;
			// Checks whether to show controls
			if ( isSelected || ( ! isSelected && attributes.postId === undefined || attributes.postId === 'select' ) ) {
				// Checks to make sure a tableId isn't defined or the user doesn't want to select a new table
				if ( ( attributes.tableId === undefined || '' ) || attributes.select === true ) {
					selectControls = (
						<div className="controls">
							<SelectControl
								label="Choose Tablepress Table"
								value={ attributes.postId }
								options={ tableList }
								onChange={ ( postId ) => setAttributes( { postId } ) }
							/>
						</div>
					);
				}
			}

			// Button to click that shows select control on a transformed shortcode block
			let selectDifferentTable;
			// Checks if there is a table id and is selected, then show button
			if ( attributes.tableId && isSelected ) {
				selectDifferentTable = ( <div className="controls"><button type="button" className="btn btn-default" onClick={ handleShowSelectControl }>Select Different Table</button></div> );
			}

			return [
				<InspectorControls>
				</InspectorControls>,
				<div className={ className }>
					{ selectControls }
					{ selectDifferentTable }
					<div className="editor-only">
						<ServerSideRender
							block="mayflower-blocks/tablepress"
							attributes={ attributes }
						/>
					</div>
				</div>,
			];
		}
	},

	save: () => {
		// Rendering in PHP
		return null;
	},

	transforms: {
		from: [
			{
				type: 'shortcode',
				tag: 'table',
				attributes: {
					tableId: {
						type: 'string',
						shortcode: ( { named: { id } } ) => {
							return id;
						},
					},
				},
			},
		],
	},
} );

