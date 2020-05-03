import * as Actions from './actionTypes';
import {loadMedicines} from '../../api/medicine-api';
import {handleError} from './errorActions';

const loadMedicinesSuccessHandler = (dispatch) => {

    return function(payload) {
        dispatch({ type: Actions.MEDICINES_LISTED_SUCCESS,
                   medicines: payload.data.medicines,
                   total:     payload.data.total,
        });
    }
}

/* This action immediately calls the async network calls.
 * When the response comes back the success/failure
 * handlers are called */
export const loadMedicinesAction = (startPage, itemsOnPage) => dispatch => 
{
    dispatch({type:Actions.BEGIN_API_CALL});

    const promise = loadMedicines(startPage, itemsOnPage);

    promise.then(loadMedicinesSuccessHandler(dispatch))
           .catch(e => { 
       handleError(dispatch, e);
    }
    );
}
