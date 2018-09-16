import React from 'react';
import Pagination from "react-js-pagination";
import { BrowserRouter as Router, Route, Link , Switch} from "react-router-dom";
import About from './About'

function PatientRow(props) {
    let id = props.pat.id;
    return (<tr>
               <td>{props.pat.id}</td>
               <td><Link to={`/stuff/${id}`}>{props.pat.id}</Link></td>
               <td>{props.pat.forename}</td>
               <td>{props.pat.surname}</td>
               <td>{props.pat.dob}</td>
           </tr>);
}

const Gist = ({match}) => (
    <div>
    Show zzzzz Patient {match.params.gistId}
    </div>
);



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
        .then(res => res.json())
        .then(
          (result) => { this.setState({ patients: result,
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


    render() {
        const error = this.state.error;
        let result;
        if (error)
        {
            result = <p>There was an error calling the service</p>;
        }
        else
        {
            const patients = this.state.patients;
            const items = patients.map(patient => <PatientRow key={patient.id} pat={patient}/>);
            result = 
             <Router>
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


                <Switch>
                     <Route path="/stuff/:gistId" render={Gist}/>
                     <Route path="/" render={() => (
                         <div>
                         <h1>Show a Patient</h1>
                         </div>
                     )}/>
                </Switch>
                    </div>
                </Router>
        }
        return result;
    }
}
