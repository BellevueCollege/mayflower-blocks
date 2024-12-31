
import {
	RichText,
	useBlockProps,
} from '@wordpress/block-editor';

const { __ } = wp.i18n;

const deprecated = [
	{
		attributes: {
			leadText: {
				type: "string",
				default: ""
			}
		},

		save: function( props ) {
			const { attributes: {
				leadText
			} } = props;
			const blockProps = useBlockProps.save({
				className: 'lead'
			});
			return (
				<RichText.Content
					tagName="div"
					value={ leadText }
					{ ...blockProps }
				/>
			);
		},
	}
]
export default deprecated;
