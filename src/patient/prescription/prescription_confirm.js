import React from 'react'
import { Link,Redirect } from 'react-router-dom'
import {addTimeZone} from '../../dateutils.js'
import PopupMessage from '../../popup_message'
import Poster from '../../network'

export default class PrescriptionConfirm extends React.Component {
    constructor(props) {
        super(props);

        this.state = { success : false, 
                       showPopup: false,
                       showPopupTitle: "title here",
                       showPopupMessage: "message here."
        }

    }

    showAuthorizationErrorMessage = () => {
        console.log("Auth error");
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
    };

    savePrescription = async (event) => {
        event.preventDefault();
        console.log("submitted prescription confirm");

        const patientId    = this.props.patientId;
        const medicineId   = this.props.medicine.id;
        const medicineName = this.props.medicine.name;

        const startFormatted = addTimeZone(this.props.startDate);
        const endFormatted   = addTimeZone(this.props.endDate);
 
        console.log("Save the prescription");
        console.log(patientId + " " + medicineName + " " + startFormatted);

        const prescription  = {startDate: startFormatted,
                               endDate:   endFormatted,
                               amount: "twice daily"};

        const url =  `/rest/hospital/patient/${patientId}/medicine/${medicineId}`;

        const poster = new Poster(  () => {},
                                    this.showAuthorizationErrorMessage,
                                    this.showNetworkErrorMessage);

        const response = await poster.goFetch(url, prescription);

        if (response.ok) {
            let output = response.json();
            console.log("output is " + output);

            this.setState({
                success: true 
            });
        }
        else {
            console.log("Response not ok :-(");
            
            console.log("Response had status " + response.status);

            if (response.status === 401)
                this.showAuthorizationErrorMessage();
        }
    }

    render () {
        if (this.state.success === true) {
            return <Redirect to={`/patients/edit/${this.props.patientId}`} />
        }

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
                        <Link to="setEndDate"><button>Back</button></Link>

                        <button type="submit" >Confirm</button>
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
//<Link to={`/patients/edit/${this.props.patientId}`} onclick={this.savePrescription}>
//</Link>

                    //<Link to={`/patients/edit/${this.props.patientId}`}></Link>