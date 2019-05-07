import React, {Component, Fragment} from 'react';
import {
    TUTORIAL_START_GAME,
    GAME_MODE_TUTORIAL_PART_1,
    GAME_MODE_TUTORIAL_PART_2,
    GAME_MODE_1_STATE,
} from "./config";  // config from Tutorial.js
import {
    OPPONENT_FRACTION_ARRAY_TUTORIAL,
} from "../config";    // config from Game.js
import WelcomeInfo from "../../../components/WelcomeInfo/withLogo";
import StartGame from './Steps/Start';
import BeforeSelectCards from './Steps/BeforeSelectCards';
import SelectCardsInfo from "./Steps/SelectCardsInfo";
import BeforeSelectOponent from './Steps/BeforeSelectOponent';
import BeforeSelectMode from './Steps/BeforeSelectMode';
import Modal from '../../../components/Modal'
import Button from "../../../components/Button";
import GameModeAndOpponent from '../../../components/GameModeAndOpponent';
import GameModeOneStart from "./Steps/GameModeOneStart";
import GameModeOneCardClicking from "./Steps/GameModeOneCardClicking";
import GameModeOnePlayRoundClicking from "./Steps/GameModeOnePlayRoundClicking";
import GameModeTwoStart from "./Steps/GameModeTwoStart";
import TutorialEnd from "./Steps/TutorialEnd";
import SelectCardToPlay from '../SelectCardToPlay';
import Clash from "../BattleMode";
import Clash2 from "../HeroicBattleMode";
import store from '../../../store/index';
import './style.scss';

class Tutorial extends Component {
    state = {
        gameState: TUTORIAL_START_GAME.START_GAME,
        gameModeState: GAME_MODE_1_STATE.START,
        playerWon: " ",
        cardClicked: false,
        playRoundClicked: false,
        showModal: true,
    };
    nextGameModeModal = () => {

        if (this.state.gameModeState === GAME_MODE_1_STATE.GAME_VISIBLE) {
            this.setState({
                cardClicked: true,
            });
            setTimeout(() => {
                this.setState({

                    gameModeState: this.state.gameModeState + 1
                })
            }, 750)

        } else {
            this.setState({
                gameModeState: this.state.gameModeState + 1
            });
        }
    };

    playRoundClicker = () => {
        this.setState({
            playRoundClicked: true,
        });
        setTimeout(() => {
            this.setState({
                gameModeState: GAME_MODE_1_STATE.PLAY_ROUND_CLICKING,
            });
        }, 2500);
    };

    gameVisible = () => {
        this.setState({
            gameModeState: GAME_MODE_1_STATE.GAME_VISIBLE
        })
    };

    prevGameModeModal = () => {
        this.setState({
            gameModeState: this.state.gameModeState - 1
        });
    };

    nextModal = () => {
        if (this.state.gameState === TUTORIAL_START_GAME.BEFORE_GAME_MODE_2) {
            this.setState({
                gameState: this.state.gameState + 1,
                gameModeState: GAME_MODE_1_STATE.START
            });
        }
        if (this.state.gameState === TUTORIAL_START_GAME.SELECT_CARDS) {
            if (store.getState().data.deck.length === 5) {
                this.setState({
                    gameState: this.state.gameState + 1
                });
            } else {
                alert('Select five cards before moving to the next stage ')
            }
        } else {
            this.setState({
                gameState: this.state.gameState + 1
            });
        }
        if (this.state.gameState === TUTORIAL_START_GAME.END_GAME_1) {
            const playerCardsData = store.getState().data.deck;
            for (let card of playerCardsData) {
                card.isSelected = '';
            }
        }
    };

    prevModal = () => {
        this.setState({
            gameState: this.state.gameState - 1
        })
    };

    toStart = () => {
        this.setState({
            gameState: TUTORIAL_START_GAME.START_GAME,
            cardClicked: false,
            playRoundClicked: false,
        })
    };

    whoWon = (playerWon) => {
        this.setState({
            playerWon
        })
    };

