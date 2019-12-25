import * as types from './actionTypes';

export function errorClear() {
    return {type: types.ERROR_CLEAR};
}

export function errorSet(path) {
    return {type: types.ERROR_SET,
            error: path};
}
