import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Patient from './patient_edit.js'
import PatientList from './patient_list.js'

export default class PatientTable extends React.Component {
  constructor (props) {
    super(props)
    this.state = { }

    this.editPatient = this.editPatient.bind(this)
    this.listPatients = this.listPatients.bind(this)
    this.reloadMe = this.reloadMe.bind(this)
  }

  reloadMe () {
  }

  editPatient (props) {

    return <Patient {...props} doit={this.reloadMe} />
  }

  listPatients (props) {
    let result = <PatientList {...props} />
    return result
  }

  render () {

    let result = (
      <Switch>
        <Route path="/patients/edit/:gistId" render={(props) => this.editPatient(props)} />
        <Route path="/patients/list" render={(props) => this.listPatients(props)} />
      </Switch>
      )
    return result
  }
}
