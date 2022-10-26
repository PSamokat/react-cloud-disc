import {actionTypes} from './action-types'

const defaultState = {
    files: [],
    currentDir: null,
    parentDir: '',
}

export default function reducer (state = defaultState, action) {
    switch (action.type) {
        case actionTypes.SET_FILES:
            return {...state, files: action.payload}
        case actionTypes.SET_CURRENT_DIR:
            return {...state, currentDir: action.payload}
        case actionTypes.SET_PARENT_DIR:
            return {...state, parentDir: action.payload}
        case actionTypes.ADD_FILE:
            return {...state, files: [...state.files, action.payload]}
        case actionTypes.DELETE_FILE:
            return {...state, files: [...state.files.filter(file => file._id != action.payload)]}
        default:
            return state
    }
}
