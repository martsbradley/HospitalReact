import React from 'react';
import LinkButton from './linkbutton';

function Prescription(props) { 
    const prescriptions = props.list;

    let detail = <tr></tr>;

    if (prescriptions) {

        detail = prescriptions.map( p => 
            <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.medicine.name}</td>
                <td>{p.medicine.manufacturer}</td>
                <td>{p.amount}</td>
            </tr>);
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
                          <tbody>{detail}</tbody></table>);

    return table;
}

export default class Patient extends React.Component {
    constructor(props) {
        super(props);

        this.state = {error : false, 
                      patientId : props.match.params.gistId,
                      loaded: false,
                      patient: {forename: '',
                                surname: '',
                                dob: '',
                                prescription: [],
                      }
        };

        this.createLoadURL = this.createLoadURL.bind(this);
        this.loadPatient   = this.loadPatient.bind(this);
        this.handleChange  = this.handleChange.bind(this);
        this.handleSubmit  = this.handleSubmit.bind(this);
        this.savePatient   = this.savePatient.bind(this);
        this.postData      = this.postData.bind(this);
    }

    createLoadURL(aActivePage) {
        const patientId = this.state.patientId;
        let result =`/firstcup/rest/hospital/patient/${patientId}`;
        return result;
    }
    createSaveURL() {
        const result ='/firstcup/rest/hospital/patient';
	return result;
    }

    loadPatient(aActivePage) {
        let url = this.createLoadURL(this.state.patientId);

        fetch(url)
        .then(res => res.json())
        .then(
          (patient) => { 
                         console.log("Received from net");
                         console.log(JSON.stringify(patient)); 
                         this.setState({patient: patient,
                                        loaded: true});
                       },
          (error)   => { this.setState( { error : true});
                         console.log(error.toString());
                       } 
        );
    }

    postData(url, data = {}) {
        return fetch(url, {
            method: "POST",             // *GET, POST, PUT, DELETE, etc.
          //mode: "cors",               // no-cors, cors, *same-origin
          //cache: "no-cache",          // default, no-cache, reload, force-cache, only-if-cached
          //credentials: "same-origin", // include, same-origin, *omit
            headers: {
        	"Content-Type": "application/json; charset=utf-8",
            },
            redirect: "follow",         // manual, *follow, error
            referrer: "no-referrer",    // no-referrer, *client
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        });
        //.then(response => return response.json()); // parses response to JSON
    }

    savePatient() {
        console.log("Posting... "+ JSON.stringify(this.state.patient));

        this.postData(this.createSaveURL(), this.state.patient)
                     .then(data => {console.log("here...");
                                    console.log(JSON.stringify(data));}
                     )
                     .catch(error => {console.log("There was an error");
                                      console.error(error);});
    }

    componentDidMount() {
       this.loadPatient(this.state.patientId);
    }

    handleChange(event) {
        let updatedPatient = this.state.patient;
        updatedPatient.forename = event.target.value;
        this.setState({patient: updatedPatient});
    }
    handleSubmit(event) {
        //alert('Your favorite flavor is: ' + this.state.value);
        event.preventDefault();
        this.savePatient();
    }

    render() {
        const error = this.state.error;
        if (error)
        {
            return <p>There was an error calling the service</p>;
        }
        const patient = this.state.patient;
        const pres = patient.prescription;

        const result = (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div><label htmlFor="forename">Forename</label><input onChange={this.handleChange} value={patient.forename} type="text" name="forename" /></div>
                    <div><label htmlFor="surname">Surname</label><input onChange={this.handleChange} value={patient.surname} type="text" name="surname" /></div>
                    <div><label htmlFor="dob" >Date of Birth</label><input onChange={this.handleChange} value={patient.dob} type="text" name="dob" /></div>
                    <div>
                        <Prescription list={pres} />
                    </div>
                    <p>
                        <LinkButton to="/patients">Cancel</LinkButton>
                        <button type="submit" >Submit</button>
                    </p>
                </form>
            </div>);
        return result;
    }
}
