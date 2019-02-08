import {USER_LOGGED_IN,USER_LOGGED_OUT} from '../actions/types';

const initialState = {
    isAuthenticated: false,
    token:null,
    userInfo:null,
};

export default (state = initialState, action = {})=> {
    switch (action.type) {
        case USER_LOGGED_IN:
            return {
                isAuthenticated:action.payload.token!=null,
                token:action.payload.token,
                userInfo:action.payload.userInfo
            };
        case USER_LOGGED_OUT:
            return {
                isAuthenticated:false,
                token:null,
                userInfo:null
            };
        default:
            return state;
    }
}
