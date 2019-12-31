import { combineReducers } from 'redux';
import countReducer from './countReducers';
import patientReducer from './patientReducer';
import errorReducer from './errorReducer';
import validationReducer from './validationReducer';
import userReducer from './userReducer';

export default function appReducer(state, action) {
    return {
        "count"     :  countReducer(state.count, action),
        "patient"   :  patientReducer(state.patient, action),
        "error"     :  errorReducer(state.error, action),
        "userStatus":  userReducer(state.userStatus, action),
        "validation":  validationReducer(state.validation, action)
        };
}
