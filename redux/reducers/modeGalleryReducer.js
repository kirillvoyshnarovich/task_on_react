import { CHANGE_MODE_GALLERY, CHANGE_SORT_GALLERY, CHANGE_CURRENT_PAGE} from '../actions.js'
const initState = {
    modeGallery:1,
    currentPage:0
}

function modeGalleryReducer(state=initState, action) {
    switch(action.type) {
        case CHANGE_MODE_GALLERY: {
            let newMode = {...state}
            newMode.modeGallery = action.mode
            return newMode;
        }
        case CHANGE_SORT_GALLERY: {
            let newMode = {...state}
            newMode.modeSort = action.mode
            return newMode;
        }
        case CHANGE_CURRENT_PAGE: {
            let newMode = {...state}
            newMode.currentPage = action.curPage
            return newMode;
        }
        
        default:
            return state;
    }

}

export default modeGalleryReducer;