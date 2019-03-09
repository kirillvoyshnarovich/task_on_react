import React from 'react';

import { play_stop_song } from '../redux/actions.js';

import Transition from 'react-transition-group/Transition'

import { connect } from 'react-redux';

import play_button_hover from './fonts/icon/play-button-hover.svg';
import pause_button_hover from './fonts/icon/pause-button-hover.svg';

import { NavLink } from 'react-router-dom';

import Rating from './Rating.jsx';

import './Item.scss'

class Item extends React.Component {

    constructor(props, context) {
        super(props, context)

        this.state ={
            active:false,
            activeButton:false
        }
    }

    componentWillMount =()=> {

        if((this.props.statePlayer.id == this.props.object.id_year && this.props.statePlayer.playerState)){
            this.setState({active: true, activeButton:true})
        }
    }

    componentWillReceiveProps =(newProps)=> {
        if((newProps.statePlayer.id != this.props.object.id_year) && this.state.active) {
            this.setState({active: false, activeButton:false})
        } else if(newProps.statePlayer.id == this.props.object.id_year && this.state.active==false) {
            this.setState({active: true, activeButton:newProps.statePlayer.playerState})
        } else if(newProps.statePlayer.id == this.props.object.id_year && newProps.statePlayer.playerState != this.props.statePlayer.playerState) {
            this.setState({activeButton:newProps.statePlayer.playerState})
        }

    }

    turnPlayer =(e)=> {
        if(this.props.statePlayer.playerState) {
            this.setState({activeButton: false})
            this.props.dispatch(play_stop_song (this.props.object.id_year, this.props.object.name_song, this.props.object.performers, false, 'multiple'))
        } else {
            this.setState({activeButton: true})
            this.props.dispatch(play_stop_song (this.props.object.id_year, this.props.object.name_song, this.props.object.performers, true, 'multiple'))
        }   
    }


    shouldComponentUpdate =(newProps)=> {
        if((newProps.object != this.props.object)){

            return true
        } else if ((newProps.statePlayer.id == this.props.object.id_year)){

            return true
        }  else if((newProps.statePlayer.id != this.props.object.id_year) && this.state.active) {
            return true

        } else {
            return false
        }

    }

    
    render() {
        console.log("render in Item")
        return(
        <Transition in={true} timeout={2000}>

        {(state)=>{
            return <div className={(this.props.mode == 1) ? "gallery-wrapper__info-song" : "gallery-wrapper__info-song_mode-1"} style={(this.state.active) ? {background: 'rgba(135, 208, 245, 0.2)'} : {background: undefined}}>
                    {<div  className="gallery-wrapper__info-song--button" onClick={this.turnPlayer}><img className="gallery-wrapper__info-song--button--img" src={(this.state.activeButton) ? pause_button_hover : play_button_hover}></img></div>}

                    <div className="gallery-wrapper__info-song--picture">
                        <img className="gallery-wrapper__info-song--picture--img" src={"http://geoiziskaniya.by/data/"+this.props.object.id_year+'/'+this.props.object.id_year+'.jpg'}></img>
                    </div>
                    <div className="gallery-wrapper__info-song--basic-info">
                        <div className="gallery-wrapper__info-song--name">
                            {this.props.object.name_song}
                        </div>
                        <div className="gallery-wrapper__info-song--performers">
                            {this.props.object.performers}
                    </div>
                    </div>
                    <div className="gallery-wrapper__info-song--name-film">
                        <span className="category">film:</span>
                        {this.props.object.name_film}
                    </div>
                    <Rating id={this.props.object.id_year} rating={this.props.object.counter_like}/>
                    <div className="gallery-wrapper__info-song--about">
                        <NavLink className="gallery-wrapper__info-song--about--link" key={this.props.object.counter_like} to={"/info-song/"+(this.props.object.id_year)}  style={{ textDecoration: 'none' }}>
                            about
                        </NavLink>
                    </div>
            </div>
            }}
        </Transition>
        )

    }
}

const mapStateToProps = function(state) {
    return{
        statePlayer:state.playSong
    }
}

export default connect(mapStateToProps)(Item);
