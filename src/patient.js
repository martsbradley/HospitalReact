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
                      },
                      showPatientList: props.doit,
        };

        this.createLoadURL = this.createLoadURL.bind(this);
        this.loadPatient   = this.loadPatient.bind(this);
        this.handleFormChange  = this.handleFormChange.bind(this);
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
                         this.setState({patient: patient,
                                        loaded: true});
                       },
          (error)   => { this.setState( { error : true});
                         console.log(error.toString());
                       } 
        );
    }

    postData(url, data) {

        console.log("Posting to " + url);
        console.log("Data is " + JSON.stringify(data));
        fetch(url, {
               method: 'post',
               headers: {
                 'Accept': 'application/json',
                 'Content-Type': 'application/json'
               },
               body: JSON.stringify(data)
        })
	//.then (response => {response.json();}
	.then ( 
	    response  => { 
		console.log("here...");
		if (response.ok) {
		  const object = response.json();
		  console.log("Response ok");
		  const asStr = object;//JSON.stringify(object);
		  console.log("wth POST SUCCESS fully.." + asStr);
		  this.state.showPatientList();
		  this.props.history.push('/patients')
		}
		else {
		  console.log("Response !ok" + response.statusText);
		  let x = response.json();
		  console.log("continue.." + typeof x);
		  x.then(data => {console.log(JSON.stringify(data));});
		}
	    },
	    someerror => { console.log("Network Failure " + someerror);}
	);
    }

    savePatient() {
        this.postData(this.createSaveURL(), this.state.patient);
    }

    componentDidMount() {
       this.loadPatient(this.state.patientId);
    }

    handleFormChange(event) {
        let patient = this.state.patient;
	patient[event.target.name] = event.target.value;
	this.setState({patient});
    }

    handleSubmit(event) {
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
		    <div>
	                 <label htmlFor="forename">Forename</label>
	                 <input type="text" name="forename" value={patient.forename}
	                        onChange={this.handleFormChange}/>
		    </div>
                    <div>
	                 <label htmlFor="surname">Surname</label>
	                 <input type="text" name="surname" value={patient.surname} 
	                        onChange={this.handleFormChange}/>
		    </div>
                    <div><label htmlFor="dob" >Date of Birth</label>
	                 <input type="text" name="dob" value={patient.dob} 
	                        onChange={this.handleFormChange}/>
	            </div>
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
