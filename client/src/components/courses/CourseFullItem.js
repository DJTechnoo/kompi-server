import React from 'react';
import PropTypes from 'prop-types';

const CourseFullItem = (props) => {


    return (<div className="card bg-light">
        <h1>{props.course.name}</h1>
        <p>{props.course.description}</p>

        <h3>Oppnåelige kompetanser</h3>
        {
            
                props.course.competencies.map((competency, index) => (
                <div key={index}>  
                    <p>Område: {competency.skill} </p>
                    <p>Kompetanse: {competency.competency} </p>
                </div>) )   
                
        }

        {props.buttonClick ?(
            <button onClick={() => props.buttonClick(props.arg)}>{props.buttonName}</button>
        ): null}

    </div>);
}

CourseFullItem.propTypes = {
    course : PropTypes.object,
    buttonClick : PropTypes.func,
    buttonName : PropTypes.string,
    arg : PropTypes.object
}

export default CourseFullItem;