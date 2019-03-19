import React from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import {PrescriptionTable} from './prescriptiontable.js'
import {todayAsYYYYMMDD, getDobString} from './dateutils.js'
import Poster from './network'

class Popup extends React.Component {
  render() {
    return (
      <div className='popup'>
        <div className='popup_inner'>
          <h1>{this.props.title}</h1>
             {this.props.message} 
            <br/>
            <br/>
            <button onClick={this.props.closePopup}>Ok</button>
        </div>
      </div>
    );
  }
}

export default class PatientNew extends React.Component {
    constructor (props) {
        super(props)
        console.log("PatientNew constructor " + Object.keys(props));

        this.state = { error: false,
            patient: { 
                       id: -1,
                       forename: '',
                       surname: '',
                       dob: todayAsYYYYMMDD(),
                       rowVersion: 1,
                       prescription: []
            },
            showPopup: false,
            showPopupTitle: "title here",
            showPopupMessage: "message here."
        }

        this.handleFormChange = this.handleFormChange.bind(this)
        this.handleDateChange = this.handleDateChange.bind(this)
        this.save             = this.save.bind(this)
        this.showValidationMessages = this.showValidationMessages.bind(this)
        this.clearValidationMessages = this.clearValidationMessages.bind(this)

        this.poster = new Poster(this.successfulPost,
                                 this.showValidationMessages,
                                 this.showAuthorizationErrorMessage,
                                 this.showNetworkErrorMessage);
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

    save(event) {
        event.preventDefault()
        console.log("Hit save");

        let payload = {...this.state.patient};
        payload.dob = payload.dob + "T00:00Z";

        this.poster.postData(this.createSaveURL(), payload);
    }

    successfulPost = () => {
        this.props.history.push('/patients/list')
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

        patient[event.target.name] = event.target.value
        this.setState({ patient })
    }

    togglePopup = () => {
         this.setState({
              showPopup: !this.state.showPopup
            });
    }

    showAuthorizationErrorMessage = () => {
        this.showMessage( "Authorization Error", "You are not authorized to save changes.");
    }

    showNetworkErrorMessage = () => {
        this.showMessage( "Network Error", "There was an issue with the network.");
    }

    showMessage = (title, message) => {
        this.setState({
             showPopup: !this.state.showPopup,
             showPopupTitle: title,
             showPopupMessage: message
        });
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
            {this.state.showPopup ? 
                <Popup title={this.state.showPopupTitle}
                       message={this.state.showPopupMessage}
                       closePopup={this.togglePopup}
                />
                : null
            }
            </div>)
        return result
    }
}

PatientNew.propTypes = {
    history : PropTypes.object,
    match   : PropTypes.object
}
