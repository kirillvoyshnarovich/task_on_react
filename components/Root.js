import React from 'react';
import { Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';

import { create_list } from '../redux/actions.js';
import { connect } from 'react-redux';

import isoFetch from 'isomorphic-fetch';

import './Root.scss';
import Header from './Header.jsx';
import Main from './Main.jsx';
import Gallery from './Gallery.jsx';
import InfoForSong from './InfoForSong.jsx'
import Player from './Player.jsx';
import Footer from './Footer.jsx'
import Preload from "./Preloder.jsx";


// import PagesGallery from '../pages/pagesGallery.jsx';
// import PageMain from '../pages/pageMain.jsx'

import Fragment from './Fragment.jsx';


class TestComponent extends React.Component {

  constructor (props, context) {
    super(props, context)

    this.state ={
      dataReady:null,
    }
  }

  fetchSuccess =()=> {
    this.setState({dataReady:1})
  }




    componentWillMount =()=> {
    let dataList;
    isoFetch(`http://geoiziskaniya.by/dataBaza.json`, {
        method: 'GET',
        mode: 'cors',
    })
        .then(response => {
            let data = response.json();                        
            return data
        })
        .then(data => {
            dataList = data;
            this.props.dispatch(create_list(dataList))
            this.fetchSuccess() 
        })
  }

  render() {

    if ( !this.state.dataReady ){
      return <div className="wrapper-spinner">
          <Preload/>
      </div>;
    }
      

    return (
      <BrowserRouter>
          <Fragment>
              <Header></Header>
              <Route exact path="/" component={Main} />
              <Route path="/gallery/:number?" component={Gallery} />
              <Route path="/info-song/:year" component={InfoForSong} />
              {(this.props.info_song.id) ? <Player/> : null}
              <Route path="/info-song/:year"/>
              <Footer></Footer>
          </Fragment>
      </BrowserRouter>
    );

  }

}

const mapStateToProps = function(state) {
  return{
    info_song: state.playSong,
  }
}
export default connect(mapStateToProps)(TestComponent)


