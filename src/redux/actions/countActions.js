import * as types from './actionTypes';

export function incrementAction() {
    return {type: types.INCREMENT_COUNT};
}
export function resetAction() {
    return {type: types.RESET_COUNT};
}
export function decrementAction() {
    return function (dispatch) {
        setTimeout(() => dispatch({type: types.DECREMENT_COUNT}), 1000);
    };
}


