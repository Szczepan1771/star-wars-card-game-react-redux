import {fetchDataBegin, fetchDataSuccess, fetchDataFailure} from '../index';

export function fetchPlayerTutorial(playerName) {
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
                const tutorialFinished = response.tutorialFinished;
                const newData = {
                    tutorialFinished,
                };
                dispatch(fetchDataSuccess(newData));
            })
            .catch(error => {
                dispatch(fetchDataFailure(error));
            });
    }
}

export function saveAfterTutorial(playerName) {
    return dispatch => {
        return fetch('http://localhost:8000/PlayerDeck/' + playerName, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                tutorialFinished: true,
            }),
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error!');
            }
        }).then(() => window.location.reload())
            .catch(error => {
                dispatch(fetchDataFailure(error));
            });
    }
}
