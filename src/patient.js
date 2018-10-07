import React from 'react';
import { Route, Switch} from "react-router-dom";
import Patient from './patient_edit.js'
import PatientList from './patient_list.js'

export default class PatientTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {patients : [],
                      error : false,
                      activePage: 1,
                      itemOnPage : 5, 
                      totalItemsCount: 0,};

        this.editPatient = this.editPatient.bind(this);
        this.listPatients = this.listPatients.bind(this);
        this.reloadMe     = this.reloadMe.bind(this);
    }

    reloadMe() {
        console.log("Parent patient object refreshed.");
      //this.setState({patients: []});
      //this.loadPatients(this.state.activePage);
    }

    editPatient(props) {
        console.log("editPatient called");

        return <Patient {...props} doit={this.reloadMe} />;
    }

    listPatients(props) {
        let result = <PatientList {...props} />;
        return result;
    }

    render() {
        const error = this.state.error;
        if (error)
        {
            return <p>There was an error calling the service</p>;
        }
      //const patients = this.state.patients;
      //const items = patients.map(patient => <PatientRow key={patient.id} pat={patient}/>);


        let result = (
            <Switch>
                <Route path="/patients/edit/:gistId" render={(props) => this.editPatient(props)} />
                <Route path="/patients/list"         render={(props) => this.listPatients(props)} />
            </Switch>);
        return result;
    }
}
