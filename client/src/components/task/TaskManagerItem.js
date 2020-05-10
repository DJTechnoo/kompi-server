import React, {useContext} from 'react';
import TaskCard from './TaskCard';
import ProfileContext from '../../context/profile/profileContext';


const TaskManagerItem = (props) => {
    const profileContext = useContext(ProfileContext);
    const { removeTaskFromProfile } = profileContext;

    const leaveTask = () => {
        removeTaskFromProfile(props.task._id);
    }

 
    return (
        <TaskCard 
            title={props.task.taskName}
            text={"Beskrivelse: " + props.task.description}
            date={"Dato: " + props.task.date}
            status={"Status: " + props.task.status}
            team={props.task.employees}
            id={props.task._id}
            arg={{name: props.task.taskName, id: props.task._id}}
            buttonName="Fjern"
            click={leaveTask}
        />
    )
};

export default TaskManagerItem;