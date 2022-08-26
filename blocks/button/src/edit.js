import { __ } from '@wordpress/i18n';


import { useEffect, useState, useRef } from '@wordpress/element';

import {
	TextControl,
	SelectControl,
	ToggleControl,
	ToolbarButton,
	Popover,
	ToolbarDropdownMenu,
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
	AlignmentToolbar,
	__experimentalLinkControl as LinkControl,
	__experimentalGetElementClassName,
} from '@wordpress/block-editor';


import './editor.scss';
import './style.scss';

export default function Edit( props ) {
	const ref = useRef();
	const richTextRef = useRef();
	const blockProps = useBlockProps( { ref } );
	const { attributes: {
		buttonText,
		buttonLink,
		linkTarget,
		rel,
		buttonType,
		activeButtonType,
		buttonAlign,
		buttonBlock,
		buttonSize
	}, setAttributes, isSelected } = props;

	/**
	 * Link and Unlink Button
	 *
	 * Adapted from https://github.com/WordPress/gutenberg/blob/trunk/packages/block-library/src/button/edit.js
	*/
	const [ isEditingURL, setIsEditingURL ] = useState( false );


	function onToggleOpenInNewTab( value ) {
		const newLinkTarget = value ? '_blank' : undefined;

		let updatedRel = rel;
		if ( newLinkTarget && ! rel ) {
			updatedRel = NEW_TAB_REL;
		} else if ( ! newLinkTarget && rel === NEW_TAB_REL ) {
			updatedRel = undefined;
		}

		setAttributes( {
			linkTarget: newLinkTarget,
			rel: updatedRel,
		} );
	}
	const isURLSet = !! buttonLink;
	const opensInNewTab = linkTarget === '_blank';
	const NEW_TAB_REL = 'noreferrer noopener';
	function startEditing( event ) {
		event.preventDefault();
		setIsEditingURL( true );
	}
	function unlink() {
		setAttributes( {
			buttonLink: undefined,
			linkTarget: undefined,
			rel: undefined,
		} );
		setIsEditingURL( false );
	}
	useEffect( () => {
		if ( ! isSelected ) {
			setIsEditingURL( false );
		}
	}, [ isSelected ] );


	/**
	 * ButtonClassControl returns a Toolbar component with alert classes that changes via on click and updates the alert block's style.
	 *
	 * @return Toolbar component with alert classes
	 * */
	const ButtonStyleControl = () => {
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

	const ButtonSizeControl = () => {
		return (
			<ToolbarDropdownMenu
				label="Size"
				icon="editor-expand"
				controls={ [
					{
						title: 'Small',
						icon: 'editor-contract',
						onClick: () => setAttributes( { buttonSize: 'btn-sm' } ),
						isActive: buttonSize === 'btn-sm'
					},
					{
						title: 'Medium',
						icon: 'button',
						onClick: () => setAttributes( { buttonSize: '' } ),
						isActive: buttonSize === ''
					},
					{
						title: 'Large',
						icon: 'editor-expand',
						onClick: () => setAttributes( { buttonSize: 'btn-lg' } ),
						isActive: buttonSize === 'btn-lg'
					}
				] } />
		);
	}
	return (
		<>
			<BlockControls>
				<ButtonStyleControl />
				<ButtonSizeControl />

				<ToolbarButton
					name="full-width"
					icon="align-wide"
					title={ __( 'Display Full-Width' ) }
					isActive={ buttonBlock ?? false }
					onClick={ () => setAttributes( { buttonBlock: ! buttonBlock } ) }
				/>

				{ ! isURLSet && (
					<ToolbarButton
						name="link"
						icon="admin-links"
						title={ __( 'Link' ) }
						//shortcut={ displayShortcut.primary( 'k' ) }
						onClick={ startEditing }
					/>
				) }
				{ isURLSet && (
					<ToolbarButton
						name="link"
						icon="editor-unlink"
						title={ __( 'Unlink' ) }
						//shortcut={ displayShortcut.primaryShift( 'k' ) }
						onClick={ unlink }
						isActive={ true }
					/>
				) }
			</BlockControls>
			{ isSelected && ( isEditingURL || isURLSet ) && (
				<Popover
					position="bottom center"
					onClose={ () => {
						setIsEditingURL( false );
						richTextRef.current?.focus();
					} }
					anchorRef={ ref?.current }
					focusOnMount={ isEditingURL ? 'firstElement' : false }
				>
					<LinkControl
						className="wp-block-navigation-link__inline-link-input"
						value={ { url: buttonLink, opensInNewTab } }
						onChange={ ( {
							url: newButtonLink = '',
							opensInNewTab: newOpensInNewTab,
						} ) => {
							setAttributes( { buttonLink: newButtonLink } );

							if ( opensInNewTab !== newOpensInNewTab ) {
								onToggleOpenInNewTab( newOpensInNewTab );
							}
						} }
						onRemove={ () => {
							unlink();
							richTextRef.current?.focus();
						} }
						forceIsEditingLink={ isEditingURL }
					/>

				</Popover>
			) }
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
			</InspectorControls>
			<div { ...blockProps }>
				<RichText
					ref={ richTextRef }
					tagName="span"
					className={ `btn btn-${ buttonType } ${ buttonBlock ? 'btn-block' : '' } ${ buttonSize }` }
					allowedFormats={ [ 'bold', 'italic' ] }
					value={ buttonText }
					onChange={ ( buttonText ) => setAttributes( { buttonText } ) }
				/>
				{ ! isSelected && ! isEditingURL && ! isURLSet  && (
					<p><strong>Warning! This button has no link!</strong></p>
				) }
			</div>

		</>
	);

}
