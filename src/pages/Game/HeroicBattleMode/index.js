import React, {Component, Fragment} from 'react';
import {
    APP_STATES
} from "../config";
import Cards from "../../../components/Cards";
import Battleground from '../Battleground';
import { fetchOpponentCard } from '../../../actions/Opponent'
import Button from "../../../components/Button";
import connect from "react-redux/es/connect/connect";
class Clash2 extends Component {

    state = {
        opponentDeck: [],
        playerDeck: [],
        choosenCard: {},
        opponentCard: {},
        isVisible: false,
        temporaryChoosenCard: {},
        temporaryOpponentCard: {},
    };

    componentDidMount() {
        this.getOpponent();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if((!this.state.playerDeck.length || !this.state.opponentDeck.length) && this.state.isVisible){
            this.whoWon();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.opponentDeck && nextProps.deck) {
            this.setState({
                opponentDeck: [...nextProps.opponentDeck],
                temporaryOpponentCard: nextProps.opponentDeck[0],
                playerDeck: [...nextProps.deck],
                temporaryChoosenCard: nextProps.deck[0],
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

    chooseCardToPlay = (id) => {
        const playerDeckLength = this.state.playerDeck.length;
        const playerDeck = this.state.playerDeck;
        const opponentCard = this.state.temporaryChoosenCard;
        const choosenCard = this.state.temporaryOpponentCard;
        opponentCard.isSelected = "";
        choosenCard.isSelected = "";

        for (let i = 0; i < playerDeckLength; i++) {
            if (id === playerDeck[i].id) {
                this.setState({
                    choosenCard: playerDeck[i],
                    isVisible: false,
                })
            }
        }
    };


    playRound = () => {
        let choosenCard = this.state.choosenCard;
        let opponentCard = this.state.opponentCard;
        let playerDeck = this.state.playerDeck;
        let opponentDeck = this.state.opponentDeck;

        const index = Math.floor(Math.random() * opponentDeck.length);
        opponentCard = opponentDeck[index];
        opponentDeck.splice(index, 1);
        playerDeck = playerDeck.filter(card => card.id !== choosenCard.id);

        let playerAttack = choosenCard.attack - opponentCard.defence;
        let opponentAttack = opponentCard.attack - choosenCard.defence;

        if (playerAttack >= 0) {
            opponentCard.defence = 0;
            opponentCard.health -= playerAttack;
            if (opponentCard.health <= 0) {
                opponentCard.health = 0;
                opponentCard.isSelected = '__destroyed-card';
                this.setState({
                    opponentDeck,
                    choosenCard: {},
                    opponentCard: {},
                    temporaryChoosenCard: choosenCard,
                    temporaryOpponentCard: opponentCard,
                    isVisible: true,
                })
            } else if (opponentCard.health > 0) {
                opponentDeck.push(opponentCard);
                opponentCard.isSelected = '__after-attack';
                this.setState({
                    opponentDeck,
                    choosenCard: {},
                    opponentCard: {},
                    temporaryChoosenCard: choosenCard,
                    temporaryOpponentCard: opponentCard,
                    isVisible: true,
                })
            }
        } else {
            opponentCard.defence -= choosenCard.attack;
            opponentCard.isSelected = '__decrease-defence';
            opponentDeck.push(opponentCard);
            this.setState({
                opponentDeck,
                choosenCard: {},
                opponentCard: {},
                temporaryChoosenCard: choosenCard,
                temporaryOpponentCard: opponentCard,
                isVisible: true,
            })
        }

        if (opponentAttack > 0) {
            choosenCard.defence = 0;
            choosenCard.health -= opponentAttack;
            if (choosenCard.health <= 0) {
                choosenCard.health = 0;
                choosenCard.isSelected = '__destroyed-card';
                this.setState({
                    playerDeck,
                    choosenCard: {},
                    opponentCard: {},
                    temporaryChoosenCard: choosenCard,
                    temporaryOpponentCard: opponentCard,
                    isVisible: true,
                })
            } else if (choosenCard.health > 0) {
                choosenCard.isSelected = '__after-attack';
                playerDeck.push(choosenCard);
                this.setState({
                    playerDeck,
                    choosenCard: {},
                    opponentCard: {},
                    temporaryChoosenCard: choosenCard,
                    temporaryOpponentCard: opponentCard,
                    isVisible: true,
                })
            }
        } else {
            choosenCard.defence -= opponentCard.attack;
            choosenCard.isSelected = '__decrease-defence';
            playerDeck.push(choosenCard);
            this.setState({
                playerDeck,
                choosenCard: {},
                opponentCard: {},
                temporaryChoosenCard: choosenCard,
                temporaryOpponentCard: opponentCard,
                isVisible: true,
            })
        }

        if(!playerDeck.length || !opponentDeck.length){
            setTimeout(this.props.goToShowResult, 1000);
        }
    };

    getOpponent = () => {
        this.setState({
            appState: APP_STATES.LOADING
        });
        this.props.dispatch(fetchOpponentCard(this.props.fraction))
    };

    whoWon = () => {
        const playerWon = this.state.playerDeck.length;
        const opponentWon = this.state.opponentDeck.length;
        let credits, result, win = 0, games = 1;
        if (!opponentWon) {
            result = "Congratulations! You won ;-)";
            win = 1;
            credits = 15;
        } else if (!playerWon) {
            result = "Sorry, you loose, try again";
            credits = 5;
        } else if (!opponentWon && !playerWon) {
            result = "Draw, you were close";
            credits = 10;
        }
        this.props.whoWon(result,credits, win, games)
    };


    render() {
        const {
            appState,
            playerDeck,
            opponentDeck,
            temporaryChoosenCard,
            temporaryOpponentCard,
            choosenCard,
            opponentCard,
            isVisible,
        } = this.state;

        console.log(this.props.fraction);

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
                            choosenCard.name &&
                            <Button
                                action={this.playRound}
                                text="Play round"
                                id="playRound"
                            />
                        }
                        <Battleground
                            opponentCard={opponentCard}
                            playerCard={choosenCard}
                            temporaryOpponentCard={temporaryOpponentCard}
                            temporaryChoosenCard={temporaryChoosenCard}
                            isVisible={isVisible}
                        />
                        <Cards
                            deck={opponentDeck}
                            nameClass="opponent__cards"
                        />
                    </Fragment>
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    deck: state.data.deck,
    opponentDeck: state.data.opponentDeck,
    loading: state.loading,
    error: state.error,
});

export default connect(mapStateToProps)(Clash2);
