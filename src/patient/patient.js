import React from 'react'
import {Route, Switch} from 'react-router-dom'
import PatientEdit from './patient_edit.js'
import PatientNew from './patient_new.js'
import PatientList from './patient_list.js'
import PropTypes from 'prop-types';
import Prescription from './prescription/prescription.js'
import ErrorBoundary from '../errorboundary.js'
import AddImage from '../addimage.js'
import {Navigation} from '../navigation'

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

  addPrescription = (props) => {
    let result = <Prescription auth={this.props.auth} {...props} />;
    return result;
  }

  addImage = (props) => {
    let result = <AddImage auth={this.props.auth} {...props}/>;
    return result;
  }


  render () {

    let result = (
    <div>
      <Navigation auth={this.props.auth}/> 

      <Switch>
          <Route path="/patients/list" render={(props) => this.listPatients(props)} />
          <Route path="/patients/:patientId/prescription" render={(props) => this.addPrescription(props)} />
          <Route path="/patients/:patientId/addimage" render={(props) => this.addImage(props)} />

          <Route path="/patients/edit/:gistId" 
                render = {(props) => this.editPatient(props, this.props.auth)}>
          </Route>

          <Route path="/patients/new/" 
                render={(props) => this.newPatient(props, this.props.auth)}>
          </Route>

      </Switch>
    </div>
    )
    return result
  }
}

PatientTable.propTypes = {
    auth  : PropTypes.object
}
