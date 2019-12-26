import * as Actions from './actionTypes';
import login from '../../api/UserAPI';
import AuthenticationError from '../../api/Errors';
import * as ErrorActions from './errorActions';

const loginSuccessHandler = (dispatch) => {
    return function(loginDetail) {
        console.log("loginSuccessHandler");
        console.log(loginDetail);
        dispatch({ type: Actions.LOGIN_SUCCESS,
                   payload: loginDetail
        });
    }
}

const loginErrorHandler = (dispatch) => {
   return (e) => {
        console.log("Caught Error" + e);
        dispatch(ErrorActions.errorSet("/error"));
    }
};

export function userLoginAction(username, password) {
    const promise = login(username, password);

    return dispatch => {
        promise.then(loginSuccessHandler(dispatch))
               .catch(loginErrorHandler(dispatch))
     };
}
