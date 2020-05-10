import React, {Fragment} from 'react';
import TaskCreate from '../task/TaskCreate';
import Tasks from '../task/Task';


const CompanyTaskTab = () => { 
    
    return (   
        <Fragment>
            <TaskCreate/>
            <Tasks case="owner"/>
        </Fragment>
    );
}

export default CompanyTaskTab;