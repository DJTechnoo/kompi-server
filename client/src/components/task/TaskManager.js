import React, {Fragment} from 'react';
import TaskManagerItem from '../../components/task/TaskManagerItem';
import PropTypes from 'prop-types'; 

const TaskManager = (props) => { 


    return (  
        <Fragment>
        <h1 className="text-left">Oppgaver: </h1>
        <div className="flex-container">
        {(props.task.length > 0)? 
            (props.task.map(task => (
                <TaskManagerItem
                taskId={task._id}
                key={task.task._id}
                case={task.task.case}
                task={task.task}
                click={task.task.click}
                />
            )
        )) : (null)} 
        </div>
    </Fragment>
    );
}

TaskManager.propTypes = {
    task : PropTypes.array
}

export default TaskManager;