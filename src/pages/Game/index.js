import React, {Component, Fragment} from 'react';
import BattleMode from './BattleMode';
import HeroicBattleMode from './HeroicBattleMode';
import Tutorial from './Tutorial';
import {
    GAME_STATES,
    GAME_MODE_ARRAY,
    OPPONENT_FRACTION_ARRAY,
    APP_STATES,
} from './config';
import SelectCardToPlay from './SelectCardToPlay';
import Shop from './Shop';
import WelcomeInfo from "../../components/WelcomeInfo/withLogo";
import Button from "../../components/Button";
import GameModeAndOpponent from "../../components/GameModeAndOpponent";
import { saveAfterTutorial, fetchPlayerTutorial} from '../../actions/Tutorial';
import { savePlayerCards, savePlayerStats, fetchDataStore } from "../../actions/Player";
import Informant from '../../components/Informant';
import './style.scss';
import connect from "react-redux/es/connect/connect";

class Game extends Component {

    state = {
        gameState: GAME_STATES.START_GAME,
        playerWon: " ",
    };

    componentDidMount() {
        this.props.dispatch(fetchPlayerTutorial('Adam'));
        this.props.dispatch(fetchDataStore('Adam'));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.error !== null) {
            this.setState({
                appState: APP_STATES.ERROR
            })
        } else if (nextProps.loading) {
            this.setState({
                appState: GAME_STATES.LOADING,
            });
        }
    }

    goToSelectCards = () => {
        this.setState({
            gameState: GAME_STATES.SELECT_CARDS
        });
    };

    goToTutorial = () => {
        this.setState({
            gameState: GAME_STATES.TUTORIAL
        });
    };

    goToShop = () => {
        this.setState({
            gameState: GAME_STATES.SHOP
        });
    };

    goBackToStart = () => {
        this.setState({
            gameState: GAME_STATES.START_GAME
        })
    };

    tutorialAvaible = () => {
        this.props.dispatch(saveAfterTutorial('Adam'));
        this.setState({
            gameState: GAME_STATES.START_GAME
        })
    };

    playAgain = () => {
        this.setState({
            gameState: GAME_STATES.SELECT_CARDS
        })
    };
    goToMainMenu = () =>{
        this.setState({
            gameState: GAME_STATES.START_GAME,
        })
    };

    goToGameMode = (gameMode) => {
        this.setState({
            gameState: gameMode
        })
    };

    selectOpponent = (id, fraction) => {
        this.setState({
            gameState: GAME_STATES.SELECT_GAME_MODE,
            opponentFraction: fraction
        });
    };

    goToSelectOpponent = () => {
        if (this.props.deck.length === 5) {
            this.setState({
                gameState: GAME_STATES.SELECT_OPPONENT,
            });
            this.props.dispatch(savePlayerCards(this.props.playerName, this.props.credits));
        } else {
            alert('Choose 5 cards')
        }
    };

    goToShowResult = () => {
        this.setState({
            gameState: GAME_STATES.END_GAME,
        })
    };

    whoWon = (playerWon, credits, win, games) => {
        win += this.props.won;
        games += this.props.games;
        const percentWon = Math.round(win/games * 100);
        credits += this.props.credits;
        this.props.dispatch(savePlayerStats(this.props.playerName, credits, win, percentWon, games));
        this.setState({
            playerWon,
        })
    };

    render() {
        const {
            gameState,
            playerWon,
        } = this.state;

        const informant =
            (gameState === GAME_STATES.START_GAME || gameState === GAME_STATES.SHOP)
                ?
                <Informant/>
                :
                null;

        const welcomeInfo =
            (gameState===GAME_STATES.GAME_MODE_1 || gameState === GAME_STATES.GAME_MODE_2)
                ?
                null
                :
                <WelcomeInfo paragraph='Card game'/>;

        return (
            <div className="game">
                <div className="container">
                    <header>
                        {informant}
                        {welcomeInfo}
                    </header>
                    {
                        gameState === GAME_STATES.START_GAME &&
                        <Fragment>
                            {this.props.tutorialFinished &&
                            <Fragment>
                                <Button className='menu-button'
                                        action={this.goToSelectCards}
                                        text='Start Game!'/>
                                <Button className='menu-button'
                                        action={this.goToShop}
                                        text='Buy new cards'/>
                            </Fragment>
                            }
                            <Button className='menu-button' action={this.goToTutorial} text='Play tutorial'/>
                        </Fragment>
                    }
                    {
                        gameState === GAME_STATES.TUTORIAL &&
                        <Fragment>
                            <Tutorial
                                goBackToStart={this.goBackToStart}
                                tutorialAvaible={this.tutorialAvaible}/>
                        </Fragment>
                    }
                    {
                        gameState === GAME_STATES.SELECT_CARDS &&
                        <Fragment>
                            {
                                this.props.playerName &&
                                <Button
                                    text="play"
                                    action={this.goToSelectOpponent}
                                />
                            }
                            <SelectCardToPlay playerName='Adam'/>
                            <Button text="Go back" action={this.goBackToStart}/>
                        </Fragment>
                    }
                    {
                        gameState === GAME_STATES.SELECT_OPPONENT &&
                        <Fragment>
                            <h2 className="c-white">
                                Select your opponent
                            </h2>
                            <GameModeAndOpponent
                                config={OPPONENT_FRACTION_ARRAY}
                                action={this.selectOpponent}
                            />
                        </Fragment>
                    }
                    {
                        gameState === GAME_STATES.SHOP &&
                        <Fragment>
                            <Shop
                                playerName='Adam'
                                goBackToStart={this.goBackToStart}
                            />
                            <Button text="Go back" action={this.goBackToStart}/>
                        </Fragment>
                    }
                    {
                        gameState === GAME_STATES.SELECT_GAME_MODE &&
                        <Fragment>
                            <h2 className="c-white">
                                Select game mode
                            </h2>
                            <GameModeAndOpponent
                                config={GAME_MODE_ARRAY}
                                action={this.goToGameMode}
                            />
                        </Fragment>
                    }
                    {
                        gameState === GAME_STATES.GAME_MODE_1 &&
                        <Fragment>
                            <BattleMode
                                goToShowResult={this.goToShowResult}
                                whoWon={this.whoWon}
                                goBackToStart={this.goBackToStart}
                                fraction={this.state.opponentFraction}
                            />
                        </Fragment>
                    }
                    {
                        gameState === GAME_STATES.GAME_MODE_2 &&
                        <Fragment>

                            <HeroicBattleMode
                                goToShowResult={this.goToShowResult}
                                whoWon={this.whoWon}
                                goBackToStart={this.goBackToStart}
                                fraction={this.state.opponentFraction}
                            />
                            <Button text="Go back to start" action={this.goBackToStart}/>
                        </Fragment>
                    }
                    {
                        gameState === GAME_STATES.END_GAME &&
                        <Fragment>
                            <h1 className="color-yellow">{playerWon}</h1>
                            <Button text='Play again'
                                    action={this.playAgain}
                            />
                            <Button text="Main menu"
                                    action={this.goToMainMenu}
                            />

                        </Fragment>
                    }
                    {
                        gameState === GAME_STATES.LOADING &&
                        <Fragment>
                            <h1 className="color-white">Loading, please wait</h1>
                        </Fragment>
                    }
                    {
                        gameState === GAME_STATES.ERROR &&
                        <Fragment>
                            <h1 className='color-white'>There is no connection with server</h1>
                        </Fragment>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    playerName: state.data.id,
    deck: state.data.deck,
    credits: state.data.credits,
    won: state.data.won,
    games: state.data.games,
    percentWon: state.data.percentWon,
    tutorialFinished: state.data.tutorialFinished,
    loading: state.loading,
    error: state.error,
});


export default connect(mapStateToProps)(Game);
