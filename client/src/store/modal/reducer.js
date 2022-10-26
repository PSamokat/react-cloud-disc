import {actionTypes} from './action-types'

const defaultState = {
    modalDisplay: 'none'
}

export default function reducer (state = defaultState, action) {
    switch (action.type) {
        case actionTypes.SET_MODAL_DISPLAY :
            return {...state, modalDisplay: action.payload}
        default :
            return state
    }
}
