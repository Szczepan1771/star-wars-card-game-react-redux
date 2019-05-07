import React from 'react';
import "./styles.scss";
import PropTypes from 'prop-types';

const GameModeAndOpponent2 = ({ config, action }) =>(
    config.map(gameMode =>(
        <div
            className='game_container'
            key={gameMode.id}
            id={`opponent-${gameMode.id}`}
            onClick={()=>
                action(gameMode.id, gameMode.dbName)
            }
        >
            <h2>{gameMode.name}</h2>
            <img src={gameMode.url} alt=""/>
        </div>
    ))
);

GameModeAndOpponent2.propTypes = {
    config: PropTypes.array,
    selectGameModeFunc: PropTypes.func
};

GameModeAndOpponent2.defaultProps = {
    config: [],
    action: () => {
    }
};

export default GameModeAndOpponent2;