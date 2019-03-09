import React from 'react';

import { connect } from 'react-redux';

import isoFetch from 'isomorphic-fetch';

import play_button_hover from './fonts/icon/play-button-hover.svg';
import pause_button_hover from './fonts/icon/pause-button-hover.svg';

import { play_stop_song } from '../redux/actions.js';

import './InfoForSong.scss'

class InfoForSong extends React.PureComponent {

    static propsTypes ={

    }

    constructor (props, context) {
        super(props, context)

        let year = parseFloat(this.props.match.params.year)
        let item = this.props.data.filter((item)=> {
            return item.id_year == year
        })
        this.state ={
            item:item[0],
            displayWord: false,
        }
    }

    componentDidMount=()=> {
            let formData = new FormData();
            formData.append('action', 'get_word_for_song')
            formData.append('id', this.state.item.id_year);
            let dataList;
            isoFetch(`http://geoiziskaniya.by/handlerWord.php?action=${encodeURIComponent('get_word_for_song')}&id=${encodeURIComponent(this.state.item.id_year)}`, {
                method: 'GET',
                mode: 'cors',
            })
                .then(response => {
                    let data = response.text();                        
                    return data
                })
                .then(data => {
                    dataList = data;
                    var pre = document.createElement('pre');
                    pre.className = "info-song__lyrics--text--format";
                    this.blockText.appendChild(pre)
                    pre.appendChild(document.createTextNode(data));
                })
          
    }

    changeDisplayWord =()=> {
        if(this.state.displayWord) {
            this.setState({displayWord:0})
        } else {
            this.setState({displayWord:1})
        }
    }

    playButton =()=> {
        if(this.props.statePlayer) {
            this.props.dispatch(play_stop_song(this.state.item.id_year, this.state.item.name_song, this.state.item.performers, false, 'single'))
        } else {
            this.props.dispatch(play_stop_song(this.state.item.id_year, this.state.item.name_song, this.state.item.performers, true, 'single'))
        }
    }

    render(){
        console.log('render in infoForSong')
        return(
            <main className="conteiner-wrapper main-block">
                <div className="info-song-controls">
                    <div className="info-song-controls__border"></div>
                    <div className="info-song-controls__button-play" onClick={this.playButton}>
                        <img className="info-song-controls__button-play--img" src={(this.props.statePlayer) ? pause_button_hover : play_button_hover}>
                        </img>
                    </div>
                </div>
                <div className="info-song">
                    <div className="info-song__information">
                        <p className="info-song__category info-song__information--year"><span>year:</span> {this.state.item.id_year}</p>
                        <p className="info-song__category info-song__information--name"><span>name:</span> {this.state.item.name_song}</p>
                        <p className="info-song__category info-song__information--performers"><span>performers:</span> {this.state.item.performers}</p>
                        <p className="info-song__category info-song__information--author-lyrics"><span>author of lyrics:</span> {this.state.item.author_of_lyrics}</p>
                        <p className="info-song__category info-song__information--author-music"><span>author of music:</span> {this.state.item.author_of_music}</p>
                        <p className="info-song__category info-song__information--name-film"><span>name film:</span> {this.state.item.name_film}</p>
                    </div>
                    <div className="info-song__lyrics">
                        <h3 className="info-song__lyrics--heading">Words</h3>
                        {<p ref={(ref)=>{this.blockText = ref}} className={(this.state.displayWord) ? "info-song__lyrics--text" : "info-song__lyrics--text_hidden" }>
                        </p>}
                        <button className="info-song__lyrics--button" onClick={this.changeDisplayWord}>
                            Show text
                        </button>
                    </div>  
                </div>
            </main>
        )
    }
}

const mapStateToProps = function(state) {
    return{
        data:state.data,
        statePlayer:state.playSong.playerState
    }
}

export default connect(mapStateToProps)(InfoForSong)