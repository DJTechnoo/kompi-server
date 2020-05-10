import React, {useReducer} from 'react';
import axios from 'axios';
import ProfileContext from './profileContext';
import profileReducer from './profileReducer';
import {
    GET_PROFILE,
    GET_USER_PROFILE,
    PROFILE_ERROR,
    CLEAR_PROFILE,
    CREATE_PROFILE,
    REMOVE_TASK_FROM_PROFILE,
    COMPLETE_COURSE
} from '../types';

const ProfileState = props => {
    const initialState = {
            profile: null,
            userProfile: null, // someone else's profile
            profiles: [],
            company: null,
            loading: true,
            error: {}
    };

    const [state, dispatch] = useReducer(profileReducer, initialState);

    const getCurrentProfile = async () => {
        
        try {
            const res = await axios.get("/api/profile/me");
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: PROFILE_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            });
        }
    }


    const completeCourse = async id => {
        try {
            const res = await axios.put(`/api/profile/completecourse/${id}`);
            dispatch({
                type: COMPLETE_COURSE,
                payload: res.data
            });
           
        }catch(err) {
            dispatch({
                type: PROFILE_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            });
        }
    }


    const getUserProfile = async id => {
        
        try {
            const res = await axios.get(`/api/profile/user/${id}`);
            dispatch({
                type: GET_USER_PROFILE,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: PROFILE_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            });
        }
    }

    const createProfile = async profileData => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        try {
            const res = await axios.post("/api/profile", profileData, config);
            dispatch({
                type: CREATE_PROFILE,
                payload: res.data
            });

        } catch (err) {
            dispatch({
                type: PROFILE_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            });
        }
    }

    const sendTask = async (taskId, employeeIDs) => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        try {
            let body = {employeeIDs : employeeIDs};
            const res = await axios.put(`api/profile/task/${taskId}`, body, config);
            
        } catch (err) {
            dispatch({
                type: PROFILE_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            });
        }
        
    }


    const sendCompetenciesToCompanies = async (skills, companyIDs) => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        try {

            let body = {skill : skills};
            let res = await Promise.all(
                companyIDs.map(async companyID => {
                  let skillRes = await axios.post(`api/skills/skillify/${companyID}`, body, config);
                  return skillRes;
                })
              ); 
            
        } catch (err) {
            dispatch({
                type: PROFILE_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            });
        }
        
    }

    
    //REMOVE_TASK

    const removeTaskFromProfile = async (id) => {
        
        try {
            const res = await axios.put(`/api/profile/removetask/${id}`);
            dispatch({
                type: REMOVE_TASK_FROM_PROFILE,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: PROFILE_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            });
        }
        
    }

    const clearProfile = () => {
        dispatch({type: CLEAR_PROFILE});
    }


    // GET Profiles

    return (
        <ProfileContext.Provider 
        value={{
            profile: state.profile,
            profiles: state.profiles,
            loading: state.loading,
            userProfile: state.userProfile,

            getCurrentProfile,
            getUserProfile,
            clearProfile,
            createProfile,
            completeCourse,
            sendTask,
            removeTaskFromProfile,
            sendCompetenciesToCompanies
        }}>
            {props.children}
        </ProfileContext.Provider>
    );
};

export default ProfileState;