import {
    ADD_TASK,
    GET_TASK,
    GET_COMPANY_TASKS,
    GET_USER_TASKS,
    ADD_EMPLOYEE,
    ERR_TASK
} from '../types';

export default (state, action) => {
    switch(action.type){
        case GET_TASK:
        case GET_COMPANY_TASKS:
        case GET_USER_TASKS:
            return {
                ...state,
                tasks: [...action.payload]
            }
        case ADD_TASK:
            return {
                ...state,
                tasks: [...state.tasks, action.payload]
            }
        default:
            return state;
    }
}