/**
 * Block: Lead
 */

import { __ } from '@wordpress/i18n';


import {
	useBlockProps,
	RichText,
} from '@wordpress/block-editor';


import './editor.scss';
import './style.scss';

export default function Edit( props ) {
	const blockProps = useBlockProps();
	const { attributes: {
		leadText
	}, setAttributes, isSelected } = props;
	return (
		<div {...blockProps}>
			<RichText
				tagName="div"
				className="lead"
				allowedFormats={ [ 'bold', 'italic', 'link' ] }
				placeholder="Enter text..."
				keepPlaceholderOnFocus="true"
				value={ leadText }
				onChange={ ( leadText ) => setAttributes( { leadText } ) }
			/>
		</div>
	);

}
