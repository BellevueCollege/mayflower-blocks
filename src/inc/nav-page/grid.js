//import react
import React from 'react';

//import WordPress components
const { withSelect, select } = wp.data;
const { RawHTML } = wp.element;

//Usage: <GridChildPage/>
class GridChildPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    function FeaturedImageBase({ featured }) {
        if ( featured ) {
            return (
                    <img
                        src={featured.media_details.sizes.thumbnail.source_url}
                        alt={featured.alt_text}
                        class="media-object img-responsive img-thumbnail wp-post-image img-responsive"
                    />
            )
        } else {
            return (
                <p>Image Loading</p>
            )
        }
    }

    const FeaturedImage = withSelect((select, props) => ({
        featured: select('core').getEntityRecord(
            'postType',
            'attachment',
            props.ID
        )
    }))(FeaturedImageBase);

    return (
        <div>
            <h2>Grid View Preview</h2>
        </div>
    );
  }
}

export default GridChildPage;