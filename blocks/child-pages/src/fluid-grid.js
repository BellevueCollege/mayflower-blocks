//import react
import React from 'react';

//import WordPress components
import { withSelect } from '@wordpress/data';
import { RawHTML } from '@wordpress/element';

//Usage: <FluidGridChildPage/>
class FluidGridChildPage extends React.Component {
    constructor(props) {
        super(props);
    }

    FeaturedImageBase = ({ featured }) =>{
        let featuredSourceUrl;
        if ( featured ) {
            //if there is a medium_large size, return source url, otherwise return full size source url
            featuredSourceUrl = (featured.media_details.sizes.medium_large ?
                                featured.media_details.sizes.medium_large.source_url :
                                featured.media_details.sizes.full.source_url);
            return (
                    <img
                        src={featuredSourceUrl}
                        alt={featured.alt_text}
                        class="img-responsive wp-post-image"
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

        const Card = () => {
            if (this.props.page.featuredImgID) {
                return (
                    <span>
                        <a href={this.props.page.link}>
                            {<FeaturedImage ID={this.props.page.featuredImgID}/>}
                        </a>
                        <div class="hasimage">
                            <h2>
                                <a href={this.props.page.link}>{this.props.page.title}</a>
                            </h2>
                            <RawHTML>{this.props.page.excerpt}</RawHTML>
                        </div>
                    </span>
                )
            } else {
                return (
                    <div>
                        <h2>
                            <a href={this.props.page.link}>{this.props.page.title}</a>
                        </h2>
                        <RawHTML>{this.props.page.excerpt}</RawHTML>
                    </div>
                )
            }
        }

        return (
            <article class={"post-" + this.props.page.id}>
                <Card/>
            </article>
        );
    }
}

export default FluidGridChildPage;
