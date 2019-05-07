import React from 'react';
import Header from './header';
import Content from './content'
import PropTypes from 'prop-types'
import './style.scss';

const table = ({
                   items,
                   config
               }) => (
    <div className="table">
        <Header config={config}/>
        <Content items={items}
                 config={config}
        />
    </div>
);

table.propTypes = {
    items: PropTypes.array,
    config: PropTypes.array
};

table.defaultProps = {
    items: [],
    config: []
};
export default table;