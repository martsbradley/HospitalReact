import {loadMedicinesAction} from './medicineActions';
import * as medAPI from '../../api/medicine-api';

jest.mock('../../api/medicine-api');

medAPI.loadMedicines = jest.fn((a, b) => {
    console.log(`Mocked loadMedicines ${a} ${b}`);
    return Promise.resolve([]);
});

describe('medicineActions', () => {

    it('Normal Stuff works', () => {
        const value = 2 + 2;
        expect(value).toBeGreaterThan(3);
        expect(value).toBeGreaterThanOrEqual(3.5);
        expect(value).toBeLessThanOrEqual(4.5);
        expect(value).toBe(4);
    })
    it('loadMedicines', () => {

        const dispatch = (detail) => {console.log("dispatching ..." + detail)};

        let functionReference = loadMedicinesAction(1,2);

        functionReference (dispatch);
    });

    /* The action is a function that returns a function.
     * The returned function itself accepts a function.
     * Guessing that Redux Thunk calls the action
     * Then when the function is returned it calls that
     * function passing it the dispatch function.
     */
})


/*
export const loadPatientsAction = (startPage, itemsOnPage) => dispatch => 
{
    dispatch({type:Actions.BEGIN_API_CALL});

    const promise = loadPatients(startPage, itemsOnPage);

    promise.then(loadMedicinesSuccessHandler(dispatch))
            .catch(e => { handleError(dispatch, e);
    });
}*/