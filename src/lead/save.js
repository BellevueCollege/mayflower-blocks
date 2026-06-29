import { __ } from '@wordpress/i18n';
import { PlainText } from '@wordpress/block-editor';

const { getCurrentPostId } = wp.data;
const { ServerSideRender, TextControl, SelectControl, ToggleControl, Toolbar, SVG, Path, G, PanelBody, PanelRow } = wp.components;

import {
	useBlockProps,
	RichText
} from '@wordpress/block-editor';

export default function save( props ) {
	const { attributes: {
		leadText
	} } = props;
	const blockProps = useBlockProps.save({
		className: 'lead'
	});
	return (
		<RichText.Content
			tagName="p"
			value={ leadText }
			{ ...blockProps }
		/>
	);
}
