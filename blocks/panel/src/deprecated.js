
import {
	RichText,
	useBlockProps,
} from '@wordpress/block-editor';

const { __ } = wp.i18n;

const deprecated = [
	{
		attributes: {
			panelText: {
				type: 'string',
			},
			panelType: {
				type: 'string',
				default: 'default',
			},
			panelHeading: {
				type: 'boolean',
				default: true,
			},
			panelHeadingText: {
				type: 'string',
			},
			panelHeadingClass: {
				type: 'string',
				default: 'h2',
			},
			activeHeadingClass: {
				type: 'string',
				default: 'h2',
			},
			panelFooter: {
				type: 'boolean',
				default: true,
			},
			panelFooterText: {
				type: 'string',
			},
		},
		migrate( {
			panelText,
			panelType,
			panelHeading,
			panelHeadingText,
			panelHeadingClass,
			activeHeadingClass,
			panelFooter,
			panelFooterText,
		 } ) {
			return {
				cardText: panelText,
				cardType: panelType,
				cardHeading: panelHeading,
				cardHeadingText: panelHeadingText,
				cardHeadingTag: panelHeadingClass,
				activeHeadingClass: activeHeadingClass,
				cardFooter: panelFooter,
				cardFooterText: panelFooterText,
			};
		},

		save: function( { attributes } ) {
			return (
				<div className={ `panel panel-${ attributes.panelType }` }>

					{ attributes.panelHeading == true ?
						attributes.panelHeadingText == null || attributes.panelHeadingText == '' ? '' :
						<div className="panel-heading">
								<RichText.Content
								tagName={ attributes.panelHeadingClass }
								style={ { margin: '0' } }
								value={ attributes.panelHeadingText }
								/>
							</div> :
						'' }

					<div className="panel-body">
						{ attributes.panelText !== null && attributes.panelText !== '' && attributes.panelText !== undefined ?
							<RichText.Content
								tagName="div"
								value={ attributes.panelText }
							/> :
							'' }
						<InnerBlocks.Content />
					</div>

					{ attributes.panelFooter == true ?
						attributes.panelFooterText == null || attributes.panelFooterText == '' ? '' :
						<div className="panel-footer">
								<RichText.Content
								tagName="div"
								value={ attributes.panelFooterText }
								/>
							</div> :
						'' }

				</div>
			);
		},
	},
]
export default deprecated;
