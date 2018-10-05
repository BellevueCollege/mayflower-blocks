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

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { InspectorControls } = wp.editor;
const { ServerSideRender, TextControl, RadioControl } = wp.components;
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
				const childPages = pages.sort( (a,b) => {
					return a.menu_order > b.menu_order;
				});

				// FIX sort by title
				// const childPages = childPagesMenuSort.sort( (a,b) => {
				// 	return a.title.rendered.toLowerCase() > b.title.rendered.toLowerCase();
				// });

				let pageInfo;
				return childPages.map((page) => (
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
