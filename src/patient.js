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
                      doit: props.doit,
        };

        this.createLoadURL = this.createLoadURL.bind(this);
        this.loadPatient   = this.loadPatient.bind(this);
        this.handleForenameChanged  = this.handleForenameChanged.bind(this);
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
        }
        ).then(res => res.json())
         .then(
          (patient) => { console.log("POST SUCCESS "); },
          (error  ) => { console.log("Post ERROR   "); } 
        );
    }

    savePatient() {

        this.postData(this.createSaveURL(), this.state.patient);
    }

    componentDidMount() {
       this.loadPatient(this.state.patientId);
    }

    handleForenameChanged(event) {
        console.log("handleForenameChanged .. ->" + event.target.value);
        let patient = this.state.patient;
        patient.forename = event.target.value;
	this.setState({patient});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.savePatient();

        console.log("doit is a " + typeof this.state.doit);
        this.state.doit();

        this.props.history.push('/patients')
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
                    <div><label htmlFor="forename">Forename</label><input onChange={this.handleForenameChanged} value={patient.forename} type="text" name="patient.forename" /></div>
                    <div><label htmlFor="surname">Surname</label><input value={patient.surname} type="text" name="patient.surname" /></div>
                    <div><label htmlFor="dob" >Date of Birth</label><input value={patient.dob} type="text" name="patient.dob" /></div>
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
