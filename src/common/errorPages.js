import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import { connect } from "react-redux";
import * as errorActions from '../redux/actions/errorActions';

function AuthError({clearError, ...props}) {
    return <>
               <h1>Auth Error</h1>
               <button onClick={clearError}>Reset Error</button>
           </>
}

function GenError({clearError, ...props}) {

    return <>
        <h1>General Error</h1>
        <button onClick={clearError}>Reset Error</button>
    </>
}


const mapStateToProps = null;

const mapDispatchToProps = {
    clearError : errorActions.errorClear
};

const AuthenticationError = connect(mapStateToProps, mapDispatchToProps)(AuthError);

const GeneralError = connect(mapStateToProps, mapDispatchToProps)(GenError);
export {AuthenticationError, GeneralError};
