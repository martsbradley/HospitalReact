import React from "react";
import { connect } from "react-redux";
import DrawIt from './drawIt.js';
import * as countActions from '../redux/actions/countActions';

////when declaring mapStateToProps be specific. request only the data your component needs.
////ownProps parameter contains the props that is related to this component. its not required right now so we are remoeving.
////mapStateToProps(state, ownProps) takes two arguments.
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