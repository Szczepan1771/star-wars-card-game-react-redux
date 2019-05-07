import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const button = ({
                    text,
                    action,
                    id,
                    className
                }) => (
    <button className={className} onClick={action} id={id}>
        {text}
    </button>);

button.propTypes = {
    text: PropTypes.string.isRequired,
    action: PropTypes.func,
    id: PropTypes.string,
    className: PropTypes.string,
};

button.defaultProps = {
    action: () => {},
    id: '',
    className: 'btn',
};

export default button;
