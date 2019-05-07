import React, {Component, Fragment} from 'react';
import {
    APP_STATES
} from "../config";
import Cards from "../../../components/Cards";
import './styles.scss';
import Battleground from '../Battleground';
import {fetchOpponentCard} from '../../../actions/Opponent'
import Button from "../../../components/Button";
import connect from "react-redux/es/connect/connect";

class Clash extends Component {

    state = {
        opponentDeck: [],
        playerDeck: [],
        choosenCard: {},
        opponentCard: {},
        temporaryChoosenCard: {},
        temporaryOpponentCard: {},
        playerPoints: 0,
        opponentPoints: 0,
        roundCounter: 0,
        isVisible: false,
    };

    componentDidMount() {
        this.getOpponent();
    }

    componentDidUpdate() {

        if (this.state.roundCounter >= 5) {
            this.whoWon();
            setTimeout(this.props.goToShowResult, 1000);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.opponentDeck && nextProps.deck) {
            this.setState({
                opponentDeck: [...nextProps.opponentDeck],
                temporaryOpponentCard: [...nextProps.opponentDeck][0],
                playerDeck: [...nextProps.deck],
                temporaryChoosenCard: [...nextProps.deck][0],
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

    getOpponent = () => {
        this.setState({
            appState: APP_STATES.LOADING
        });
        this.props.dispatch(fetchOpponentCard(this.props.fraction))
    };


    chooseCardToPlay = (id) => {
        const playerDeckLength = this.state.playerDeck.length;
        const playerDeck = this.state.playerDeck;
        for (let i = 0; i < playerDeckLength; i++) {
            if (id === playerDeck[i].id) {
                this.setState({
                    choosenCard: playerDeck[i],
                    isVisible: false,
                })
            }
        }
        if (this.props.playerName === 'Tutorial' && this.props.cardClicked === false) {
            this.props.goToNextModal();
        }
    };

    playRound = () => {
        let { choosenCard, opponentDeck, playerDeck, opponentCard, playerPoints, opponentPoints } = this.state;
        const index = Math.floor(Math.random() * opponentDeck.length);
        opponentCard = opponentDeck[index];
        opponentDeck.splice(index, 1);
        playerDeck = playerDeck.filter(card => card.id !== choosenCard.id);
        if (choosenCard.attack - opponentCard.defence > opponentCard.attack - choosenCard.defence) {
            opponentCard.isSelected = '__destroyed-card';
            playerPoints = this.state.playerPoints + 1;
        } else if (choosenCard.attack - opponentCard.defence < opponentCard.attack - choosenCard.defence) {
            choosenCard.isSelected = '__destroyed-card';
            opponentPoints = this.state.opponentPoints + 1;
        } else {
            playerPoints = this.state.playerPoints;
            opponentPoints = this.state.opponentPoints;
        }
        this.setState({
            roundCounter: this.state.roundCounter + 1,
            opponentPoints,
            playerPoints,
            playerDeck,
            opponentDeck,
            isVisible: true,
            opponentCard: {},
            choosenCard: {},
            temporaryOpponentCard: opponentCard,
            temporaryChoosenCard: choosenCard,
        });
        if (this.props.playerName === 'Tutorial' && this.props.playRoundClicked === false) {
            this.props.playRoundClicker();
        }
    };

    whoWon = () => {
        const playerPoints = this.state.playerPoints;
        const opponentPoints = this.state.opponentPoints;
        let credits;
        if (playerPoints > opponentPoints) {
            const playerWon = "Congratulations! You won ;-)";
            const win = this.props.won + 1;
            const games = this.props.games + 1;
            credits = this.props.credits + 15;
            this.props.whoWon(playerWon, credits, win, games);

        } else if (opponentPoints > playerPoints) {
            const opponentWon = "Sorry, you loose, try again";
            const win = this.props.won;
            const games = this.props.games + 1;
            credits = this.props.credits + 5;
            this.props.whoWon(opponentWon, credits, win, games);
        } else {
            const draw = "Draw, you were close";
            const win = this.props.won;
            const games = this.props.games + 1;
            credits = this.props.credits + 10;
            this.props.whoWon(draw, credits, win, games)
        }
    };


    render() {
        const {
            appState,
            playerDeck,
            opponentDeck,
            choosenCard,
            opponentCard,
            temporaryChoosenCard,
            temporaryOpponentCard,
            playerPoints,
            opponentPoints,
            roundCounter,
            isVisible,
        } = this.state;

        return (
            <div className="clash">
                {
                    appState === APP_STATES.LOADING &&
                    <h1 className="color-white">Loading. Please wait.</h1>
                }
                {
                    appState === APP_STATES.RESULTS &&
                    <Fragment>
                        <h1 className="color-white">
                            {choosenCard.name ? 'Play round' : 'Choose your card!'}
                        </h1>
                        <Cards
                            deck={playerDeck}
                            nameClass="player__cards"
                            action={this.chooseCardToPlay}
                        />
                        {
                            choosenCard.name && roundCounter < 5
                            &&
                            <Button
                                action={this.playRound}
                                text="Play round"
                            />
                        }
                        <Battleground
                            opponentCard={opponentCard}
                            className={'battleground-clash1'}
                            playerCard={choosenCard}
                            temporaryOpponentCard={temporaryOpponentCard}
                            temporaryChoosenCard={temporaryChoosenCard}
                            isVisible={isVisible}
                        />

                        <Cards
                            deck={opponentDeck}
                            nameClass="opponent__cards"
                        />
                        <p className="player-points">{playerPoints}</p>
                        <p className="opponent-points">{opponentPoints}</p>
                    </Fragment>
                }
                <Button className='btn2' text="Go back to start" action={this.props.goBackToStart}/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    playerCards: state.data.playerCards,
    opponentDeck: state.data.opponentDeck,
    playerName: state.data.id,
    credits: state.data.credits,
    won: state.data.won,
    games: state.data.games,
    deck: state.data.deck,
    loading: state.loading,
    error: state.error,
});

export default connect(mapStateToProps)(Clash);
