import * as types from "../actions/actionTypes";

function actionTypeEndsInSuccess(type) {
  return type.substring(type.length - 8) === "_SUCCESS";
}

export default function apiStatusReducer(
            state,
            action) {

    if (action.type === types.BEGIN_API_CALL) {
        //console.log(`Begin state ${state} ${newState}`);

        return ++state;
    } 
    else if (
        action.type === types.VALIDATION_SET ||
        action.type === types.API_CALL_ERROR ||
        actionTypeEndsInSuccess(action.type)
    ) {
        //let newState = state - 1;
        //console.log(`End state ${state} ${newState}`);
        return --state;
    }

  return state;
}
