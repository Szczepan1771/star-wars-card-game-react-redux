import {applyMiddleware, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import {composeWithDevTools} from 'redux-devtools-extension';
import {dataReducer} from '../reducers'

export default createStore(
    dataReducer,
    composeWithDevTools(
        applyMiddleware(thunkMiddleware)
    )
);
