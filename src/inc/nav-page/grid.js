//import react
import React from 'react';

//import WordPress components
const { withSelect } = wp.data;
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
                            src={featured.media_details.sizes['home-small-ad'].source_url}
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
            <div class="col-md-4 top-spacing15">
                <article class={"post-" + this.props.page.id + " content-padding nav-page"}>
                    {(this.props.page.featuredImgID ? 
                        <a href={this.props.page.link}>
                            {<FeaturedImage ID={this.props.page.featuredImgID}/>}
                        </a>
                    : '')}
                    <h2>
                        <a href={this.props.page.link}>{this.props.page.title}</a>
                    </h2>
                    <RawHTML>{this.props.page.excerpt}</RawHTML>
                </article>
            </div>
        );
    }
}

export default GridChildPage;