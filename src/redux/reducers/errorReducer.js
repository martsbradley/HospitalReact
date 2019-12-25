import * as types from '../actions/actionTypes';

export default function countReducer(error , action){
    switch(action.type){
        case types.ERROR_CLEAR:
              return ""
        case types.ERROR_SET:
            return  action.error;
        default:
            return error;
    }
}

