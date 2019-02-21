import React from 'react'
import {Route, Switch} from 'react-router-dom'
import PatientEdit from './patient_edit.js'
import PatientNew from './patient_new.js'
import PatientList from './patient_list.js'
import PropTypes from 'prop-types';
import Prescription from './prescription.js'
import ErrorBoundary from './errorboundary.js'

export class PatientTable extends React.Component {
  constructor (props) {
    super(props)
    console.log("PatientTable constructor " + Object.keys(props));
  }

  newPatient (props, auth) {
     return <ErrorBoundary><PatientNew auth={auth} {...props} /></ErrorBoundary>
  }
  editPatient= (props, auth) => {
      return <ErrorBoundary><PatientEdit auth={auth} {...props} /></ErrorBoundary>; 
  }

  listPatients = (props) => {
    let result =<div> <PatientList auth={this.props.auth} {...props} /> </div>
    return result;
  }

  render () {
      console.log("INside render " + Object.keys(this.props));

    let result = (
      <Switch>
        <Route path="/patients/list" render={(props) => this.listPatients(props)} />
        <Route path="/patients/:patientId/prescription" component={Prescription} />

        <Route path="/patients/edit/:gistId" 
               render = {(props) => this.editPatient(props, this.props.auth)}>
        </Route>

        <Route path="/patients/new/" 
               render={(props) => this.newPatient(props, this.props.auth)}>
        </Route>

      </Switch>
    )
    return result
  }
}

PatientTable.propTypes = {
    auth  : PropTypes.object
}
