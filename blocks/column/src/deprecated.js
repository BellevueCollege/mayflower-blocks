
import {
	useBlockProps,
	InnerBlocks
} from '@wordpress/block-editor';

import { __ } from '@wordpress/i18n';

const deprecated = [
	{
		attributes: {
			gridColumnClass: {
				type: 'string',
				default: 'md',
			},
			gridColumnSize: {
				type: 'number',
				default: 4,
			},
			isEditing: {
				type: 'boolean',
				default: false,
			},
			isVisible: {
				type: 'boolean',
				default: true,
			},
			siblingColumns: {
				type: 'number',
				default: 0,
			},
		},

		migrate( attributes, innerBlocks ) {
			const newAttributes = {};
			switch ( attributes.gridColumnClass ) {
				case 'xs':
					newAttributes.enableXs = true;
					newAttributes.autoXs = false;
					newAttributes.columnsXs = attributes.gridColumnSize;
					break;
				case 'sm':
					newAttributes.enableSm = true;
					newAttributes.autoSm = false;
					newAttributes.columnsSm = attributes.gridColumnSize;
					break;
				case 'md':
					newAttributes.enableMd = true;
					newAttributes.autoMd = false;
					newAttributes.columnsMd = attributes.gridColumnSize;
					break;
				case 'lg':
					newAttributes.enableLg = true;
					newAttributes.autoLg = false;
					newAttributes.columnsLg = attributes.gridColumnSize;
					break;
				default:
					break;
			}
			return [newAttributes, innerBlocks];
		},

		save: function( { attributes } ) {
			return (
				<div className={ `col-${ attributes.gridColumnClass }-${ attributes.gridColumnSize }` }>
					<InnerBlocks.Content />
				</div>
			);
		},
	},
]
export default deprecated;
