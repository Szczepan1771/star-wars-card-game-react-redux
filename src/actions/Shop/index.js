import {fetchDataBegin, fetchDataSuccess, fetchDataFailure} from '../index';

export function fetchData() {
    return dispatch => {
        dispatch(fetchDataBegin());
        return fetch('http://localhost:8000/AllCards')
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error!');
                }
            })
            .then((response) => dispatch(fetchDataSuccess({allCards: response})))
            .catch(error => {
                dispatch(fetchDataFailure(error));
            });
    };
}
