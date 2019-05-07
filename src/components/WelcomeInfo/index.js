import React from 'react';
import PropTypes from 'prop-types'
import './style.scss';

const welcomeInfo = ({
                         header,
                         paragraph
                     }) => (
    <div className="welcome-info">
        <h2>{header}</h2>
        {paragraph && <p>{paragraph}</p>}
    </div>
);

welcomeInfo.propTypes = {
    header: PropTypes.string.isRequired,
    paragraph: PropTypes.string,
};

welcomeInfo.defaultProps = {
    paragraph: "",
};
export default welcomeInfo;