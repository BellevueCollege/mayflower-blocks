import { __ } from '@wordpress/i18n';


import {
	BlockControls,
	RichText,
	InspectorControls,
	InnerBlocks,
	useBlockProps
} from '@wordpress/block-editor';

export default function save( props ) {
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
	} } = props;
	//const blockProps = useBlockProps();
	const blockProps = useBlockProps.save({
		className : 'card bg-' + cardType + (
			cardType !== 'default' &&
			cardType !== 'light' &&
			cardType !== 'info' &&
			cardType !== 'warning' ?
				' text-white' : '' )
	});
	return (
		<div { ...blockProps } >

			{ cardHeading == true ?
				cardHeadingText == null || cardHeadingText == '' ? '' :
				<RichText.Content
						tagName={ cardHeadingTag }
						value={ cardHeadingText }
						className="card-header"
					/> :
				'' }

			<div className={ 'card-body' + ( cardLightBg === true ? ' bg-light text-dark' : '' ) }>
				{ cardText !== null && cardText !== '' && cardText !== undefined ?
					<RichText.Content
						tagName="div"
						value={ cardText }
					/> :
					'' }
				<InnerBlocks.Content />
			</div>

			{ cardFooter == true ?
				cardFooterText == null || cardFooterText == '' ? '' :
				<RichText.Content
						tagName="div"
						className="card-footer"
						value={ cardFooterText }
					/> :
				'' }

		</div>
	);
}
