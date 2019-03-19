import React from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import {PrescriptionTable} from './prescriptiontable.js'
import {todayAsYYYYMMDD, getDobString} from './dateutils.js'
import Poster from './network'

export default class PatientEdit extends React.Component {
    constructor (props) {
        super(props)
        console.log("PatientEdit constructor " + Object.keys(this.props));
        console.log("PatientEdit gistId " + props.match.params.gistId);

        this.state = { error: false,
            patientId: props.match.params.gistId,
            loaded: false,
            patient: { forename: '',
                       surname: '',
                       dob: todayAsYYYYMMDD(),
                       prescription: []
            },
        }

        this.createLoadURL = this.createLoadURL.bind(this)
        this.loadPatient = this.loadPatient.bind(this)
        this.savePatient = this.savePatient.bind(this)

        this.handleFormChange = this.handleFormChange.bind(this)
        this.handleDateChange = this.handleDateChange.bind(this)

        this.clearValidationMessages = this.clearValidationMessages.bind(this)

        this.poster = new Poster(this.successfulPost,
                                 this.showValidationMessages,
                                 this.showAuthorizationErrorMessage ,
                                 this.showNetworkErrorMessage);
    }

    createLoadURL () {
        const patientId = this.state.patientId
        let result = `/firstcup/rest/hospital/patient/${patientId}`
        return result
    }

    createSaveURL () {
        return '/firstcup/rest/hospital/patient'
    }

    loadPatient () {
        let url = this.createLoadURL()

        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    this.setState({ error: true })
                    throw Error(response.statusText)
                }
            },
                networkError => {
                    console.log('Network Failure ' + networkError)
                }
            )
            .then(patient => {
                // There is on JSON Date
                // So date comes in as a "yyyy-MM-ddT00:00Z
                // Now get the yyyy-MM-dd part of the string only.
                //patient.dob = new Date(patient.dob).toISOString().split('T')[0];
                patient.dob = getDobString(patient.dob);

                this.setState({ patient: patient,
                    loaded: true
                })
            }
            )
            .catch(exn => {
                console.log('forget about it: ' + exn.statusText)
            })
    }

    showValidationMessages = (validations) => {

        const errors = validations.errors

        for (var i = 0; i < errors.length; i++) {
            const name = errors[i].field
            const message = errors[i].message
            const formField = document.querySelector("span[name='" + name + ".errors']")
            formField.innerText = message
        }
    }

    clearValidationMessages(aFieldName) {
        const formField = document.querySelector("span[name='" + aFieldName + ".errors']")
        formField.innerText = '';
    }

    successfulPost = () => {
        this.props.history.push('/patients/list')
    }

    showAuthorizationErrorMessage = () => {
        alert( "Authorization Error You are not authorized to save changes.");
    }

    showNetworkErrorMessage = () => {
        alert( "Network Error There was an issue with the network.");
    }

    savePatient (event) {
        event.preventDefault();

      //const administrator = this.props.auth.isAdministrator();
      //if (!administrator) {
      //    alert("Sorry only administrators can save their changes");
      //    return;
      //}
        console.log("-->savePatient  "+ Object.keys(this.props));
        console.log("Doit");
        //this.postData(this.createSaveURL(), this.state.patient)

        let payload = {...this.state.patient};
        payload.dob = payload.dob + "T00:00Z";

        this.poster.postData(this.createSaveURL(), payload);
    }


    componentDidMount () {
        this.loadPatient(this.state.patientId)
    }

    handleDateChange (event) {

        console.log("Date now has " + event.target.value);
        if (event.target.value === '') {
            console.log("Yea it was blank");

            let validations = {errors: [{field: "dob",message:"Date of Birth is mandatory"}]};

            this.showValidationMessages(validations);
        }
        else {
            this.clearValidationMessages("dob");
        }

        this.handleFormChange(event);
    }

    handleFormChange (event) {
        let patient = this.state.patient
        console.log("Handle change " + this.state.patient.dob);

        patient[event.target.name] = event.target.value
        this.setState({ patient })
    }

    render () {
        const error = this.state.error
        if (error) {
            return <p>There was an error calling the service</p>
        }

        const patient = this.state.patient;

        //Really should not need to do this.
        //there is a method to avoid rendering.
        if (patient.dob === null) {
            return "";
        }
        const pres = patient.prescription;
        const addPrescription = `/patients/${patient.id}/prescription/medicine`;
        const administrator = true;//this.props.auth.isAdministrator();

        const result = (
            <div>
            <form onSubmit={this.savePatient}>
                <div className="col-md-6 form-line">
                    <div className="form-group">
                        <label htmlFor="forename">Forename</label>
                        <input type="text" className="form-control" name="forename" value={patient.forename}
                        onChange={this.handleFormChange}/>
                        <span className="errors" name="forename.errors"></span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="surname">Surname</label>
                        <input type="text" className="form-control" name="surname" value={patient.surname}
                        onChange={this.handleFormChange}/>
                        <span className="errors" name="surname.errors"></span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="dob" >Date of Birth</label>
                        <input type="date" className="form-control" name="dob" value={patient.dob}
                        onChange={this.handleDateChange}/>
                        <span className="errors" name="dob.errors"></span>
                    </div>
                    <div className="form-group">
                        <PrescriptionTable list={pres} />
                    </div>
                    <div className="form-group">
                        <button type="submit">Submit</button>

                        <Link to="/patients/list"><button>Cancel</button></Link>
                        { administrator ? 
                          <Link to={`${addPrescription}`} ><button>Add Prescription</button></Link>
                          : null
                        }
                    </div>
                </div>
            </form>
            </div>)
        return result
    }
}

PatientEdit.propTypes = {
    history : PropTypes.object,
    match   : PropTypes.object,
    auth    : PropTypes.object
}
