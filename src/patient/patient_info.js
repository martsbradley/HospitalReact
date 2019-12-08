
import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'

let PatientForm = ({ patient: patient, 
                     handleFormChange: handleFormChange, 
                     ...rest }) => {

  console.log("patient is a " + Object.keys(patient));
  console.log("handle... is a " + Object.keys(handleFormChange));
  return (

        <div className="col-md-6 form-line">
            <div className="form-group">
                <label htmlFor="forename">Forename</label>
                <input type="text" className="form-control" name="forename" value={patient.forename}
                onChange={handleFormChange}/>
                <span className="errors" name="forename"></span>
            </div>
            <div className="form-group">
                <label htmlFor="surname">Surname</label>
                <input type="text" className="form-control" name="surname" value={patient.surname}
                onChange={handleFormChange}/>
                <span className="errors" name="surname"></span>
            </div>
            <div className="form-group">
                <label htmlFor="dob" >Date of Birth</label>
                <input type="date" className="form-control" name="dob" value={patient.dob} 
                 onChange={handleFormChange}/>
                <span className="errors" name="dob"></span>
            </div>

        </div>
  );
}
export default PatientForm;