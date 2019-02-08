import {POST_FETCHED,POST_CREATED} from '../actions/types';

const initialState = {
    posts: [],
    post:{}
};

export default (state = initialState, action = {})=> {
    switch (action.type) {
        case POST_FETCHED:
            return {
                ...state,
                posts:action.posts
            };
        case POST_CREATED:
            return {
                ...state,
                post:action.post
            };
        default:
            return state;
    }
}