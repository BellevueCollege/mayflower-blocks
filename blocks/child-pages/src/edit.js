/**
 * Block: Card (used to be called Panel)
 */

import { __ } from '@wordpress/i18n';


import {
	RadioControl,
	PanelBody,
	PanelRow,
	Disabled,
	Spinner
} from '@wordpress/components';

import {
	useBlockProps,
	InspectorControls
} from '@wordpress/block-editor';


import { withSelect } from '@wordpress/data';

import './editor.scss';
import './style.scss';

import ListChildPage from './list.js';
import GridChildPage from './grid.js';
import FluidGridChildPage from './fluid-grid.js';
import FluidGridMasonry from './fluid-grid-masonry.js';

export default function Edit( props ) {
	const blockProps = useBlockProps();
	const { attributes: {
		pageID,
		template,
	}, setAttributes, isSelected } = props;

	/**
		 * Get Child Pages
		 */

	function ChildPagesBase( { pages } ) {
		if ( Array.isArray( pages ) ) {
			if ( pages.length === 0 ) {
				return (
					<div className="no-child-pages">
						<p><strong>No child pages found.</strong> This block displays any children of the current page. You can set a page as a child of the current page in the <a href="https://wordpress.org/support/article/settings-sidebar/#page-attributes" target="_blank">Page Attributes</a> of that child page.</p>
					</div>
				);
			}
			// sort by menu_order or title if there is no menu_order
			const childPagesMenuSort = pages.sort( ( a, b ) => {
				//if no 2 values are the same, return menu_order
				if ( a.menu_order !== b.menu_order ) {
					return a.menu_order > b.menu_order;
				}

				// if there is no menu_order, then sort by title
				const menuOrders = [];
				pages.map( ( page ) => (
					menuOrders.push( page.menu_order )
				) );
				const checkMenuOrder = ( value ) => {
					//check if every value returns same as a menu_order
					return value == a.menu_order;
				};
				const isNoMenuOrder = menuOrders.every( checkMenuOrder );
				if ( isNoMenuOrder == true ) {
					//then sort by title
					return a.title.rendered.toLowerCase() > b.title.rendered.toLowerCase();
				}
			} );

			let pageInfo;
			// saves an array of page class objects corresponding to the selected template
			const showTemplate = childPagesMenuSort.map( ( page ) => (
				pageInfo = {
					id: page.id,
					link: page.link,
					title: page.title.rendered,
					excerpt: page.excerpt.rendered,
					featuredImgID: page.featured_media,
				},
				( {
					list: <ListChildPage page={ pageInfo } />,
					grid: <GridChildPage page={ pageInfo } />,
					'fluid-grid': <FluidGridChildPage page={ pageInfo } />,
				}[ template ] )
			) );

			// Grid template function
			// splitRow crafts an array of arrays with 3 pages each so we can have 3 pages a row
			// takes a parameter of pages which is an array of class objects, and a number of columns
			const splitRow = ( pages, columns ) => {
				let splitArray = [];
				if ( pages.length ) { //if there are pages
					const spliced = [ pages.splice( 0, columns ) ]; //splice pages array starting at 0 index ending at # of columns
					splitArray = spliced.concat( splitRow( pages, columns ) ); //then concatenate another split
					return splitArray;
				} //return an empty array
				return splitArray;
			};

			// output template
			if ( template === 'grid' ) {
				const rows = splitRow( showTemplate, 3 ); //split each row into 3 columns
				const grid = ( //outputs a row of 3 columns into each div
					rows.map( ( row ) => (
						<div className="row">
							{ row }
						</div>
					)
					)
				);
				return ( <Disabled><section className="nav-page"> { grid } </section></Disabled> );
			}

			if ( template === 'list' ) {
				return ( <Disabled><section className="content-padding nav-page nav-page-list"> { showTemplate } </section></Disabled> );
			}

			if ( template === 'fluid-grid' ) {
				return ( <Disabled><FluidGridMasonry pages={ showTemplate } /></Disabled> );
			}
		} else {
			return (
				<p><Spinner /> Loading...</p>
			);
		}
	}

	const ChildPages = withSelect( ( select ) => ( {
		pages: select( 'core' ).getEntityRecords(
			'postType',
			'page',
			{
				parent: ( select( 'core/editor' ).getCurrentPostId() ),
			}
		),
	} ) )( ChildPagesBase );

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
			<ChildPages />
		</div>
	</>
	);

}
