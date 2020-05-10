import React, {Fragment, useContext, useEffect} from 'react';
import CourseContext from '../../context/course/courseContext';
import CourseItem from '../../components/courses/CourseItem';
import CompanyContext from '../../context/company/companyContext';
import PropTypes from 'prop-types';


const Courses = (props) => { 
    const courseContext = useContext(CourseContext);
    const companyContext = useContext(CompanyContext);
    const {courses, getCompanyCourses} = courseContext;

    useEffect(() => {
        if(companyContext.currentCompany !== null)getCompanyCourses(companyContext.currentCompany._id);
        // eslint-disable-next-line
    }, [companyContext.currentCompany]);


    return (   
        <Fragment>
            <div className="flex-container">
            {courses.map(course => (
            <CourseItem 
                key={course._id} 
                case={props.case} 
                course={course} 
                buttonName={props.buttonName}
                click={props.click}
                />
            ))}
            </div>
        </Fragment>
    );
}

Courses.propTypes = {
    case : PropTypes.string,
    buttonName : PropTypes.string,
    click : PropTypes.func
}

export default Courses;