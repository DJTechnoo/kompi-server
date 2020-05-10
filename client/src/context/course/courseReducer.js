import {
    ADD_COURSE,
    GET_COMPANY_COURSES
} from '../types';

export default (state, action) => {
    switch(action.type){
        case GET_COMPANY_COURSES:
            return {
                ...state,
                courses: [...action.payload]
            }
        case ADD_COURSE:
            return {
                ...state,
                courses: [...state.courses, action.payload]
            }
        default:
            return state;
    }
}