import React from 'react'
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom'
import ValidationMessage from '../../validationmessage.js'

export default class PrescriptionStart extends React.Component {
    constructor(props) {
        super(props);
        this.state = { success: false,
                       showWarning: false};

        this.handleFormChange = this.handleFormChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    handleFormChange (event) {
        const aNewDate = event.target.value
        this.props.updateDate(aNewDate);
    }

    onSubmit(event) {
        if (this.props.canMoveNextPage()) {
            this.setState({success: true});
        }
        else {
            this.setState({showWarning: true});
            event.preventDefault();
        }
    }
    render () {
        if (this.state.success === true) {
            return <Redirect to="setEndDate"/>
        }
        const isBlocking = this.state.showWarning;

        return (<div>
            <h1>Prescription Select Start Date</h1>

            <form onSubmit={this.onSubmit}>
                <div className="col-md-6 form-line">
                  <div className="form-group">
                      <label htmlFor="medicine" >Medicine</label>
                      <input type="input" className="form-control" name="medicine" 
                             readOnly disabled value={this.props.medicine.name} />
                  </div>

                  <div className="form-group">
                      <label htmlFor="startDate" >Start Date</label>
                      <input type="date" className="form-control " name="startDate" 
                             value={this.props.startDate}
                      onChange={this.handleFormChange}/>
                  </div>

                  <div className="col-md-6">
                        <ValidationMessage when={isBlocking} what="Date cannot be in the past"/>
                  </div>
                  <div className="form-group">
                    <Link to="medicine"><button>Back</button></Link>
                    <button type="submit">Next</button>
                  </div>
                </div>
            </form>
        </div>);
    }
}
PrescriptionStart.propTypes = {
    match : PropTypes.object,
    startDate : PropTypes.string,
    medicine : PropTypes.object,
    updateDate : PropTypes.func,
    history : PropTypes.object,
    canMoveNextPage : PropTypes.func,
}