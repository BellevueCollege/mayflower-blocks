//import react
import React from 'react';

//import WordPress components
import { withSelect } from '@wordpress/data';
import { RawHTML } from '@wordpress/element';


//Usage: <ListChildPage/>
class ListChildPage extends React.Component {
    constructor(props) {
        super(props);
    }

    FeaturedImageBase = ({ featured }) =>{
        let featuredSourceUrl;
        if ( featured ) {
            //if there is a thumbnail size, return source url, otherwise return full size source url
            featuredSourceUrl = (featured.media_details.sizes.thumbnail ?
                                featured.media_details.sizes.thumbnail.source_url :
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
        );
    }
}

export default ListChildPage;
