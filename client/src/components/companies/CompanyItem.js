import React, {useContext} from 'react';
import CompanyContext from '../../context/company/companyContext';
import { useHistory } from 'react-router-dom';
import Card from '../UI/Card';
import PropTypes from 'prop-types';

const CompanyItem = (props) => {
    const history = useHistory();
    const companyContext = useContext(CompanyContext);
    const {joinCompany, getCurrentCompany, getCompanyProfile} = companyContext;

    const join = () => {
        joinCompany(props.company._id);
    }

    const toDashboard = () => {
        getCurrentCompany(props.company._id);
        history.push("company-dashboard");
    }

    const toProfile = () => {
        getCompanyProfile(props.company._id);
        history.push("company-profile");
    }


    let output = null;
    switch (props.case ) {
        case "owner":
                output = <Card 
                    title={props.company.companyName}
                    text={"Eier: " + props.company.user.name}
                    click={toDashboard}
                    buttonName="Se dashbord"
                />
            break;
        case "employee":  
                output = <Card 
                    title={props.company.companyName}
                    click={toProfile}
                    buttonName="Mer"
                />      
            break;
    
        default: 
                output = <Card 
                    title={props.company.companyName}
                    text={"Eier: " + props.company.user.name}
                    click={join}
                    buttonName="Bli med"
                />
            break;
    }

    return (
        output
    )
};

CompanyItem.propTypes = {
    company: PropTypes.object
};

export default CompanyItem;
