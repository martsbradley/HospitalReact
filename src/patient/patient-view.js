import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types';

export default function PatientView({patient}) {
    const addTablet  = `/patient/${patient.id}/tablet/select`;
    const edit       = `/patient/${patient.id}/edit`;
    return (<>
              <div className="col-md-6">

                <div className="row">
                  <div className="col">
                    Name: {patient.forename} {patient.surname}
                  </div>
                  <div className="col">
                    Born: {patient.dateOfBirth}
                  </div>
                  <div className="col-md-auto">
                    <Link to={edit}><i className="fas fa-edit"></i></Link>
                  </div>
                </div>
              </div>
            <Link to="/patient"><button>Cancel</button></Link>
            <Link to={`${addTablet}`} ><button>Add Tablet</button></Link>
            </>);
}

PatientView.propTypes = {
    patient: PropTypes.object 
};
