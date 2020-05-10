import React , {useState, useContext}  from 'react';
import TaskContext from '../../context/task/taskContext';
import { PromiseProvider } from 'mongoose';


const TaskCard = ({title, text, date, status, click, buttonName, children, id, arg, team}) => {
    const taskContext = useContext(TaskContext);
    const {updateTaskStatus} = taskContext;

    const onChange = e => setBody({ ...body, [e.target.name]: e.target.value });

    const [ body, setBody] = useState({
        newStatus: ''
    });

    const {newStatus} = body;


    const onSubmitHandler = (e) => {
       e.preventDefault();
        updateTaskStatus(id,body.newStatus);
        console.log(id,body.newStatus);
    }

    const clickHandler = () => {
        if (click)
            if(arg) 
                click(arg);
            else click();
    }

    return (
        <div className="card bg-light half rounded">
        <h3>{title}</h3>
        <p>{text}</p>
        <h4>Team</h4>
            {team.map((member, i) => (<p key={i}>{member}</p>))}
        <h5>{date}</h5>
        <h5>{status}</h5>
        <form onSubmit={onSubmitHandler}>
                <input 
                    type="text" 
                    name="newStatus"
                    onChange={onChange}
                    value={body.newStatus}
                    placeholder="Ny Status?"
                />
                <input type="submit" value="Oppdater Status" className="btn btn-dark btn-sm"
                />
            </form>
        <button onClick={clickHandler} className="btn btn-dark btn-sm">{buttonName}</button>
        {children}
       
        </div>
        
    )
}

export default TaskCard;