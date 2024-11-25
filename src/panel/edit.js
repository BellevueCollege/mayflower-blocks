/**
 * Block: Card (used to be called Panel)
 */

import { __ } from '@wordpress/i18n';

import {
	BlockControls,
	RichText,
	InnerBlocks,
	useBlockProps,
	MediaUpload,
	MediaUploadCheck
} from '@wordpress/block-editor';

import {
	ToolbarButton,
	ToolbarGroup,
	ToolbarDropdownMenu,
	MenuItem,
	Button,
	Card,
	CardBody,
} from '@wordpress/components';

import { useSelect } from '@wordpress/data';

import { ToolbarBootstrapColorSelector, ToolbarBootstrapHeadingLevelSelector } from '../shared-elements/toolbar';


import './editor.scss';
import './style.scss';

export default function Edit( props ) {
	const blockProps = useBlockProps();
	const { attributes: {
		editable,
		cardText,
		cardType,
		cardImage,
		cardImageId,
		cardImageUrl,
		cardImageAlt,
		cardImageSize,
		cardHeading,
		cardHeadingText,
		cardHeadingTag,
		activeHeadingClass,
		cardLightBg,
		cardFooter,
		cardFooterText,
	}, setAttributes, isSelected } = props;


	// Load Card Image
	const { media } =  useSelect( ( select ) => {
		return {
			media: select('core').getMedia( cardImageId ),
		}
	})

	return (
		<>
			<BlockControls group="block">
				<ToolbarGroup>
					{ (cardHeading === true && editable.cardHeadingTag ) && (
						<ToolbarBootstrapHeadingLevelSelector
							values= {  [ 'Heading 2', 'Heading 3', 'Heading 4', 'Heading 5', 'Heading 6', 'Paragraph' ] }
							active = { cardHeadingTag }
							onClick = { ( value ) => setAttributes( { cardHeadingTag: value, activeHeadingClass: value } ) }
						/>
					)}
					{ (editable.cardType ) && (
						<ToolbarBootstrapColorSelector
							values={ [ 'primary', 'secondary', 'info', 'success', 'warning', 'danger', 'light', 'dark' ] }
							active = { cardType }
							onClick = { ( value ) => setAttributes( { cardType: value } ) }
						/>
					)}
					<ToolbarButton
						icon="lightbulb"
						label="Light Background"
						onClick={ () => setAttributes( { cardLightBg: ! cardLightBg } ) }
						isActive={ cardLightBg }
						disabled = { ! editable.cardLightBg }
					/>
				</ToolbarGroup>
				<ToolbarGroup>
					<MediaUploadCheck>
						<MediaUpload
							allowedTypes={ [ 'image' ] }
							value={ cardImageId }
							onSelect={ ( value ) => {
								setAttributes( {
									cardImageId: value.id,
									cardImageUrl: value.sizes[ cardImageSize ].url,
									cardImageAlt: value.alt,
								} );
								onClose();
							} }
							render={ ( { open } ) => (

								<ToolbarDropdownMenu
									icon="cover-image"
									label={ __( 'Card Image', 'mayflower-blocks' ) }
								>
									{ ( { onClose } ) => (
										<>
											<MenuItem
												icon={ cardImage ? 'hidden' : 'visibility' }
												onClick={ () => {
													setAttributes( { cardImage: !cardImage })
													onClose();
												}}
												disabled={ ! editable.cardImage }
											>
												{ cardImage ? __( 'Disable Image Area', 'mayflower-blocks' ) : __( 'Enable Image Area', 'mayflower-blocks' ) }
											</MenuItem>
											<MenuItem
												onClick={ () => {
													onClose();
													open();
												} }
												disabled={ !cardImage }
												icon="format-image"
											>
												{ cardImageId === 0 ? __( 'Choose Image', 'mayflower-blocks' ) : __( 'Replace Image', 'mayflower-blocks' ) }
											</MenuItem>
											<MenuItem
												icon="trash"
												onClick={ () => {
													setAttributes( {
														cardImageId: 0,
														cardImageUrl: '',
														cardImageAlt: ''
													} );
													onClose();
												}}
												isDestructive={ true }
												disabled={ cardImageId === 0 || !cardImage }
											>
												{ __( 'Remove Image', 'mayflower-blocks' ) }
											</MenuItem>
										</>
									) }
								</ToolbarDropdownMenu>
							) }
						/>
					</MediaUploadCheck>

					<ToolbarButton
						icon="table-row-before"
						label = { __( 'Display Card Header', 'mayflower-blocks' ) }
						onClick={ () => setAttributes( { cardHeading: ! cardHeading } ) }
						isActive={ cardHeading }
						disabled = { ! editable.cardHeading }
					/>
					<ToolbarButton
						icon="table-row-after"
						label = { __( 'Display Card Footer', 'mayflower-blocks' ) }
						onClick={ () => setAttributes( { cardFooter: ! cardFooter } ) }
						isActive={ cardFooter }
						disabled = { ! editable.cardFooter }
					/>
				</ToolbarGroup>

			</BlockControls>

			<div { ...blockProps }>
				<div className={ 'card bg-' + cardType + (
					cardType !== 'default' &&
					cardType !== 'light' &&
					cardType !== 'info' &&
					cardType !== 'warning' ?
						' text-white' : '' ) }>
					{ ( cardImage ) && (
						<div className='card-img-top'>
							{ ( cardImageId === 0 ) && (
								<MediaUploadCheck>
									<MediaUpload
										allowedTypes={ [ 'image' ] }
										value={ cardImageId }
										onSelect={ ( value ) => setAttributes( {
											cardImageId: value.id,
											cardImageUrl: value.sizes[ cardImageSize ].url,
											cardImageAlt: value.alt,
										} ) }
										render= { ( { open } ) => (
											<Card>
												<CardBody>
													<Button
														className="button button-large"
														onClick={ open }
													>
														{ __( 'Add an Image', 'mayflower-blocks' ) }
													</Button>
												</CardBody>
											</Card>
										)}
									/>
								</MediaUploadCheck>
							)}

							{ ( media !== undefined ) && (
								<img
									src={ cardImageUrl }
									alt={ cardImageAlt }
									className="card-img-top"
								/>
							) }
						</div>
					) }

					{ cardHeading == true ?
						<RichText
							tagName={ cardHeadingTag }
							className="card-header"
							allowedFormats={ [ 'core/bold', 'core/italic', 'core/link' ] }
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
								allowedFormats={ [ 'core/bold', 'core/italic', 'core/link' ] }
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
