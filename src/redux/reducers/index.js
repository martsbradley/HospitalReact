import { combineReducers } from 'redux';
import countReducer from './countReducers';
// called as courses, because of default export from courseReducer
//const rootReducer = combineReducers({
    //incrementReducer
//});// it will combine all reducers...



function appReducer(state, action) {
    return {
        "count": countReducer(state.count, action)
        };
}




export default appReducer;
