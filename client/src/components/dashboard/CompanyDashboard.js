import React, { Fragment, useContext, useEffect } from 'react';
import ProfileContext from '../../context/profile/profileContext';
// import AuthContext from '../../context/auth/authContext';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import About from '../../components/pages/About';
import Bank from '../companies/bank/Bank';
import Ansatte from '../dashboard/Ansatte';
import CompanyDashNav from './CompanyDashNav';
import CompanyCourseTab from './CompanyCourseTab';

const CompanyDashboard = () => {

    const {getCurrentProfile, loading, profile} = useContext(ProfileContext);
    // const {user} = useContext(AuthContext);

    useEffect(() => {
        getCurrentProfile();
        // eslint-disable-next-line
    }, []);
    
    return loading? <p>Loading...</p> :
        <Router>
        <Fragment>
            <h1>Bedrift Dashboard</h1>
            {profile !== null?
                <Fragment> 

                    
                    <CompanyDashNav/>
                    <div className="container">
                    <Switch>
                        <Route exact path="/courses" component={CompanyCourseTab}/>
                        <Route exact path="/bank" component={Bank}/>
                        <Route exact path="/ansatte" component={Ansatte}/>
                    </Switch>
                    </div>
                </Fragment>:
                <Fragment>
                    <p>Opprett profil først</p>
                    <Link to="create-profile" className="btn btn-primary">Opprett</Link>
                </Fragment>}

        </Fragment>
        </Router>

}



export default CompanyDashboard