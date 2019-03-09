import { PLAY_STOP_SONG, NEXT_SONG, PREVIOUS_SONG, STOP_SONG} from '../actions.js';
import { connect } from 'react-redux';

const initPlayer ={
    id:0,
    name:0,
    performer:0,
    playerState:false,
    playerMode:'multiple'
}

function playerReducer(state=initPlayer, action) {
    const data = action.data;
    switch(action.type) {
        case PLAY_STOP_SONG: {
            let newState = {...state}
            newState.id = action.id;
            newState.name = action.name;
            newState.performer = action.performer;
            newState.playerState = action.playing;
            newState.playerMode = action.mode;
            console.log("ReducerforPlayer")
            console.log(newState)
            return newState;
        }
        case NEXT_SONG: {
            let idNextSong = action.id+1;
            var newState = {...state}

            let currentSong = data.filter(function(number) {
                return idNextSong == number.id_year
            })
            newState.id = currentSong[0].id_year;
            newState.name = currentSong[0].name_song;
            newState.performer = currentSong[0].performers;
            newState.playerState = true;
            newState.playerMode = "multiple";
            console.log('next_song in playerReducer')
            console.log(newState)
            return newState;

        }
        case PREVIOUS_SONG: {
            let idPreviousSong = action.id-1;
            let newState = {...state}
            let currentSong = data.filter(function(number) {
                return idPreviousSong == number.id_year
            })
            newState.id = currentSong[0].id_year;
            newState.name = currentSong[0].name_song;
            newState.performer = currentSong[0].performers;
            newState.playerState = true;
            newState.playerMode = "multiple";

            console.log('next_song in playerReducer')
            console.log(newState)
            return newState;
        }
        case STOP_SONG:{
            let newState = {...state}
            newState.playerState = action.playing;
        }



        default:
            return state;
    }
}

export default playerReducer;
