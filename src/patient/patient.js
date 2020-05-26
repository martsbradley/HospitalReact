import React from 'react'
import {Route, Redirect, Switch} from 'react-router-dom'
import PatientForm from './patientFormContainer'
import PatientList from './list/patientListContainer'
import PropTypes from 'prop-types';
import Prescription from './prescription/prescription.js'
import TabletDelete from './tablet/delete.js'
import ErrorBoundary from '../errorboundary.js'
import AddImage from '../addimage.js'
import TabletWizard from './tablet';
import { connect } from "react-redux";

function PatientTable({errorInfo}) {

    if (errorInfo !== "") {

        return <Redirect to={errorInfo} />
    }

    let result = (
    <ErrorBoundary>
        <Switch>
            <Route path="/patients/list"                    component={PatientList} />
            <Route path="/patients/:patientId/prescription" component={Prescription} />
            <Route path="/patients/:patientId/addimage"     component={AddImage} />
            <Route path="/patients/form/:patientId"         component={PatientForm} />
            <Route path="/patients/new"                     component={PatientForm} />
            <Route path="/patients/:patientId/tablet/delete/:id" component={TabletDelete} />
            <Route path="/patients/:patientId/tablet"       component={TabletWizard} />
        </Switch>
    </ErrorBoundary>
    )
    return result;
}
PatientTable.propTypes = {
    errorInfo: PropTypes.string
};

function mapStateToProps(state) {

    const result = {
        errorInfo         : state.error
    };

    return result;
}

const mapDispatchToProps = null;


export default connect(mapStateToProps, mapDispatchToProps)(PatientTable);
