import * as types from '../actions/actionTypes';

export default function validationReducer(validationState , action){
    switch(action.type){
        case types.VALIDATION_CLEAR:
              return {};
        case types.VALIDATION_SET:
            return  action.validation;
        default:
            return validationState;
    }
}

