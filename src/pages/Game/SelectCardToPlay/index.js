import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {
    APP_STATES,
} from "../config";
import Cards from "../../../components/Cards/";
import connect from "react-redux/es/connect/connect";
import {fetchPlayerDeck, fetchPlayerCards,} from '../../../actions/Player'

import './style.scss';

class SelectCardToPlay extends Component {

    state = {
        allCards: [],
        playerCards: [],
        appState: APP_STATES.INIT,
        playerActive: 0,
        otherActive: 0,
    };

    componentDidMount() {
        const {
            dispatch,
            playerName
        } = this.props;
        dispatch(fetchPlayerCards(playerName));
        dispatch(fetchPlayerDeck(playerName));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.deck && nextProps.playerAllCards) {
            this.setState({
                allCards: nextProps.playerAllCards.sort((a, b) => b.attack - a.attack),
                playerCards: nextProps.deck.sort((a, b) => b.attack - a.attack),
                appState: APP_STATES.RESULTS,
            });
        } else if (nextProps.error !== null) {
            this.setState({
                appState: APP_STATES.ERROR
            })
        } else if (nextProps.loading) {
            this.setState({
                appState: APP_STATES.LOADING,
            });
        }
    }


    selectCard = (cardID) => {
        const selectedCardsArray = this.state.allCards;
        let playerCards = this.state.playerCards;
        const selectedCardsArrayLenght = this.state.allCards.length;
        for (let i = 0; i < selectedCardsArrayLenght; i++) {
            if (cardID === selectedCardsArray[i].id) {
                if (playerCards.length < 5) {
                    const selectedCard = selectedCardsArray[i];
                    selectedCardsArray.splice(i,1);
                    const checkForDuplicateOfCards = playerCards.find((element, index) => {
                        return playerCards[index].id === selectedCard.id
                    });
                    if (checkForDuplicateOfCards === undefined) {
                        playerCards.push(selectedCard);
                        this.setState({
                            playerCards: playerCards,
                            allCards: selectedCardsArray,
                        });
                    } else {
                        alert('You have this card already')
                    }
                    break;
                } else {
                    alert('You can have only 5 cards')
                }
            }
        }
        this.state.playerCards.sort((a, b) => b.attack - a.attack);
        this.state.allCards.sort((a, b) => b.attack - a.attack);
    };

    removeCard = (cardID) => {
        let removedCardsArray = this.state.playerCards;
        let removedCard;
        const removedCardsArrayLenght = this.state.playerCards.length;
        for (let i = 0; i < removedCardsArrayLenght; i++) {
            if (cardID === removedCardsArray[i].id) {
                removedCard = removedCardsArray[i];
                removedCardsArray.splice(i, 1);
                break;
            }
        }
        this.setState({
            deck: removedCardsArray,
            allCards: [...this.state.allCards, removedCard]
        })
    };

    render() {

        const {
            appState,
            allCards,
            playerCards,
            playerActive,
            otherActive,
        } = this.state;

        console.log(allCards);

        return (
            <Fragment>
                {
                    appState === APP_STATES.LOADING &&
                    <h1 className="color-white">Loading. Please wait.</h1>
                }
                {
                    appState === APP_STATES.RESULTS &&
                    <Fragment>
                        <h1 className='color-white'>
                            Choose your cards
                        </h1>
                        <div className="card__boards">
                            <h2 className="color-yellow">
                                Your current deck
                            </h2>

                            <Cards
                                deck={playerCards}
                                action={this.removeCard}
                                nameClass="selected__cards min-height-300"
                                active={playerActive}
                            />
                            <h2 className='color-yellow'>
                                Your all cards
                            </h2>
                            <Cards
                                deck={allCards}
                                action={this.selectCard}
                                nameClass="ava__player__cards"
                                active={otherActive}
                            />

                        </div>
                    </Fragment>
                }
                {
                    appState === APP_STATES.ERROR &&
                    <h1 className='color-white'>
                        {this.props.error.message}
                    </h1>
                }
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    playerAllCards: state.data.playerAllCards,
    deck: state.data.deck,
    loading: state.loading,
    error: state.error,
});
SelectCardToPlay.propTypes = {
    playerName: PropTypes.string,
};

export default connect(mapStateToProps)(SelectCardToPlay);
