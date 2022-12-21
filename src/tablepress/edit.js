/**
 * Block: TablePress (Unofficial)
 */

import { __ } from '@wordpress/i18n';


import {
	SelectControl,
	ToolbarGroup,
	ToolbarItem,
	ToolbarButton,
	Modal,
	Button
} from '@wordpress/components';

import {
	useBlockProps,
	BlockControls
} from '@wordpress/block-editor';



import ServerSideRender from '@wordpress/server-side-render';
import apiFetch from '@wordpress/api-fetch';

import { useState } from '@wordpress/element';

import './editor.scss';
import './style.scss';


export default function Edit( props ) {
	const blockProps = useBlockProps();

	// `select` attribute is no longer used, but we keep it for backwards compatibility.
	const { attributes: {
		postId,
		tableId
	}, setAttributes, isSelected } = props;

	// Stateful variable used to determine if table selector should display in cases where a table ID is present from shortcode conversion
	const [ select, setSelect ] = useState( false );

	// Keep track of the status of the the list of tables fetched from the server
	const [ tableFetched, setTableFetched ] = useState( false );

	/**
	 * Handle fetching from TablePress REST Data
	 *
	 * Sets tableList with array of tables from API
	 */

	// Get tables from the REST API
	const [tableList, setTableList] = useState( () => {
		let tableArray = [ { label: 'Select Table', value: 'select' } ];
		apiFetch( { path: '/wp/v2/tablepress_table?per_page=100 ' } ).then( table => {
			table.forEach( t => tableArray.push( { label: t.title.rendered, value: t.id } ) );
			setTableFetched( true );
		} );
		return tableArray;
	});



	const TableError = () => {
		if ( ! tableFetched ) {
			return (
				<div className="card">
					<div className="card-body">
						<div className="spinner-border" aria-hidden="true"></div>
						<span>&nbsp;&nbsp;Loading Table List...</span>
					</div>
				</div>
			);
		}
		if ( tableList.length <= 1 ) {
			return (
				<div className="alert alert-warning" role="alert">
					<p>There are no TablePress tables. <a href="/wp-admin/admin.php?page=tablepress_add" aria-label="Create a new Tablepress table" target="_blank">Create a table</a>.</p>
				</div>
			);
		}
		return '';

	};

	/**
	 * Tools related to table selection
	 */
	const TableSelector = () => {

		// Display loading message if list of tables is still being fetched
		if ( false === tableFetched ) {
			return (
				<ToolbarItem as='p'>Loading Table List...</ToolbarItem>
			);
		}

		// Display error message if no tables are found
		if ( tableList.length <= 1 ) {
			return '';
		}

		// If this table was converted from a shortcode `tableId` is set but not `postId`.
		// Display a different interface to select the table.
		if ( tableId && false === select ) {
			return (
				<ToolbarButton
					onClick={ () => setSelect( true ) }
					isDestructive
				>Select a Different Table</ToolbarButton>
			);
		}


		// Checks to make sure a tableId isn't defined or the user doesn't want to select a new table
		if ( ( tableId === undefined || tableId === '' ) || select === true ) {
			return (
				<ToolbarGroup>
					<ToolbarButton
						onClick={ () => setIsModalOpen( true ) }
						icon="edit"
					>
						Select Table
					</ToolbarButton>
				</ToolbarGroup>

			);
		}
		return '';

	};

	const [ isModalOpen, setIsModalOpen ] = useState( false );
	const TableSelectorModal = () => {
		if ( isModalOpen ) {
			return (
					<Modal
						title="Select a Table"
						onRequestClose={ () => setIsModalOpen( false ) }
						className="tablepress-select-table-modal"
					>
						<SelectControl
							label="Table:"
							className="tablepress-select-table"
							value={ postId }
							options={ tableList }
							onChange={ ( postId ) => setAttributes( { postId, tableId: undefined } ) }
							hideLabelFromVision={ true }
						/>
						<Button
							isPrimary
							onClick={ () => setIsModalOpen( false ) }
						>
							Exit
						</Button>
					</Modal>
				);
		} else {
			return '';
		}
	};



	// Message to display if nothing is returned from ServerSideRender API
	const noTableOutput = () => {
		return (
			<div className="card">
				<div className="card-body">
					<p>No Table Selected. Please Select a Table to Display!</p>
				</div>
			</div>
		);
	}


	return (
		<>
			<BlockControls>
				<TableSelector />
			</BlockControls>
			<TableSelectorModal />
			<div {...blockProps }>
				<TableError />
				<ServerSideRender
					block="mayflower-blocks/tablepress"
					EmptyResponsePlaceholder={ noTableOutput }
					attributes={ {
						postId,
						tableId,
						select
					} }
				/>
			</div>
		</>
	);
}
