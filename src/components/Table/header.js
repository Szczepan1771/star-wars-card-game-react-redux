import React from 'react';
import PropTypes from 'prop-types';

const header = ({
                    config
                }) => (
    <div className="table__header">
        {config.map(value => {
            const {
                id,
                text
            } = value;
            return (
                <div key={id}
                     className="table__th">
                    {text}
                </div>
            )
        })}
    </div>
);

header.propTypes = {
    config: PropTypes.array
};

header.defaultProps = {
    config: []
};

export default header;


