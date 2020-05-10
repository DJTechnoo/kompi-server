import React, {Fragment, useContext, useEffect, useState} from 'react';
import CourseContext from '../../context/course/courseContext';
import CourseCreate from '../courses/CourseCreate';
import Courses from '../courses/Courses';

const CompanyCourseTab = () => { 
    const courseContext = useContext(CourseContext);
    const [showForm, changeShowForm] = useState(false);


    useEffect(() => {
        changeShowForm(false);
        // eslint-disable-next-line
    }, [courseContext.courses]);


    const clickHandler = () => {
        changeShowForm(true);
    }

    return (   
        <Fragment>
            <button onClick={clickHandler}>Nytt kurs</button>
            {showForm ? <CourseCreate/> : null}
            <Courses case="owner"/>
        </Fragment>
    );
}

export default CompanyCourseTab;