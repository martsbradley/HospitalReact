import {medicinesPaged,createPrescription} from './medicineActions';
import * as medAPI from '../../api/medicine-api';
import * as types from './actionTypes';

jest.mock('../../api/medicine-api');

// eslint-disable-next-line
medAPI.loadMedicines = jest.fn((a, b) => {
    //console.log(`Mocked loadMedicines ${a} ${b}`);
    return Promise.resolve([]);
});

describe('medicineActions', () => {

    /* The action is a function that returns a function.
     * The returned function itself accepts a function.
     * Guessing that Redux Thunk calls the action
     * Then when the function is returned it calls that
     * function passing it the dispatch function.
     * 
     * loadMedicines returns a promise, that means
     * it is resolve/rejected but that happens asychronously
     * therefore the code needs to push the expectation code
     * into the event loop such that it will execute after
     * the promise is resolved */
    it('Pos: loadMedicines', (done) => {
        // eslint-disable-next-line
        medAPI.loadMedicines = jest.fn((a, b) => {
            //console.log(`Mocked loadMedicines ${a} ${b}`);
            return Promise.resolve({data: { medicines:[],
                                            total: 0}});
        });

        let functionReference = medicinesPaged(1,2, "");

        // eslint-disable-next-line
        let dispatch  = jest.fn((detail) => {
            //console.log("Dispatching >>> " + detail.type);
            //console.log(`detail ${detail.type}`);
        });

        functionReference(dispatch);
        setTimeout(() => {

            expect(dispatch.mock.calls[0][0].type).toBe(types.BEGIN_API_CALL);
            expect(dispatch.mock.calls[1][0].type).toBe(types.MEDICINES_LISTED_SUCCESS);
            done();
        }, 0);
    });

    it('Neg: loadMedicines', (done) => {

        medAPI.loadMedicines = jest.fn((a, b) => {
            return Promise.reject({'some':`${a} ${b} problem`});
        });

        let thunk = medicinesPaged(1,2, "");

        // eslint-disable-next-line
        let dispatch  = jest.fn((detail) => {
        });

        thunk(dispatch);

        setTimeout(() => {
            expect(dispatch.mock.calls[0][0].type).toBe(types.BEGIN_API_CALL);
            expect(dispatch.mock.calls[1][0].type).toBe(types.ERROR_SET);
            done();
        }, 0);
    });

    it('Pos: createPrescription', (done) => {
        // eslint-disable-next-line
        medAPI.savePrescription = jest.fn((a) => {
            //console.log(`Mocked savePrescription ${a}`);
            return Promise.resolve();
        });


        // eslint-disable-next-line
        let dispatch  = jest.fn((detail) => {
            //console.log("Dispatching >>> " + detail.type);
            //console.log(`detail ${detail.type}`);
        });

        const navFn = jest.fn();
        let thunk = createPrescription({},navFn);

        thunk(dispatch)

        setTimeout(() => {

            expect(dispatch.mock.calls[0][0].type).toBe(types.BEGIN_API_CALL);
            expect(dispatch.mock.calls[1][0].type).toBe(types.PRESCRIPTION_SAVED_SUCCESS);
            expect(navFn.mock.calls.length).toEqual(1);
            done();
        }, 0);
    });
});
