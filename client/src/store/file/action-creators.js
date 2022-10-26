import {actionTypes} from "./action-types";

export const setFiles = (files) => ({
    type: actionTypes.SET_FILES,
    payload: files
})
export const setCurrentDir = (dir) => ({
    type: actionTypes.SET_CURRENT_DIR,
    payload: dir
})
export const setParentDir = (id) => ({
    type: actionTypes.SET_PARENT_DIR,
    payload: id,
})
export const addFile = (files) => ({
    type: actionTypes.ADD_FILE,
    payload: files
})
export const deleteFileAction = (dirId) => ({
    type: actionTypes.DELETE_FILE,
    payload: dirId
})