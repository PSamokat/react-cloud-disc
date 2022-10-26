import {actionTypes} from "./action-types";

export const setUser = user => ({
    type: actionTypes.SET_USER,
    payload: user
})
export const logout = () => ({
    type: actionTypes.LOGOUT
})