import * as Actions from './actionTypes';
import {loadMedicines, savePrescription, deletePrescription} from '../../api/medicine-api';
import {handleError} from './errorActions';


const makeLoadMedicinesSuccessHandler = 
     (activePage,filter) => dispatch => {

    return function(payload) {
        dispatch({ type       : Actions.MEDICINES_LISTED_SUCCESS,
                   medicines  : payload.data.medicines,
                   total      : payload.data.total,
                   activePage, 
                   filter, 
        });
    }
}

const savePrescriptionSuccessHandler = (dispatch) => {
    dispatch({ type       : Actions.PRESCRIPTION_SAVED_SUCCESS});
}

/* This action immediately calls the async network calls.
 * When the response comes back the success/failure
 * handlers are called */
export const medicinesPaged = (activePage, itemsOnPage, filter) => dispatch => 
{
    dispatch({type:Actions.BEGIN_API_CALL});

    const promise = loadMedicines(activePage, itemsOnPage, filter);

    const loadMedicinesSuccessHandler = makeLoadMedicinesSuccessHandler(activePage, filter);

    promise.then(loadMedicinesSuccessHandler(dispatch))
           .catch(e => { handleError(dispatch, e); 
    });
}

export const createPrescription = (prescription, navFn) => async (dispatch) => 
{
    dispatch({type:Actions.BEGIN_API_CALL});

    try {
        await savePrescription(prescription);

        savePrescriptionSuccessHandler(dispatch);
        navFn();
    }
    catch (e) {
       handleError(dispatch, e); 
    }
}

export function unLoadPrescription() {
    return { type: Actions.PRESCRIPTION_UNLOAD_CURRENT_SUCCESS};
}

export const deletePrescriptionAction = (prescriptionId/*, navFn*/) => async (dispatch) => 
{
    //dispatch({type:Actions.BEGIN_API_CALL});
    console.log(dispatch);

    try {
        await deletePrescription(prescriptionId);

        //unLoadPrescription(dispatch);
        //navFn();
    }
    catch (e) {
        console.log("deletePrescription error");
        console.log(e);
       //handleError(dispatch, e); 
    }
}
