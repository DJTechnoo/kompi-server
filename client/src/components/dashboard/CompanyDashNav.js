import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';


const CompanyDashNav = () => {
    

    const links = (
        <Fragment>
            <li>
                <Link to="/ansatte">Ansatte</Link>
            </li>
            <li>
                <Link to="/bank">Kompetansebank</Link>
            </li>
            <li>
                <Link to="/courses">Kurs</Link>
            </li>
            <li>
                <Link to="/task">Oppgaver</Link>
            </li>
        </Fragment>
    );

    return (
        
        <div className="navbar bg-primary">
            <ul>
                {links}
            </ul>
       </div>
    )
}

CompanyDashNav.defaultProps = {
    title: "Kompi",
    icon: "fas fa-id-card-alt"
};

export default CompanyDashNav;