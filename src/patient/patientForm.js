import React,{useEffect, useState} from 'react'
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'
import {PrescriptionTable} from './prescription/prescriptiontable.js'
import {ImageTable} from '../imagetable.js'
import PatientFields from './patient_info.js'

export default function PatientForm({loadPatient,
                                     unLoadPatient,
                                     savePatient,
                                     clearValidations,
                                     validation,
                                     ...props}) {


    // patient is an unnamed prop so that can have a constant named
    // patient.
    const [patient, setPatient] = useState({...props.patient});

    // The patient comes in from redux into the props and then
    // is stored inside the state effect.
    useEffect(() => {
        setPatient(props.patient);

    },[props.patient]);

    //  This effect happens once only.
    useEffect(() => {
        console.log("useEffect");
        clearValidations();

        // Load the patient when editing.
        const patientId = props.match.params.patientId;
        if (patientId !== undefined) {
            loadPatient(patientId);
        }

        return () => unLoadPatient();
    },[]);

    function savePatientHandler (event) {
        event.preventDefault();

        // Remove the images from as this is not
        // part of the patient type on the server
        const patientToSave= {...patient};
        delete patientToSave.images;

        savePatient(patientToSave);
    }

    function handleFormChange (event) {
        event.preventDefault();
        const { name, value } = event.target;

        // Below square braces are needed around the key [name]
        // to avoid it being given the key 'name'
        setPatient(prevPatient => ({...prevPatient,
                                   [name] : value }));
    }

    const addPrescription = `/patients/${patient.id}/prescription/medicine`;
    const addImage        = `/patients/${patient.id}/addimage`;

    const title = 'Edit Patient';

    const result = (
        <div>
        <h1>{title}</h1>
        <form onSubmit={savePatientHandler}>
            <PatientFields patient={patient}
                           validation={validation}
                           handleFormChange={handleFormChange}/>
            <div className="col-md-6 form-line">
                <div className="form-group">
                    <PrescriptionTable list={patient.prescriptions} />
                </div>
                <div className="form-group">
                    <ImageTable list={patient.images} />
                </div>

                <div className="form-group">
                    <span className="errors" name="page.error"></span>
                </div>

                <div className="form-group">
                    <button type="submit">Submit</button>

                    <Link to="/patients/list"><button>Cancel</button></Link>
                    <Link to={`${addPrescription}`} ><button>Add Prescription</button></Link>
                    <Link to={`${addImage}`} ><button>Add Image</button></Link>
                </div>
            </div>
        </form>
        </div>)
    return result
}

PatientForm.propTypes = {
    history : PropTypes.object,
    match   : PropTypes.object
}
