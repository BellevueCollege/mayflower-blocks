import { __ } from '@wordpress/i18n';


import { useEffect, useState, useRef } from '@wordpress/element';

import { useSelect } from '@wordpress/data';


import {
	TextControl,
	SelectControl,
	ToggleControl,
	ToolbarButton,
	Popover,
	ToolbarDropdownMenu,
	ToolbarGroup,
	SVG,
	Path,
	G,
	PanelBody,
	PanelRow,
	Spinner
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

import { ToolbarBootstrapColorSelector } from '../shared-elements/toolbar';


import './editor.scss';
import './style.scss';

export default function Edit( props ) {
	const ref = useRef();
	const richTextRef = useRef();
	const { attributes: {
		buttonText,
		buttonLink,
		linkTarget,
		rel,
		buttonType,
		activeButtonType,
		buttonAlign,
		buttonDisplay,
		buttonBlock,
		buttonSize,
		placeholder,
	}, setAttributes, isSelected, context } = props;

	const theme = useSelect( ( select ) => {
		return select( 'core' ).getCurrentTheme();
	}, [] );

	// Set bootstrap version flag
	const isBootstrap5 = ( t ) => {
		if ( t && (
				'Mayflower G4' !== t.name.rendered &&
				'BC Douglas Fir Landing Page Child' !== t.name.rendered &&
				'BC \"Douglas Fir\" Theme' !== t.name.rendered
			)) {
				return true;
		}
		return false;
	}

	// Get context
	const disableBlockInlineControls = context['mayflower-blocks/_btnDisableBlockInline'] || false;

	const blockProps = useBlockProps( {
		ref,
		className: ( isBootstrap5 && buttonBlock ? 'd-grid' : '' ),
	} );

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

	// Only display the block if the theme has been detected.
	if ( theme ) {

		setAttributes( { isBootstrap5: isBootstrap5( theme ) } );
		return (
			<>
				<BlockControls>
					<ToolbarGroup>
						<ToolbarBootstrapColorSelector
							values={ [ 'primary', 'secondary', 'info', 'success', 'warning', 'danger', 'light', 'dark' ] }
							active={ buttonType }
							onClick={ ( value ) => setAttributes( {
								buttonType: value,
								activeButtonType: value
							} ) }
						/>
						<ButtonSizeControl />
						{ ! disableBlockInlineControls && (
							<ToolbarButton
								name="full-width"
								icon="align-wide"
								title={ __( 'Display Full-Width' ) }
								isActive={ buttonBlock ?? false }
								onClick={ () => {
									if ( ! buttonBlock ) {
										setAttributes( { buttonDisplay: 'block' } )
									}
									setAttributes( { buttonBlock: ! buttonBlock } )
								} }
							/>
						)}
						{ ( ! buttonBlock && ! disableBlockInlineControls ) && (
							<ToolbarButton
								name="inline"
								icon="text"
								title={ __( 'Display Inline' ) }
								isActive={ buttonDisplay === 'inline' }
								onClick={ () => {
									if ( buttonDisplay === 'inline' ) {
										setAttributes( { buttonDisplay: 'block' } );
									} else {
										setAttributes( { buttonDisplay: 'inline' } );
									}
								} }
							/>
						) }
					</ToolbarGroup>
					<ToolbarGroup>

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
					</ToolbarGroup>

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
						{ ! disableBlockInlineControls && (
							<PanelRow>
								<ToggleControl
									label="Display as Block (Full-Width)"
									checked={ buttonBlock }
									onChange={ ( buttonBlock ) => setAttributes( { buttonBlock } ) }
								/>
							</PanelRow>
						)}
					</PanelBody>
				</InspectorControls>
				<div { ...blockProps }>
					<RichText
						ref={ richTextRef }
						tagName="span"
						className={ `btn btn-${ buttonType } ${ isBootstrap5 && buttonBlock ? 'btn-block' : '' } ${ buttonSize }` }
						allowedFormats={ [ 'core/bold', 'core/italic' ] }
						value={ buttonText }
						onChange={ ( buttonText ) => setAttributes( { buttonText } ) }
						placeholder={ placeholder }
					/>
				</div>
			</>
		);
	} else {
		// If theme hasn't returned yet, return a spinner
		return (
			<div {...blockProps}>
				<p className='btn btn-light'><Spinner /> { __( 'Determining the current theme...' ) }</p>
			</div>
		);

	}
}
