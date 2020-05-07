import React, {useContext} from 'react';
import { useHistory } from 'react-router-dom';
import TaskCard from './TaskCard';
import TaskContext from '../../context/task/taskContext';


const TaskManagerItem = (props) => {

    const leaveTask = () => {
        console.log("FDSA")
    }

    return (
        <div>
   <TaskCard 
        title={props.task.taskName}
        text={"Beskrivelse: " + props.task.description}
        date={"Dato: " + props.task.date}
        status={"Status: " + props.task.status}
        id={props.task._id}
        arg={{name: props.task.taskName, id: props.task._id}}
        buttonName="Fjern"
        click={leaveTask}
    />
    </div>
    )
};

export default TaskManagerItem;