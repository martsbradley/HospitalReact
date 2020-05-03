import * as types from '../actions/actionTypes';

function listedSuccess(medicine, action) {
    console.log("medicineReducer3.");
    console.log(action);
    const state  = {...medicine,
                       list       : action.medicines,
                       totalItems : action.total};
    return state;
}

//step 2: creating the reducer function for the first action....
export default function medicineReducer(medicine, action){

    console.log("medicineReducer");
    switch(action.type){
        case types.MEDICINES_LISTED_SUCCESS:
            console.log("medicineReducer2");
            return listedSuccess(medicine, action);
        default:
            return medicine;
    }
}
