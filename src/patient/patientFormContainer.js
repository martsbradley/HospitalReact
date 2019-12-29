import React from "react";
import { connect } from "react-redux";
import PatientForm from './patientForm'
import * as patientActions from '../redux/actions/patientActions';

function mapStateToProps(state) {
    const patient = state.patient.current;

    const result = {
        patient
    };

    return result;
}

const mapDispatchToProps = {
    loadPatient   :  patientActions.loadPatientAction,
    unLoadPatient :  patientActions.unLoadPatientAction,
    savePatient   :  patientActions.savePatientAction
}


export default connect(mapStateToProps, mapDispatchToProps)(PatientForm);
