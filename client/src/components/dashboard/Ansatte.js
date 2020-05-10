import React, {useContext, useState} from 'react';
import CompanyContext from '../../context/company/companyContext';
import CourseContext from '../../context/course/courseContext';
import ProfileLink from '../profile/ProfileLink';
import Courses from '../courses/Courses';
import Card from '../UI/Card';



const Ansatte = () => {

    // * Use state for Modal
    const companyContext = useContext(CompanyContext);
    const courseContext = useContext(CourseContext);
    const [selectedEmployees, setSelectedEmployees] = useState([]);  // For selecting
    const [selectedCourses, setSelectedCourses] = useState([]); // for selecting
    const {currentCompany} = companyContext;


    const addSelectedEmployees = user => {
        for(let i = 0; i< selectedEmployees.length; i++)
        if(selectedEmployees[i].id === user.id)
            return;

        setSelectedEmployees([...selectedEmployees, user]);
    }

    const addSelectedCourses = course => {
        for(let i = 0; i< selectedCourses.length; i++)
        if(selectedCourses[i].id === course.id)
            return;

        setSelectedCourses([...selectedCourses, course]);
    }

    const assertCourses = () => {
        let employeeIds = selectedEmployees.map(a => a.id);
        let courseIds = selectedCourses.map(a => a.id);
        courseContext.assertCourses(employeeIds, {courseIDs: courseIds});
    }
    
    

    return (<div>
        <div className="flex-container">
       
        {currentCompany != null ?
            currentCompany.ansatte.map(user => (
                <div key={user.user._id}>
                    <Card 
                        title={user.user.name} 
                        click={addSelectedEmployees}
                        buttonName="Legg til liste"
                        arg={{name: user.user.name, id: user.user._id}}
                    >
                        <button className="btn btn-dark btn-sm"><ProfileLink user={user.user}>
                            <p>Se Profil</p>
                        </ProfileLink></button>
                    </Card>
                </div>
            )) : null
        }
        </div>  

        <div className="card half">
            {selectedEmployees.length > 0 ?
            selectedEmployees.map(user => (
            <div key={user.id}>  
                <p>Navn: {user.name} </p>

            </div>
                )) : <h4>Ingen valgte personer</h4>       
            }
           
        </div>

        <Courses 
            case="owner" 
            buttonName="Legg til liste"
            click={addSelectedCourses}
        />

        <div className="card half">
            {selectedCourses.length > 0 ?
            selectedCourses.map(course => (
            <div key={course.id}>  
                <p>kurs: {course.name} </p>
            </div>
                )) : <h4>Ingen valgte kurs</h4>       
            }
        </div>
        <button onClick={assertCourses}>Assert</button>
    </div>)
}

export default Ansatte;