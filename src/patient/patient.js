import React from 'react'
import {Route, Redirect, Switch} from 'react-router-dom'
import PatientEdit from './patient_edit.js'
import PatientNew from './patient_new.js'
import PatientForm from './patientFormContainer'
import PatientList from './list/patientListContainer'
import PropTypes from 'prop-types';
import Prescription from './prescription/prescription.js'
import ErrorBoundary from '../errorboundary.js'
import AddImage from '../addimage.js'
import { connect } from "react-redux";

function PatientTable({errorInfo, ...props}) {

    if (errorInfo !== "") {

        return <Redirect to={errorInfo} />
    }

    let result = (
    <ErrorBoundary>
        <Switch>
            <Route path="/patients/list"                    component={PatientList} />
            <Route path="/patients/:patientId/prescription" component={Prescription} />
            <Route path="/patients/:patientId/addimage"     component={AddImage} />
            <Route path="/patients/edit/:gistId"            component={PatientEdit} />
            <Route path="/patients/form/:gistId"            component={PatientForm} />
            <Route path="/patients/new/"                    component={PatientNew} />
        </Switch>
    </ErrorBoundary>
    )
    return result;
}

function mapStateToProps(state) {
    const patient = state.patient;

    const result = {
        errorInfo         : state.error
    };

    return result;
}

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(PatientTable);
