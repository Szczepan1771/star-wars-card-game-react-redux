import React from 'react';
import GameModeAndOpponent from "../../../../components/GameModeAndOpponent";
import {GAME_MODE_ARRAY} from "../../config";

const BeforeSelectMode = () => (
    <div className="container mt--50 center">
        <p className="fullwidth">
            The next step is to choose the game mode. <br/>
            We can choose between a simple "<span className='color-yellow'>battle</span>" and a
            more complex "<span className='color-yellow'>heroic battle</span>" mode.
        </p>
        <GameModeAndOpponent
            config={GAME_MODE_ARRAY}
        />
    </div>
);

export default BeforeSelectMode;