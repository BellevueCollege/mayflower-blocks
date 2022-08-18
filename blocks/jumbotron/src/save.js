import { __ } from '@wordpress/i18n';


import {
	useBlockProps,
	RichText,
	InnerBlocks,
} from '@wordpress/block-editor';

export default function save( props ) {
	const blockProps = useBlockProps.save({
		className: 'jumbotron',
	});
	const { attributes: {
		jumbotronText,
		jumbotronTitle,
	} } = props;
	return (
		<div { ...blockProps }>
			<RichText.Content
				tagName="h1"
				value={ jumbotronTitle }
			/>
			<RichText.Content
				tagName="p"
				value={ jumbotronText }
			/>
			<InnerBlocks.Content />
		</div>
	);
}
