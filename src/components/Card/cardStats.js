import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import Attack from "../../images/icons/light-sabers.png"
import Defence from "../../images/icons/shield.png";
import HealtPower from "../../images/icons/hearts.png";

const cardStats = ({
                       attack,
                       defence,
                       name,
                       fraction,
                       health,
                       isSelected
                   }) => (
    <Fragment>
        <h2 className="card__name">
            {name}
        </h2>
        <img className='attack-icon' src={Attack} alt=""/>
        <p className="card__attack">
             {attack}
        </p>
        <img className={`defence-icon${isSelected==='__decrease-defence'? isSelected: ''}${isSelected==='__after-attack'? isSelected: ''}`} src={Defence} alt=""/>
        <p
            className={`card__defence${isSelected==='__decrease-defence'? isSelected: ''}${isSelected==='__after-attack'? isSelected: ''}`}
        >
             {defence}
        </p>
        <img className={`hp-icon${isSelected==='__decrease-defence'? isSelected: ''}${isSelected==='__after-attack'? isSelected: ''}`} src={HealtPower} alt=""/>
        <p
            className={`card__health${isSelected==='__decrease-defence'? isSelected: ''}${isSelected==='__after-attack'? isSelected: ''}`}
        >
             {health}
        </p>
    </Fragment>
);

cardStats.propTypes = {
    name: PropTypes.string.isRequired,
    attack: PropTypes.number.isRequired,
    defence: PropTypes.number.isRequired,
    health: PropTypes.number.isRequired
};

export default cardStats;