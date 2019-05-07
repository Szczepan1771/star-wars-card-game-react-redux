import React from 'react';
import Cards from "../../../../components/Cards";
import {CARDS_EXAMPLE} from "../config";
import Attack from "../../../../images/icons/light-sabers.png";
import Defence from "../../../../images/icons/shield.png";
import HealtPower from "../../../../images/icons/hearts.png";

const BeforeSelectCards = () => (
    <div className="container mt--50">
        <p>
            At this stage, you will learn what the particular icons of the playing cards
            mean, <br/>
            and what fraction the particular card belongs to
        </p>
        <div className="fullwidth">
            <Cards deck={CARDS_EXAMPLE}/>
        </div>
        <ul className="legend">
            Icons descriptions
            <li className='attack'>
                <img className='attack-icon' src={Attack} alt="attack icon"/>
                <span> - The number of card attacks</span>
            </li>
            <li className='defence'>
                <img className='attack-icon' src={Defence} alt="defence icon"/>
                <span> - The number of card defence</span>
            </li>
            <li className='health'>
                <img className='attack-icon' src={HealtPower} alt="health icon"/>
                <span> - The number of card health</span>
            </li>
            <li className='fraction'>
                                        <span className='color-yellow'>
                                        REBELS, JEDI, SITH, BOUNTY HUNTERS
                                        </span>
                <span> - The name of the fraction from the card comes from</span>
            </li>
        </ul>
    </div>
);

export default BeforeSelectCards;