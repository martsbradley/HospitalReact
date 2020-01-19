import { connect } from "react-redux";
import DrawIt from './drawIt.js';
import * as countActions from '../redux/actions/countActions';

import * as types from '../redux/actions/actionTypes';

function mapStateToProps(state) {
  return {
    count: state.count
  };
}

 // const mapDispatchToProps = dispatch => {
 //    return {
 //        increment: () => { dispatch(countActions.incrementAction());},
 //        reset:     () => { dispatch(countActions.resetAction());},
 //        decrement: () => { dispatch(countActions.decrementAction());}
 //    };
 // };
//
//
//
//
//
//

function saveCourse(history) {
    history.push("/patients/list");

    return function(dispatch) {
        dispatch({type: types.INCREMENT_COUNT});
        setTimeout(() => dispatch({type: types.INCREMENT_COUNT}), 1500);
    };
}

const mapDispatchToProps = {
   increment: countActions.incrementAction,
   reset:     countActions.resetAction,
   decrement: countActions.decrementAction,
   doit:     saveCourse,
}





export default connect(mapStateToProps, mapDispatchToProps)(DrawIt);
