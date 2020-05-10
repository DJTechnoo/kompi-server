import React, {Fragment, useContext, useEffect} from 'react';
import TaskContext from '../../context/task/taskContext';
import TaskItem from '../../components/task/TaskItem';
import CompanyContext from '../../context/company/companyContext';
import PropTypes from 'prop-types';

const Tasks = (props) => { 
    const taskContext = useContext(TaskContext);
    const companyContext = useContext(CompanyContext);
    const {tasks, getCompanyTasks} = taskContext;

    useEffect(() => {
        if(companyContext.currentCompany !== null)getCompanyTasks(companyContext.currentCompany._id);
        // eslint-disable-next-line
    }, [companyContext.currentCompany]); 

    return (   
        <Fragment>
            <h1 className="text-left">Oppgaver: </h1>
            <div className="flex-container">
            {(tasks.length > 0)? 
                (tasks.map(task => (
                        <TaskItem 
                        key={task._id} 
                        case={props.case} 
                        task={task} 
                        click={props.click}
                        buttonName={props.buttonName}
                        />
            )
           )) : (null)} 
            </div>
       
        </Fragment>
    );
}

Tasks.propTypes = {
    case : PropTypes.string,
    click : PropTypes.func,
    buttonName : PropTypes.string
}

export default Tasks;