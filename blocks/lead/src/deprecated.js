
import {
	RichText,
	useBlockProps,
} from '@wordpress/block-editor';

const { __ } = wp.i18n;

const deprecated = [
	{
		attributes: {
			buttonText: {
				type: 'string',
				selector: 'a',
			},
			buttonLink: {
				type: 'string',
				source: 'attribute',
				selector: 'a',
				attribute: 'href',
			},
			buttonType: {
				type: 'string',
				default: 'default',
			},
			buttonAlign: {
				type: 'string',
			},
			buttonBlock: {
				type: 'boolean',
				default: false,
			},
			buttonSize: {
				type: 'string',
				default: '',
			},
		},

		migrate( { buttonText, buttonLink, buttonType, buttonAlign, buttonSize, buttonBlock } ) {
			return {
				buttonType: buttonType = 'default' === buttonType ? 'light' : buttonType,
				buttonSize: buttonSize = 'btn-xs' === buttonType ? 'btn-sm' : buttonSize,
				buttonText: buttonText,
				buttonLink: buttonLink,
				buttonAlign: buttonAlign,
				buttonBlock: buttonBlock,
			};
		},

		isEligible( attributes, innerBlocks ) {
			if ( 'btn-xs' === attributes.buttonSize || 'default' === attributes.buttonType ) {
				return true;
			}
			return false;
		},

		save: function( { attributes } ) {
			return (
				<RichText.Content
					tagName="a"
					className={ `btn btn-${ attributes.buttonType } ${ attributes.buttonBlock ? 'btn-block' : '' } ${ attributes.buttonSize }` }
					href={ attributes.buttonLink }
					value={ attributes.buttonText }
				/>
			);
		},
	},
	{
		attributes: {
			buttonText: {
				type: 'string',
				selector: 'a',
			},
			buttonLink: {
				type: 'string',
				source: 'attribute',
				selector: 'a',
				attribute: 'href',
			},
			buttonType: {
				type: 'string',
				default: 'default',
			},
			buttonAlign: {
				type: 'string',
			},
			buttonBlock: {
				type: 'boolean',
				default: false,
			},
			buttonSize: {
				type: 'string',
				default: '',
			},
		},
		save: function ( props ) {
			const { attributes: {
				buttonText,
				buttonLink,
				buttonType,
				activeButtonType,
				buttonAlign,
				buttonBlock,
				buttonSize
			} } = props;
			return (
				<RichText.Content
					tagName="a"
					className={ `btn btn-${ buttonType } ${ buttonBlock ? 'btn-block' : '' } ${ buttonSize }` }
					href={ buttonLink }
					value={ buttonText }
				/>
			);
		}

	}
]
export default deprecated;
