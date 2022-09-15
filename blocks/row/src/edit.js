/**
 * Block: Row
 */

import { __ } from '@wordpress/i18n';


import { useEffect, useState, useRef } from '@wordpress/element';

import {
	ToolbarButton,
	Flex,
	FlexItem,
	Button,
	ButtonGroup,
	Card,
	CardBody,
	CardHeader,
} from '@wordpress/components';

import {
	useBlockProps,
	InnerBlocks,
	BlockControls
} from '@wordpress/block-editor';

import {
	select,
	dispatch
} from '@wordpress/data';

import {
	createBlock,
} from '@wordpress/blocks';

import './editor.scss';
import './style.scss';

export default function Edit( props ) {
	const blockProps = useBlockProps({
	});
	const { attributes: {

	}, setAttributes, isSelected } = props;


	// returns this block's client id
	const currentBlockClientId = select( 'core/block-editor' ).getSelectedBlockClientId();

	// returns this block's data; includes children and attributes
	const currentBlockData     = select( 'core/block-editor' ).getBlock( currentBlockClientId );

	/**
	 * Add a new column block to the row (at the end)
	 */
	const addColumn = () => {
		const columnBlock = createBlock(
			'mayflower-blocks/column',
			{
			},
			[]
		);
		// Insert columnBlock to the row block appending to the last index of columns
		dispatch( 'core/block-editor' ).insertBlock(
			columnBlock,
			currentBlockData.innerBlocks.length,
			currentBlockClientId
		);
	}

	const Starter = () => {
		return (
			<Card size='large' className='column-starter'>
				<CardHeader>{ __( 'Create a Multi-Column Layout', 'mayflower-blocks' ) }</CardHeader>
				<CardBody>
					<p>
						{__("Choose a template below, or use the + in the toolbar to add a column!")}
					</p>

					<Flex>
						<FlexItem>
							<p>{__("Insert Equally-Sized Columns:") }</p>
						</FlexItem>
						<FlexItem>
							<ButtonGroup>
								<Button
									onClick={
										() => setTemplate(
											[['mayflower-blocks/column', {}],
											['mayflower-blocks/column', {}]]
											)
										}
									variant="primary"
									>
									{__("2 Columns")}
								</Button>
								<Button
									onClick={
										() => setTemplate(
											[
												['mayflower-blocks/column', {}],
												['mayflower-blocks/column', {}],
												['mayflower-blocks/column', {}]
											]
											)
										}
									variant="primary"
									>
									{__("3 Columns")}
								</Button>
								<Button
									onClick={
										() => setTemplate(
											[
												['mayflower-blocks/column', {}],
												['mayflower-blocks/column', {}],
												['mayflower-blocks/column', {}],
												['mayflower-blocks/column', {}]
											]
											)
										}
									variant="primary"
									>
									{__("4 Columns")}
								</Button>
								<Button
									onClick={
										() => setTemplate(
											[
												['mayflower-blocks/column', {}],
												['mayflower-blocks/column', {}],
												['mayflower-blocks/column', {}],
												['mayflower-blocks/column', {}],
												['mayflower-blocks/column', {}],
												['mayflower-blocks/column', {}]
											]
											)
										}
									variant="primary"
									>
									{__("6 Columns")}
								</Button>
							</ButtonGroup>
						</FlexItem>
					</Flex>
					<Flex>
						<FlexItem>
							<p>{__("Two-Column Layouts:") }</p>
						</FlexItem>
						<ButtonGroup>
							<Button
								onClick={
									() => setTemplate(
										[
											['mayflower-blocks/column', { autoMd: false, columnsMd: 4 }],
											['mayflower-blocks/column', {}]
										]
										)
									}
								variant="primary"
								>
								{__("Small on Left, Large on Right")}
							</Button>
							<Button
								onClick={
									() => setTemplate(
										[
											['mayflower-blocks/column', {}],
											['mayflower-blocks/column', { autoMd: false, columnsMd: 4 }]
										]
										)
									}
								variant="primary"
								>
								{__("Large on Left, Small on Right")}
							</Button>
						</ButtonGroup>
					</Flex>
				</CardBody>
			</Card>
		);
	}
	const [ template, setTemplate ] = useState( false );


	return (
		<>
			<BlockControls>
				<ToolbarButton
					icon='plus'
					onClick={ addColumn }
				>
					{ __( 'Add Column', 'mayflower-blocks' ) }
				</ToolbarButton>
			</BlockControls>

			<div { ...blockProps }>
				<InnerBlocks
					allowedBlocks={ [ 'mayflower-blocks/column' ] }
					orientation="horizontal"
					placeholder={ <Starter /> }
					template={ template }
					renderAppender={ false }

				/>
			</div>
		</>
	);

}
