import React, {Fragment} from 'react';
import TaskCreate from '../task/TaskCreate';
import Tasks from '../task/Task';


const CompanyTaskTab = () => { 
    
    return (   
        <Fragment>
            <p>Her oppretter du oppgaver, og ser hvilke som finnes, med status.</p>
            <p>Ansatte som arbeider med oppgavene kan oppdatere status.</p>
            <TaskCreate/>
            <Tasks case="owner"/>
        </Fragment>
    );
}

export default CompanyTaskTab;