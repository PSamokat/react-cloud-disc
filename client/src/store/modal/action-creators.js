import {actionTypes} from "./action-types";

export const setModalDisplay = (display) => {
    return {
        type: actionTypes.SET_MODAL_DISPLAY,
        payload: display
    }
}