const CREATE_LIST = "CREATE_LIST";

const PLAY_STOP_SONG = "PLAY_STOP_SONG";
const NEXT_SONG = "NEXT_SONG";
const PREVIOUS_SONG = "PREVIOUS_SONG";
const STOP_SONG = "STOP_SONG";

const CHANGE_RATING = 'CHANGE_RATING';
const RESET_RATING = 'RESET_RATING';


const create_list = function(data) {
    return{
        type: CREATE_LIST,
        listData:data
    }
}


const play_stop_song = function(idSong, nameSong, performerSong, playingSong, modePlayer) {
    return{
        type: PLAY_STOP_SONG,
        id:idSong,
        name:nameSong,
        performer:performerSong,
        playing:playingSong,
        mode:modePlayer
    }
}

const stop_song = function(idSong, playingSong) {
    return{
        type: STOP_SONG,
        id:idSong,
        playing:playingSong,
    }
}

const next_song = function(idSong) {
    return{
        type: NEXT_SONG,
        id: idSong
    }
}

const previous_song = function(idSong) {
    return{
        type: PREVIOUS_SONG,
        id: idSong
    }
}



const change_rating = function(idSong) {
    return{
        type: CHANGE_RATING,
        id: idSong
    }
}

const reset_rating = function(idSong) {
    return{
        type: RESET_RATING,
        id: idSong
    }
}



export {
    create_list, play_stop_song, next_song, previous_song, change_rating, stop_song, reset_rating,
    CREATE_LIST, PLAY_STOP_SONG, NEXT_SONG, PREVIOUS_SONG, CHANGE_RATING, STOP_SONG, RESET_RATING
}