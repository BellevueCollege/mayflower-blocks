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

	/**
	 * Options Specific to List View
	 */
	const ListConfig = () => {
		if ( 'list-view' === staffLayout ) {
			return (
				<>
					<PanelRow>
						<ToggleControl
							label="Phone Number"
							checked={ staffPhoneToggle }
							onChange={ ( staffPhoneToggle ) => setAttributes( { staffPhoneToggle } ) }
						/>
					</PanelRow>
					<PanelRow>
						<ToggleControl
							label="Office Location"
							checked={ staffLocationToggle }
							onChange={ ( staffLocationToggle ) => setAttributes( { staffLocationToggle } ) }
						/>
					</PanelRow>
					<PanelRow>
						<ToggleControl
							label="Office Hours"
							checked={ staffHoursToggle }
							onChange={ ( staffHoursToggle ) => setAttributes( { staffHoursToggle } ) }
						/>
					</PanelRow>
					<PanelRow>
						<ToggleControl
							label="Biography"
							checked={ staffBioToggle }
							onChange={ ( staffBioToggle ) => setAttributes( { staffBioToggle } ) }
						/>
					</PanelRow>
				</>
			);
		} else {
			return null;
		}
	};

	/*
	*  Display More Link in Grid View or when Bio is unchecked
	*/
	const MoreLink = () => {
		if ( ! staffBioToggle || staffLayout === 'grid-view' ) {
			return (
				<PanelRow>
					<ToggleControl
						label="'More' Link"
						checked={ staffMoreToggle }
						onChange={ ( staffMoreToggle ) => setAttributes( { staffMoreToggle } ) }
					/>
				</PanelRow>
			);
		}
		return null;
	};

	return (
		<>
			<InspectorControls>
				<Panel>
					<PanelBody
						title={ __('Staff Display Settings') }
						initialOpen={ true }
					>
						<PanelRow>
							<RadioControl
								label="Layout"
								help= { __( 'How you would like your list of staff to display.' ) }
								selected={ staffLayout }
								options={ [
									{ label: 'Use Settings from Site Customizer', value: '' },
									{ label: 'List Layout', value: 'list-view' },
									{ label: 'Grid Layout', value: 'grid-view' },
								] }
								onChange={ ( staffLayout ) => setAttributes( { staffLayout } ) }
							/>
						</PanelRow>
						<StaffConfig />
					</PanelBody>
				</Panel>
			</InspectorControls>
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
