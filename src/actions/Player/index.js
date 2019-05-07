import store from '../../store';
import {fetchDataBegin, fetchDataSuccess, fetchDataFailure} from '../index';

export function fetchPlayerDeck(playerName) {
    return dispatch => {
        return fetch('http://localhost:8000/PlayerDeck/' + playerName)
            .then(dispatch(fetchDataBegin()))
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error!');
                }
            })
            .then(response => {
                const prevData = store.getState().data;
                const deck = response.deck;
                const newData = {
                    ...prevData,
                    deck,
                    ...response
                };
                dispatch(fetchDataSuccess(newData));
            })
            .catch(error => {
                dispatch(fetchDataFailure(error));
            });
    }
}

export function fetchPlayerCards(playerName) {
    return dispatch => {
        return fetch('http://localhost:8000/PlayerDeck/' + playerName)
            .then(dispatch(fetchDataBegin()))
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error!');
                }
            })
            .then(response => {
                const prevData = store.getState().data;
                const playerAllCards = response.playerAllCards;
                const newData = {
                    ...prevData,
                    playerAllCards,
                    ...response
                };

                dispatch(fetchDataSuccess(newData));
            })
            .catch(error => {
                dispatch(fetchDataFailure(error));
            });
    }
}

export function savePlayerCards(playerName, actualcredits) {
    return dispatch => {
        return fetch('http://localhost:8000/PlayerDeck/' + playerName, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                playerAllCards: store.getState().data.playerAllCards,
                credits: actualcredits,
                deck: store.getState().data.deck,
                tutorialFinished: true,
            }),
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error!');
            }
        }).catch(error => {
            dispatch(fetchDataFailure(error));
        });
    }
}

export function savePlayerStats(playerName, credits, won, percentWon, games) {
    return dispatch => {
        return fetch('http://localhost:8000/PlayerDeck/' + playerName, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                credits,
                won,
                games,
                percentWon,
            }),
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error!');
            }
        }).catch(error => {
            dispatch(fetchDataFailure(error));
        });
    }
}

export function fetchDataStore(playerName) {
    return dispatch => {
        return fetch('http://localhost:8000/PlayerDeck/' + playerName)
            .then(dispatch(fetchDataBegin()))
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error!');
                }
            })
            .then(response => {
                const prevData = store.getState().data;
                const newData = {
                    ...prevData,
                    ...response,
                };

                dispatch(fetchDataSuccess(newData));
            })
            .catch(error => {
                dispatch(fetchDataFailure(error));
            });
    }
}