import * as types from '../actions/actionTypes';

function listedSuccess(medicine, action) {
    const state  = {...medicine,
                       list       : action.medicines,
                       totalItems : action.total,
                       pageNumber : action.activePage};
    return state;
}

//step 2: creating the reducer function for the first action....
export default function medicineReducer(medicine, action){

    switch(action.type){
        case types.MEDICINES_LISTED_SUCCESS:
            return listedSuccess(medicine, action);
        default:
            return medicine;
    }
}
