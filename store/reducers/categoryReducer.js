import {CATEGORY_LIST_FETCHED} from '../actions/types';

const initialState = {
    pager: {},
};

export default (state = initialState, action = {})=> {
    switch (action.type) {
        case CATEGORY_LIST_FETCHED:
            return {
                ...state,
                pager:action.pager
            };

        default:
            return state;
    }
}