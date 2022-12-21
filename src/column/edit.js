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
	}, setAttributes, isSelected } = props;


	// Set Block Properties
	const blockProps = useBlockProps({
		className: BuildColumnClass( props, false ),
	});


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
										label="Column Width (1-12 Units)"
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
										label="Column Width (1-12 Units)"
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
										label="Column Width (1-12 Units)"
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
										label="Column Width (1-12 Units)"
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
				<ToolbarButton
					icon= { <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><rect x="0" fill="none" width="20" height="20" /><G><Path d="M12 4h3c.6 0 1 .4 1 1v1H3V5c0-.6.5-1 1-1h3c.2-1.1 1.3-2 2.5-2s2.3.9 2.5 2zM8 4h3c-.2-.6-.9-1-1.5-1S8.2 3.4 8 4zM4 7h11l-.9 10.1c0 .5-.5.9-1 .9H5.9c-.5 0-.9-.4-1-.9L4 7z" /></G></SVG> }
					label= 'Remove'
					onClick={ () => setDeleteModalOpen( true ) }
					isDestructive
				/>
			</Fragment>
		);
	};


	return (
		<>
			<BlockControls>
				<ColumnToolBarControl />
			</BlockControls>
			<DeleteModal />
			<div { ...blockProps }>
				<InnerBlocks
					renderAppender={
						InnerBlocks.DefaultBlockAppender
					}
					placeholder={ isSelected ? false : "Click Column to Add Content" }
				/>
			</div>
		</>
	);

}
