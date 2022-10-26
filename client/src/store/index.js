import {applyMiddleware, combineReducers, createStore} from 'redux'
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import UserReducer from "./user/reducer";
import FileReducer from "./file/reducer";
import ModalReducer from "./modal/reducer";

const rootReducer = combineReducers({
    user: UserReducer,
    file: FileReducer,
    display: ModalReducer,
})


export const store = createStore(rootReducer, composeWithDevTools((applyMiddleware(thunk))))
