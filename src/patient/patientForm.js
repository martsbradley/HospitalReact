import React,{useEffect, useState} from 'react'
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'
import {PrescriptionTable} from './prescription/prescriptiontable.js'
import {ImageTable} from '../imagetable.js'
import PatientInfo from './patient_info.js'
import Spinner from '../common/spinner'

export default function PatientForm({loadPatient,
                                     unLoadPatient,
                                     savePatient,
                                     clearValidations,
                                     validation,
                                     loading,
                                     loadPrescription,
                                     unLoadPrescription,
                                     ...props}) {

    // patient is an unnamed prop so that can have a constant named
    // patient.
    const [patient, setPatient] = useState({...props.patient});
    let title= 'New Patient';

    // Could not set the title value inside the effect
    // seems this happens after the initial rendering
    // and that caused enzyme to fail the test.
    // Enzyme 

    const editPatient = props.match && props.match.params.patientId;

    if (editPatient) {
        title = 'Edit Patient';
    }

    // The patient comes in from redux into the props and then
    // is stored inside the state effect.
    useEffect(() => {
        setPatient({...props.patient});

    },[props.patient]);

    //  This effect happens once only.
    useEffect(() => {
        clearValidations();

        // Load the patient when editing.
        if (editPatient) {
            const patientId = props.match.params.patientId;
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

        savePatient(patientToSave, props.history);
    }

    function handleFormChange (event) {
        console.log("changed");
        event.preventDefault();
        const { name, value } = event.target;

        // Below square braces are needed around the key [name]
        // to avoid it being given the key 'name'
        setPatient(prevPatient => ({...prevPatient,
                                   [name] : value }));
    }

    const addTablet       = `/patients/${patient.id}/tablet/select`;
    const addImage        = `/patients/${patient.id}/addimage`;


    const handleLoadPrescription = (id) => {
        console.log("handleLoadPrescription");
        loadPrescription(id);
        props.history.push(`/patients/${patient.id}/tablet/delete/${id}`);
    }

//  console.log("Before render the title is '" + title + "'"); 
//  console.log("Running useEffect");
//  console.log("in effect " + title);
    if (loading) return <Spinner/>;

    const result = (
        <div>
        <h1>{title}</h1>
        <form onSubmit={savePatientHandler}>
            <PatientInfo patient={patient}
                           validation={validation}
                           handleFormChange={handleFormChange}/>
            <div className="col-md-6 form-line">
                <div className="form-group">
                    <PrescriptionTable patientId={patient.id} 
                                       list={patient.prescriptions} 
                                       loadPrescription={handleLoadPrescription}
                                       unLoadPrescription={unLoadPrescription}/>
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
                    {editPatient ?
                        <>
                            <Link id="addtabs2" to={`${addTablet}`} ><button>Add Tablet</button></Link>
                            <Link id="addImg" to={`${addImage}`} ><button>Add Image</button></Link>
                        </>
                        : null}
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



