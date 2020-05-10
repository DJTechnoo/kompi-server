import React, { Fragment, useContext, useEffect } from 'react';
import ProfileContext from '../../context/profile/profileContext';
import TaskContext from '../../context/task/taskContext';
import AuthContext from '../../context/auth/authContext';
import {Link} from 'react-router-dom';
import CourseFullItem from '../courses/CourseFullItem';
import DashboardActions from './DashboardActions';
import Competencies from '../competencies/Competencies';
import TaskManager from '../task/TaskManager';


const Dashboard = () => {
    const {getCurrentProfile, loading, profile, completeCourse, sendCompetenciesToCompanies} = useContext(ProfileContext);
    const {user} = useContext(AuthContext);
    const {tasks} = useContext(TaskContext)

    
    useEffect(() => {
        getCurrentProfile();
        console.log("Profile Runs");
        // eslint-disable-next-line
    }, []);  
    
    const sendCompetencies = () => {
        let skills = profile.competencies.map(a => a.skill);
        let companies = profile.companies.map(a => a.company);
        sendCompetenciesToCompanies(skills, companies);
    }

    return loading? <p>Loading...</p> :
          
        <Fragment>
            {profile !== null?
                <Fragment> 
                    <div>
                        <div className="card profile-width rounded">
                        <p style={{color: "red"}}>Du har opprettet en profil.</p>
                        <img src="https://image.shutterstock.com/image-vector/example-stamp-600w-426673501.jpg" className="w3-round" alt="Norway"></img>
                        <h2>{user && user.name}</h2>
                        <p><i className="fa fa-briefcase fa-fw text-primary"></i> {profile && profile.title} </p>
                        <p><i className="fa fa-envelope fa-fw text-primary"></i> {user && user.email} </p>
                        <h4>Bio</h4>
                        <p> {profile && profile.bio} </p>
                        </div>
                    </div>

                    <div>
                        <TaskManager 
                        task={profile && profile.tasks}
                        />
                    </div>

                    <div>
                        <Competencies competencies={profile.competencies} />
                        <button onClick={sendCompetencies}>Send kompetanser</button>
                    </div>
                   
                    <p>Kontoen din ble opprettet:   {user && user.date} </p>
                    
                    <div>
                        {profile.currentCourses.length > 0 ?
                            profile.currentCourses.map((course, index) => (
                            <div key={index}>  
                                <CourseFullItem 
                                    course={course} 
                                    buttonClick={completeCourse} 
                                    arg={course._id}
                                    buttonName="Fullfør"
                                    />
                            </div>
                                )) : <h4>Ingen kurs</h4>       
                            }
                    </div>
                
                </Fragment>:
                <Fragment>
                    <p style={{color: "red"}}>Opprett profil først</p>
                    <Link to="create-profile" className="btn btn-primary">Opprett</Link>
                </Fragment>}
                <Fragment>
                    <DashboardActions/>
                </Fragment>


        </Fragment>
}

export default Dashboard