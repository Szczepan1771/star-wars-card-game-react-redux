import React from 'react';
import PropTypes from 'prop-types';
import Row from './row';

const content = ({
                     items,
                     config
                 }) => (
    <div className="table__content">
        {
            items.map((item, index) => (
                    <Row item={item}
                         key={index}
                         config={config}
                         />
                )
            )
        }
    </div>
);

content.propTypes = {
    items: PropTypes.array,
    config: PropTypes.array
};

content.defaultProps = {
    items: [],
    config: []
};
export default content;


