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


import './editor.scss';
import './style.scss';

export default function Edit( props ) {
	const blockProps = useBlockProps();
	const { attributes: {
		alertText,
		alertClass,
		activeAlert,

	}, setAttributes, isSelected } = props;

	/**
		 * AlertClassControl returns a Toolbar component with alert classes that changes via on click and updates the alert block's style.
		 *
		 * @return Toolbar component with alert classes
		 * */
	const AlertClassControl = () => {
		function createClassControl( alertClass ) {
			//Switch checks the class control alertClass and returns the corresponding colorClass to update the SVG icon
			let colorClass = '';
			switch ( alertClass ) {
				case 'info':
					colorClass = '#31708f';
					break;
				case 'success':
					colorClass = '#3c763d';
					break;
				case 'warning':
					colorClass = '#8a6d3b';
					break;
				case 'danger':
					colorClass = '#a94442';
					break;
				default:
					colorClass = '#31708f';
					break;
			}

			return {
				icon: <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
					<circle fill="white" cx="10" cy="10" r="10" />
					<G>
						<Path fill={ colorClass } d="M10 2c4.42 0 8 3.58 8 8s-3.58 8-8 8-8-3.58-8-8 3.58-8 8-8zm1.13 9.38l.35-6.46H8.52l.35 6.46h2.26zm-.09 3.36c.24-.23.37-.55.37-.96 0-.42-.12-.74-.36-.97s-.59-.35-1.06-.35-.82.12-1.07.35-.37.55-.37.97c0 .41.13.73.38.96.26.23.61.34 1.06.34s.8-.11 1.05-.34z" />
					</G>
				</SVG>,
				title: alertClass.charAt( 0 ).toUpperCase() + alertClass.slice( 1 ),
				isActive: activeAlert === alertClass,
				onClick: () => setAttributes( { alertClass: alertClass, activeAlert: alertClass } ),
			};
		}

		return (
			<ToolbarGroup controls={ [ 'info', 'success', 'warning', 'danger' ].map( createClassControl ) } />
		);
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title="Alert Style" >
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
				<AlertClassControl />
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
