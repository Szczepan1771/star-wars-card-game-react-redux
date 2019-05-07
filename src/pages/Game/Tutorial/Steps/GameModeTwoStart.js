import React from 'react';

const GameModeTwoStart = () => (
    <div className="container mt--50 center">
        <h1 className='color-white'>
            HOW TO PLAY HEROIC BATTLE
        </h1>
        <p className="fullwidth">
            In the "<span className="color-yellow">
                                        Heroic battle mode</span>",
            player selects the card in the same way (clicking any to the left).
        </p>
        <p>
            In the first place the defense of the opponent is decreasing to zero, then the
            level of
            health points<br/>
            after each turn, if the card has an health points it goes back to the deck and
            can be used
            again,<br/> if the health points is equal to zero, the card is removed from the
            game.
        </p>
        <br/>
        <p>
            The one who has the card wins. <br/>
            <span className='color-yellow'>
                                            GOOD LUCK!
                                        </span>
        </p>
    </div>
);

export default GameModeTwoStart;