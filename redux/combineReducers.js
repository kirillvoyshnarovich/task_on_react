import { combineReducers } from 'redux';
import galleryReducer from './reducers/galleryReducers.js'
import modeGalleryReducer from './reducers/modeGalleryReducer.js'
import playerReducer from './reducers/playerReducer.js'

// let combinedReducer = combineReducers({
//     data: galleryReducer(),
//     stateGallery: modeGalleryReducer(),
//     playSong: playerReducer
// });

const combinedReducer = (state = {}, action) => {
    const data = state.data
    return {
        data: galleryReducer(state.data, action),
        stateGallery: modeGalleryReducer(state.stateGallery, action),
        playSong: playerReducer(state.playSong, {...action, data})
    };
  };

export default combinedReducer;