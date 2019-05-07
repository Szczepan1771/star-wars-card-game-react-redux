import React from 'react';
import PropTypes from 'prop-types';

const avatar = ({
    avatar
                }) => (
    <img className='avatar'
         src={avatar}
         title='star wars'
         alt="star wars"/>
);

avatar.propTypes = {
    avatar: PropTypes.string.isRequired
};

export default avatar;