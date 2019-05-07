import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'

const row = ({
                 item,
                 config,
             }) => (
    <div className="table__tr"
    >
        {
            config.map(configObj => (
                    <div className="table__td"
                         key={configObj.id}>
                        {
                            configObj.type === 'text'
                                ?
                                item[configObj.field]
                                :
                                (
                                    <Link to={configObj.link + item.id}>{configObj.buttonText}</Link>
                                )
                        }

                    </div>
                )
            )
        }
    </div>
);

row.propTypes = {
    items: PropTypes.array,
    config: PropTypes.array
};

row.defaultProps = {
    items: [],
    config: []
};
export default row