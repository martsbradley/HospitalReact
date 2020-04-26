import * as Actions from './actionTypes';
import {loadPatients, loadPatient, savePatient} from '../../api/PatientAPI';
import {setValidationAction} from './validationActions';
import {handleError} from './errorActions';

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
    console.log("Thats done");

    return function(payload) {
        dispatch({ type: Actions.PATIENT_CURRENT_LOADED_SUCCESS,
                   payload
        });
    }
}


/* This action immediately calls the async network calls.
 * When the response comes back the success/failure
 * handlers are called */
export const loadPatientsAction = (startPage, itemsOnPage) => dispatch => 
{
    dispatch({type:Actions.BEGIN_API_CALL});

    const promise = loadPatients(startPage, itemsOnPage);

    promise.then(loadPatientsSuccessHandler(dispatch))
            .catch(e => { handleError(dispatch, e);
    });
}

export function unLoadPatientAction() {
    return { type: Actions.UNLOAD_PATIENT };
}

export const loadPatientAction = (patientId) => dispatch => {
    dispatch({type:Actions.BEGIN_API_CALL});
    const promise = loadPatient(patientId);

    promise.then(loadPatientSuccessHandler(dispatch))
           .catch(e => 
        {
             handleError(dispatch, e);
        }
    );
};

export function savePatientAction(patient, history) {
    const promise = savePatient(patient);

    return dispatch => {
        dispatch({type:Actions.BEGIN_API_CALL});

        promise.then(result => {
            console.log("Received valiation errors");
            console.log(result);

            if (result.isError) {
                dispatch(setValidationAction(result.data));
            }
            else {
                dispatch({ type: Actions.PATIENTS_SAVED_SUCCESS });
                history.push("/patients/list");
            }
        })
        .catch(myError => {
            console.warn("Save error.");
            handleError(dispatch, myError);
        })
     };
}
