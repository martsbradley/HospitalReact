import countReducer from './countReducers';
import patientReducer from './patientReducer';
import errorReducer from './errorReducer';
import validationReducer from './validationReducer';
import userReducer from './userReducer';
import apiStatusReducer from './apiStatusReducer.js';
import medicineReducer from './medicineReducer.js';

export default function appReducer(state, action) {
    return {
        "count"       :  countReducer(state.count, action),
        "patient"     :  patientReducer(state.patient, action),
        "error"       :  errorReducer(state.error, action),
        "userStatus"  :  userReducer(state.userStatus, action),
        "validation"  :  validationReducer(state.validation, action),
        "apiCalls"    :  apiStatusReducer(state.apiCalls, action),
        "medicine"    :  medicineReducer(state.medicine, action),
    };
}
