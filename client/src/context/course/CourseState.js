import React, {useReducer} from 'react';
import axios from 'axios';
import CourseContext from './courseContext';
import courseReducer from './courseReducer';
import {
    ADD_COURSE,
    GET_COMPANY_COURSES,
    ERR_COURSE
    
} from '../types';

const CourseState = props => {
    const initialState = {
        course: null,
        courses: [],
        loading: true
    };

    const [state, dispatch] = useReducer(courseReducer, initialState);

    
    // ADD COURSE
    const addCourse = async courseFields => {
        const config = {
            headers: {
                "Content-Type" : "application/json"
            }
        };

        try {
            const res = await axios.post("/api/courses", courseFields, config);
            dispatch({
                type: ADD_COURSE,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: ERR_COURSE,
                payload: err.response.msg
            });
        }
    }


    const getCompanyCourses = async companyId => {
        
        try {
            const res = await axios.get(`/api/courses/company/${companyId}`);
            console.log("Get courses");
            dispatch({
                type: GET_COMPANY_COURSES,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: ERR_COURSE,
                payload: err.response.msg
            });
        }
    }


    const assertCourses = async (employees,courses) => {
        const config = {
            headers: {
                "Content-Type" : "application/json"
            }
        };
        
        try {
           
            let res = await Promise.all(
                employees.map(async employee => {
                  let empRes = await axios.post(`/api/courses/assign/${employee}`, courses, config);
                  return empRes;
                })
              );
            
        } catch (err) {
            dispatch({
                type: ERR_COURSE,
                payload: err.response.msg
            });
        }
    }


    const takeCourse = async (courseID) => {
        
        try {

            let empRes = await axios.post(`/api/courses/take/${courseID}`);     
            
        } catch (err) {
            dispatch({
                type: ERR_COURSE,
                payload: err.response.msg
            });
        }
    }





    return (
        <CourseContext.Provider 
        value={{
            course: state.course,
            courses: state.courses,
            loading: state.loading,

            addCourse,
            assertCourses,
            getCompanyCourses,
            takeCourse
        }}>
            {props.children}
        </CourseContext.Provider>
    );
};

export default CourseState;