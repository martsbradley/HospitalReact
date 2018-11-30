import React from 'react'
import PropTypes from 'prop-types';
import BackButton from './backbutton.js'
import { Link } from 'react-router-dom'

export default class PrescriptionStart extends React.Component {
    constructor(props) {
        super(props);

        this.state =  {formData :  { startDate : '2018-02-04'}};
        console.log("Prescription constructor " + this.props.match);
    }

    render () {
        const formData = this.state.formData;
        return (<div>
            <h1>Prescription Start Date</h1>

            <form onSubmit={this.saveDate}>
                <div className="col-md-6 form-line">
                  <div className="form-group">
                      <label htmlFor="dob" >Start Date</label>
                      <input type="date" className="form-control" name="startDate" value={formData.startDate}
                      readOnly onChange={this.handleFormChange}/>
                  </div>
                  <div className="form-group">
                    <BackButton text="Previous" {...this.props}/>
                    <Link to="setEndDate"><button>Next</button></Link>
                  </div>
                </div>
            </form>
        </div>);
    }
}
PrescriptionStart.propTypes = {
    match : PropTypes.object,
}
