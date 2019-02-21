import React from 'react'
import BackButton from './backbutton.js'

export default class Confirm extends React.Component {
    constructor(props) {
        super(props);

        console.log("Prescription constructor " + this.props.match);
    }

    saveDate= (event) => {
        event.preventDefault();
    }

    render () {
        return (<div>
            <h1>Prescription Confirm Details</h1>

            <form onSubmit={this.saveDate}>
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
