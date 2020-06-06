import React from 'react'
import {Route, Redirect, Switch} from 'react-router-dom'
import PatientForm from './patientFormContainer'
import PatientList from './list/patientListContainer'
import PropTypes from 'prop-types';
import Prescription from './prescription/prescription.js'
import TabletDelete from './tablet/delete-container.js'
import ErrorBoundary from '../errorboundary.js'
import AddImage from '../addimage.js'
import TabletWizard from './tablet';
import {connect} from "react-redux";

function PatientTable({errorInfo}) {

    if (errorInfo !== "") {

        return <Redirect to={errorInfo} />
    }

    let result = (
    <ErrorBoundary>
        <Switch>
            <Route path="/patient"     exact               component={PatientList} />
            <Route path="/patient/new" exact               component={PatientForm} />
            <Route path="/patient/:patientId"  exact       component={PatientForm} />
            <Route path="/patient/:patientId/prescription" component={Prescription} />
            <Route path="/patient/:patientId/addimage"     component={AddImage} />
            <Route path="/patient/:patientId/tablet/delete/:prescriptionId" 
                                                           component={TabletDelete} />
            <Route path="/patient/:patientId/tablet"       component={TabletWizard} />
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
        errorInfo   : state.error,
    };

    return result;
}

const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(PatientTable);

