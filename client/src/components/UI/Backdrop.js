import React from 'react';
import PropTypes from 'prop-types';

const Backdrop = (props) => {
    if(props.show) return <div className='Backdrop' onClick={props.clicked}></div>
    return null;
}

Backdrop.propTypes = {
    show : PropTypes.bool,
    clicked : PropTypes.func
}

export default Backdrop;