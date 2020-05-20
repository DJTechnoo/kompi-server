import React, {useContext, useEffect, useState} from 'react';
import CompanyContext from '../../../context/company/companyContext';
import ProfileContext from '../../../context/profile/profileContext';
import SkillItem from './SkillItem';
import Tasks from '../../task/Task';
import Modal from '../../UI/Modal';
import ProfileLink from '../../profile/ProfileLink';
import Card from '../../UI/Card';
import TaskContext from '../../../context/task/taskContext';
import {VictoryBar, VictoryChart} from 'victory';


const Bank = () => {

 
    // * Use state for Modal
    const [showModal, setModal] = useState(false);
    const [currentSkill, setCurrentSkill] = useState("");
    const [selected, setSelected] = useState([]);  // For when the owner assigns tasks to selected employees
    const [selectedTask, setSelectedTask] = useState(null);
    const companyContext = useContext(CompanyContext);
    const taskContext = useContext(TaskContext);
    const profileContext = useContext(ProfileContext);
    const {
        getBank, 
        getGraphData, 
        graphData, 
        bank, 
        getBankEmployees, 
        employees,
        competencies,
        getCompetencies} = companyContext;
  

    useEffect(() => {
        getBank();
        getGraphData();
        // eslint-disable-next-line
    }, []);


    const modalOn = () => {
        setModal(true);
    }

    const modalOff = () => {
        setModal(false);
    }

    const addSelected = user => {
        for(let i = 0; i< selected.length; i++)
            if(selected[i].id === user.id)
                return;

            setSelected([...selected, user]);
        
       
    }

    const updateSelectedTask = task => {
        setSelectedTask(task);
    }


    // Used to show competencies of a skill category.

    const updateCurrentSkill = skill => {  
        setCurrentSkill(skill);
    }


    // Selected employees is assigned the selected task
    const assertTask = () => {
        let employeeNames = selected.map(a => a.name);
        let employeeIDs = selected.map(a => a.id);
        if(selected.length > 0 && selectedTask !== null){
            taskContext.addEmployee(selectedTask.id, employeeNames);
            profileContext.sendTask(selectedTask.id, employeeIDs)
        }

    }

    return (
    <div><div>
        <p>Her får du oversikt over all kompetansene i bedriften.</p>
        <p>Her kan du velge ansatte som settes på en oppgave.</p>
        {graphData.length > 0 ? (
            <VictoryChart domainPadding={20}>
                <VictoryBar
                    data={graphData}
                    x="skill"
                    y="employee_count"
                />
            </VictoryChart>
        ) : null}

        <div className="flex-container">
        {bank != null ?
            bank.map(skill => (
                <SkillItem 
                    key={skill.skill} 
                    skill={skill} 
                    getEmployees={getBankEmployees}
                    showModal={modalOn}
                    updateSkill={updateCurrentSkill}
                />
            )) : null
        }
        </div>

        <Modal show={showModal} clicked={modalOff} >
            {employees.length > 0 ?
                employees.map(user => (
                    <div key={user._id}>
                        <Card 
                            title={user.name} 
                            click={addSelected}
                            buttonName="Legg til oppdrag"
                            arg={{name: user.name, id: user._id}}
                        >
                            <button className="btn btn-dark btn-sm"><ProfileLink user={user}>
                                <p>Se Profil</p>
                            </ProfileLink></button>
                            <button
                                className="btn btn-dark btn-sm"
                                onClick={() => getCompetencies(user._id, currentSkill)}
                            >
                                Kompetanser
                            </button>
                        </Card>
                    </div>
                )) : null
            }
            <h3>kompetanser</h3>
            {
                competencies.map((c, i) => (<p key={i}>{c}</p>))
            }
        </Modal>
        </div>
            
        <div className="card half">
            {selected.length > 0 ?
            selected.map(user => (
            <div key={user.id}>  
                <p>Navn: {user.name} </p>
            </div>
                )
                ) : <h4>Ingen valgte personer</h4>
                
            }
        </div>

        <Tasks case="owner" buttonName="Velg" click={updateSelectedTask}/>
        {selectedTask !== null ? (
            <div className="card half">
                <h2>Valgt Oppgave</h2>
                <p>{selectedTask.name}</p>
            </div>
        ) :(null)}
        <button onClick={assertTask}>Send Oppdrag</button>

    </div>)
}


export default Bank;