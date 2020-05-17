import * as Actions from './actionTypes';
import {loadMedicines} from '../../api/medicine-api';
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


