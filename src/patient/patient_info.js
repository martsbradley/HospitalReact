import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import {getValidationMessages} from '../validationmessage';

let PatientForm = ({ patient,
                     handleFormChange,
                     validation,
                     ...rest }) => {

    const val = getValidationMessages(patient, "savePatient.patientBean", validation);

    //val['general'] = '';
    //           <span className="errors">{val.general}</span>
  return (

        <div className="col-md-6 form-line">
            <div className="form-group">
                <label htmlFor="forename">Forename</label>
                <input type="text" className="form-control" name="forename" value={patient.forename}
                onChange={handleFormChange}/>
                <span className="errors">{val.forename}</span>
            </div>
            <div className="form-group">
                <label htmlFor="surname">Surname</label>
                <input type="text" className="form-control" name="surname" value={patient.surname}
                onChange={handleFormChange}/>
                <span className="errors">{val.surname}</span>
            </div>
            <div className="form-group">
                <label htmlFor="dob" >Date of Birth</label>
                <input type="date" className="form-control" name="dob" value={patient.dob} 
                 onChange={handleFormChange}/>
                <span className="errors">{val.dob}</span>
            </div>

        </div>
  );
}
export default PatientForm;