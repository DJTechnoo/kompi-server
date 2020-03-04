import {
    GET_PROFILE,
    GET_USER_PROFILE,
    PROFILE_ERROR,
    CLEAR_PROFILE,
    CREATE_PROFILE
} from '../types';

export default (state, action) => {

    switch(action.type){

        case GET_USER_PROFILE:
            return {
                ...state,
                userProfile: action.payload,
                error: null,
                loading: false
            }
        case CREATE_PROFILE:
        case GET_PROFILE:
            return {
                ...state, 
                profile: action.payload,
                error: null,
                loading: false
            }
        case PROFILE_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false,
                profile: null
            }
        case CLEAR_PROFILE: 
            return {
                ...state,
                profile: null,
                profiles: [],
                loading: false,
                error: null
            };
        default:
            return state;
    }
}