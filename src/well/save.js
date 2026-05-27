import { RichText, InnerBlocks } from '@wordpress/block-editor';

export default function save( props ) {
	const {
		attributes: { wellText, wellSize },
	} = props;
	return (
		<div className={ `well-${ wellSize }` }>
			{ wellText !== null && wellText !== '' && wellText !== undefined ? (
				<RichText.Content
					tagName="div"
					className="well"
					value={ wellText }
				/>
			) : (
				''
			) }
			<InnerBlocks.Content />
		</div>
	);
}
