import React from 'react';
import PropTypes from 'prop-types'
import './style.scss';
import logo from "../../images/sw_logo.png"

const welcomeInfo = ({
                         header,
                         paragraph
                     }) => (
    <div className="welcome-info">
        <div className="welcome-info-fullwidth">
            <img className='logo' src={logo} title='star wars logo' alt="star wars logo"/>
        </div>
        {paragraph && <p>{paragraph}</p>}
    </div>
);

welcomeInfo.propTypes = {
    paragraph: PropTypes.string,
};

welcomeInfo.defaultProps = {
    paragraph: "",
};
export default welcomeInfo;