import React from 'react'
import {Route, Switch} from 'react-router-dom'
import PatientEdit from './patient_edit.js'
import PatientNew from './patient_new.js'
import PatientList from './list/patientListContainer'
import PropTypes from 'prop-types';
import Prescription from './prescription/prescription.js'
import ErrorBoundary from '../errorboundary.js'
import AddImage from '../addimage.js'

export function PatientTable() {

    let result = (
    <ErrorBoundary>
        <Switch>
            <Route path="/patients/list"                    component={PatientList} />
            <Route path="/patients/:patientId/prescription" component={Prescription} />
            <Route path="/patients/:patientId/addimage"     component={AddImage} />
            <Route path="/patients/edit/:gistId"            component={PatientEdit} />
            <Route path="/patients/new/"                    component={PatientNew} />
        </Switch>
    </ErrorBoundary>
    )
    return result;
}
