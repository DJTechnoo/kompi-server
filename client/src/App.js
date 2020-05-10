import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './components/layout/Navbar';

// Pages
import Home from './components/pages/Home';
import CreateCompany from './components/pages/CreateCompany';
import Dashboard from './components/profile/Dashboard';
import ProfileCreate from './components/pages/ProfileCreate';
import CompanyLists from './components/companies/CompanyLists';
import CompanyDashboard from './components/dashboard/CompanyDashboard';
import CompanyProfile from './components/companies/CompanyProfile';

import PrivateRoute from './components/routing/PrivateRoute';
import CompanyState from './context/company/CompanyState';
import CourseState from './context/course/CourseState';
import AuthState from './context/auth/AuthState';
import ProfileState from './context/profile/profileState';
import TaskState from './context/task/taskState';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import setAuthToken from "./utils/setAuthToken";


import './App.css';
import ShowProfile from './components/profile/ShowProfile';

if(localStorage.token){
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
    <ProfileState>
    <CompanyState>
    <CourseState>
    <TaskState>
    <Router>
      <div className="App">
        <Navbar/>
        <div className="container">
          <Switch>
            <PrivateRoute exact path="/" component={Home}/>
            <PrivateRoute exact path="/companies" component={CompanyLists}/>
            <PrivateRoute exact path="/companies/make" component={CreateCompany}/>
            <PrivateRoute exact path="/dashboard" component={Dashboard}/>
            <PrivateRoute exact path="/create-profile" component={ProfileCreate}/>
            <PrivateRoute exact path="/company-dashboard" component={CompanyDashboard}/>
            <PrivateRoute exact path="/company-profile" component={CompanyProfile}/>
            <Route exact path="/profile/:user" component={ShowProfile}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/login" component={Login}/>
          </Switch>
        </div>
      </div>
    </Router>
    </TaskState>
    </CourseState>
    </CompanyState>
    </ProfileState>
    </AuthState>
  );
}

export default App;
