import React from 'react';

const SelectCardsInfo = () => (
    <div className="container mt--50">
        <p>
            Now you have to choose five cards for your deck, which will be used to play the
            game. <br/>
            The "<span className='color-yellow'>PLAY</span>" button saves the last used player
            deck. <br/>
            The "<span className='color-yellow'>GO BACK</span>" button will move the player to
            the main game menu
        </p>
        <p>
            Selecting the cards to the deck consists in clicking on the card from the field
            "<span className='color-yellow'>YOUR ALL CARDS</span>"
        </p>
        <p>
            Each card in the deck must be unique
        </p>
        <p>
            The required number of cards in the deck is 5
        </p>
        <p>
            When the player selects the same card again, or tries to select more than 5 cards,
            the game will display an alert
        </p>
    </div>
);

export default SelectCardsInfo;