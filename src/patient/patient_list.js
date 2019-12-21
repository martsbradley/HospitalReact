import React from 'react'
import Pagination from 'react-js-pagination'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
//import loadPatientData from '../api/PatientAPI';

function PatientRow (props) {
  let pat = props.pat;
  let id  = pat.id;
  pat.dob = new Date(pat.dob).toISOString().split('T')[0];

  let editIcon = <i className="fas fa-user-edit fa-2x"></i>;
  return (<tr>
    <td className="d-none d-sm-table-cell">{pat.id}</td>
    <td>{pat.forename}</td>
    <td className="d-none d-sm-table-cell">{pat.surname}</td>
    <td className="d-none d-md-table-cell">{pat.dob}</td>
    <td><Link to={`/patients/edit/${id}`}>{editIcon}</Link></td>
  </tr>)
}


PatientRow.propTypes = {
    pat : PropTypes.object
}

export default class PatientList extends React.Component {
  constructor (props) {
    super(props)
    this.state = { patients: [],
      error: false,
      activePage: 1,
      itemOnPage: 5,
      totalItemsCount: 0 }

    this.pagingURL = this.pagingURL.bind(this)
    this.totalURL = this.totalURL.bind(this)
    this.loadPatients = this.loadPatients.bind(this)
    this.pageChange = this.pageChange.bind(this)
    this.urlPrefix = '/rest/hospital/patients'
  }

  totalURL () {
    return this.urlPrefix + '/total'
  }

  pagingURL (aActivePage) {
    let itemOnPage = this.state.itemOnPage

    let start = (aActivePage - 1) * itemOnPage

    let result = this.urlPrefix + `?start=${start}&max=${itemOnPage}`

    return result
  }

  pageChange (activePage) {
    this.loadPatients(activePage)
  }


  loadPatients (aActivePage) {
//    loadCourses();
    //loadPatientData();

  //const loadPatients = fetch(this.pagingURL(aActivePage));
  //const countPatients = fetch(this.totalURL());

  //let patientsResp = await loadPatients;
  //let countResp = await countPatients;

  //if (!patientsResp.ok) {}
  //    throw Error(patientsResp.statusText());
  //}
  //if (!patientsResp.ok) {}
  //    throw Error(patientsResp.statusText());
  //}


  //if (!responses[1].ok 
  //      //console.log("total coming as " + responses[1]);
  //      return Promise.all([responses[0].json(), responses[1].json()])
  //    } else {
  //  },
  //  networkError => {
  //    alert('Network Failure ' + networkError)
  //  }
  //  )
  //  .then(dataArray => {
  //    // The data from the response bodies has arrived.
  //    const patients = dataArray[0]
  //    const total = dataArray[1]
  //    console.log("Found the total meds to be " + total);

  //    this.setState({ patients: patients,
  //      activePage: aActivePage,
  //      totalItemsCount: total })
  //  }
  //  )
  //  .catch(() => {
  //    alert('There were errors')
  //  })
  }

  componentDidMount () {
    this.loadPatients(this.state.activePage)
  }

  render () {
    const error = this.state.error

    if (error) {
      return <p>There was an error calling the service</p>
    }

    const patients = this.state.patients;

    if (patients.length === 0) return "";


    const administrator = true;//this.props.auth.isAdministrator();

    const items = patients.map(patient => <PatientRow isAdmin={administrator} key={patient.id} pat={patient}/>)

      //<button>Create New Patient</button>
    return (
    <div >
        <h1>Patients</h1>
        <div className="tablehead">
            <div className="myleft">
                { administrator ? 
                   <Link to="/patients/new/"><i className="fa fa-plus-square fa-3x"></i></Link>
                   : null
                }
            </div>
            <div className="float-right">
                <Pagination 
                        itemClass="page-item"
                        linkClass="page-link"
                            activePage={this.state.activePage}
                            itemsCountPerPage={this.state.itemOnPage}
                            totalItemsCount={this.state.totalItemsCount}
                            pageRangeDisplayed={15}
                            onChange={this.pageChange}>
                </Pagination>
            </div>
        </div>

        <table className='table table-bordered'>
                   <thead className='thead-dark'>
            <tr>
              <th scope="col" className="d-none d-sm-table-cell">Id</th>
              <th scope="col">First</th>
              <th scope="col" className="d-none d-sm-table-cell">Last</th>
              <th scope="col" className="d-none d-md-table-cell">DOB</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items}
          </tbody>
        </table>
    </div>
    )
  }
}

//<!-- <Link to="/"><button>Cancel</button></Link> -->
PatientList.propTypes = {
    auth : PropTypes.object,
}
