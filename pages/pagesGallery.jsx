import React from 'react';
import Gallery from '../components/Gallery.jsx';
import Fragment from '../components/Fragment.jsx';
import { Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';

import { connect } from 'react-redux';

class PagesGallery extends React.Component {


    render() {
        // console.log('this.props.currentPage in pagesGallery in render')
        // console.log(this.props.currentPage)

        return(
            <BrowserRouter>
                <Fragment>
                    <Route exact path="/gallery/:number?" component={Gallery} />
                    {/* <Route path="/gallery/:clid" component={Gallery} /> */}
                </Fragment>
            </BrowserRouter>
        )
    }
}

const mapStateToProps = function(state) {
    // console.log('state.stateGallery.currentPage in pagesGallery component')
    // console.log(state.stateGallery.currentPage)
    return{
        currentPage: state.stateGallery.currentPage
    }
}

// export default connect(mapStateToProps)(PagesGallery)