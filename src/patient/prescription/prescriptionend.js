import React from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import ValidationMessage from '../../validationmessage.js'

export default class PrescriptionEnd extends React.Component {
    constructor(props) {
        super(props);
        this.state = { showWarning: false};

        this.handleFormChange = this.handleFormChange.bind(this)
        this.saveDate = this.saveDate.bind(this)
    }

    handleFormChange (event) {
        const aNewDate = event.target.value
        this.props.updateDate(aNewDate);
    }

    saveDate(event) {
        if (!this.props.canMoveNextPage()) {
            event.preventDefault();
            this.setState({showWarning: true});
        }
    }

    render () {
        const isBlocking = this.state.showWarning;
        return (<div>
            <h1>Prescription Select End Date</h1>

            <form>
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
                               value={this.props.endDate}
                               onChange={this.handleFormChange}/>
                    </div>
                    <div className="col-3">
                          <ValidationMessage when={isBlocking} what="Must be after start date"/>
                    </div>
                    <div className="form-group">


                    <Link to="setStartDate"><button>Back</button></Link>
                    <Link to={'confirmed'}>
                        <button onClick={this.saveDate}>Next</button>
                    </Link>

                    </div>
                </div>
            </form>
        </div>);
    }
}
PrescriptionEnd.propTypes = {
    match : PropTypes.object,
    startDate : PropTypes.string,
    endDate : PropTypes.string,
    medicine: PropTypes.object,
    updateDate : PropTypes.func,
    history : PropTypes.object,
    canMoveNextPage : PropTypes.func,
}
