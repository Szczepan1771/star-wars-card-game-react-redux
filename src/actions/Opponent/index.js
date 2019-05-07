import store from '../../store';
import {fetchDataBegin, fetchDataSuccess, fetchDataFailure} from '../index';

export function fetchOpponentCard(opponentName) {
    return dispatch => {
        return fetch('http://localhost:8000/' + opponentName)
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
                const opponentDeck = response;
                if (opponentDeck.length > 5) {
                    opponentDeck.splice(0, 5);
                }
                const newData = {
                    ...prevData,
                    opponentDeck,
                };
                dispatch(fetchDataSuccess(newData));
            })
            .catch(error => {
                dispatch(fetchDataFailure(error));
            });
    }
}

