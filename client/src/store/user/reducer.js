import {actionTypes} from './action-types'

const defaultState = {
    currentUser: {},
    isAuth: false
}

export default function reducer (state = defaultState, action) {
    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                ...state,
                currentUser: action.payload.user,
                isAuth: true
            }
        case actionTypes.LOGOUT:
            localStorage.removeItem('token')
            return  {
                ...state,
                currentUser: {},
                isAuth: false
            }
        default:
            return state
    }
}
