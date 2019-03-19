import React from 'react'
import BackButton from './backbutton.js'
import {addTimeZone} from './dateutils.js'

export default class PrescriptionConfirm extends React.Component {
    constructor(props) {
        super(props);
    }

    postData = (url, payload) => {

        console.log("Post payload " +JSON.stringify(payload));

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
                        return "OK dude";
                    } else {
                        console.log("Should really handle this");
                        throw Error(response.statusText)
                    }
                },
                networkError => {
                    alert('Network Failure ' + networkError)
                }
            )
            .then(() => {
                this.props.history.push(`/patients/edit/${this.props.patientId}`)
            }
            )
            .catch((e) => {
                console.log("There was an error during send." + e);
            })
    }

    savePrescription= (event) => {
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
        const url =  `/firstcup/rest/hospital/patient/${patientId}/medicine/${medicineId}`;
        console.log(url);
        this.postData(url, prescription);
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
        </div>);
    }
}
