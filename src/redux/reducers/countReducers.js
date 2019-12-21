import * as types from '../actions/actionTypes';

//step 2: creating the reducer function for the first action....
export default function countReducer(count , action){
    let countval = 0;
    switch(action.type){
        case types.INCREMENT_COUNT:
            return ++count;
        case types.RESET_COUNT:
            return  0;

        case types.DECREMENT_COUNT:
            return --count;
        default:
            return count;
    }
}

