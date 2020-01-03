import { connect } from "react-redux";
import DrawIt from './drawIt.js';
import * as countActions from '../redux/actions/countActions';

function mapStateToProps(state) {
  return {
    count: state.count
  };
}

const mapDispatchToProps = dispatch => {
   return {
       increment: () => { dispatch(countActions.incrementAction());},
       reset:     () => { dispatch(countActions.resetAction());},
       decrement: () => { dispatch(countActions.decrementAction());}
   };
};


export default connect(mapStateToProps, mapDispatchToProps)(DrawIt);
