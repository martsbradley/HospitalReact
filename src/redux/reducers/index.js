import { combineReducers } from 'redux';
import countReducer from './countReducers';
import patientReducer from './patientReducer';
// called as courses, because of default export from courseReducer
//const rootReducer = combineReducers({
    //incrementReducer
//});// it will combine all reducers...



function appReducer(state, action) {
    return {
        "count": countReducer(state.count, action),
        "patient": patientReducer(state.patient, action)
        };
}




export default appReducer;
