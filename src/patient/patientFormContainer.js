import { connect } from "react-redux";
import PatientForm from './patientForm'
import * as patientActions from '../redux/actions/patientActions';
import * as validationActions from '../redux/actions/validationActions';

function mapStateToProps(state) {

    return {
        patient    : state.patient.current,
        validation : state.validation
    };
}

/*
 *   After saving, savePatientAction uses the history object to change the page.
 */
function dispatchSavePatient(dispatch, history) {
    return function(patient) {
        dispatch(patientActions.savePatientAction(patient, history));
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
   return {
       loadPatient   :   (id) => { dispatch(patientActions.loadPatientAction(id))},
       unLoadPatient :   () => { dispatch(patientActions.unLoadPatientAction())},
       savePatient   :   dispatchSavePatient(dispatch, ownProps.history),
       clearValidations: () => { dispatch(validationActions.clearValidationAction()) }
   };
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientForm);
