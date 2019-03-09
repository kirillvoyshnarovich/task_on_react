import { CREATE_LIST, CHANGE_RATING, RESET_RATING } from '../actions.js'
const initState = {
    data: [],
}

function galleryReducer(state=initState.data, action) {
    switch(action.type) {
        case CREATE_LIST: {
            let arrSong = action.listData.dataSong;
            return arrSong;
        }
        case CHANGE_RATING: {

            let newState = [...state]
            let newList = newState.map(item => {
                if(item.id_year == action.id) {
                    let newItem = {...item}
                    newItem.counter_like = item.counter_like+1
                    return newItem
                }else {
                    return item
                }
            })

            return newList
        }
        case RESET_RATING: {
            let newState = [...state]
            let newList = newState.map(item => {
                if(item.id_year == action.id) {
                    let newItem = {...item}
                    newItem.counter_like = item.counter_like-1
                    return newItem
                }else {
                    return item
                }
            })
            return newList
        }
        default:
            return state;
    }

}

export default galleryReducer;