import * as types from '../actions/actionTypes';

//step 2: creating the reducer function for the first action....
export default function countReducer(state , action){
    let countval = 0;
    switch(action.type){
        case types.INCREMENT_COUNT:
            countval = state.count;
            countval++;

            return {"count": countval};
        case types.RESET_COUNT:
            return {"count": 0};

        case types.DECREMENT_COUNT:
            countval = state.count;
            countval--;

            return {"count": countval};
        default:
            return state;
    }
}
