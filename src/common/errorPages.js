import React from 'react'
import { connect } from "react-redux";
import * as errorActions from '../redux/actions/errorActions';
import PropTypes from 'prop-types';

function AuthError({clearError}) {
    return <>
               <h1>Auth Error</h1>
               <button onClick={clearError}>Reset Error</button>
           </>
}

AuthError.propTypes = {
    clearError: PropTypes.func
};

function GenError({clearError}) {

    return <>
        <h1>General Error</h1>
        <button onClick={clearError}>Reset Error</button>
    </>
}

GenError.propTypes = {
    clearError: PropTypes.func
};


const mapStateToProps = null;

const mapDispatchToProps = {
    clearError : errorActions.errorClear
};

const AuthenticationError = connect(mapStateToProps, mapDispatchToProps)(AuthError);

const GeneralError = connect(mapStateToProps, mapDispatchToProps)(GenError);
export {AuthenticationError, GeneralError};
