import { connect } from "react-redux";
import PatientForm from './patientForm'
import * as patientActions from '../redux/actions/patientActions';
import * as validationActions from '../redux/actions/validationActions';

function mapStateToProps(state) {
    const patient = state.patient.current;

    const result = {
        patient,
        validation : state.validation
    };

    return result;
}



/*
 Story is that here I need to shift the page when the save patient is a success.
 so need to change the savePatient below to do that.

 pass a navigation function into the savePatientAction, the action will call that
 navigation function

        history.push("/courses");
*/

function myFn(dispatch, history) {
    return function(patient) {
        dispatch(patientActions.savePatientAction(patient, history));
    }
}



const mapDispatchToProps = (dispatch, ownProps) => {
   return {
       //increment: () => { dispatch(countActions.incrementAction());},
       loadPatient   :   (id) => { dispatch(patientActions.loadPatientAction(id))},
       unLoadPatient :   () => { dispatch(patientActions.unLoadPatientAction())},
       //savePatient   : (pat) => { dispatch(patientActions.savePatientAction(pat)) },
       savePatient   :   myFn(dispatch, ownProps.history),
       clearValidations: () => { dispatch(validationActions.clearValidationAction()) }
   };
}





/*
const mapDispatchToProps = {
    loadPatient   :  patientActions.loadPatientAction,
    unLoadPatient :  patientActions.unLoadPatientAction,
    savePatient   :  patientActions.savePatientAction,
    clearValidations: validationActions.clearValidationAction
}*/


export default connect(mapStateToProps, mapDispatchToProps)(PatientForm);
