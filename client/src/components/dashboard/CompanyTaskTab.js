import React, {Fragment, useContext, useEffect} from 'react';
import TaskContext from '../../context/task/taskContext';
import TaskItem from '../../components/task/TaskItem';
import CompanyContext from '../../context/company/companyContext';
import TaskCreate from '../task/TaskCreate';
import Tasks from '../task/Task';


const CompanyTaskTab = (props) => { 
    const taskContext = useContext(TaskContext);
    const companyContext = useContext(CompanyContext);
    const {getCompanyTasks} = taskContext;

    /*useEffect(() => {
        getCompanyTasks(companyContext.currentCompany._id);
        // eslint-disable-next-line
    }, []);*/
    
    return (   
        <Fragment>
            <TaskCreate/>
            <Tasks case="owner"/>
        </Fragment>
    );
}

export default CompanyTaskTab;