import React from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

function Prescription (props) {
  const prescriptions = props.list

  let detail = <tr></tr>

  if (prescriptions) {
    detail = prescriptions.map(p =>
      <tr key={p.id}>
        <td>{p.id}</td>
        <td>{p.medicine.name}</td>
        <td>{p.medicine.manufacturer}</td>
        <td>{p.amount}</td>
      </tr>)
  }

  const table = (<table className='table table-bordered'>
    <thead className='thead-dark'>
      <tr>
        <th scope="col">Id</th>
        <th scope="col">Name</th>
        <th scope="col">Manufacturer</th>
        <th scope="col">Amount</th>
      </tr>
    </thead>
    <tbody>{detail}</tbody></table>)
  return table
}

export default class Patient extends React.Component {
  constructor (props) {
    super(props)

    this.state = { error: false,
      patientId: props.match.params.gistId,
      loaded: false,
      patient: { forename: '',
        surname: '',
        dob: null,
        prescription: []
      },
    }

    this.createLoadURL = this.createLoadURL.bind(this)
    this.loadPatient = this.loadPatient.bind(this)
    this.handleFormChange = this.handleFormChange.bind(this)
    this.savePatient = this.savePatient.bind(this)
    this.postData = this.postData.bind(this)
    this.showValidationMessages = this.showValidationMessages.bind(this)
  }

  createLoadURL () {
    const patientId = this.state.patientId
    let result = `/firstcup/rest/hospital/patient/${patientId}`
    return result
  }
  createSaveURL () {
    const result = '/firstcup/rest/hospital/patient'
    return result
  }


  loadPatient () {
    let url = this.createLoadURL()

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          this.setState({ error: true })
          throw Error(response.statusText)
        }
      },
      networkError => {
        console.log('Network Failure ' + networkError)
      }
      )
      .then(patient => {
          // There is on JSON Date
          // So date comes in as a "yyyy-MM-ddT00:00Z
          // Now get the yyyy-MM-dd part of the string only.
        patient.dob = new Date(patient.dob).toISOString().split('T')[0];

        this.setState({ patient: patient,
          loaded: true
        })
      }
      )
      .catch(exn => {
        console.log('forget about it: ' + exn.statusText)
      })
  }

  showValidationMessages (validations) {

    const errors = validations.errors

    for (var i = 0; i < errors.length; i++) {
      const name = errors[i].field
      const message = errors[i].message
      const formField = document.querySelector("span[name='" + name + ".errors']")
      formField.innerText = message
    }
  }

  postData (url, patient) {

    patient.dob = patient.dob + "T00:00Z";

    fetch(url, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(patient)
    })
      .then(
        response => {
          if (response.ok) {
            return response.json()
          } else {
            let json_errors = response.json()
            json_errors.then(data => {
              this.showValidationMessages(data)
            })
            throw Error(response.statusText)
          }
        },
        networkError => {
          alert('Network Failure ' + networkError)
        }
      )
      .then(() => {
        this.props.history.push('/patients/list')
      }
      )
      .catch(exn => {
        alert('forget about it' + exn)
      })
  }

  savePatient (event) {
    event.preventDefault()
    this.postData(this.createSaveURL(), this.state.patient)
  }

  componentDidMount () {
    this.loadPatient(this.state.patientId)
  }

  handleFormChange (event) {
    let patient = this.state.patient
    patient[event.target.name] = event.target.value
    this.setState({ patient })
  }

  render () {
    const error = this.state.error
    if (error) {
      return <p>There was an error calling the service</p>
    }

    const patient = this.state.patient;

      //Really should not need to do this.
      //there is a method to avoid rendering.
    if (patient.dob === null) {
        return "";
    }
    const pres = patient.prescription;
    const addPrescription = `/patients/${patient.id}/prescription`;

    console.log("addPrescription : " + addPrescription);


    const result = (
      <div>
        <form onSubmit={this.savePatient}>
          <div className="col-md-6 form-line">
              <div className="form-group">
                  <label htmlFor="forename">Forename</label>
                  <input type="text" className="form-control" name="forename" value={patient.forename}
                    onChange={this.handleFormChange}/>
                  <span className="errors" name="forename.errors"></span>
              </div>
              <div className="form-group">
                  <label htmlFor="surname">Surname</label>
                  <input type="text" className="form-control" name="surname" value={patient.surname}
                    onChange={this.handleFormChange}/>
                  <span className="errors" name="surname.errors"></span>
              </div>
              <div className="form-group">
                  <label htmlFor="dob" >Date of Birth</label>
                  <input type="date" className="form-control" name="dob" value={patient.dob}
                  onChange={this.handleFormChange}/>
              </div>
              <div className="form-group">
                <Prescription list={pres} />
              </div>
              <div className="form-group">
                  <button type="submit" >Submit</button>
                  <Link to="/patients/list"><button>Cancel</button></Link>
                  <Link to={`${addPrescription}`} ><button>Add Prescription</button></Link>
              </div>
          </div>
        </form>
      </div>)
    return result
  }
}

Patient.propTypes = {
    history : PropTypes.object,
    match   : PropTypes.object
}
