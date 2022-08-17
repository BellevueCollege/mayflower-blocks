/**
 * Block: Card (used to be called Panel)
 */

import { __ } from '@wordpress/i18n';


import {
	RadioControl,
	PanelBody,
	PanelRow
} from '@wordpress/components';

import {
	useBlockProps,
	InspectorControls
} from '@wordpress/block-editor';


import { withSelect } from '@wordpress/data';

import './editor.scss';
import './style.scss';

 // import ListChildPage from './list.js';
// import GridChildPage from './grid.js';
// import FluidGridChildPage from './fluid-grid.js';
// import FluidGridMasonry from './fluid-grid-masonry.js';

export default function Edit( props ) {
	const blockProps = useBlockProps();
	const { attributes: {
		pageID,
		template,
	}, setAttributes, isSelected } = props;
	return (
		<>
		<InspectorControls>
			<PanelBody title="Display Options">
				<PanelRow>
					<RadioControl
						label="Child Page Template"
						selected={ template }
						options={ [
							{ label: 'List of Pages', value: 'list' },
							{ label: 'Simple Grid', value: 'grid' },
							{ label: 'Fluid Grid', value: 'fluid-grid' },
						] }
						onChange={ ( template ) => setAttributes( { template } ) }
					/>
				</PanelRow>
			</PanelBody>
		</InspectorControls>
		<div { ...blockProps } >
			<p>Child Pages!</p>
		</div>
	</>
	);

}
