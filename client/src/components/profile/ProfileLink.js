import React from 'react';
import PropTypes from 'prop-types';

const ProfileLink = props => {

    const click = () => {
        const url = `http://localhost:3000/profile/${props.user._id}`;
        window.open(url, '_blank');
    }

    return (
        <div onClick={click}>
            {props.children}
        </div>
    );
}

ProfileLink.propTypes = {
    user : PropTypes.object
}

export default ProfileLink;