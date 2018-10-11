//import react
import React from 'react';

//import WordPress components
const { withSelect, select } = wp.data;
const { RawHTML } = wp.element;

//Usage: <ListChildPage/>
class ListChildPage extends React.Component {
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
                        class="media-object img-responsive img-thumbnail wp-post-image"
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
            <section class="content-padding nav-page nav-page-list">
                <article class={"post-" + this.props.page.id}>
                    <h2 class={"post-" + this.props.page.id}>
                        <a href={this.props.page.link}>{this.props.page.title}</a>
                    </h2>

                    <div class="media">
                        {(this.props.page.featuredImgID ? 
                            <div class="pull-left wp-caption">
                                <a href={this.props.page.link}>
                                    {<FeaturedImage ID={this.props.page.featuredImgID}/>}
                                </a>
                            </div> 
                        : '')}

                        <div class="media-body">
                            <div class="media-content content-padding">
                                <RawHTML>{this.props.page.excerpt}</RawHTML>
                            </div>
                        </div>
                    </div>
                </article>
            </section>
        </div>
    );
  }
}

export default ListChildPage;