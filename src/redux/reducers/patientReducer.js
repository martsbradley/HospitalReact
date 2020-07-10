import * as types from '../actions/actionTypes';
import assert  from 'assert';
import {emptyPatient} from '../initialstore';

function changePage(patient, action) {
    const patientState = {...patient,
                          pageNumber: action.pageNumber};
    return patientState;
}

function currentPatientLoaded(patient, action){
    const patientState = {...patient,
                          current: action.payload};
    return patientState;
}

function unloadPatient(patient) {


    const patientState = {...patient,
                          'current': {...emptyPatient}};

  //console.log("Before unloadPatient")
  //console.log(patient);
  //console.log("After unloadPatient")
  //console.log(patientState);
    return patientState;
}

function listedSuccess(patient, action) {
    const patientState = {...patient,
                         list       : action.patients,
                         totalItems : action.total};
    return patientState;
}

function loadPrescription(patient, action){

    console.log("loadPrescription reducer");
    const currentPrescription = 
        patient.current.prescriptions.find(
            p => p.prescriptionId === action.prescriptionId);

    assert(currentPrescription != undefined);
    assert(currentPrescription != null);

    const patientState = {...patient,
                          prescription : currentPrescription};

    return patientState;
}

function unLoadPrescription(patient){

    const patientState = {...patient,
                          prescription : { prescriptionId: '',
                                          startDate     : '',
                                          endDate       : '',
                                          amount        : '',
                                          selectedMedId : ''}};
    return patientState;
}

//step 2: creating the reducer function for the first action....
export default function patientReducer(patient , action){

    switch(action.type){
        case types.PATIENT_CURRENT_LOADED_SUCCESS:
            return currentPatientLoaded(patient, action);

        case types.UNLOAD_PATIENT:
            return unloadPatient(patient);

        case types.PATIENTS_LISTED_SUCCESS:
            return listedSuccess(patient, action);

        case types.PATIENTS_CHANGE_PAGE:
            return changePage(patient, action);

        case types.PRESCRIPTION_LOAD_CURRENT:
            return loadPrescription(patient, action);

        case types.PRESCRIPTION_UNLOAD_CURRENT_SUCCESS:
            return unLoadPrescription(patient);
        default:
            return patient;

    }
}

