import * as types from './actionTypes';
import {AuthenticationError} from '../../api/Errors';

export function errorClear() {
    return {type: types.ERROR_CLEAR};
}

export function errorSet(path) {
    return {type: types.ERROR_SET,
            error: path};
}

export function handleError(dispatch, e) {
    console.warn(e);
    if (e instanceof AuthenticationError) {
        console.log("Authentication Error");
        dispatch(errorSet("/error/authentication"));
    }
    else {
        dispatch(errorSet("/error"));
    }
}