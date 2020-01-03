import React from 'react'
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom'
import {PrescriptionTable} from './prescription/prescriptiontable.js'
import {ImageTable} from '../imagetable.js'
import {todayAsYYYYMMDD, getDobString} from '../dateutils.js'
import {postGeneric} from '../network'
import PopupMessage from '../popup_message'
import {showPrefixValidationMessages} from '../validationmessage'
import PatientForm from './patient_info.js'

export default class PatientEdit extends React.Component {
    constructor (props) {
        super(props)
        console.log("PatientEdit constructor " + Object.keys(this.props));
        console.log("PatientEdit gistId " + props.match.params.gistId);

        this.state = { error: false,
            success: false,
            patientId: props.match.params.gistId,
            patient: { forename: '',
                       surname: '',
                       dob: todayAsYYYYMMDD(),
                       prescription: []
            },
            images: [],
            showPopup: false,
            showPopupTitle: "title here",
            showPopupMessage: "message here."
        }

        this.handleFormChange = this.handleFormChange.bind(this)
        this.handleDateChange = this.handleDateChange.bind(this)
    }


    loadPatient = () => {

     const patientId = this.state.patientId
     const loadPatient = fetch(`/rest/hospital/patient/${patientId}`);
     const loadImages = fetch(`/rest/hospital/patient/${patientId}/images`);

     Promise.all([loadPatient, loadImages])
      .then(responses => {
        // All the headers have arrived.
        if (responses[0].ok && responses[1].ok) {
          return Promise.all([responses[0].json(), responses[1].json()])
        } else {
          throw Error([responses[0].statusText(), responses[1].statusText()])
        }
      },
      networkError => {
        alert('Network Failure ' + networkError)
      }
      )
      .then(dataArray => {
        // The data from the response bodies has arrived.
        const patient = dataArray[0];
        const images  = dataArray[1];


        // There is on JSON Date
        // So date comes in as a "yyyy-MM-ddT00:00Z
        // Now get the yyyy-MM-dd part of the string only.
        //patient.dob = new Date(patient.dob).toISOString().split('T')[0];
        patient.dob = getDobString(patient.dob);

        this.setState({ patient: patient,
                        images: images
        });
      }
      )
      .catch(() => {
        alert('There were errors')
      })
    }

    showNetworkErrorMessage = () => {
        this.showMessage( "Network Error", "There was an issue with the network.");
    }
    togglePopup = () => {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }

    showMessage = (title, message) => {
        this.setState({
             showPopup: !this.state.showPopup,
             showPopupTitle: title,
             showPopupMessage: message
        });
    }

    savePatient = async (event) => {
        event.preventDefault();

        console.log("-->SAVE PATIENT  "+ Object.keys(this.props));

        let payload = {...this.state.patient};
        payload.dob = payload.dob + "T00:00Z";
        let info = { url: '/rest/hospital/patient',
                 payload: payload,
                 success: this.successFn,
                 failure: this.failureFn,
                 failureAuthentication: this.failureAuthentication,
                 error:   this.networkFailure
        };

        postGeneric(info);
    }

    successFn = () => {
        this.setState({
            success: true 
        });
    }
    failureFn = (json) => {
        console.log(json);
        showPrefixValidationMessages(json, "savePatient.patientBean");
    }

    failureAuthentication = () => {
        this.setState({
            error: true 
        });
    }

    networkFailure = (e) => {
        console.log("Exception caught " + e);
        console.log(e);
        this.showNetworkErrorMessage();
    }

    componentDidMount () {
        this.loadPatient(this.state.patientId)
    }

    handleDateChange (event) {

        console.log("Date now has " + event.target.value);
        if (event.target.value === '') {
            console.log("Yea it was blank");

            //let validations = {errors: [{field: "dob",message:"Date of Birth is mandatory"}]};

            //showValidationMessages(validations);
        }
        else {
            //clearValidationMessages("dob");
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

        if (this.state.success === true) {
            return <Redirect to="/patients/list" />
        }
        const error = this.state.error

        if (error === true) {
            return <Redirect to="/loginsessionexpired" />
        }

        const patient = this.state.patient;

        //Really should not need to do this.
        //there is a method to avoid rendering.
        if (patient.dob === null) {
            return "";
        }
        const pres = patient.prescription;
        const images = this.state.images;
        const addPrescription = `/patients/${patient.id}/prescription/medicine`;
        const addImage        = `/patients/${patient.id}/addimage`;
        const administrator = true;

        const result = (
            <div>
            {this.state.showPopup ? 
                <PopupMessage title={this.state.showPopupTitle}
                              message={this.state.showPopupMessage}
                              closePopup={this.togglePopup}>
                </PopupMessage>
                : null
            }
            <form onSubmit={this.savePatient}>
                <PatientForm patient={patient} 
                            handleFormChange={this.handleFormChange}/>
                <div className="col-md-6 form-line">
                    <div className="form-group">
                        <PrescriptionTable list={pres} />
                    </div>
                    <div className="form-group">
                        <ImageTable list={images} />
                    </div>

                    <div className="form-group">
                        <span className="errors" name="page.error"></span>
                    </div>

                    <div className="form-group">
                        <button type="submit">Submit</button>

                        <Link to="/patients/list"><button>Cancel</button></Link>
                        { administrator ? 
                          <span><Link to={`${addPrescription}`} ><button>Add Prescription</button></Link>
                          <Link to={`${addImage}`} ><button>Add Image</button></Link></span>
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
