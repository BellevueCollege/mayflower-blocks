/**
 * Staff List Block
 */

import { __ } from '@wordpress/i18n';

import {
	ToggleControl,
	RadioControl,
	Panel,
	PanelBody,
	PanelRow,
	PanelHeader,
	Disabled
} from '@wordpress/components';

import {
	useBlockProps,
	InspectorControls,
} from '@wordpress/block-editor';

import ServerSideRender from '@wordpress/server-side-render';


import './editor.scss';
import './style.scss';

export default function Edit( props ) {
	const blockProps = useBlockProps();
	const { attributes: {
		staffLayout,
		staffPictureToggle,
		staffPhoneToggle,
		staffLocationToggle,
		staffHoursToggle,
		staffBioToggle,
		staffMoreToggle,
	}, setAttributes, isSelected } = props;

	const StaffConfig = () => {
		if ( '' !== staffLayout ) {
			return (
				<>
					<PanelHeader>What Elements Should Display?</PanelHeader>
					<PanelRow>
						<ToggleControl
							label="Photos"
							checked={ staffPictureToggle }
							onChange={ ( staffPictureToggle ) => setAttributes( { staffPictureToggle } ) }
						/>
					</PanelRow>
					<ListConfig />
					<MoreLink />
				</>
			);
		}

		return null;
	};

	return (
		<>
			<div { ...blockProps }>
				<Disabled>
					<ServerSideRender
						block="mayflower-blocks/staff-list"
						attributes={ props.attributes }
					/>
				</Disabled>
			</div>
		</>
	);

}
