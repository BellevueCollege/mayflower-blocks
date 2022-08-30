/**
 * Block: Card (used to be called Panel)
 */

import { __ } from '@wordpress/i18n';

import {
	SelectControl,
	ToolbarGroup,
	SVG,
	Path,
	G,
	PanelBody,
	PanelRow
} from '@wordpress/components';

import {
	useBlockProps,
	RichText,
	BlockControls,
	InspectorControls,
	InnerBlocks
} from '@wordpress/block-editor';

import { ToolbarBootstrapColorSelector } from 'shared-elements/toolbar';


import './editor.scss';
import './style.scss';

export default function Edit( props ) {
	const blockProps = useBlockProps();
	const { attributes: {
		alertText,
		alertClass,
		activeAlert,

	}, setAttributes, isSelected } = props;

	return (
		<>
			<InspectorControls>
				<PanelBody title="Alert Style" initialOpen={false}>
					<PanelRow>
						<SelectControl
							label="Alert Style"
							value={ alertClass }
							options={ [
								{ label: 'Info (Light Blue)', value: 'info' },
								{ label: 'Success (Green)', value: 'success' },
								{ label: 'Warning (Yellow)', value: 'warning' },
								{ label: 'Danger (Red)', value: 'danger' },
							] }
							onChange={ ( alertClass ) => {
								setAttributes( { alertClass: alertClass, activeAlert: alertClass } );
							} }
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>

			<BlockControls>
				<ToolbarBootstrapColorSelector
					values= { [ 'info', 'success', 'warning', 'danger' ] }
					label={ __( 'Alert Style' ) }
					onClick={ ( alertClass ) => {
						setAttributes( { alertClass: alertClass, activeAlert: alertClass } );
					} }
				/>
			</BlockControls>

			<div { ...blockProps }>
				<div className={ `alert alert-${ alertClass }` }>

					{ alertText !== null && alertText !== '' && alertText !== undefined ?
						<RichText
							tagName="div"
							allowedFormats={ [ 'bold', 'italic', 'link' ] }
							placeholder="Enter text or add blocks below..."
							keepPlaceholderOnFocus="true"
							value={ alertText }
							onChange={ ( alertText ) => setAttributes( { alertText } ) }
						/> :
						'' }
					<InnerBlocks
						allowedBlocks={ [
							'core/paragraph',
							'mayflower-blocks/button',
							'core/heading',
							'core/list'
						] }
					/>
				</div>
			</div>
		</>
	);

}
