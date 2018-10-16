/**
 * BLOCK: Child Pages
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

// Import components
import ListChildPage from '../inc/nav-page/list.js';
import GridChildPage from '../inc/nav-page/grid.js';
import FluidGridChildPage from '../inc/nav-page/fluid-grid.js';
import FluidGridMasonry from '../inc/nav-page/fluid-grid-masonry.js';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { InspectorControls } = wp.editor;
const { RadioControl } = wp.components;
const { withSelect, select } = wp.data;

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */

registerBlockType( 'mayflower-blocks/child-pages', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Child Pages' ), // Block title.
	icon: 'excerpt-view', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.

	attributes: {
		pageID: {
			type: 'string',
		},
		template: {
			type: 'string',
			default: 'list'
		}
	},

	edit: function ({ setAttributes, attributes, className}) {

		/**
		 * Get Child Pages
		 */

		function ChildPagesBase({ pages }) {
			if ( Array.isArray( pages ) ) { 
				// sort by menu_order
				let childPagesMenuSort = pages.sort( (a,b) => {
					return a.menu_order > b.menu_order;
				});

				// const childPagesTitleSort = childPagesMenuSort.sort( (a,b) => {
				// 	return a.title.rendered.toLowerCase() > b.title.rendered.toLowerCase();
				// });

				let pageInfo;
				// saves an array of page class objects corresponding to the selected template
				const showTemplate = childPagesMenuSort.map((page) => (
					pageInfo = {
						id: page.id,
						link: page.link,
						title: page.title.rendered,
						excerpt: page.excerpt.rendered,
						featuredImgID: page.featured_media
					},
					({
						'list': <ListChildPage page={pageInfo}/>,
						'grid': <GridChildPage page={pageInfo}/>,
						'fluid-grid': <FluidGridChildPage page={pageInfo}/>
					}[attributes.template])
				));

				// Grid template function
				// splitRow crafts an array of arrays with 3 pages each so we can have 3 pages a row
				// takes a parameter of pages which is an array of class objects, and a number of columns
				const splitRow = (pages, columns) => {
					let splitArray = [];
					if ( pages.length ) { //if there are pages
						let spliced = [pages.splice(0, columns)]; //splice pages array starting at 0 index ending at # of columns
						splitArray = spliced.concat(splitRow(pages, columns)); //then concatenate another split
						return splitArray;
					} else { //return an empty array
						return splitArray;
					}
				}

				// output template
				if (attributes.template === 'grid') {
					let rows = splitRow(showTemplate, 3); //split each row into 3 columns
					const grid = ( //outputs a row of 3 columns into each div
						rows.map((row) => (
							<div class="row">
								{row}
							</div>
							)
						)
					);
					return (<section class="nav-page"> {grid} </section>)
				}

				if (attributes.template === 'list') {
					return (<section class="content-padding nav-page nav-page-list"> {showTemplate} </section>)
				}

				if (attributes.template === 'fluid-grid') {
					return (<FluidGridMasonry pages={showTemplate}/>)
				}
			} else {
				return (
					<p>Loading...</p>
				)
			}
			
		}

		const ChildPages = withSelect((select) => ({
			pages: select('core').getEntityRecords(
				'postType',
				'page',
				{
					parent: ( select('core/editor').getCurrentPostId() )
				}
			)
		}))(ChildPagesBase);

		return [
			<InspectorControls>
				<RadioControl
					label="Child Page Template"
					selected={attributes.template}
					options={[
						{ label: 'List of Pages', value: 'list' },
						{ label: 'Simple Grid', value: 'grid' },
						{ label: 'Fluid Grid', value: 'fluid-grid' },
					]}
					onChange={(template) => setAttributes({ template })}
				/>

			</InspectorControls>
			,
			<div class={className}>
				<ChildPages />
			</div>
		];
	},

	save() {
		// Rendering in PHP
		return null;
	},
} );
