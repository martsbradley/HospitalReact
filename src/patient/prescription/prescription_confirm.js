import React from 'react'
import BackButton from './backbutton.js'
import {addTimeZone} from './dateutils.js'
import PopupMessage from './popup_message'
import Poster from './network'

export default class PrescriptionConfirm extends React.Component {
    constructor(props) {
        super(props);

        this.state = { showPopup: false,
                       showPopupTitle: "title here",
                       showPopupMessage: "message here."
        }

        this.poster = new Poster(this.successfulPost,
                                 this.showAuthorizationErrorMessage,
                                 this.showNetworkErrorMessage);
    }

    successfulPost = () => {
        this.props.history.push(`/patients/edit/${this.props.patientId}`)
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

    togglePopup = () => {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }

    savePrescription= (event) => {
        console.log("submitted prescription confirm");
        event.preventDefault();

        const patientId    = this.props.patientId;
        const medicineId   = this.props.medicine.id;
        const medicineName = this.props.medicine.name;

        const startFormatted = addTimeZone(this.props.startDate);
        const endFormatted   = addTimeZone(this.props.endDate);
 
        console.log("Save the prescription");
        console.log(patientId);
        console.log(medicineName);
        console.log(startFormatted);
        console.log(endFormatted);

        const prescription  = {startDate: startFormatted,
                               endDate:   endFormatted,
                               amount: "twice daily"};
        const url =  `/rest/hospital/patient/${patientId}/medicine/${medicineId}`;
        console.log(url);
        this.poster.postData(url, prescription);
        console.log("here");
    }


    render () {
        return (<div>
            <h1>Prescription Confirm Details</h1>

            <form onSubmit={this.savePrescription}>
              <div className="col-md-6 form-line">
                  <div className="form-group">
                      <label htmlFor="medicine" >Medicine</label>
                      <input type="input" className="form-control" name="medicine" 
                             readOnly disabled value={this.props.medicine.name} />
                  </div>
                  <div className="form-group">
                      <label htmlFor="startDate" >Start Date</label>
                      <input type="date" className="form-control" name="startDate" 
                             readOnly disabled value={this.props.startDate}/>
                  </div>
                    <div className="form-group">
                      <label htmlFor="dob" >End Date</label>
                      <input type="date" className="form-control" name="endDate" 
                             readOnly disabled value={this.props.endDate}/>
                    </div>
                    <div className="form-group">
                      <BackButton text="Previous" {...this.props}/>
                      <input type="submit" value="Finish"></input>
                    </div>
                </div>
            </form>
            {this.state.showPopup ? 
                <PopupMessage title={this.state.showPopupTitle}
                              message={this.state.showPopupMessage}
                              closePopup={this.togglePopup}>
                </PopupMessage>
                : null
            }
        </div>);
    }
}
