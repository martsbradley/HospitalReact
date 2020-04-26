import React from 'react'
import PropTypes from 'prop-types';
//import {getValidationMessages} from '../validationmessage';

let PatientInfo = ({ patient,
                     handleFormChange,
                     validation}) => {

                        console.log("here....??");
                        console.log(patient);
    //const val = getValidationMessages(patient, "savePatient.patientBean", validation);

    //val['general'] = '';
    //           <span className="errors">{val.general}</span>
  return (

        <div className="col-md-6 form-line">
            <div className="form-group">
                <label htmlFor="forename">Forename</label>
                <input type="text" className="form-control" name="forename" value={patient.forename}
                onChange={handleFormChange}/>
                <span className="errors">{validation.forename}</span>
            </div>
            <div className="form-group">
                <label htmlFor="surname">Surname</label>
                <input type="text" className="form-control" name="surname" value={patient.surname}
                onChange={handleFormChange}/>
                <span className="errors">{validation.surname}</span>
            </div>
            <div className="form-group">
                <label htmlFor="dateOfBirth" >Date of Birth</label>
                <input type="date" className="form-control" name="dateOfBirth" value={patient.dateOfBirth} 
                       onChange={handleFormChange}/>
                <span className="errors">{validation.dateOfBirth}</span>
            </div>

        </div>
  );
}
PatientInfo.propTypes = {
    patient: PropTypes.object,
    handleFormChange: PropTypes.func,
    validation  : PropTypes.array
};
export default PatientInfo;