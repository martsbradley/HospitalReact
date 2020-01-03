import * as types from '../actions/actionTypes';

function changePage(patient, action) {
    const patientState = {...patient,
                          pageNumber: action.pageNumber};
    return patientState;
}

function currentPatientLoaded(patient, action){
    const patientState = {...patient,
                          current: action.payload};
    return patientState;
}

function unloadPatient(patient) {
    const patientState =  {...patient,
                              current : { forename: '',
                                      surname: '',
                                      dob: '',
                                      prescription: [],
                                      images: []
                                    },
                          };
     return patientState;
}

function listedSuccess(patient, action) {
    const patientState = {...patient,
                         list       : action.patients,
                         totalItems : action.total};
    return patientState;
}

//step 2: creating the reducer function for the first action....
export default function patientReducer(patient , action){

    switch(action.type){
        case types.PATIENT_CURRENT_LOADED_SUCCESS:
            return currentPatientLoaded(patient, action);

        case types.UNLOAD_PATIENT:
            return unloadPatient(patient);

        case types.PATIENTS_LISTED_SUCCESS:
            return listedSuccess(patient, action);

        case types.PATIENTS_CHANGE_PAGE:
            return changePage(patient, action);
        default:
            return patient;
    }
}

