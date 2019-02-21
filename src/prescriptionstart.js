import React from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import ValidationMessage from './validationmessage.js'
import Medicine from './medicine.js'

export default class PrescriptionStart extends React.Component {
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
        event.preventDefault();
        if (this.props.canMoveNextPage()) {
            this.props.history.push('setEndDate')
        }
        else {
            this.setState({showWarning: true});
        }
    }
    render () {
        const isBlocking = this.state.showWarning;

        return (<div>
            <h1>Prescription Select Start Date</h1>

            <form onSubmit={this.saveDate}>
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

                  <div className="col-3">
                        <ValidationMessage when={isBlocking} what="Date cannot be in the past"/>
                  </div>
                  <div className="form-group">
                    <Link to="medicine"><button>Back</button></Link>
                    <input type="submit" value="Next"></input>
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
