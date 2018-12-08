import React from 'react'
import PropTypes from 'prop-types';
import BackButton from './backbutton.js'
import { Link } from 'react-router-dom'

export default class PrescriptionEnd extends React.Component {
    constructor(props) {
        super(props);

        this.state =  {formData :  { startDate : '2018-02-04'}};
        this.handleFormChange = this.handleFormChange.bind(this)
    }

    handleFormChange (event) {
        let formData = this.state.formData
        formData[event.target.name] = event.target.value
        this.setState({ formData })
    }

    render () {
        const formData = this.state.formData;
        return (<div>
            <h1>Prescription End Date</h1>

            <form onSubmit={this.saveDate}>
              <div className="col-md-6 form-line">
                    <div className="form-group">
                        <label htmlFor="dob" >Start Date</label>
                        <input type="date" className="form-control" name="startDate" value={formData.startDate}
                        onChange={this.handleFormChange}/>
                    </div>
                    <div className="form-group">
                      <BackButton text="Previous" {...this.props}/>
                      <Link to="confirmed"><button>Next</button></Link>
                    </div>
                </div>
            

            </form>
        </div>);
    }
}
PrescriptionEnd.propTypes = {
    match : PropTypes.object,
}
