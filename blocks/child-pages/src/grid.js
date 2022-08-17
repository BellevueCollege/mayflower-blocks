//import react
import React from 'react';

//import WordPress components
import { withSelect } from '@wordpress/data';
import { RawHTML } from '@wordpress/element';

//Usage: <GridChildPage/>
class GridChildPage extends React.Component {
    constructor(props) {
        super(props);
    }

    FeaturedImageBase = ({ featured }) =>{
        let featuredSourceUrl;
        if ( featured ) {
            //if there is a home-small-ad size, return source url, otherwise return full size source url
            featuredSourceUrl = (featured.media_details.sizes['home-small-ad'] ?
                                featured.media_details.sizes['home-small-ad'].source_url :
                                featured.media_details.sizes.full.source_url);
            return (
                    <img
                        src={featuredSourceUrl}
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

    render() {
        const FeaturedImage = withSelect((select, props) => ({
            featured: select('core').getEntityRecord(
                'postType',
                'attachment',
                props.ID
            )
        }))(this.FeaturedImageBase);

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
