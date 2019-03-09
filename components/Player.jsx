import React from 'react';

import { connect } from 'react-redux';

import './Player.scss';

import previous_button from'./fonts/icon/Player_component/previous-button.svg';
import play_button from './fonts/icon/Player_component/play-button.svg';
import next_button from './fonts/icon/Player_component/next-button.svg';
import stop_bitton from './fonts/icon/Player_component/stop-button.svg';

import volum_button_3 from './fonts/icon/Player_component/speaker_value_3.svg';
import volum_button_0 from './fonts/icon/Player_component/speaker_value_0.svg';

import { next_song, previous_song, play_stop_song} from '../redux/actions.js';

import Preload from "./Preloder.jsx";

import isoFetch from 'isomorphic-fetch';


class Player extends React.PureComponent {

    static propTypes={

    }

    constructor(props, context){
        super(props, context)

        this.state={
            valueProgressBar:0,
            currentTimeMinute:0,
            currentTimeSecond:'00',
            durationMinute:0,
            durationSecond:"00",
            volumePlayer:1,
            loadedData:false
        }
    }

    ajaxRequestSong =(id)=> {
        let formData = new FormData();
        formData.append('action', 'get_song')
        formData.append('id', id);
        let initHeader = {
            method: 'GET',
            mode:'cors'
        }
        isoFetch(`http://geoiziskaniya.by/handlerMp3.php?action=${encodeURIComponent('get_song')}&id=${encodeURIComponent(id)}`, initHeader)
            .then(response => {
                return response
            })
            .then(data => data.blob())
            .then(data=> {
                return data
            })
            .then(data=> {
                let _url = URL.createObjectURL(data)
                this.palyer.src = _url
                this.successLoded()
            })
    }
    ajaxRequestImage =(id)=> {
        let formData_1 = new FormData();
        formData_1.append('action', 'get_image')
        formData_1.append('id', id);
        let initHeader_1 = {
            method: 'POST',
            body:formData_1,
            mode:'cors'
        }
        isoFetch(`http://geoiziskaniya.by/handlerImage.php?action=${encodeURIComponent('get_image')}&id=${encodeURIComponent(id)}`, initHeader_1)
            .then(response => {
                return response
            })
            .then(data => data.blob())
            .then(data=> {

                return data
            })
            .then(data=> {
                let _url = URL.createObjectURL(data)
                this.imgFilmCover.src = _url
            })
    }

    successLoded =()=> {
        this.setState({loadedData:true})
    }

    componentWillMount =()=> {
        let valueId = this.props.infoPlayer.id
        this.ajaxRequestSong(valueId);
        this.ajaxRequestImage(valueId)   
    }
    componentWillReceiveProps =(newProps)=> {
        if(newProps.infoPlayer.id != this.props.infoPlayer.id) {
            this.ajaxRequestSong(newProps.infoPlayer.id)
            this.ajaxRequestImage(newProps.infoPlayer.id)
            this.setState({valueProgressBar:0, plays:0, volumePlayer:1})
        }

        if(newProps.infoPlayer.playerState) {
            this.palyer.play()
        } else {
            this.palyer.pause()
        }
    }

    changeValueTimeSong =(e)=> {
        let precentValue = (e.target.value)/100;
        this.getCurrentTimeSong(precentValue)
        this.setState({valueProgressBar:e.target.value})
    }

    playStop =()=> {
        if(this.props.infoPlayer.playerState) {
            this.palyer.pause()
            this.props.dispatch(play_stop_song(this.props.infoPlayer.id, this.props.infoPlayer.name, this.props.infoPlayer.performer, false, this.props.infoPlayer.mode))
            
        } else {
            this.palyer.play()
            this.props.dispatch(play_stop_song(this.props.infoPlayer.id, this.props.infoPlayer.name, this.props.infoPlayer.performer, true, this.props.infoPlayer.mode))
        }
    }

    getCurrentTimeSong =(value)=> {
        this.palyer.currentTime=(this.palyer.duration)*value;
    }

    timeChange =()=> {
        let percent = (this.palyer.currentTime)/(this.palyer.duration);
        let value = 100*percent;

        let currentTimeMinute = Math.floor(this.palyer.currentTime/59);
        let currentTimeSecond = Math.ceil(this.palyer.currentTime%59);
        let formatSecondValue = this.roundingSeconds(currentTimeSecond)

        this.setState({valueProgressBar: value, currentTimeMinute:currentTimeMinute, currentTimeSecond:formatSecondValue})
    }

