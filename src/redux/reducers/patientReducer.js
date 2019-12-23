import * as types from '../actions/actionTypes';

function changePage(patient, action) {
    const patientState = {...patient,
                          pageNumber: action.pageNumber};
    return patientState;
}

//step 2: creating the reducer function for the first action....
export default function patientReducer(patient , action){

    switch(action.type){
        case types.PATIENTS_LISTED_SUCCESS:
            const patientState = {...patient,
                                 list       : action.patients,
                                 totalItems : action.total};
            return patientState;

        case types.PATIENTS_CHANGE_PAGE:
            return changePage(patient, action);
        default:
            return patient;
    }
}

