import {combineReducers} from 'redux';
import authReducer from './authReducer';
import postReducer from './postReducer';
import categoryReducer from './categoryReducer';

export default combineReducers({
    authReducer,
    categoryReducer,
    postReducer
})