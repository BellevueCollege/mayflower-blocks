/**
 * Block: Card (used to be called Panel)
 */

import { __ } from '@wordpress/i18n';

import { registerBlockType, createBlock } from '@wordpress/blocks';

import {
	BlockControls,
	RichText,
	InspectorControls,
	InnerBlocks,
	useBlockProps
} from '@wordpress/block-editor';

import {
	SelectControl,
	ToggleControl,
	Toolbar,
	Panel,
	PanelBody,
	PanelRow,
	SVG,
	Path,
	G
} from '@wordpress/components';


import { useEffect, useState, useRef } from '@wordpress/element';

import { ToolbarBootstrapColorSelector, ToolbarBootstrapHeadingLevelSelector } from 'shared-elements/toolbar';


import './editor.scss';
import './style.scss';

export default function Edit( props ) {
	const blockProps = useBlockProps();
	const { attributes: {
		cardText,
		cardType,
		cardHeading,
		cardHeadingText,
		cardHeadingTag,
		activeHeadingClass,
		cardLightBg,
		cardFooter,
		cardFooterText,
	}, setAttributes, isSelected } = props;


	return (
		<>
			<BlockControls>
				{ cardHeading === true && (
					<ToolbarBootstrapHeadingLevelSelector
						values= {  [ 'Heading 2', 'Heading 3', 'Heading 4', 'Heading 5', 'Heading 6', 'Paragraph' ] }
						active = { cardHeadingTag }
						onClick = { ( value ) => setAttributes( { cardHeadingTag: value, activeHeadingClass: value } ) }
					/>
				)}
				<ToolbarBootstrapColorSelector
					values={ [ 'primary', 'secondary', 'info', 'success', 'warning', 'danger', 'light', 'dark' ] }
					active = { cardType }
					onClick = { ( value ) => setAttributes( { cardType: value } ) }
				/>

			</BlockControls>

			<InspectorControls>
				<Panel>
					<PanelBody
						title="Card Style"
						initialOpen={ false }
					>
						<PanelRow>
							<SelectControl
								label="Theme Style"
								value={ cardType }
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
								checked={ cardLightBg }
								onChange={ ( cardLightBg ) => setAttributes( { cardLightBg } ) }
							/>
						</PanelRow>
						<PanelRow>
							<ToggleControl
								label="Show Card Header"
								checked={ cardHeading }
								onChange={ ( cardHeading ) => setAttributes( { cardHeading } ) }
							/>
						</PanelRow>
						<PanelRow>
							<ToggleControl
								label="Show Card Footer"
								checked={ cardFooter }
								onChange={ ( cardFooter ) => setAttributes( { cardFooter } ) }
							/>
						</PanelRow>
					</PanelBody>
				</Panel>
			</InspectorControls>

			<div { ...blockProps }>
				<div className={ 'card bg-' + cardType + (
					cardType !== 'default' &&
					cardType !== 'light' &&
					cardType !== 'info' &&
					cardType !== 'warning' ?
						' text-white' : '' ) }>

					{ cardHeading == true ?
						<RichText
							tagName={ cardHeadingTag }
							className="card-header"
							allowedFormats={ [ 'bold', 'italic', 'link' ] }
							placeholder="Enter heading text..."
							keepPlaceholderOnFocus="true"
							value={ cardHeadingText }
							onChange={ ( cardHeadingText ) => setAttributes( { cardHeadingText } ) }
						/> :
						'' }

					<div className={ 'card-body' + ( cardLightBg === true ? ' bg-light text-dark' : '' ) }>
						{ cardText !== null && cardText !== '' && cardText !== undefined ?
							<RichText
								tagName="div"
								allowedFormats={ [ 'bold', 'italic', 'link' ] }
								placeholder="Enter text..."
								keepPlaceholderOnFocus="true"
								value={ cardText }
								onChange={ ( cardText ) => setAttributes( { cardText } ) }
							/> :
							'' }
						<InnerBlocks />
					</div>

					{ cardFooter == true ?
						<div className="card-footer">
							<RichText
								tagName="div"
								allowedFormats={ [ 'bold', 'italic', 'link' ] }
								placeholder="Enter footer text..."
								keepPlaceholderOnFocus="true"
								value={ cardFooterText }
								onChange={ ( cardFooterText ) => setAttributes( { cardFooterText } ) }
							/>
						</div> :
						'' }

				</div>
			</div>
		</>
	);

}
