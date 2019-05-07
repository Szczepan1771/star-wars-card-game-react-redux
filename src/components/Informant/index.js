import React from 'react';
import connect from "react-redux/es/connect/connect";

const Informant = ({
                credits,
                won,
                percentWon
                   }) =>(
    <div className='informant'>
        <p className='credits'>Credits: {credits}$</p>
        <p className='number-winnings'>Won: {won}</p>
        <p className='percent-winnings'>Percent winnings: {percentWon}%</p>
    </div>
);

const mapStateToProps = state =>({
    credits: state.data.credits,
    won: state.data.won,
    percentWon: state.data.percentWon,
    store: state.data,
});

export default connect(mapStateToProps)(Informant);