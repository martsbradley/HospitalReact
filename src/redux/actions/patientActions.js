import * as Actions from './actionTypes';
import {loadPatients, loadPatient, savePatient} from '../../api/PatientAPI';
import AuthenticationError from '../../api/Errors';
import * as ErrorActions from './errorActions';

export function changePageAction(pageNumber) {
    return { type: Actions.PATIENTS_CHANGE_PAGE,
             pageNumber};
}

const loadPatientsSuccessHandler = (dispatch) => {
    return function([patients, total]) {
        dispatch({ type: Actions.PATIENTS_LISTED_SUCCESS,
                 patients,
                 total
        });
    }
}

const loadPatientSuccessHandler = (dispatch) => {
    return function(payload) {
        dispatch({ type: Actions.PATIENT_CURRENT_LOADED_SUCCESS,
                   payload
        });
    }
}

const errorHandler = (dispatch) => {
   return (e) => {
        if (e instanceof AuthenticationError) {
            console.log("Caught Authentication Error");
            console.log("dispatch is " + dispatch);
            dispatch(ErrorActions.errorSet("/error/authentication"));
        }
        else {
            console.log("Failed man" + e);
            console.log("dispatch is " + dispatch);
            dispatch(ErrorActions.errorSet("/error"));
        }
    }
};

/* This action immediately calls the async network calls.
 * When the response comes back the success/failure
 * handlers are called */
export function loadPatientsAction(startPage, itemsOnPage) {
    const promise = loadPatients(startPage, itemsOnPage);

    return dispatch => {
        promise.then(loadPatientsSuccessHandler(dispatch))
               .catch(errorHandler(dispatch))
     };
}

export function unLoadPatientAction() {
    return { type: Actions.UNLOAD_PATIENT };
}

export function loadPatientAction(patientId) {
    const promise = loadPatient(patientId);

    return dispatch => {
        promise.then(loadPatientSuccessHandler(dispatch))
               .catch(errorHandler(dispatch))
     };
}
export function savePatientAction(patient) {
     const promise = savePatient(patient);

    return dispatch => {
        console.log("Saved patient");
     };
}
