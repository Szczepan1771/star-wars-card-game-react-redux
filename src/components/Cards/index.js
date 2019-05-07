import React from 'react';
import PropTypes from "prop-types"
import Card from '../../components/Card';
import './style.scss';

const SelectedCards = ({
                           deck,
                           action,
                           nameClass,
                           credits,
                       }) => (
    <div className={nameClass + ' selectedCards'}>
            {deck.map((card,index) => {
                    const {
                        id,
                        name,
                        fraction,
                        defence,
                        health,
                        attack,
                        avatar,
                        value,
                        isSelected
                    } = card;
                    return (
                        <Card
                            key={id}
                            name={name}
                            attack={attack}
                            defence={defence}
                            selectTheCard={action}
                            id={id}
                            avatar={avatar}
                            value={value}
                            fraction={fraction}
                            health={health}
                            isSelected={isSelected}
                            positionNumber={index}
                        />
                    )
                }
            )}
        {/*<div className='credits'>*/}
            {/*{credits ? <h1 className='color-white'>*/}
                {/*credits: {credits}$</h1> : null}*/}
        {/*</div>*/}
    </div>
);

SelectedCards.propTypes = {
    deck: PropTypes.array.isRequired,
    action: PropTypes.func,
    nameClass: PropTypes.string,
    credits: PropTypes.number,
};

SelectedCards.defaultProps = {
    nameClass: "all__player__cards",
    credits: 0,
};

export default SelectedCards;