    render() {
        const {
            gameState,
            showModal,
            gameModeState,
            cardClicked,
            playRoundClicked
        } = this.state;
        return (
            <Fragment>
                {
                    gameState === TUTORIAL_START_GAME.START_GAME &&
                    <Fragment>
                        <Modal open={showModal}
                               nextModal={this.nextModal}
                               onClose={this.props.goBackToStart}
                        >
                            <StartGame/>
                        </Modal>
                    </Fragment>
                }
                {
                    gameState === TUTORIAL_START_GAME.BEFORE_SELECT_CARDS &&
                    <Fragment>
                        <Modal open={showModal}
                               nextModal={this.nextModal}
                               prevModal={this.prevModal}
                               onClose={this.props.goBackToStart}
                               prevStepAvaible={true}
                        >
                            <BeforeSelectCards/>
                        </Modal>
                    </Fragment>
                }
                {
                    gameState === TUTORIAL_START_GAME.SELECT_CARDS_INFO &&
                    <Fragment>
                        <Modal open={showModal}
                               nextModal={this.nextModal}
                               prevModal={this.prevModal}
                               onClose={this.props.goBackToStart}
                               prevStepAvaible={true}
                               customClass="selectCards__bg"
                        >
                            <SelectCardsInfo/>
                        </Modal>
                    </Fragment>
                }
                {
                    gameState === TUTORIAL_START_GAME.SELECT_CARDS &&
                    <div className='tutorial__select_cards'>
                        <header>
                            <WelcomeInfo paragraph='Card game'/>
                        </header>
                        <Button
                            text="play"
                            action={this.nextModal}
                        />
                        <SelectCardToPlay
                            playerName="Tutorial"
                        />
                        <Button text="Go back" action={this.prevModal}/>
                    </div>
                }
                {
                    gameState === TUTORIAL_START_GAME.BEFORE_SELECT_OPPONENT &&
                    <Modal open={showModal}
                           nextModal={this.nextModal}
                           prevModal={this.prevModal}
                           onClose={this.props.goBackToStart}
                           prevStepAvaible={true}
                           customClass="selectCards__bg"
                    >
                        <BeforeSelectOponent/>
                    </Modal>
                }
                {
                    gameState === TUTORIAL_START_GAME.SELECT_OPPONENT &&
                    <Fragment>
                        <header>
                            <WelcomeInfo paragraph='Card game'/>
                        </header>
                        <h2 className="c-white">
                            Click on the card below.
                        </h2>
                        <GameModeAndOpponent
                            config={OPPONENT_FRACTION_ARRAY_TUTORIAL}
                            action={this.nextModal}
                        />
                        <Button text="Go back" action={this.prevModal}/>
                    </Fragment>
                }
                {
                    gameState === TUTORIAL_START_GAME.BEFORE_SELECT_MODE &&
                    <Fragment>
                        <Modal open={showModal}
                               nextModal={this.nextModal}
                               prevModal={this.prevModal}
                               onClose={this.props.goBackToStart}
                               prevStepAvaible={true}
                               customClass="selectCards__bg"
                        >
                            <BeforeSelectMode/>
                        </Modal>
                        <Button text="Go back" action={this.prevModal}/>
                    </Fragment>
                }
                {
                    gameState === TUTORIAL_START_GAME.SELECT_GAME_MODE &&
                    <Fragment>
                        <header>
                            <WelcomeInfo paragraph='Card game'/>
                        </header>
                        <h2 className="c-white">
                            Click on the card below.
                        </h2>
                        <GameModeAndOpponent
                            config={GAME_MODE_TUTORIAL_PART_1}
                            action={this.nextModal}
                        />
                    </Fragment>
                }
                {
                    gameState === TUTORIAL_START_GAME.GAME_MODE_1 &&
                    <Fragment>
                        {
                            gameModeState === GAME_MODE_1_STATE.START &&
                            <Modal open={showModal}
                                   nextModal={this.nextGameModeModal}
                                   prevModal={this.prevGameModeModal}
                                   onClose={this.props.tutorialAvaible}
                                   prevStepAvaible={false}
                                   nextStepAvaible={true}
                                   customClass="selectCards__bg"
                            >
                                <GameModeOneStart/>
                            </Modal>
                        }
                        {
                            gameModeState === GAME_MODE_1_STATE.CARD_CLICKING &&
                            <Modal open={showModal}
                                   nextModal={this.gameVisible}
                                   prevModal={this.prevGameModeModal}
                                   onClose={this.props.tutorialAvaible}
                                   prevStepAvaible={false}
                                   nextStepAvaible={true}
                                   customClass="selectCards__bg"
                            >
                                <GameModeOneCardClicking/>
                            </Modal>
                        }
                        {
                            gameModeState === GAME_MODE_1_STATE.PLAY_ROUND_CLICKING &&
                            <Modal open={showModal}
                                   nextModal={this.gameVisible}
                                   prevModal={this.prevGameModeModal}
                                   onClose={this.props.tutorialAvaible}
                                   prevStepAvaible={false}
                                   nextStepAvaible={true}
                                   customClass="selectCards__bg"
                            >
                                <GameModeOnePlayRoundClicking/>
                            </Modal>
                        }
                        {
                            gameModeState === GAME_MODE_1_STATE.GAME_VISIBLE &&
                            <Clash
                                opponentName="Jedi"
                                goToShowResult={this.nextModal}
                                whoWon={this.whoWon}
                                goBackToStart={this.toStart}
                                goToNextModal={this.nextGameModeModal}
                                cardClicked={cardClicked}
                                playRoundClicker={this.playRoundClicker}
                                playRoundClicked={playRoundClicked}
                            />
                        }

                    </Fragment>
                }
                {
                    gameState === TUTORIAL_START_GAME.END_GAME_1 &&
                    <Fragment>
                        <header>
                            <WelcomeInfo paragraph='Card game'/>
                        </header>
                        <h1 className="color-yellow">{this.state.playerWon}</h1>
                        <Button text='Play next mode'
                                action={this.nextModal}/>
                    </Fragment>
                }
                {
                    gameState === TUTORIAL_START_GAME.BEFORE_GAME_MODE_2 &&
                    <Fragment>
                        <header>
                            <WelcomeInfo paragraph='Card game'/>
                        </header>
                        <h2 className="c-white">
                            Lets check second game mode.
                        </h2>
                        <GameModeAndOpponent
                            config={GAME_MODE_TUTORIAL_PART_2}
                            action={this.nextModal}
                        />
                    </Fragment>
                }
                {
                    gameState === TUTORIAL_START_GAME.GAME_MODE_2 &&
                    <Fragment>
                        {
                            gameModeState === GAME_MODE_1_STATE.START &&
                            <Modal open={showModal}
                                   nextModal={this.nextGameModeModal}
                                   prevModal={this.prevGameModeModal}
                                   onClose={this.props.tutorialAvaible}
                                   prevStepAvaible={false}
                                   nextStepAvaible={true}
                                   customClass="selectCards__bg"
                            >
                                <GameModeTwoStart/>
                            </Modal>
                        }
                        {
                            gameModeState === GAME_MODE_1_STATE.GAME_VISIBLE &&
                            <Clash2
                                opponentName="Jedi"
                                goToShowResult={this.nextModal}
                                whoWon={this.whoWon}
                                goBackToStart={this.toStart}
                            />
                        }
                    </Fragment>
                }
                {
                    gameState === TUTORIAL_START_GAME.END_GAME_2 &&
                    <Fragment>
                        <header>
                            <WelcomeInfo paragraph='Card game'/>
                        </header>
                        <h1 className="color-yellow">{this.state.playerWon}</h1>
                        <Button text='Summary'
                                action={this.nextModal}/>
                    </Fragment>
                }
                {
                    gameState === TUTORIAL_START_GAME.TUTORIAL_END &&
                    <Fragment>
                        <Modal open={showModal}
                               nextModal={this.nextModal}
                               prevModal={this.prevModal}
                               onClose={this.props.tutorialAvaible}
                               prevStepAvaible={false}
                               nextStepAvaible={false}
                               customClass="selectCards__bg"
                        >
                            <TutorialEnd/>
                        </Modal>

                    </Fragment>
                }

            </Fragment>
        )
    }

}

export default Tutorial;
