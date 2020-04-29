import React, { Fragment, useContext, useEffect } from 'react';
import ProfileContext from '../../context/profile/profileContext';
import TaskContext from '../../context/task/taskContext';
import AuthContext from '../../context/auth/authContext';
import {Link} from 'react-router-dom';
import CourseFullItem from '../courses/CourseFullItem';
import DashboardActions from './DashboardActions';


const Dashboard = () => {

    const {getCurrentProfile, loading, profile, completeCourse} = useContext(ProfileContext);
    const {user} = useContext(AuthContext);
    //const taskContext = useContext(TaskContext);
    //const {task, getCompanyTasks} = taskContext;    

    useEffect(() => {
        getCurrentProfile();
        // eslint-disable-next-line
    }, [profile]);           

    return loading? <p>Loading...</p> :
          
        <Fragment>
            {profile !== null?
                <Fragment> 
                    <div className="card Half">
                    <p style={{color: "red"}}>Du har opprettet en profil.</p>
                    <img src="https://image.shutterstock.com/image-vector/example-stamp-600w-426673501.jpg" className="w3-round" alt="Norway"></img>
                    <h2>{user && user.name}</h2>
                    <p><i className="fa fa-briefcase fa-fw w3-margin-right w3-large w3-text-teal"></i> {profile && profile.title} </p>
                    <p><i className="fa fa-envelope fa-fw w3-margin-right w3-large w3-text-teal"></i> {user && user.email} </p>
                   

                    </div>
                
                    <div className="card Half">
                    <h4>Bio</h4>
                    <p>                     {profile && profile.bio}</p>
                    </div>

                               
                    <div className="card Half bio">
                    <p>Kompetanse:             {profile && profile.skills}</p>
                    <p>Erfaringer:              {profile && profile.experiences}</p>  
                    </div>

                    <div className="date">
                    <p>Kontoen din ble laget:   {user && user.date} </p>
                    </div>
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