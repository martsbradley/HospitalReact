import medicineReducer from './medicineReducer';
import * as types from '../actions/actionTypes';

import {emptyMedicine} from '../initialstore';

describe('medicineReducer', () => {

    it('Pos: medicine listed', () => {

        const medicine = {totalItems   : 0,
                          pageNumber   : 1,
                          itemsPerPage : 5,
                          list         : [],
                          pageLoaded   : false,
                          current      : emptyMedicine,
                         };

        const action = {type: types.MEDICINES_LISTED_SUCCESS,
                        medicines: [],
                        total: 10};

        const nextState = medicineReducer(medicine, action);
        expect(nextState.totalItems).toEqual(10);
    });
});
