import React from 'react';
import Pagination from "react-js-pagination";
import { Route, Link , Switch} from "react-router-dom";
import Patient from './patient'

function PatientRow(props) {
    let id = props.pat.id;
    return (<tr>
               <td><Link to={`/patients/edit/${id}`}>{props.pat.id}</Link></td>
               <td><Link to={`/patients/edit/${id}`}>{props.pat.forename}</Link></td>
               <td><Link to={`/patients/edit/${id}`}>{props.pat.surname}</Link></td>
               <td><Link to={`/patients/edit/${id}`}>{props.pat.dob}</Link></td>
           </tr>);
}

export default class PatientTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {patients : [],
                      error : false,
                      activePage: 1,
                      itemOnPage : 5, 
                      totalItemsCount: 0,};

        this.handlePageChange = this.handlePageChange.bind(this);
        this.createPageUrl = this.createPageUrl.bind(this);
        this.loadPatients = this.loadPatients.bind(this);
        this.renderPatient= this.renderPatient.bind(this);
    }

    createPageUrl(aActivePage) {
        let itemOnPage = this.state.itemOnPage;

        let start  = (aActivePage-1)*itemOnPage;

        console.log("CreatePageUrl aActivePage " + aActivePage);
        console.log("CreatePageUrl itemOnPage " + itemOnPage);
        console.log("CreatePageUrl start " + start);

        let result =`/firstcup/rest/hospital/patients?start=${start}&max=${itemOnPage}`;
        console.log(result);
        return result;
    }

    handlePageChange(aActivePage) {
        console.log("Changing active page to " + aActivePage);

        this.loadPatients(aActivePage);
    }

    loadPatients(aActivePage) {
        console.log("aActivePage ... " + aActivePage);
        let url = this.createPageUrl(aActivePage);

        fetch(url)
        .then(response => response.json())
        .then(
          (json) => { this.setState({ patients:  json,
                                      activePage: aActivePage});
                      },

          (error)  => { this.setState( { error : true});
                        console.log(error.toString());
                        console.log(error);
                      } 
        );
    }

    componentDidMount() {

        this.loadPatients(this.state.activePage);

        fetch('/firstcup/rest/hospital/patients/total')
        .then(total => total.json())
        .then(
          (total) =>  { console.log("There are " + total + " patients.");
                        this.setState({ totalItemsCount: total,})},

          (error)  => { console.log("get total issue ");
                        console.log(error.toString());}
        );
    }

    renderPatient(props)
    {
        const patients = this.state.patients;
        let myId = parseInt(props.match.params.gistId,10);

        var selectedPatient = patients.find(o => o.id === myId );

        /*console.log("Found forename " + JSON.stringify(selectedPatient));
        console.log("we got a: " + selectedPatient.forename);
        console.log("we got a: " + selectedPatient.surname);
        console.log("we got a: " + selectedPatient.dob);*/
        let result = <div>No Patient...</div>;
        if (selectedPatient)
        {
            result = <Patient {...props} surname={selectedPatient.surname} />;
        }
        return result;
    }

    render() {
        const error = this.state.error;
        if (error)
        {
            return <p>There was an error calling the service</p>;
        }
        const patients = this.state.patients;
        const items = patients.map(patient => <PatientRow key={patient.id} pat={patient}/>);


        let result = (
            <Switch>
                <Route path="/patients/edit/:gistId" render={(props) => this.renderPatient(props)} />

                <Route path="/patients/" render={() => (
                <div>
                    <table className='table table-bordered'>
                    <thead className='thead-dark'>
                        <tr>
                          <th scope="col">Id</th>
                          <th scope="col">First</th>
                          <th scope="col">Last</th>
                          <th scope="col">DOB</th>
                        </tr>
                      </thead>
                      <tbody>
                        {items}
                      </tbody>
                    </table>

                    <Pagination activePage={this.state.activePage}
                                itemsCountPerPage={this.state.itemOnPage}
                                totalItemsCount={this.state.totalItemsCount}
                                pageRangeDisplayed={15}
                                onChange={this.handlePageChange} />
                    </div>
                )}/>
            </Switch>);
        return result;
    }
}
