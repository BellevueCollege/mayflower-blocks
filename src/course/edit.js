/**
 * Block: Card (used to be called Panel)
 */

import { __ } from '@wordpress/i18n';

import { registerBlockType } from '@wordpress/blocks';
import {
	CheckboxControl,
	Disabled,
	Toolbar,
	PanelBody,
	PanelRow,
	SVG,
	Path,
	G,
	ComboboxControl,
	ToolbarDropdownMenu,
	ToolbarButton,
	ToolbarGroup,
	Dropdown,
	Modal,
	Button,
	Flex,
	FlexItem,
	ToggleControl,
} from '@wordpress/components';

import ServerSideRender from '@wordpress/server-side-render';
import apiFetch from '@wordpress/api-fetch';

import {
	InspectorControls,
	BlockControls,
	useBlockProps
} from '@wordpress/block-editor';

import { Fragment, useState } from '@wordpress/element';
import { select } from '@wordpress/data';

import ClassSubjectSelect from './ClassSubjectSelect';
import ClassItemSelect from './ClassItemSelect';

import { ToolbarBootstrapHeadingLevelSelector } from '../shared-elements/toolbar';

import './editor.scss';
import './style.scss';

export default function Edit( props ) {
	const blockProps = useBlockProps();
	const { attributes: {
		subject,
		item,
		description,
		headingTag,
	}, setAttributes, isSelected } = props;

	const [showCourseSelectModal, setShowCourseSelectModal] = useState(false);

	const SelectCourseModal = () => {
		return(
			<>
				{ showCourseSelectModal && (
					<Modal
						title={ __( 'Select Course' ) }
						onRequestClose={ () => { setShowCourseSelectModal(false) } }
					>
						<p>{ __('Select the course you would like to display') }</p>
						<Flex>
							<FlexItem>
								<ClassSubjectSelect
									attributes={ props.attributes }
									onSubjectUpdate={ handleSubjectUpdate }
								/>
							</FlexItem>
							<FlexItem>
								<ClassItemSelect
									attributes={ props.attributes }
									onItemUpdate={ handleItemUpdate }
								/>
							</FlexItem>
						</Flex>


						<Button
							variant='primary'
							onClick={ () => { setShowCourseSelectModal(false) } }
						>
							{ __( 'Done' ) }
						</Button>

					</Modal>
				) }
			</>
		);
	}

	/**
	 * Render the Select Course button to trigger Modal
	 */
	const SelectCourseButton = () => {
		return(
			<ToolbarButton
				icon='book'
				onClick={ () => { setShowCourseSelectModal(true) } }
			>
				{ ( ! item || 'select' === item ) ? __( 'Select Course' ) : __( 'Change Course' ) }
			</ToolbarButton>
		);
	}

	/**
	 * Render the Display Course Description button
	 */
	const DisplayCourseDescriptionButton = () => {
		return(
			<ToolbarButton
				icon='text'
				label='Display Course Description'
				onClick={ () => { setAttributes( { description: ! description } ) } }
				isActive={ description }
			/>
		);
	}

	// Update attributes from within children components
	const handleSubjectUpdate = ( newSubject ) => {
		setAttributes( { subject: newSubject, item: 'select' } );
	};
	const handleItemUpdate = ( newItem ) => {
		setAttributes( { item: newItem } );
	};

	/**
	 * Help Box Contents
	 */
	const HelpBox = () => {

		if ( ! subject || 'select' === subject ) {
			return (
				<div className="editor-only alert alert-info">
					<strong>Notice:</strong> Please select a course to display.&nbsp;
					<Button
						variant='secondary'
						onClick={ () => { setShowCourseSelectModal(true) } }
					>
						{ __( 'Select Course' ) }
					</Button>
				</div>
			);
		}
		if ( ! item || 'select' === item ) {
			return (
				<p className="editor-only alert alert-info">
					<strong>Notice:</strong> please select a course if there are courses available.
				</p>
			);
		}
		return ( null );

	};

	return (
		<>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarBootstrapHeadingLevelSelector
						values = { [ 'Heading 2', 'Heading 3', 'Heading 4', 'Heading 5', 'Heading 6', 'Paragraph' ] }
						active = { headingTag }
						onClick = { ( newLevel ) => { setAttributes( { headingTag: newLevel } ) } }
					/>
					<DisplayCourseDescriptionButton />
				</ToolbarGroup>
				<ToolbarGroup>
					<SelectCourseButton />
				</ToolbarGroup>
			</BlockControls>
			<InspectorControls>
				<PanelBody title="Course to Display" initialOpen={ false }>
					<PanelRow>
						<ClassSubjectSelect
							attributes={ props.attributes }
							onSubjectUpdate={ handleSubjectUpdate }
						/>
					</PanelRow>
					<PanelRow>
						<ClassItemSelect
							attributes={ props.attributes }
							onItemUpdate={ handleItemUpdate }
						/>
					</PanelRow>
				</PanelBody>
				<PanelBody title="Display Options" initialOpen={ false }>
					<PanelRow>
						<ToggleControl
							label="Display Course Description"
							checked={ description }
							onChange={ ( description ) => setAttributes( { description } ) }
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<SelectCourseModal />
				<HelpBox />

				<Disabled>
					<ServerSideRender
						block="mayflower-blocks/course"
						attributes={ props.attributes }
					/>
				</Disabled>
			</div>
		</>
	);

}
