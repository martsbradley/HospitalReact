import React from 'react';
import Pagination from "react-js-pagination";
import { Link } from "react-router-dom";

function PatientRow(props) {
    let id = props.pat.id;
    return (<tr>
               <td><Link to={`/patients/edit/${id}`}>{props.pat.id}</Link></td>
               <td><Link to={`/patients/edit/${id}`}>{props.pat.forename}</Link></td>
               <td><Link to={`/patients/edit/${id}`}>{props.pat.surname}</Link></td>
               <td><Link to={`/patients/edit/${id}`}>{props.pat.dob}</Link></td>
           </tr>);
}

export default class PatientList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {patients : [],
                      error : false,
                      activePage: 1,
                      itemOnPage : 5, 
                      totalItemsCount: 0,};

        this.pagingURL        = this.pagingURL.bind(this);
        this.totalURL         = this.totalURL.bind(this);
        this.loadPatients     = this.loadPatients.bind(this);
        this.pageChange = this.pageChange.bind(this);
        this.urlPrefix = '/firstcup/rest/hospital/patients';
    }


    totalURL() {
        return this.urlPrefix + '/total';
    }

    pagingURL(aActivePage) {
        let itemOnPage = this.state.itemOnPage;

        let start  = (aActivePage-1)*itemOnPage;

        let result = this.urlPrefix + `?start=${start}&max=${itemOnPage}`;

        return result;
    }

    pageChange(activePage) {
        console.log("Changing active page to " + activePage);
        this.loadPatients(activePage);
    }

    loadPatients(aActivePage) {
        console.log("patient_list::loadPatients() called");

        const loadPatients  = fetch( this.pagingURL(aActivePage));
        const countPatients = fetch(this.totalURL());

        Promise.all([loadPatients,countPatients])   
        .then(responses => {

                // All the headers have arrived.
                if (responses[0].ok && responses[1].ok)
                {
                    return Promise.all([responses[0].json(), responses[1].json()]);
                }
                else
                {
                    throw Error([responses[0].statusText(),responses[1].statusText()]);
                }
            },
            networkError => { 
                console.log("Network Failure " + networkError);
            }
        )
        .then( dataArray => {
                // The data from the response bodies has arrived.
                const patients = dataArray[0];
                const total    = dataArray[1];

                this.setState({ patients:  patients,
                                activePage: aActivePage,
                                totalItemsCount: total});
            }
        )
        .catch (error => {
            console.log("There were errors");
        })

        console.log("here.... loadPatients(" + aActivePage + ")");
    }

    componentDidMount() {
        this.loadPatients(this.state.activePage);
    }

    render() {
        const error = this.state.error;

        if (error)
        {
            return <p>There was an error calling the service</p>;
        }


        const patients = this.state.patients;
        const items = patients.map(patient => <PatientRow key={patient.id} pat={patient}/>);

        console.log("Rendering patient_list");

        return ( <div>
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
                        onChange={this.pageChange} />
        </div>
        );
    }
}