    roundingSeconds =(value)=> {
        if(value <= 9) {
            return '0'+ value;
        } else {
            if(value == 60) {
                return '00'
            }
            return value;
        }
    }
    setMetadata =()=> {
        let durationMinute = Math.floor(this.palyer.duration/60);
        let valueSecond = Math.ceil(this.palyer.duration%59);
        let durationSecond = this.roundingSeconds(valueSecond);
        this.setState({durationMinute: durationMinute, durationSecond: durationSecond})
        this.palyer.play()
    }

    endedTrack =()=> {
        this.props.dispatch(play_stop_song(this.props.infoPlayer.id, this.props.infoPlayer.name, this.props.infoPlayer.performer, false))
    }

    // methods for volume player
    disableVolume =()=> {
        if(this.palyer.volume) {
            this.palyer.volume = 0
            this.setState({volumePlayer:0})
        } else {
            this.palyer.volume = 1
            this.setState({volumePlayer:1})
        } 
    }

    changeVolume =(e)=> {
        let value = e.target.value/10;

        if(e.target.value) {
            this.palyer.volume = value
        }  
    }
    // methods for volume player


    //on next and previous track
    nextSong =()=> {
        this.palyer.pause();
        this.setState({valueProgressBar: 0, currentTimeMinute:0, currentTimeSecond:'00', loadedData:false})
        this.props.dispatch(next_song(this.props.infoPlayer.id))
    }

    previousSong =()=> {
        this.palyer.pause();
        this.setState({valueProgressBar: 0, currentTimeMinute:0, currentTimeSecond:'00', loadedData:false})
        this.props.dispatch(previous_song(this.props.infoPlayer.id))
    }
    //on next and previous track


    render(){
        console.log('render in Player')
        return(
            <div className="player">
                <div className="player__wrapper"> 
                    <div className={(this.state.loadedData) ? "player__control":"player__control_hidden"}>

                        <audio autoPlay className="player__audio-tag" onLoadedMetadata={this.setMetadata} onTimeUpdate={this.timeChange}  ref={(ref)=>{this.palyer = ref}} onEnded={this.endedTrack}></audio> :
                    
                        <button className="player-button previous_button" onClick={this.previousSong}><img className="player-image" src={previous_button} ></img></button>
                        <button className="player-button play_button" onClick={this.playStop}><img className="player-image"  src={(this.props.infoPlayer.playerState) ? stop_bitton : play_button}></img></button>
                        <button className="player-button" onClick={this.nextSong}><img className="player-image" src={next_button} ></img></button>

                        <span className= {(this.state.loadedData)? "player__current-time" : "player__current-time_hidden"}>{this.state.currentTimeMinute}:{this.state.currentTimeSecond}</span>
                            <div className={(this.state.loadedData) ? "rangebox" : "rangebox_hidden"}>
                                <input type="range" className="progressbar" ref={(ref)=>{this.progressBar = ref}}  onChange={this.changeValueTimeSong} value={(this.state.valueProgressBar) ? this.state.valueProgressBar : 0} min="0" max="100"></input>
                            </div>
                        <span className={(this.state.loadedData)?"player__duration" : "player__duration_hidden"}>{this.state.durationMinute}:{this.state.durationSecond}</span>   
                        
                    </div> 
                    <div className="wrapper-loader-song"><Preload active={this.state.loadedData}/></div>
                    
                    
                    <div className="player__info">
                        <div className="player__info--cover-film">
                            <img className="player__info--cover-film--img" ref={(ref)=>{this.imgFilmCover = ref}} src=""></img>
                        </div>
                        <div className="player__info--text">
                            <p className="player__info--text--name-song">{this.props.infoPlayer.name}</p>
                            <p className="player__info--text--performers">{this.props.infoPlayer.performer}</p>
                        </div>

                    </div>
                    <div className="player__volume">
                        <div className="player__volume--rangebox">
                            <input type="range" className="player__volume--rangebox--progressbar" onChange={this.changeVolume} min="0" max="10"></input>
                        </div>
                        <img className="player__volume--img" src={(this.state.volumePlayer) ? volum_button_3 : volum_button_0} onClick={this.disableVolume}></img>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = function(state) {
    return{
        infoPlayer: state.playSong
    }
}

export default connect(mapStateToProps)(Player)