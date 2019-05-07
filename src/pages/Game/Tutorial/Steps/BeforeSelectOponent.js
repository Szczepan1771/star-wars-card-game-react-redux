import React from 'react';
import GameModeAndOpponent from "../../../../components/GameModeAndOpponent";
import {OPPONENT_FRACTION_ARRAY} from "../../config";

const BeforeSelectOponent = () => (
    <div className="container mt--50">
        <p>

            At this stage you can choose which opponent you want to face,<br/> as part of the
            tutorial it
            will be "<span className='color-yellow'>JEDI</span>"
        </p>
        <GameModeAndOpponent
            config={OPPONENT_FRACTION_ARRAY}
        />
    </div>
);

export default BeforeSelectOponent;