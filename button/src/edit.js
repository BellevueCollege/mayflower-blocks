const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType, PlainText } = wp.blocks; // Import registerBlockType() from wp.blocks
// const { RichText, BlockControls, InspectorControls, AlignmentToolbar } = wp.blockEditor;

const { getCurrentPostId } = wp.data;
const {
	TextControl,
	SelectControl,
	ToggleControl,
	Toolbar,
	ToolbarDropdownMenu,
	SVG,
	Path,
	G,
	PanelBody,
	PanelRow
} = wp.components;

import {
	useBlockProps,
	RichText,
	BlockControls,
	InspectorControls,
	AlignmentToolbar,
} from '@wordpress/block-editor';

import './editor.scss';
import './style.scss';

export default function Edit( props ) {
	const blockProps = useBlockProps();
	const { attributes: {
		buttonText,
		buttonLink,
		buttonType,
		activeButtonType,
		buttonAlign,
		buttonBlock,
		buttonSize
	}, setAttributes, isSelected, className } = props;

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
				isActive: activeButtonType === buttonClass,
				onClick: () => setAttributes( { buttonType: buttonClass, activeButtonType: buttonClass } ),
			};
		}

		return (
			<ToolbarDropdownMenu
				label="Color"
				icon="color-picker"
				controls={
					[ 'primary', 'secondary', 'info', 'success', 'warning', 'danger', 'light', 'dark' ]
					.map( createClassControl )
				} />
		);
	};
	// Creates a <p class='wp-block-cgb-block-mayflower-blocks'></p>.
	let linkEditor;
	if ( isSelected ) {
		linkEditor = (
			<div className="set-link-href">
				<TextControl
					label="Target Link"
					value={ buttonLink }
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
						value={ buttonType }
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
						value={ buttonSize }
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
						checked={ buttonBlock }
						onChange={ ( buttonBlock ) => setAttributes( { buttonBlock } ) }
					/>
				</PanelRow>
			</PanelBody>
		</InspectorControls>,
		<div { ...blockProps }>
			<RichText
				tagName="span"
				className={ `btn btn-${ buttonType } ${ buttonBlock ? 'btn-block' : '' } ${ buttonSize }` }
				allowedFormats={ [ 'bold', 'italic' ] }
				value={ buttonText }
				onChange={ ( buttonText ) => setAttributes( { buttonText } ) }
			/>
			{ linkEditor }
		</div>,
	];

}
