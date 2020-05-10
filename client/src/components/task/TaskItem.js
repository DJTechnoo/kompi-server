import React from 'react';
import Card from '../UI/Card';

const TaskItem = (props) => {

    let output = null;
    switch (props.case ) {
        case "owner":
                output = <Card 
                title={props.task.taskName}
                text={"Beskrivelse: " + props.task.description}
                date={"Dato: " + props.task.date}
                status={"Status: " + props.task.status}
                arg={{name: props.task.taskName, id: props.task._id}}
                buttonName={props.buttonName}
                click={props.click}
            />
            break;
        case "ansatt":  
                output = <Card 
                    title={props.task.taskName}
                    text={"Employee Beskrivelse: " + props.task.description}
                />      
            break;
    
        default: 
                output = <Card 
                    title={props.task.taskName}
                    text={"Beskrivelse: " + props.task.description}
                />
            break;
    }

    return (
        output
    )
};

export default TaskItem;