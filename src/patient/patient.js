import React,{useEffect} from 'react'
import {Route, Switch, useRouteMatch} from 'react-router-dom'
import PatientForm from './patientFormContainer'
import PatientView from './patient-view-container'
import PropTypes from 'prop-types';
import Prescription from './prescription/prescription.js'
import TabletDelete from './tablet/delete-container.js'
import AddImage from '../addimage.js'
import TabletWizard from './tablet';
import * as patientActions from '../redux/actions/patientActions';
import {connect} from "react-redux";

function Patient({loadPatient, unLoadPatient}) {

    let match = useRouteMatch();

    useEffect(() => {
        const patientId = match.params.patientId;
        loadPatient(patientId);

        return () => unLoadPatient();
    },[]);

    return (
        <>
        <Route path={`${match.path}`}    exact         component={PatientView} />
        <Switch>
            <Route path={`${match.path}/edit`}         component={PatientForm} />
            <Route path={`${match.path}/prescription`} component={Prescription} />
            <Route path={`${match.path}/addimage`}     component={AddImage} />
            <Route path={`${match.path}/tablet/delete/:prescriptionId`}
                                                       component={TabletDelete} />
            <Route path={`${match.path}/tablet`}       component={TabletWizard} />
        </Switch>
        </>);
}

Patient.propTypes = {
    loadPatient: PropTypes.func,
    unLoadPatient: PropTypes.func,
};

const mapDispatchToProps = {
       loadPatient        : patientActions.loadPatientAction,
       unLoadPatient      : patientActions.unLoadPatientAction,
}

export default connect(null, mapDispatchToProps)(Patient);
