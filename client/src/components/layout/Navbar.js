import React, {Fragment, useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import ProfileContext from '../../context/profile/profileContext';
import CompanyContext from '../../context/company/companyContext';

const Navbar = (props) => {
    const authContext = useContext(AuthContext);
    // Necessary to clear profile
    const profileContext = useContext(ProfileContext); 
    // to clear on logout
    const companyContext = useContext(CompanyContext); 

    const {isAuthenticated, logout, loading, loadUser} = authContext;
    const {clearProfile} = profileContext;
    const {clearCompany} = companyContext;

    useEffect(() => {
        loadUser();
        // eslint-disable-next-line
    }, []);

    const logOutAndClearProfile = () => {
        clearProfile();
        clearCompany();
        logout();
    }

    const authLinks = (
        <Fragment>
            <li>
                <Link to="/dashboard">Min profil</Link>
            </li>
            <li>
                <Link to="/">Bli bedrift eier</Link>
            </li>
            <li>
                <Link to="/companies">Bedrifter</Link>
            </li>
            <li>
                <a onClick={logOutAndClearProfile} href="#!">
                    <i className="fas fa-sign-out-alt"/>
                    Logg ut
                </a>
            </li>
            
        </Fragment>
    );

    const guestLinks = (
        <Fragment>
            <li>
                <Link to="/login">Logg inn</Link>
            </li>
            <li>
                <Link to="/register">Registrer</Link>
            </li>
        </Fragment>
    );

    return (
        <div className="navbar bg-primary">
            <h1>
                <i className={props.icon}> {props.title}</i>
            </h1>
            <ul>

                {!loading && (<Fragment>
                    {isAuthenticated? authLinks : guestLinks}
                </Fragment>)}
            </ul>
        </div>
    )
}

Navbar.defaultProps = {
    title: "Kompi",
    icon: "fab fa-korvue"
};

export default Navbar;