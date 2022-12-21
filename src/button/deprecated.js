
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
			buttonDisplay: {
				type: 'string',
				default: 'inline',
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
			const display = buttonBlock ? 'block' : 'inline';
			return {
				buttonType: buttonType = 'default' === buttonType ? 'light' : buttonType,
				buttonSize: buttonSize = 'btn-xs' === buttonType ? 'btn-sm' : buttonSize,
				buttonText: buttonText,
				buttonLink: buttonLink,
				buttonAlign: buttonAlign,
				buttonDisplay: display,
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
				default: 'primary',
			},
			activeButtonType: {
				type: 'string',
				default: 'primary',
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
		migrate( attributes ) {
			const display = attributes.buttonBlock ? 'block' : 'inline';
			return {
				buttonDisplay: display,
				...attributes
			};
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
				default: 'primary',
			},
			activeButtonType: {
				type: 'string',
				default: 'primary',
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
		migrate( attributes ) {
			const display = attributes.buttonBlock ? 'block' : 'inline';
			return {
				buttonDisplay: display,
				...attributes
			};
		},
		save: function( { attributes } ) {
			return (
				<span>
					<RichText.Content
						tagName="a"
						className={ `btn btn-${ attributes.buttonType } ${ attributes.buttonBlock ? 'btn-block' : '' } ${ attributes.buttonSize }` }
						href={ attributes.buttonLink }
						value={ attributes.buttonText }
					/>
				</span>
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
			linkTarget: {
				type: 'string',
				source: 'attribute',
				attribute: 'target',
				selector: 'a',
			},
			rel: {
				type: 'string',
				source: 'attribute',
				attribute: 'rel',
				selector: 'rel',
			},
			buttonType: {
				type: 'string',
				default: 'primary',
			},
			activeButtonType: {
				type: 'string',
				default: 'primary',
			},
			buttonAlign: {
				type: 'string',
			},
			buttonDisplay: {
				type: 'string',
				default: 'block',
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
		save: function( props ) {
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
				isBootstrap5,
			} } = props;
			const blockProps = useBlockProps.save({
				className: ( isBootstrap5 && buttonBlock ) ? 'd-grid' : '',
			});
			const disabled = buttonLink === undefined || buttonLink === '' ? true : false;
			const Tag = buttonDisplay === 'block' ? 'div' : 'span';
			return (
				<Tag { ...blockProps }>
					<RichText.Content
						tagName="a"
						classnam={ `btn btn-${ buttonType } ${ buttonBlock && isBootstrap5 ? 'btn-block' : '' } ${ buttonSize } ${ disabled ? 'disabled' : '' }` }
						target= { linkTarget }
						rel= { rel }
						href={ buttonLink }
						value={ buttonText }
						aria-disabled={ disabled }
					/>
				</Tag>
			);
		}
	}
]
export default deprecated;
