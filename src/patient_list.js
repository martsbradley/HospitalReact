import React from 'react'
import Pagination from 'react-js-pagination'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

function PatientRow (props) {
  let pat = props.pat;
  let id  = pat.id;
  pat.dob = new Date(pat.dob).toISOString().split('T')[0];

  return (<tr>
    <td><Link to={`/patients/edit/${id}`}>{pat.id}</Link></td>
    <td><Link to={`/patients/edit/${id}`}>{pat.forename}</Link></td>
    <td><Link to={`/patients/edit/${id}`}>{pat.surname}</Link></td>
    <td><Link to={`/patients/edit/${id}`}>{pat.dob}</Link></td>
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
    this.urlPrefix = '/firstcup/rest/hospital/patients'
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

    let header = {headers: {Authorization: `Bearer ${this.props.auth.getAccessToken()}`}}; 

    const loadPatients = fetch(this.pagingURL(aActivePage), header);
    const countPatients = fetch(this.totalURL(), header);

    Promise.all([loadPatients, countPatients])
      .then(responses => {
        // All the headers have arrived.
        if (responses[0].ok && responses[1].ok) {
          //console.log("total coming as " + responses[1]);
          return Promise.all([responses[0].json(), responses[1].json()])
        } else {
          throw Error([responses[0].statusText(), responses[1].statusText()])
        }
      },
      networkError => {
        alert('Network Failure ' + networkError)
      }
      )
      .then(dataArray => {
        // The data from the response bodies has arrived.
        const patients = dataArray[0]
        const total = dataArray[1]
        console.log("Found the total meds to be " + total);

        this.setState({ patients: patients,
          activePage: aActivePage,
          totalItemsCount: total })
      }
      )
      .catch(() => {
        alert('There were errors')
      })
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

    const items = patients.map(patient => <PatientRow key={patient.id} pat={patient}/>)

    const administrator = this.props.auth.isAdministrator();

    return (<div>
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
            onChange={this.pageChange} />
          </div>

          <div>
          { administrator ? 
              <Link to="/patients/new/"><button>New</button></Link>
              : null
          }
          <Link to="/"><button>Cancel</button></Link>
          </div>
      </div>
    )
  }
}
PatientList.propTypes = {
    auth : PropTypes.object,
}
