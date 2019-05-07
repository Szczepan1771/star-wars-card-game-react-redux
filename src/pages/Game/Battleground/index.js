import React from 'react';
import PropTypes from 'prop-types'
import Card from '../../../components/Card'
import './style.scss';

const battleground = ({
                          playerCard,
                          opponentCard,
                          temporaryChoosenCard,
                          temporaryOpponentCard,
                          isVisible,
                          className
                      }) => (
    <div className={className}>
        <div className='player'>
            {playerCard.name ?
                <Card
                    name={playerCard.name}
                    attack={playerCard.attack}
                    defence={playerCard.defence}
                    selectTheCard={playerCard.action}
                    id={playerCard.id}
                    avatar={playerCard.avatar}
                    value={playerCard.value}
                    fraction={playerCard.fraction}
                    health={playerCard.health}
                    key={playerCard.id}
                />
                :
                <Card
                    name={temporaryChoosenCard.name}
                    attack={temporaryChoosenCard.attack}
                    defence={temporaryChoosenCard.defence}
                    selectTheCard={temporaryChoosenCard.action}
                    id={temporaryChoosenCard.id}
                    avatar={temporaryChoosenCard.avatar}
                    value={temporaryChoosenCard.value}
                    fraction={temporaryChoosenCard.fraction}
                    health={temporaryChoosenCard.health}
                    isSelected={temporaryChoosenCard.isSelected}
                    key={temporaryChoosenCard.id}
                />
            }
        </div>
        <div className="vs">
            <h1 className='color-orange'>
                V.S
            </h1>
        </div>
        <div className='opponent'>
            {opponentCard.name ?
                <Card
                    name={opponentCard.name}
                    attack={opponentCard.attack}
                    defence={opponentCard.defence}
                    selectTheCard={opponentCard.action}
                    id={opponentCard.id}
                    avatar={opponentCard.avatar}
                    value={opponentCard.value}
                    fraction={opponentCard.fraction}
                    health={opponentCard.health}
                    key={opponentCard.id}
                    isVisible={false}
                />
                :
                <Card
                    name={temporaryOpponentCard.name}
                    attack={temporaryOpponentCard.attack}
                    defence={temporaryOpponentCard.defence}
                    selectTheCard={temporaryOpponentCard.action}
                    id={temporaryOpponentCard.id}
                    avatar={temporaryOpponentCard.avatar}
                    value={temporaryOpponentCard.value}
                    fraction={temporaryOpponentCard.fraction}
                    health={temporaryOpponentCard.health}
                    isSelected={temporaryOpponentCard.isSelected}
                    key={temporaryOpponentCard.id}
                    isVisible={isVisible}
                />
            }
        </div>
    </div>
);


battleground.propTypes = {
    playerCard: PropTypes.object,
    opponentCard: PropTypes.object.isRequired,
    className: PropTypes.string,
    temporaryChoosenCard: PropTypes.object,
    temporaryOpponentCard: PropTypes.object,
};

battleground.defaultProps = {
    playerCard: {},
    className: 'battleground',
    temporaryChoosenCard: {
        name:'',
        attack:0,
        defence:0,
        selectTheCard: '',
        id: '',
        avatar: '',
        value:'',
        fraction:'',
        health:0,
        isSelected:'',
        key:'',
        isVisible:'',
    },
    temporaryOpponentCard: {
        name:'',
        attack:0,
        defence: 0,
        selectTheCard: '',
        id: '',
        avatar: '',
        value:'',
        fraction:'',
        health:0,
        isSelected:'',
        key:'',
        isVisible:'',
    },
};


export default battleground;