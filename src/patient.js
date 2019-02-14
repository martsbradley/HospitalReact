import React from 'react'
import { Route, Switch } from 'react-router-dom'
import PatientEdit from './patient_edit.js'
import PatientList from './patient_list.js'
import PropTypes from 'prop-types';
import Prescription from './prescription.js'

export class PatientTable extends React.Component {
  constructor (props) {
    super(props)
    this.state = { }

    this.editPatient = this.editPatient.bind(this)
    this.listPatients = this.listPatients.bind(this)
    //this.addPrescription = this.addPrescription.bind(this)
  }

  editPatient (props) {
    return <PatientEdit {...props} />
  }

  listPatients (props) {
    let result =<div> <PatientList auth={this.props.auth} {...props} /> </div>
    return result;
  }

  render () {

    let result = (
      <Switch>
        Why is this even shown?
        <Route path="/patients/list" render={(props) => this.listPatients(props)} />
        <Route path="/patients/:patientId/prescription" component={Prescription} />
        <Route path="/patients/edit/:gistId" render={(props) => this.editPatient(props)} />
      </Switch>
    )
    return result
  }
}

PatientTable.propTypes = {
    auth : PropTypes.object,
}
