import React from 'react'
import { Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types';
import PrescriptionAdd from './prescriptionadd.js'
import PrescriptionStart from './prescriptionstart.js'
import PrescriptionEnd from './prescriptionend.js'
import Confirm from './confirm.js'



export default class Prescription extends React.Component {
    constructor(props) {
        super(props);

        console.log("Prescription constructor " + this.props.match);
        this.state = { selectedMedicine : -1 };
        this.medicineSelectionClick = this.medicineSelectionClick.bind(this);
    }

    medicineSelectionClick(medicineId) {
        if (medicineId === this.state.selectedMedicine) {
            medicineId = -1;
        }
        this.setState({selectedMedicine : medicineId });

        console.log("selected " + this.state.selectedMedicine);
    }

    render () {
        console.log("Render Prescription " + this.props.match.path);
        const patientId = this.props.match.params["patientId"];
      return (
        <Switch>

          <Route path={`${this.props.match.path}/medicine`} exact 
               render={() => <PrescriptionAdd   
                                 patientId={patientId}
                                 selectedMedicine={this.state.selectedMedicine}
                                 mouseClicked={this.medicineSelectionClick} /> } />

          <Route path={`${this.props.match.path}/setStartDate`} component={PrescriptionStart} />
          <Route path={`${this.props.match.path}/setEndDate`} component={PrescriptionEnd}/>
          <Route path={`${this.props.match.path}/confirm`} component={Confirm}/>
        </Switch>)
    }
}

Prescription.propTypes = {
    match : PropTypes.object,
}
