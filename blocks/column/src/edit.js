/**
 * Block: Card (used to be called Panel)
 */

import { __ } from '@wordpress/i18n';


import { useEffect, useState, useRef, Fragment } from '@wordpress/element';
import { select, dispatch } from '@wordpress/data';

import {
	ToggleControl,
	ToolbarButton,
	SVG,
	Path,
	G,
	PanelBody,
	PanelRow,
	Disabled,
	Button,
	Modal,
	Flex,
	FlexItem,
	Panel,
	RangeControl
} from '@wordpress/components';


import {
	useBlockProps,
	BlockControls,
	InspectorControls,
	InnerBlocks,
} from '@wordpress/block-editor';

import BuildColumnClass from './column-class';


import './editor.scss';
import './style.scss';


export default function Edit( props ) {

	const { attributes: {
		enableXs,
		enableSm,
		enableMd,
		enableLg,
		autoXs,
		autoSm,
		autoMd,
		autoLg,
		columnsXs,
		columnsSm,
		columnsMd,
		columnsLg,
		siblingInEditMode //temp attribute- not saved!
	}, setAttributes, isSelected } = props;

	// Instantiate State for Edit Mode
	const [ inEditMode, setInEditMode ] = useState( false );

	// Double check that the block is not in edit mode if sibling is being edited
	if ( siblingInEditMode && inEditMode ) {
		setInEditMode( false );
	}
	// Set Block Properties
	const blockProps = useBlockProps({
		className: BuildColumnClass( props, inEditMode ),
	});


	/**
	 * Update siblings to let them know of the current block's edit mode
	 *
	 * @param {boolean} enable
	 * @param {string} currentBlockClientId
	 *
	 * @returns {void}
	 */
	const setSiblingEditAwareness = ( enable, currentBlockClientId ) => {

		// Get the client ID for the parent Row block
		const rowClientId = select( 'core/block-editor' ).getBlockRootClientId( currentBlockClientId );

		// Get the contents of the parent Row block based on its client ID
		const row = select( 'core/block-editor' ).getBlock( rowClientId );

		// Get all Columns inside the Row block
		const columns = row.innerBlocks;

		// Use Reduce to get columns where the ClientID doesn't match the current column (siblings)
		const siblingColumnIDs = columns.reduce( ( output, column ) => {
			if ( column.clientId !== currentBlockClientId ) {
				output.push( column.clientId );
			}
			return output;
		},[] );

		// Set siblingInEditMode attribute on all siblings to true
		dispatch( 'core/block-editor' ).updateBlockAttributes( siblingColumnIDs, { siblingInEditMode: enable } )
	}

	/**
	 * Enable Edit Mode for the Current Block
	 *
	 * Enable editing on the current block, and make all siblings aware of this.
	 *
	 * @return {void}
	 * @since 1.0.0
	 *
	 */
	const handleEditColumnBlock = () => {

		// Make siblings aware that the current block is in edit mode
		setSiblingEditAwareness(true, props.clientId);

		// Put the current block in Edit Mode
		setInEditMode( true );

		// Double check that siblingInEditMode is false on the current block
		setAttributes( { siblingInEditMode: false } );
	}

	/**
	 * Disable Edit Mode for the Current Block
	 *
	 * Disable editing on the current block, and make all siblings aware of this.
	 *
	 * @return {void}
	 * @since 1.0.0
	 *
	 */
	const handleSaveColumnBlock = () => {
		// Make siblings aware that the current block is exiting edit mode
		setSiblingEditAwareness(false, props.clientId);

		// Exit edit mode for the current block
		setInEditMode( false );
	}

	/**
	 * Delete Block
	 */
	const [ deleteModalOpen, setDeleteModalOpen ] = useState( false );
	const DeleteModal = ( ) => {
		const cancelDelete = () => setDeleteModalOpen( false );
		const confirmDelete = () => {
			dispatch( 'core/block-editor' ).removeBlock( props.clientId, false );
			setDeleteModalOpen( false );
		}

		return (
			<>
				{ deleteModalOpen && (
					<Modal title="Are You Sure?" onRequestClose={ cancelDelete }>
						<p>This column and all of its contents will be deleted</p>
						<Flex
							justify={ 'flex-end' }
						>
							<FlexItem>
								<Button variant="secondary" onClick={ cancelDelete }>
									Cancel
								</Button>
							</FlexItem>
							<FlexItem>
								<Button variant="primary" onClick={ confirmDelete }>
									Delete Column
								</Button>
							</FlexItem>

						</Flex>


					</Modal>
				) }
			</>
		);
	}

	/**
	 * Display the current column's contents
	 *
	 *
	 */
	const ColumnContents = () => {
		if ( inEditMode ) {
			return (
				<Fragment>
					<InnerBlocks
						renderAppender={ InnerBlocks.DefaultBlockAppender }
					/>
					<hr />
					<Button
						onClick={ handleSaveColumnBlock }
						variant="primary"
						icon={ <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><G><Path d="M433.1 129.1l-83.9-83.9C342.3 38.32 327.1 32 316.1 32H64C28.65 32 0 60.65 0 96v320c0 35.35 28.65 64 64 64h320c35.35 0 64-28.65 64-64V163.9C448 152.9 441.7 137.7 433.1 129.1zM224 416c-35.34 0-64-28.66-64-64s28.66-64 64-64s64 28.66 64 64S259.3 416 224 416zM320 208C320 216.8 312.8 224 304 224h-224C71.16 224 64 216.8 64 208v-96C64 103.2 71.16 96 80 96h224C312.8 96 320 103.2 320 112V208z"/></G></SVG> }
					>Save and Lock Column</Button>
				</Fragment>

			);
		}
		return (
			<>
				<Disabled>
					<InnerBlocks
						placeholder={ <div className='text-secondary border border-secondary p-3'>Edit column to add content!</div> }
					/>
				</Disabled>
				<div className='overlay'><span aria-hidden="true" class="dashicons dashicons-lock"></span></div>
			</>
		);

	}


	/**
	 * ColumnToolBarControl returns a Toolbar component with edit and remove buttons to edit the column or remove the column.
	 *
	 * @return Toolbar component with column control buttons
	 * */
	const ColumnToolBarControl = () => {
		return (
			<Fragment>
				<InspectorControls>
					<Panel header='Column Width Settings'>
						<PanelBody title="All Screens" initialOpen={ enableXs }>
							<PanelRow>
								<p>{ __( "Use with caution! Phone screens are very narrow, and multiple columns of content usually don't work well!") }</p>
							</PanelRow>
							<PanelRow>
								<ToggleControl
									label="Enable This Breakpoint?"
									checked={ enableXs }
									onChange={ ( value ) => setAttributes( { enableXs: value } ) }
								/>
							</PanelRow>
							{ enableXs && (
								<PanelRow>
									<ToggleControl
										label="Auto-Size"
										checked={ autoXs }
										onChange={ ( value ) => setAttributes( { autoXs: value } ) }
									/>
								</PanelRow>
							) }
							{ ( ! autoXs && enableXs ) && (
								<PanelRow>
									<RangeControl
										label="Columns"
										value={ columnsXs }
										onChange={ ( value ) => setAttributes( { columnsXs: value } ) }
										min={ 1 }
										max={ 12 }
									/>
								</PanelRow>
							)}

						</PanelBody>
						<PanelBody title="Small Screens and Wider" initialOpen={ enableSm }>
							<PanelRow>
								<ToggleControl
									label="Enable This Breakpoint?"
									checked={ enableSm }
									onChange={ ( value ) => setAttributes( { enableSm: value } ) }
								/>
							</PanelRow>
							{ enableSm && (
								<PanelRow>
									<ToggleControl
										label="Auto-Size"
										checked={ autoSm }
										onChange={ ( value ) => setAttributes( { autoSm: value } ) }
									/>
								</PanelRow>
							) }
							{ ( ! autoSm && enableSm ) && (
								<PanelRow>
									<RangeControl
										label="Columns"
										value={ columnsSm }
										onChange={ ( value ) => setAttributes( { columnsSm: value } ) }
										min={ 1 }
										max={ 12 }
									/>
								</PanelRow>
							)}

						</PanelBody>
						<PanelBody title="Medium Screens and Wider" initialOpen={ enableMd }>
							<PanelRow>
								<ToggleControl
									label="Enable This Breakpoint?"
									checked={ enableMd }
									onChange={ ( value ) => setAttributes( { enableMd: value } ) }
								/>
							</PanelRow>
							{ enableMd && (
								<PanelRow>
									<ToggleControl
										label="Auto-Size"
										checked={ autoMd }
										onChange={ ( value ) => setAttributes( { autoMd: value } ) }
									/>
								</PanelRow>
							) }
							{ ( ! autoMd && enableMd ) && (
								<PanelRow>
									<RangeControl
										label="Columns"
										value={ columnsMd }
										onChange={ ( value ) => setAttributes( { columnsMd: value } ) }
										min={ 1 }
										max={ 12 }
									/>
								</PanelRow>
							)}

						</PanelBody>
						<PanelBody title="Large Screens" initialOpen={ enableLg }>
							<PanelRow>
								<ToggleControl
									label="Enable This Breakpoint?"
									checked={ enableLg }
									onChange={ ( value ) => setAttributes( { enableLg: value } ) }
								/>
							</PanelRow>
							{ enableLg && (
								<PanelRow>
									<ToggleControl
										label="Auto-Size"
										checked={ autoLg }
										onChange={ ( value ) => setAttributes( { autoLg: value } ) }
									/>
								</PanelRow>
							) }
							{ ( ! autoLg && enableLg ) && (
								<PanelRow>
									<RangeControl
										label="Columns"
										value={ columnsLg }
										onChange={ ( value ) => setAttributes( { columnsLg: value } ) }
										min={ 1 }
										max={ 12 }
									/>
								</PanelRow>
							)}

						</PanelBody>
					</Panel>
				</InspectorControls>

				{ ! inEditMode ?
					<ToolbarButton
						icon= { <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><rect x="0" fill="none" width="20" height="20" /><G><Path d="M13.89 3.39l2.71 2.72c.46.46.42 1.24.03 1.64l-8.01 8.02-5.56 1.16 1.16-5.58s7.6-7.63 7.99-8.03c.39-.39 1.22-.39 1.68.07zm-2.73 2.79l-5.59 5.61 1.11 1.11 5.54-5.65zm-2.97 8.23l5.58-5.6-1.07-1.08-5.59 5.6z" /></G></SVG> }
						label= 'Edit'
						onClick={ handleEditColumnBlock }
					>
						Edit Column
					</ToolbarButton>:
					<ToolbarButton
						icon={ <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><G><Path d="M433.1 129.1l-83.9-83.9C342.3 38.32 327.1 32 316.1 32H64C28.65 32 0 60.65 0 96v320c0 35.35 28.65 64 64 64h320c35.35 0 64-28.65 64-64V163.9C448 152.9 441.7 137.7 433.1 129.1zM224 416c-35.34 0-64-28.66-64-64s28.66-64 64-64s64 28.66 64 64S259.3 416 224 416zM320 208C320 216.8 312.8 224 304 224h-224C71.16 224 64 216.8 64 208v-96C64 103.2 71.16 96 80 96h224C312.8 96 320 103.2 320 112V208z"/></G></SVG>
						/*<!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->*/}
						label= 'Save'
						onClick={ handleSaveColumnBlock }
					/>
				}
				<ToolbarButton
					icon= { <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><rect x="0" fill="none" width="20" height="20" /><G><Path d="M12 4h3c.6 0 1 .4 1 1v1H3V5c0-.6.5-1 1-1h3c.2-1.1 1.3-2 2.5-2s2.3.9 2.5 2zM8 4h3c-.2-.6-.9-1-1.5-1S8.2 3.4 8 4zM4 7h11l-.9 10.1c0 .5-.5.9-1 .9H5.9c-.5 0-.9-.4-1-.9L4 7z" /></G></SVG> }
					label= 'Remove'
					onClick={ () => setDeleteModalOpen( true ) }
					isDestructive
				/>
			</Fragment>
		);
	};



	/**
	 * Don't display block if sibling is in edit mode!
	 **/
	if ( siblingInEditMode ) {
		return null;
	}
	return (
		<>
			<BlockControls>
				<ColumnToolBarControl />
			</BlockControls>
			<div { ...blockProps }>
				<DeleteModal />
				<ColumnContents />
			</div>
		</>
	);

}
