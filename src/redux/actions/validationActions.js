import * as types from './actionTypes';

export function clearValidationAction() {
    return {type: types.VALIDATION_CLEAR};
}

export function setValidationAction(validationErrors) {
    return {type: types.VALIDATION_SET,
            validation: validationErrors};
}
