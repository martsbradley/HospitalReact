import React from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import {PrescriptionTable} from './prescriptiontable.js'
import {todayAsYYYYMMDD, getDobString} from './dateutils.js'

export default class PatientNew extends React.Component {
    constructor (props) {
        super(props)

        this.state = { error: false,
            patient: { forename: '',
                       surname: '',
                       dob: todayAsYYYYMMDD(),
                       prescription: []
            },
        }

        this.handleFormChange = this.handleFormChange.bind(this)
        this.handleDateChange = this.handleDateChange.bind(this)
        this.save             = this.save.bind(this)
        this.postData         = this.postData.bind(this)
        this.showValidationMessages = this.showValidationMessages.bind(this)
        this.clearValidationMessages = this.clearValidationMessages.bind(this)
    }

    createSaveURL () {
        return  '/firstcup/rest/hospital/patient'
    }

    showValidationMessages (validations) {

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

    postData (url, patient) {
        let payload = {...patient};
        console.log("payload is " + payload);
        payload.dob = payload.dob + "T00:00Z";
        console.log("payload is " + payload);

        fetch(url, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(
            response => {
                if (response.ok) {
                    return response.json()
                } else {
                    let json_errors = response.json()
                    json_errors.then(data => {
                        this.showValidationMessages(data)
                    })
                    throw Error(response.statusText)
                }
            },
            networkError => {
                alert('Network Failure ' + networkError)
            }
        )
        .then(() => {
            this.props.history.push('/patients/list')
        })
        .catch(() => {
            console.log("There was an error");
        })
    }

    save(event) {
        event.preventDefault()
        this.postData(this.createSaveURL(), this.state.patient)
    }

    componentDidMount () {
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
        console.log("Hit here");
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

        const result = (
            <div>
            <form onSubmit={this.save}>
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
                        <button type="submit" >Submit</button>
                        <Link to="/patients/list"><button>Cancel</button></Link>
                        <Link to={`${addPrescription}`} ><button>Add Prescription</button></Link>
                    </div>
                </div>
            </form>
            </div>)
        return result
    }
}

PatientNew.propTypes = {
    history : PropTypes.object,
    match   : PropTypes.object
}
