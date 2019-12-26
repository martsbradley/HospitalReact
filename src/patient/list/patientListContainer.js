import React from "react";
import { connect } from "react-redux";
import PatientList from './patientList.js';
import * as patientActions from '../../redux/actions/patientActions';

function mapStateToProps(state) {
    const patient = state.patient;

    const result = {
        patients          : patient['list'],
        activePage        : patient['pageNumber'],
        itemsPerPage      : patient['itemsPerPage'],
        totalItemsCount   : patient['totalItems'],
        errorInfo         : state.error
    };

    return result;
}

const mapDispatchToProps = {
    loadPatients:  patientActions.loadPatientsAction,
    changePage  :  patientActions.changePageAction
}


export default connect(mapStateToProps, mapDispatchToProps)(PatientList);
