import { connect } from "react-redux";
import PatientForm from './patientForm'
import * as patientActions from '../redux/actions/patientActions';
import * as validationActions from '../redux/actions/validationActions';

function mapStateToProps(state) {
    return {
        patient    : state.patient.current,
        validation : state.validation,
        loading    : state.apiCalls != 0,
    };
}

const mapDispatchToProps = {
       loadPatient        : patientActions.loadPatientAction,
       unLoadPatient      : patientActions.unLoadPatientAction,
       clearValidations   : validationActions.clearValidationAction,
       savePatient        : patientActions.savePatientAction,
       loadPrescription   : patientActions.loadPrescription,
       unLoadPrescription : patientActions.unLoadPrescription,
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientForm);
