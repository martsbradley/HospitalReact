import React from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import format from 'date-fns/format'

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

function dateFormat() {
    return 'YYYY-MM-DD';
}

function todayAsYYYYMMDD() {
    const today = format(new Date(), dateFormat());
    return today;
}

function getDobString(aDate) {
    const dateString = new Date(aDate).toISOString().split('T')[0];
    return dateString;
}

export default class Patient extends React.Component {
    constructor (props) {
        super(props)

        this.state = { error: false,
            patientId: props.match.params.gistId,
            loaded: false,
            patient: { forename: '',
                surname: '',
                dob: todayAsYYYYMMDD(),
                prescription: []
            },
        }

        this.createLoadURL = this.createLoadURL.bind(this)
        this.loadPatient = this.loadPatient.bind(this)
        this.handleFormChange = this.handleFormChange.bind(this)
        this.handleDateChange = this.handleDateChange.bind(this)
        this.savePatient = this.savePatient.bind(this)
        this.postData = this.postData.bind(this)
        this.showValidationMessages = this.showValidationMessages.bind(this)
        this.clearValidationMessages = this.clearValidationMessages.bind(this)
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
                //patient.dob = new Date(patient.dob).toISOString().split('T')[0];
                patient.dob = getDobString(patient.dob);

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

    clearValidationMessages(aFieldName) {
        const formField = document.querySelector("span[name='" + aFieldName + ".errors']")
        formField.innerText = '';
    }

    postData (url, patient) {


        let payload = {...patient};
        console.log("payload is " + payload);
        payload.dob = payload.dob + "T00:00Z";
        console.log("payload is " + payload);


        fetch(url, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            //body: JSON.stringify(payload)
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
            .catch(() => {
                console.log("There was an error");
            })
    }

    savePatient (event) {
        event.preventDefault()
        this.postData(this.createSaveURL(), this.state.patient)
    }

    componentDidMount () {
        this.loadPatient(this.state.patientId)
    }

    handleDateChange (event) {

        console.log("Date now has " + event.target.value);
        if (event.target.value === '') {
            console.log("Yea it was blank");

            let validations = {errors: [{field: "dob",message:"Date of Birth is mandatory"}]};

            this.showValidationMessages(validations);
        }
        else {
            this.clearValidationMessages("dob");
        }

        this.handleFormChange(event);
    }

    handleFormChange (event) {
        let patient = this.state.patient
        console.log("Handle change " + this.state.patient.dob);

        patient[event.target.name] = event.target.value
        this.setState({ patient })
    }

    render () {
        console.log("Hit here");
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
        const addPrescription = `/patients/${patient.id}/prescription/medicine`;

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
            onChange={this.handleDateChange}/>
            <span className="errors" name="dob.errors"></span>
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
