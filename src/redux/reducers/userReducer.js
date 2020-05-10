import * as types from '../actions/actionTypes';

function login(userDetails , payload) {
    const newState = { ...userDetails,
                         username          : payload.username,
                         userAuthenticated : true };

    return newState;
}

function logout(userDetails) {
    const newState = {...userDetails,
                         username          : '',
                         userAuthenticated : false }
    return newState;
}


//step 2: creating the reducer function for the first action....
export default function userReducer(userDetails , action){

    switch(action.type){
        case types.LOGIN_SUCCESS:
            return login(userDetails , action.payload);
        case types.LOGOUT_SUCCESS:
            return logout(userDetails);
        default:
            return userDetails;
    }
}

