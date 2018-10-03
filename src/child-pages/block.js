/**
 * BLOCK: Child Pages
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';



const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { InspectorControls } = wp.editor;
const { ServerSideRender, TextControl, RadioControl } = wp.components;
const { withSelect, select } = wp.data;
const { decodeEntities } = wp.htmlEntities;
//const {} = wp.api;


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

/**
 * Get Child Pages
 */

function ChildPagesBase({ pages }) {
	if ( Array.isArray( pages ) ) { 
		return (
			pages.map((page) => (
				<div>
					<h2>{decodeEntities(page.title.rendered.trim())}</h2>
					<p>{decodeEntities(page.content.rendered) || __('(Untitled)')}</p>
				</div>
			))
		);
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

		/*
		let childPages = new wp.api.collections.Pages();
		childPages.fetch({ 
			data: { 
				parent: postID
			}
		});
		*/

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
