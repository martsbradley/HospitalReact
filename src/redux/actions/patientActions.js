import * as Actions from './actionTypes';
import {loadPatients, loadPatient, savePatient} from '../../api/PatientAPI';
import {AuthenticationError} from '../../api/Errors';
import * as ErrorActions from './errorActions';
import {setValidationAction} from './validationActions';

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

function dispatchAuthError(dispatch) {
    console.log("Caught Authentication Error");
    console.log("dispatch is " + dispatch);
    dispatch(ErrorActions.errorSet("/error/authentication"));
}

function handleError(dispatch, e) {
    console.warn(e);
    if (e instanceof AuthenticationError) {
        console.log("Authentication Error");
        dispatch(ErrorActions.errorSet("/error/authentication"));
    }
    else {
        dispatch(ErrorActions.errorSet("/error"));
    }
}

const errorHandler = (dispatch) => {
   return (e) => {
        handleError(dispatch, e);
    }
};

/* This action immediately calls the async network calls.
 * When the response comes back the success/failure
 * handlers are called */
export function loadPatientsAction(startPage, itemsOnPage) {
    const promise = loadPatients(startPage, itemsOnPage);

    return dispatch => {
        promise.then(loadPatientsSuccessHandler(dispatch))
               .catch(errorHandler(dispatch))// FIXME, this is wrong, errorHandler returns a funciton
     };
}

export function unLoadPatientAction() {
    return { type: Actions.UNLOAD_PATIENT };
}

export function loadPatientAction(patientId) {
    const promise = loadPatient(patientId);

    return dispatch => {
        promise.then(loadPatientSuccessHandler(dispatch))
               .catch(e => { console.log("Here with error");
                             console.log(e);
                              errorHandler(dispatch);} )
     };
}

export function savePatientAction(patient, history) {
     const promise = savePatient(patient);

    return dispatch => {
            promise.then(result => {
                if (!result.isError) {
                    console.log("Saved patient");
                    console.log(result);
                    history.push("/patients/list");
                }
                else {
                    console.log("Save patient validation error");
                    console.log(result);
                    dispatch(setValidationAction(result.data));
                }
            })
           .catch(myError => {
               console.warn("Save error.");
               handleError(dispatch, myError);
           })
     };
}
