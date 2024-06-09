import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux';
import thunk from "redux-thunk";
import rootReducer from './reducer';
import { composeWithDevToolsDevelopmentOnly } from '@redux-devtools/extension';

const store = createStore(
    rootReducer,
    composeWithDevToolsDevelopmentOnly(
        applyMiddleware(thunk),
    )
);

export default store;