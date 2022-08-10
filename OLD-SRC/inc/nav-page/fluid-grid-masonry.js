//import react
import React from 'react';
import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded';

//Usage: <FluidGridMasonry/>
class FluidGridMasonry extends React.Component {
    constructor(props) {
        super(props);
        //props is array of showTemplate outputting <FluidGridChildPage/>
    }

    componentDidMount () {
        this.handleMasonry();
    }
    
    handleMasonry() {
        const grid = document.querySelector('.child-pages');

        const msnry = new Masonry(grid, {
            itemSelector: '.child-pages article',
            columnWidth: '.child-pages .grid-sizer',
            percentPosition: true,
            horizontalOrder: true,
            gutter:10
        });

        imagesLoaded(grid).on('progress', function () {
            // layout Masonry after each image loads
            msnry.layout();
        });
    }
  
    render() {
        return (        
            <section class="child-pages fluid-grid">
                <div class="grid-sizer"></div>
                {this.props.pages}
            </section>
        );
    }
}

export default FluidGridMasonry;