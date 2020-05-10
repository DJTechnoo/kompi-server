import React, {useReducer} from 'react';
import axios from 'axios';
import TaskContext from './taskContext';
import taskReducer from './taskReducer';
import {
    ADD_TASK,
    UPDATE_TASK_STATUS,
    DELETE_TASK,
    FINISH_TASK,
    GET_COMPANY_TASKS,
    GET_USER_TASKS,
    ERR_TASK
} from '../types';

const TaskState = props => {
    const initialState = {
        task: null,
        tasks: [],
        loading: true
    };

    const [state, dispatch] = useReducer(taskReducer, initialState);

    
    // ADD TASK
    const addTask = async taskFields => {
        const config = {
            headers: {
                "Content-Type" : "application/json"
            }
        };

        try {
            const res = await axios.post("/api/task", taskFields, config);
            dispatch({
                type: ADD_TASK,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: ERR_TASK,
                payload: err.response.msg
            });
        }
    }

    //UPDATE_TASK_STATUS
    
    const updateTaskStatus = async (id, statusUpdate) => {
        const config = {
            headers: {
                "Content-Type" : "application/json"
            }
        };
       
        try {
            let body = {status: statusUpdate};
            const res = await axios.put(`/api/task/update/${id}`, body, config);
            dispatch({
                type: UPDATE_TASK_STATUS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: ERR_TASK,
                payload: err.response.msg
            });
        }
    }
    
    //FINISH_TASK

    const finishTask = async taskFields => {
        const config = {
            headers: {
                "Content-Type" : "application/json"
            }
        };

        try {
            const res = await axios.post("/api/task", taskFields, config);
            dispatch({
                type: FINISH_TASK,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: ERR_TASK,
                payload: err.response.msg
            });
        }
    }



    //REMOVE_TASK

    const deleteTask = async (id) => {
        
        try {
            const res = await axios.delete(`/api/task/deleteTask/${id}`)
            dispatch({
                type: DELETE_TASK,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: ERR_TASK,
                payload: err.response.msg
            });
        }
    }


    // ADD EMPLOYEE TO TASK
    const addEmployee = async (id, employees) => {
        const config = {
            headers: {
                "Content-Type" : "application/json"
            }
        };

        try {
            let body = {employees: employees};
            console.log(body);
            const res = await axios.put(`/api/task/join/${id}`, body, config);
           /* dispatch({
                type: ADD_EMPLOYEE,
                payload: res.data
            });*/
        } catch (err) {
            dispatch({
                type: ERR_TASK,
                payload: err.response.msg
            });
        }
    }

    // GET SPECIFIED COMPANY'S TASKS

const getCompanyTasks = async companyId => {
        
    try {
        const res = await axios.get(`/api/task/company/${companyId}`);
        dispatch({
            type: GET_COMPANY_TASKS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: ERR_TASK,
            payload: err.response.msg
        });
    }
}


    // GET SPECIFIED USER'S TASKS

const getUserTasks = async employee => {


    try {
        console.log(employee);
        const res = await axios.get(`/api/task/user/${employee}`);
        dispatch({
            type: GET_USER_TASKS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: ERR_TASK,
            payload: err.response.msg
        });
    }
}

    return (
        <TaskContext.Provider 
        value={{
            task: state.task,
            tasks: state.tasks,
            loading: state.loading,
            employee: state.employee,
        
            addTask,
            updateTaskStatus,
            finishTask,
            deleteTask,
            addEmployee,
            getCompanyTasks,
            getUserTasks
        }}>
            {props.children}
        </TaskContext.Provider>
    );
};

export default TaskState;