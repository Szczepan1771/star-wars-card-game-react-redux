import React, {Component, Fragment} from 'react';
import {
    APP_STATES
} from "../config";
import Cards from "../../../components/Cards/";
import Button from '../../../components/Button';
import connect from "react-redux/es/connect/connect";
import {fetchData} from '../../../actions/Shop';
import { fetchPlayerCards, savePlayerCards, savePlayerStats } from '../../../actions/Player';
import './style.scss';

class Shop extends Component {

    state = {
        allCards: [],
        playerCards: [],
        credits: this.props.credits,
        appState: APP_STATES.INIT,
        playerActive: 0,
        otherActive: 0
    };

    componentDidMount() {
        const {
            dispatch,
            playerName
        } = this.props;
        dispatch(fetchData());
        dispatch(fetchPlayerCards(playerName));
    };


    componentWillReceiveProps(nextProps) {
        if (nextProps.playerAllCards && nextProps.allCards) {
            this.setState({
                allCards: nextProps.allCards,
                playerCards: nextProps.playerAllCards,
                credits: nextProps.credits,
                appState: APP_STATES.RESULTS,
            });
            this.state.playerCards.sort((a, b) => b.attack - a.attack);
        } else if (nextProps.error !== null) {
            this.setState({
                appState: APP_STATES.ERROR
            })
        } else {
            this.setState({
                appState: APP_STATES.LOADING,
            });
        }
    }

    selectCard = (cardID) => {
        const selectedCardsArray = this.state.allCards;
        let playerCards = this.state.playerCards;
        let credits = this.state.credits;
        let value;
        const selectedCardsArrayLenght = this.state.allCards.length;

        for (let i = 0; i < selectedCardsArrayLenght; i++) {
            if (cardID === selectedCardsArray[i].id) {
                const selectedCard = selectedCardsArray[i];
                if (credits >= selectedCard.value) {
                    value = selectedCard.value;
                    const checkForDuplicateOfCards = playerCards.find((element, index) => {
                        return playerCards[index].id === selectedCard.id
                    });
                    if (checkForDuplicateOfCards === undefined) {
                        playerCards.push(selectedCard);
                        this.setState({
                            playerCards: playerCards,
                            credits: credits - value,
                        });
                    } else {
                        alert('You have this card already')
                    }
                    break;
                } else {
                    alert("You don't have enough money");
                    selectedCardsArray.push(selectedCard);
                    return
                }
            }
        }
        this.props.dispatch(savePlayerStats(this.props.playerName, this.state.credits))
    };

    removeCard = (cardID) => {
        let removedCardsArray = this.state.playerCards;
        let value;
        const credits = this.state.credits;
        const removedCardsArrayLenght = this.state.playerCards.length;
        for (let i = 0; i < removedCardsArrayLenght; i++) {
            if (cardID === removedCardsArray[i].id) {
                const removedCard = removedCardsArray.splice(i, 1);
                value = removedCard[0].value;
                break;
            }
        }

        removedCardsArray.sort((a, b) => b.attack - a.attack);
        this.setState({
            playerCards: removedCardsArray,
            credits: credits + value,
        });

        this.props.dispatch(savePlayerStats(this.props.playerName, this.state.credits))
    };

    saveCardsAndGoBack = () => {
        this.props.dispatch(savePlayerCards(this.props.playerName, this.state.credits));
        this.props.goBackToStart();
    };

    render() {
        const {
            appState,
            allCards,
            playerCards,
            credits,
            playerActive,
            otherActive
        } = this.state;

        console.log(this.state.credits);

        return (
            <Fragment>
                {
                    appState === APP_STATES.LOADING &&
                    <h1 className="color-white">Loading. Please wait.</h1>
                }
                {
                    appState === APP_STATES.RESULTS &&
                    <Fragment>
                        <Button text="Save your deck" action={() =>
                            this.saveCardsAndGoBack()
                        }/>
                        <h1 className='color-white'>
                            Choose your cards
                        </h1>
                        <div className="card__boards">
                            <h2 className="color-yellow">
                                Your card collection</h2>
                            <Cards
                                deck={playerCards}
                                action={this.removeCard}
                                nameClass="selected__cards"
                                credits={credits}
                                active={playerActive}
                            />
                            <h2 className='color-yellow'>Buy a new card</h2>
                            <Cards
                                deck={allCards}
                                action={this.selectCard}
                                nameClass="all__cards"
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
    allCards: state.data.allCards,
    playerAllCards: state.data.playerAllCards,
    credits: state.data.credits,
    loading: state.loading,
    error: state.error,
});


export default connect(mapStateToProps)(Shop);
