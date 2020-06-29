import React from 'react'
import PropTypes from 'prop-types';
//import {getValidationMessages} from '../validationmessage';

let PatientInfo = ({ patient,
                     handleFormChange,
                     validation}) => {

                      //console.log("here....??");
                      //console.log(patient);
    //const val = getValidationMessages(patient, "savePatient.patientBean", validation);

    //val['general'] = '';
    //           <span className="errors">{val.general}</span>
  return (
      <>
        <div className="col-md-6 form-line">
            <div className="form-group row">
              <label htmlFor="forename" className="col-sm-2 col-form-label">Forename</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" name="forename" value={patient.forename}
                onChange={handleFormChange}/>
                <span className="errors">{validation.forename}</span>
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="surname" className="col-sm-2 col-form-label">Surname</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" name="surname" value={patient.surname}
                onChange={handleFormChange}/>
                <span className="errors">{validation.surname}</span>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="dateOfBirth" className="col-sm-4 col-form-label">Date of Birth</label>
              <div className="col-sm-8">
                <input type="date" className="form-control" name="dateOfBirth" value={patient.dateOfBirth} 
                       onChange={handleFormChange}/>
                <span className="errors">{validation.dateOfBirth}</span>
              </div>
            </div>
        </div>
      </>
  );
}
PatientInfo.propTypes = {
    patient: PropTypes.object,
    handleFormChange: PropTypes.func,
    validation  : PropTypes.object
};
export default PatientInfo;
